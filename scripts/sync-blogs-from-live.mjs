#!/usr/bin/env node
/**
 * Sync static blog HTML from production into .netlify-live/blog/
 * so SPA deploys do not wipe Shopify/legacy blog articles.
 *
 * These pages are NOT Nexus (no seo-service-hero) and are NOT in blog-data.js —
 * they must be pulled from the live site (or a Netlify ZIP that still has them).
 *
 * Usage: node scripts/sync-blogs-from-live.mjs
 * Env:
 *   SITE_BASE=https://bodasesor.com
 *   SEO_SYNC_CONCURRENCY=8
 *   MIN_BLOG_PAGES=50  (warn below this; does not fail the build)
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { browserNavHeaders } from './lib/browser-fetch-headers.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, '.netlify-live')
const PROD = (process.env.SITE_BASE || 'https://bodasesor.com').replace(/\/$/, '')
const CONCURRENCY = Number(process.env.SEO_SYNC_CONCURRENCY || 8)
const MIN_BLOG_PAGES = Number(process.env.MIN_BLOG_PAGES || 50)

function isSpaShell(html) {
  if (!html) return true
  if (html.includes('id="root"') && /\/assets\/index-[^"']+\.js/.test(html)) return true
  if (html.includes('Access denied')) return true
  return false
}

function isRichBlogHtml(html) {
  if (!html || isSpaShell(html)) return false
  if (html.includes('Bodasesor Eventos Blog')) return true
  // Static blog articles are typically 20KB+ of real content
  if (html.length >= 20_000 && /<article|<main|blog/i.test(html)) return true
  return false
}

async function fetchText(url, { retries = 4 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: browserNavHeaders(),
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

async function listBlogPathsFromSitemap() {
  const xml = await fetchText(`${PROD}/sitemap.xml`)
  if (!xml) return []
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  const paths = new Set()
  for (const loc of locs) {
    if (!loc.startsWith(PROD)) continue
    let path = loc.slice(PROD.length).replace(/\/+$/, '') || '/'
    if (path === '/blog' || path.startsWith('/blog/')) paths.add(path)
  }
  // Also try common library hub even if sitemap omits it
  paths.add('/blog/articulos')
  return [...paths].sort()
}

function relFromBlogPath(path) {
  const clean = path.replace(/\/+$/, '') || '/blog'
  // /blog → blog/index.html ; /blog/slug → blog/slug/index.html
  if (clean === '/blog') return 'blog/index.html'
  return `${clean.replace(/^\//, '')}/index.html`
}

async function countBlogsOnDisk() {
  if (!existsSync(join(OUT_DIR, 'blog'))) return 0
  const { readdir } = await import('node:fs/promises')
  async function walk(dir) {
    let n = 0
    const entries = await readdir(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = join(dir, e.name)
      if (e.isDirectory()) n += await walk(full)
      else if (e.name === 'index.html') n++
    }
    return n
  }
  return walk(join(OUT_DIR, 'blog'))
}

async function main() {
  console.log(`Sync blogs → ${OUT_DIR}/blog/`)
  console.log(`  source: ${PROD}`)
  await mkdir(OUT_DIR, { recursive: true })

  const paths = await listBlogPathsFromSitemap()
  console.log(`  candidates from sitemap: ${paths.length}`)

  let saved = 0
  let skippedSpa = 0
  let failed = 0
  const kept = []

  await mapPool(paths, CONCURRENCY, async (path) => {
    const url = `${PROD}${path}/`.replace(/([^:]\/)\/+/g, '$1')
    const html = await fetchText(url.endsWith('/') ? url : `${url}/`)
    // try without trailing slash if needed
    const body = html || (await fetchText(`${PROD}${path}`))
    if (!body || isSpaShell(body)) {
      skippedSpa++
      return
    }
    if (!isRichBlogHtml(body)) {
      skippedSpa++
      return
    }
    const rel = relFromBlogPath(path)
    // Do not overwrite /blog hub with soft-404 SPA; only save rich hubs
    if (rel === 'blog/index.html' && body.length < 20_000) {
      skippedSpa++
      return
    }
    const dest = join(OUT_DIR, rel)
    await mkdir(dirname(dest), { recursive: true })
    await writeFile(dest, body)
    saved++
    kept.push(rel)
    if (saved % 25 === 0) console.log(`  … ${saved} blog pages saved`)
  })

  const onDisk = await countBlogsOnDisk()
  const manifest = {
    pulledAt: new Date().toISOString(),
    source: PROD,
    candidates: paths.length,
    savedThisRun: saved,
    skippedSpa,
    failed,
    blogsOnDisk: onDisk,
    sample: kept.slice(0, 30),
  }
  await writeFile(join(OUT_DIR, '.blogs-manifest.json'), JSON.stringify(manifest, null, 2))

  console.log(`\n✓ Blogs sync: saved=${saved}, skippedSpa=${skippedSpa}, onDisk=${onDisk}`)
  if (onDisk < MIN_BLOG_PAGES) {
    console.warn(
      `⚠ Solo ${onDisk} blogs en .netlify-live/blog/ (esperado ≥${MIN_BLOG_PAGES}). ` +
        'Si producción aún tiene artículos, revisa SITE_BASE / red.',
    )
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
