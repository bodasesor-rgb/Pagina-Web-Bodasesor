#!/usr/bin/env node
/**
 * Sync / refresh static blog HTML into .netlify-live/blog/.
 *
 * HARD RULES:
 * - Never delete existing rich blog HTML
 * - Never overwrite rich HTML with SPA / thin HTML from live
 * - Prefer durable seed (seo-seed/) when live is wiped
 * - Fail the build if rich blogs on disk < MIN_BLOG_PAGES
 *
 * Usage: node scripts/sync-blogs-from-live.mjs
 * Env:
 *   SITE_BASE=https://bodasesor.com
 *   SEO_SYNC_CONCURRENCY=8
 *   MIN_BLOG_PAGES=50
 *   ALLOW_SPA_ONLY_DEPLOY=1  — warn instead of fail (unsafe)
 */
import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { headersFor } from './lib/browser-fetch-headers.mjs'
import { spawnSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, '.netlify-live')
const BLOG_DIR = join(OUT_DIR, 'blog')
const SLUG_LIST = join(ROOT, 'seo-seed', 'blog-slugs.txt')
const NEXUS = (process.env.NEXUS_URL || 'https://white-ferret-567834.hostingersite.com').replace(
  /\/$/,
  '',
)
const PROD = (process.env.SITE_BASE || 'https://bodasesor.com').replace(/\/$/, '')
const ORIGINS = [...new Set([NEXUS, PROD].filter(Boolean))]
const CONCURRENCY = Number(process.env.SEO_SYNC_CONCURRENCY || 8)
const MIN_BLOG_PAGES = Number(process.env.MIN_BLOG_PAGES || 50)
const allowSpaOnly = process.env.ALLOW_SPA_ONLY_DEPLOY === '1'

function isSpaShell(html) {
  if (!html) return true
  if (html.includes('id="root"') && /\/assets\/index-[^"']+\.js/.test(html)) return true
  if (html.includes('Access denied')) return true
  return false
}

function isRichBlogHtml(html) {
  if (!html || isSpaShell(html)) return false
  if (html.includes('Bodasesor Eventos Blog')) return true
  if (html.length >= 20_000 && /<article|<main|blog/i.test(html)) return true
  return false
}

async function fetchText(url, { retries = 4 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: headersFor(url),
        redirect: 'follow',
      })
      if (res.status === 401 || res.status === 403 || res.status === 404) return null
      if (res.status === 429 || res.status >= 500) {
        await new Promise((r) => setTimeout(r, 800 * 2 ** attempt))
        continue
      }
      if (!res.ok) return null
      return await res.text()
    } catch {
      await new Promise((r) => setTimeout(r, 500 * 2 ** attempt))
    }
  }
  return null
}

async function mapPool(items, limit, fn) {
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      await fn(items[idx], idx)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()))
}

function loadSeedSlugs() {
  if (!existsSync(SLUG_LIST)) return []
  return readFileSync(SLUG_LIST, 'utf8')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

async function listExistingBlogPaths() {
  if (!existsSync(BLOG_DIR)) return []
  const paths = []
  const entries = await readdir(BLOG_DIR, { withFileTypes: true })
  for (const e of entries) {
    if (e.isDirectory()) paths.push(`/blog/${e.name}`)
    else if (e.name === 'index.html') paths.push('/blog')
  }
  return paths
}

async function fetchRichBlog(path) {
  for (const origin of ORIGINS) {
    const base = `${origin}${path}`
    const body = (await fetchText(`${base}/`)) || (await fetchText(base))
    if (body && isRichBlogHtml(body)) return body
  }
  return null
}

async function listBlogPathsFromSitemap() {
  const paths = new Set()
  for (const origin of ORIGINS) {
    const xml = await fetchText(`${origin}/sitemap.xml`)
    if (!xml) continue
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
    for (const loc of locs) {
      try {
        const u = new URL(loc)
        const p = (u.pathname || '/').replace(/\/+$/, '') || '/'
        if (p === '/blog' || p.startsWith('/blog/')) paths.add(p)
      } catch {
        /* skip */
      }
    }
  }
  paths.add('/blog/articulos')
  return [...paths]
}

function relFromBlogPath(path) {
  const clean = path.replace(/\/+$/, '') || '/blog'
  if (clean === '/blog') return 'blog/index.html'
  return `${clean.replace(/^\//, '')}/index.html`
}

async function countRichOnDisk() {
  if (!existsSync(BLOG_DIR)) return { rich: 0, total: 0 }
  async function walk(dir, files = []) {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = join(dir, e.name)
      if (e.isDirectory()) await walk(full, files)
      else if (e.name === 'index.html') files.push(full)
    }
    return files
  }
  const files = await walk(BLOG_DIR)
  let rich = 0
  for (const f of files) {
    try {
      const html = await readFile(f, 'utf8')
      if (isRichBlogHtml(html)) rich++
    } catch {
      /* skip */
    }
  }
  return { rich, total: files.length }
}

