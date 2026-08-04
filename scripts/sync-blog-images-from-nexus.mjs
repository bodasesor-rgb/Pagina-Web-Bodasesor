#!/usr/bin/env node
/**
 * Restore / refresh blog article images into the repo so Netlify deploys serve
 * real image/* instead of the SPA shell.
 *
 * Blog HTML references sibling files under /blog/{slug}/{file}.webp (and sometimes
 * /images/blog/*). Production often loses these on SPA-only deploys; Hostinger
 * Nexus still hosts them when NEXUS_URL is set.
 *
 * Writes to:
 *   public/blog/{slug}/…     → Vite copies into dist/blog/…
 *   .netlify-live/blog/…     → merge-live-into-dist preserves them
 *
 * Usage: node scripts/sync-blog-images-from-nexus.mjs
 * Env:
 *   NEXUS_URL=https://white-ferret-567834.hostingersite.com
 *   SITE_BASE=https://bodasesor.com
 *   SEO_SYNC_CONCURRENCY=8
 *   MIN_BLOG_IMAGES=50
 *   ALLOW_SPA_ONLY_DEPLOY=1  — warn instead of fail
 */
import { mkdir, writeFile, readFile, readdir, stat } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { browserAssetHeaders } from './lib/browser-fetch-headers.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PUBLIC_BLOG = join(ROOT, 'public', 'blog')
const LIVE_BLOG = join(ROOT, '.netlify-live', 'blog')
const SEED_TGZ_HINT = join(ROOT, 'seo-seed', 'netlify-blog-seed.tgz')
const SLUG_LIST = join(ROOT, 'seo-seed', 'blog-slugs.txt')
const NEXUS = (process.env.NEXUS_URL || 'https://white-ferret-567834.hostingersite.com').replace(
  /\/$/,
  '',
)
const PROD = (process.env.SITE_BASE || 'https://bodasesor.com').replace(/\/$/, '')
const ORIGINS = [...new Set([NEXUS, PROD].filter(Boolean))]
const CONCURRENCY = Number(process.env.SEO_SYNC_CONCURRENCY || 8)
const MIN_IMAGES = Number(process.env.MIN_BLOG_IMAGES || 50)
const allowSpaOnly = process.env.ALLOW_SPA_ONLY_DEPLOY === '1'
const IMG_RE = /\.(webp|jpe?g|png|avif)$/i

function loadSeedSlugs() {
  if (!existsSync(SLUG_LIST)) return []
  return readFileSync(SLUG_LIST, 'utf8')
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s && s !== 'articulos')
}

function extractImagePathsFromHtml(html) {
  if (!html) return []
  const found = new Set()
  const re =
    /(?:src|content|href)=["'](?:https?:\/\/(?:www\.)?bodasesor\.com)?(\/blog\/[^"'#?]+\.(?:webp|jpe?g|png|avif))["']/gi
  let m
  while ((m = re.exec(html))) {
    found.add(m[1].split('?')[0])
  }
  return [...found]
}

async function walkHtmlFiles(dir, files = []) {
  if (!existsSync(dir)) return files
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) await walkHtmlFiles(full, files)
    else if (e.name === 'index.html') files.push(full)
  }
  return files
}

async function collectImagePaths() {
  const paths = new Set()

  for (const dir of [LIVE_BLOG, PUBLIC_BLOG, join(ROOT, '.tmp-blog-seed', 'blog')]) {
    const htmls = await walkHtmlFiles(dir)
    for (const f of htmls) {
      try {
        const html = await readFile(f, 'utf8')
        for (const p of extractImagePathsFromHtml(html)) paths.add(p)
      } catch {
        /* skip */
      }
    }
  }

  // Seed tarball (HTML-only historically) — parse without full extract if possible
  if (existsSync(SEED_TGZ_HINT)) {
    try {
      const { execSync } = await import('node:child_process')
      const listing = execSync(`tar -tzf "${SEED_TGZ_HINT}"`, { encoding: 'utf8' })
      const htmlEntries = listing
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.endsWith('/index.html') && s.startsWith('blog/'))
      for (const entry of htmlEntries) {
        try {
          const html = execSync(`tar -xOf "${SEED_TGZ_HINT}" "${entry}"`, {
            encoding: 'utf8',
            maxBuffer: 8 * 1024 * 1024,
          })
          for (const p of extractImagePathsFromHtml(html)) paths.add(p)
        } catch {
          /* skip one */
        }
      }
    } catch {
      /* ignore seed parse errors */
    }
  }

  // Conventional featured image next to each slug
  for (const slug of loadSeedSlugs()) {
    paths.add(`/blog/${slug}/${slug}.webp`)
  }

  return [...paths].filter((p) => p.startsWith('/blog/') && IMG_RE.test(p)).sort()
}

function isRealImageBuffer(buf, contentType = '') {
  if (!buf || buf.length < 32) return false
  const ct = String(contentType || '').toLowerCase()
  if (ct.includes('text/html') || ct.includes('application/json')) return false
  // WebP RIFF....WEBP
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46) return true
  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8) return true
  // PNG
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return true
  if (ct.startsWith('image/')) return true
  return false
}

