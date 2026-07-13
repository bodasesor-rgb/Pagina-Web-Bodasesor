#!/usr/bin/env node
/**
 * Sync live Nexus SEO landings from production (or NEXUS_URL) into .netlify-live/
 * so SPA deploys can merge them into dist/ and not wipe SEO pages.
 *
 * Netlify deploy ZIPs often contain 0 landing files even when they are live
 * (Nexus publishes outside the SPA deploy history). This script crawls the
 * sitemap and keeps only HTML that contains seo-service-hero.
 *
 * Usage: node scripts/sync-seo-from-live.mjs
 * Env: SITE_BASE / NEXUS_URL (default https://bodasesor.com)
 */
import { mkdir, writeFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, '.netlify-live')
const BASE = (process.env.NEXUS_URL || process.env.SITE_BASE || 'https://bodasesor.com').replace(
  /\/$/,
  '',
)
const UA =
  'Mozilla/5.0 (compatible; BodasesorSeoSync/1.0; +https://bodasesor.com)'
const CONCURRENCY = Number(process.env.SEO_SYNC_CONCURRENCY || 16)
const MIN_LANDINGS = Number(process.env.MIN_NEXUS_LANDINGS || 50)

function slugFromUrl(url) {
  try {
    const u = new URL(url)
    return u.pathname.replace(/^\/+|\/+$/g, '')
  } catch {
    return ''
  }
}

function isSpaShell(html) {
  if (!html.includes('seo-service-hero')) return true
  if (html.includes('id="root"') && html.includes('/assets/index-')) return true
  return false
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'text/html,application/xml' },
    redirect: 'follow',
  })
  if (!res.ok) return null
  return await res.text()
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA },
    redirect: 'follow',
  })
  if (!res.ok) return null
  return Buffer.from(await res.arrayBuffer())
}

async function mapPool(items, limit, fn) {
  const results = new Array(items.length)
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      results[idx] = await fn(items[idx], idx)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()))
  return results
}

async function loadSitemapUrls() {
  const xml = await fetchText(`${BASE}/sitemap.xml`)
  if (!xml) throw new Error(`No se pudo leer ${BASE}/sitemap.xml`)
  const urls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((m) => m[1].trim())
  return [...new Set(urls)].filter((u) => {
    const slug = slugFromUrl(u)
    if (!slug) return false
    if (slug.startsWith('blog')) return false
    if (slug.includes('/')) return false // only root-level service×city landings
    return true
  })
}

function assetUrlsFromHtml(html, pageUrl) {
  const page = new URL(pageUrl)
  const assets = new Set()
  for (const m of html.matchAll(/(?:src|href|content)="([^"]+\.(?:webp|jpg|jpeg|png|svg|css|js))"/gi)) {
    try {
      const abs = new URL(m[1], page)
      if (abs.origin !== page.origin) continue
      // same folder as page, or nexus-output-pages
      if (
        abs.pathname.startsWith(`/${slugFromUrl(pageUrl)}/`) ||
        abs.pathname.startsWith('/nexus-output-pages/')
      ) {
        assets.add(abs.href)
      }
    } catch {
      /* skip */
    }
  }
  return [...assets]
}

async function saveLanding(url, html) {
  const slug = slugFromUrl(url)
  if (!slug) return []

  const written = []
  const targets = [
    join(OUT_DIR, slug, 'index.html'),
    join(OUT_DIR, 'nexus-output-pages', slug, 'index.html'),
  ]
  for (const dest of targets) {
    await mkdir(dirname(dest), { recursive: true })
    await writeFile(dest, html)
    written.push(dest)
  }

  for (const assetUrl of assetUrlsFromHtml(html, url)) {
    const buf = await fetchBuffer(assetUrl)
    if (!buf || buf.length < 50) continue
    const path = new URL(assetUrl).pathname.replace(/^\//, '')
    const dest = join(OUT_DIR, path)
    await mkdir(dirname(dest), { recursive: true })
    await writeFile(dest, buf)
    written.push(dest)
  }
  return written
}

async function main() {
  console.log(`Sync SEO desde ${BASE} → ${OUT_DIR}`)
  const urls = await loadSitemapUrls()
  console.log(`  candidatos root-level en sitemap: ${urls.length}`)

  if (existsSync(OUT_DIR)) {
    // Keep partial zip snapshot if any; replace SEO dirs cleanly by rewriting landings.
  } else {
    await mkdir(OUT_DIR, { recursive: true })
  }

  let ok = 0
  let spa = 0
  let fail = 0

  await mapPool(urls, CONCURRENCY, async (url) => {
    try {
      const html = await fetchText(url)
      if (!html) {
        fail++
        return
      }
      if (isSpaShell(html)) {
        spa++
        return
      }
      await saveLanding(url, html)
      ok++
      if (ok % 50 === 0) console.log(`  … ${ok} landings SEO guardadas`)
    } catch (err) {
      fail++
      console.warn(`  skip ${url}: ${err.message}`)
    }
  })

  const manifest = {
    pulledAt: new Date().toISOString(),
    source: BASE,
    method: 'sitemap-http-seo-service-hero',
    candidates: urls.length,
    landingsSaved: ok,
    spaSkipped: spa,
    failed: fail,
  }
  await writeFile(join(OUT_DIR, '.manifest.json'), JSON.stringify(manifest, null, 2))

  console.log(`\n✓ Sync SEO: ${ok} landings (spa=${spa}, fail=${fail})`)

  if (ok < MIN_LANDINGS) {
    const msg = `Solo ${ok} landings SEO (need ≥${MIN_LANDINGS}).`
    if (process.env.ALLOW_SPA_ONLY_DEPLOY === '1') {
      console.warn(`⚠ ${msg}`)
      return
    }
    console.error(`❌ ${msg}`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