async function main() {
  console.log(`Sync blogs → ${OUT_DIR}/blog/`)
  console.log(`  source: ${ORIGINS.join(' → ')}`)
  await mkdir(OUT_DIR, { recursive: true })

  // 0) Always ensure durable seed first (no-op if enough rich blogs already)
  const seed = spawnSync('node', ['scripts/ensure-blog-seed.mjs'], {
    cwd: ROOT,
    stdio: 'inherit',
    env: process.env,
  })
  if (seed.status !== 0 && !allowSpaOnly) {
    process.exit(seed.status ?? 1)
  }

  const seedSlugs = loadSeedSlugs()
  const existing = await listExistingBlogPaths()
  const fromSitemap = await listBlogPathsFromSitemap()

  const paths = new Set([
    ...fromSitemap,
    ...existing,
    ...seedSlugs.map((s) => `/blog/${s}`),
    '/blog/articulos',
  ])
  // Never treat SPA hub as something to pull as "article"
  paths.delete('/blog')

  console.log(
    `  candidates: sitemap=${fromSitemap.length} seed=${seedSlugs.length} existing=${existing.length} union=${paths.size}`,
  )

  let saved = 0
  let skippedSpa = 0
  let skippedKeepRich = 0
  let failed = 0
  const kept = []

  await mapPool([...paths].sort(), CONCURRENCY, async (path) => {
    const rel = relFromBlogPath(path)
    const dest = join(OUT_DIR, rel)

    // Never clobber existing rich HTML
    if (existsSync(dest)) {
      try {
        const existingHtml = await readFile(dest, 'utf8')
        if (isRichBlogHtml(existingHtml)) {
          // Still try live refresh only if live is also rich AND larger
          const body = await fetchRichBlog(path)
          if (body && isRichBlogHtml(body) && body.length > existingHtml.length * 1.05) {
            await writeFile(dest, body)
            saved++
            kept.push(rel)
            return
          }
          skippedKeepRich++
          return
        }
      } catch {
        /* fall through to fetch */
      }
    }

    const body = await fetchRichBlog(path)
    if (!body || isSpaShell(body) || !isRichBlogHtml(body)) {
      skippedSpa++
      return
    }
    if (rel === 'blog/index.html' && body.length < 20_000) {
      skippedSpa++
      return
    }

    await mkdir(dirname(dest), { recursive: true })
    await writeFile(dest, body)
    saved++
    kept.push(rel)
    if (saved % 25 === 0) console.log(`  … ${saved} blog pages saved/refreshed`)
  })

  const onDisk = await countRichOnDisk()
  const manifest = {
    pulledAt: new Date().toISOString(),
    source: ORIGINS,
    candidates: paths.size,
    savedThisRun: saved,
    skippedSpa,
    skippedKeepRich,
    failed,
    blogsRichOnDisk: onDisk.rich,
    blogsTotalOnDisk: onDisk.total,
    sample: kept.slice(0, 30),
  }
  await writeFile(join(OUT_DIR, '.blogs-manifest.json'), JSON.stringify(manifest, null, 2))

  console.log(
    `\n✓ Blogs sync: saved/refreshed=${saved}, skippedSpa=${skippedSpa}, keptRich=${skippedKeepRich}, richOnDisk=${onDisk.rich}`,
  )

  if (onDisk.rich < MIN_BLOG_PAGES) {
    const msg =
      `❌ Solo ${onDisk.rich} blogs ricos en .netlify-live/blog/ (esperado ≥${MIN_BLOG_PAGES}). ` +
      'No se publicará un deploy que borre los artículos estáticos.'
    if (allowSpaOnly) {
      console.warn(`⚠ ALLOW_SPA_ONLY_DEPLOY=1 — ${msg}`)
    } else {
      console.error(msg)
      process.exit(1)
    }
  }

  // Refresh article images after HTML (Nexus Hostinger → public/blog)
  const imgs = spawnSync('node', ['scripts/sync-blog-images-from-nexus.mjs'], {
    cwd: ROOT,
    stdio: 'inherit',
    env: process.env,
  })
  if (imgs.status !== 0 && !allowSpaOnly) {
    process.exit(imgs.status ?? 1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