async function fetchImage(path) {
  for (const origin of ORIGINS) {
    const url = `${origin}${path}`
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const res = await fetch(url, {
          headers: browserAssetHeaders({
            'user-agent': 'BodasesorNexusVerify/1.0',
            accept: 'image/webp,image/*,*/*;q=0.8',
          }),
          redirect: 'follow',
        })
        if (res.status === 404 || res.status === 401 || res.status === 403) break
        if (res.status === 429 || res.status >= 500) {
          await new Promise((r) => setTimeout(r, 600 * 2 ** attempt))
          continue
        }
        if (!res.ok) break
        const buf = Buffer.from(await res.arrayBuffer())
        if (!isRealImageBuffer(buf, res.headers.get('content-type'))) {
          // SPA / JSON — try next origin
          break
        }
        return { buf, origin }
      } catch {
        await new Promise((r) => setTimeout(r, 400 * 2 ** attempt))
      }
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

async function writeImage(relUrlPath, buf) {
  // /blog/slug/file.webp → public/blog/slug/file.webp + .netlify-live/blog/slug/file.webp
  const rel = relUrlPath.replace(/^\//, '')
  const publicDest = join(ROOT, 'public', rel)
  const liveDest = join(ROOT, '.netlify-live', rel)
  for (const dest of [publicDest, liveDest]) {
    await mkdir(dirname(dest), { recursive: true })
    // Skip rewrite if identical-sized existing real image (avoid churn)
    if (existsSync(dest)) {
      try {
        const st = await stat(dest)
        if (st.size === buf.length && st.size > 200) continue
        // Replace tiny stubs (e.g. 1x1 placeholders ~44 bytes)
        if (st.size > 200 && st.size === buf.length) continue
      } catch {
        /* overwrite */
      }
    }
    await writeFile(dest, buf)
  }
}

async function countPublicBlogImages() {
  async function walk(dir, found = []) {
    if (!existsSync(dir)) return found
    const entries = await readdir(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = join(dir, e.name)
      if (e.isDirectory()) await walk(full, found)
      else if (IMG_RE.test(e.name)) {
        try {
          const st = await stat(full)
          if (st.size > 200) found.push(full)
        } catch {
          /* skip */
        }
      }
    }
    return found
  }
  return walk(PUBLIC_BLOG)
}

async function main() {
  console.log('sync-blog-images-from-nexus: restore article images')
  console.log(`  origins: ${ORIGINS.join(' → ')}`)
  console.log(`  public → ${PUBLIC_BLOG}`)

  const paths = await collectImagePaths()
  console.log(`  candidates: ${paths.length}`)

  let downloaded = 0
  let skippedOk = 0
  let failed = 0
  const failures = []

  await mapPool(paths, CONCURRENCY, async (path) => {
    const publicDest = join(ROOT, 'public', path.replace(/^\//, ''))
    if (existsSync(publicDest)) {
      try {
        const st = await stat(publicDest)
        if (st.size > 200) {
          // Still mirror into .netlify-live if missing
          const liveDest = join(ROOT, '.netlify-live', path.replace(/^\//, ''))
          if (!existsSync(liveDest)) {
            await mkdir(dirname(liveDest), { recursive: true })
            await writeFile(liveDest, await readFile(publicDest))
          }
          skippedOk++
          return
        }
      } catch {
        /* fetch */
      }
    }

    const got = await fetchImage(path)
    if (!got) {
      failed++
      failures.push(path)
      return
    }
    await writeImage(path, got.buf)
    downloaded++
    if (downloaded % 20 === 0) {
      console.log(`  … ${downloaded} images downloaded`)
    }
  })

  const onDisk = await countPublicBlogImages()
  const manifest = {
    pulledAt: new Date().toISOString(),
    origins: ORIGINS,
    candidates: paths.length,
    downloaded,
    skippedOk,
    failed,
    realImagesOnDisk: onDisk.length,
    sampleFailures: failures.slice(0, 20),
  }
  await mkdir(join(ROOT, '.netlify-live'), { recursive: true })
  await writeFile(
    join(ROOT, '.netlify-live', '.blog-images-manifest.json'),
    JSON.stringify(manifest, null, 2),
  )

  console.log(
    `\n✓ Blog images: downloaded=${downloaded}, kept=${skippedOk}, failed=${failed}, realOnDisk=${onDisk.length}`,
  )
  if (failures.length) {
    console.warn(`  missing (sample): ${failures.slice(0, 5).join(', ')}`)
  }

  if (onDisk.length < MIN_IMAGES) {
    const msg = `❌ Solo ${onDisk.length} imágenes reales en public/blog/ (esperado ≥${MIN_IMAGES}).`
    if (allowSpaOnly) {
      console.warn(`⚠ ALLOW_SPA_ONLY_DEPLOY=1 — ${msg}`)
    } else {
      console.error(msg)
      process.exit(1)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
