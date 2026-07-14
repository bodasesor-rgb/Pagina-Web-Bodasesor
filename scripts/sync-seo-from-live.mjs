#!/usr/bin/env node
/**
 * Sync Nexus SEO landings into .netlify-live/ for merge before SPA deploy.
 *
 * Prefers NEXUS_URL (Hostinger preview) because production SPA deploys can wipe
 * landings and the production sitemap is often SPA-only.
 *
 * Usage: node scripts/sync-seo-from-live.mjs
 * Env:
 *   NEXUS_URL=https://white-ferret-567834.hostingersite.com
 *   SITE_BASE=https://bodasesor.com
 *   SEO_SYNC_CONCURRENCY=8
 */
import { mkdir, writeFile, rm, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, '.netlify-live')
const PROD = (process.env.SITE_BASE || 'https://bodasesor.com').replace(/\/$/, '')
const NEXUS = (process.env.NEXUS_URL || 'https://white-ferret-567834.hostingersite.com').replace(
  /\/$/,
  '',
)
const FETCH_ORIGINS = [...new Set([NEXUS, PROD].filter(Boolean))]
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
const CONCURRENCY = Number(process.env.SEO_SYNC_CONCURRENCY || 8)
const MIN_LANDINGS = Number(process.env.MIN_NEXUS_LANDINGS || 1200)

function isSpaShell(html) {
  if (!html) return true
  if (!html.includes('seo-service-hero')) return true
  if (html.includes('id="root"') && html.includes('/assets/index-')) return true
  if (html.includes('Access denied')) return true
  return false
}

async function fetchText(url, { retries = 5 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'text/html,application/xml' },
        redirect: 'follow',
      })
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

async function fetchBuffer(url, { retries = 4 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' })
      if (res.status === 429 || res.status >= 500) {
        await new Promise((r) => setTimeout(r, 800 * 2 ** attempt))
        continue
      }
      if (!res.ok) return null
      return Buffer.from(await res.arrayBuffer())
    } catch {
      await new Promise((r) => setTimeout(r, 500 * 2 ** attempt))
    }
  }
  return null
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

async function loadSlugs() {
  const path = join(__dirname, 'seo-landing-slugs.json')
  if (!existsSync(path)) throw new Error(`Falta ${path}`)
  const data = JSON.parse(await readFile(path, 'utf8'))
  return (data.slugs || []).map((s) => String(s).replace(/^\/+|\/+$/g, '')).filter(Boolean)
}

async function fetchLanding(slug) {
  for (const origin of FETCH_ORIGINS) {
    const url = `${origin}/${slug}/`
    const html = await fetchText(url)
    if (!isSpaShell(html)) return { html, origin, url }
  }
  return null
}

function assetUrlsFromHtml(html, origin, slug) {
  const assets = new Set()
  for (const m of html.matchAll(/(?:src|href|content)="([^"]+\.(?:webp|jpg|jpeg|png))"/gi)) {
    try {
      const abs = new URL(m[1], `${origin}/`)
      if (
        abs.pathname.startsWith(`/${slug}/`) ||
        abs.pathname.startsWith('/nexus-output-pages/')
      ) {
        // Prefer Hostinger/Nexus origin for binary assets
        assets.add(`${origin}${abs.pathname}`)
      }
    } catch {
      /* skip */
    }
  }
  return [...assets]
}

async function saveLanding(slug, html, origin) {
  const targets = [
    join(OUT_DIR, slug, 'index.html'),
    join(OUT_DIR, 'nexus-output-pages', slug, 'index.html'),
  ]
  for (const dest of targets) {
    await mkdir(dirname(dest), { recursive: true })
    await writeFile(dest, html)
  }

  for (const assetUrl of assetUrlsFromHtml(html, origin, slug)) {
    const buf = await fetchBuffer(assetUrl)
    if (!buf || buf.length < 50) continue
    const path = new URL(assetUrl).pathname.replace(/^\//, '')
    const dest = join(OUT_DIR, path)
    await mkdir(dirname(dest), { recursive: true })
    await writeFile(dest, buf)
  }
}

async function main() {
  console.log(`Sync SEO → ${OUT_DIR}`)
  console.log(`  fetch origins: ${FETCH_ORIGINS.join(' → ')}`)
  const slugs = await loadSlugs()
  console.log(`  inventory slugs: ${slugs.length}`)

  await rm(OUT_DIR, { recursive: true, force: true })
  await mkdir(OUT_DIR, { recursive: true })

  let ok = 0
  let spa = 0
  let fail = 0

  await mapPool(slugs, CONCURRENCY, async (slug) => {
    try {
      const hit = await fetchLanding(slug)
      if (!hit) {
        spa++
        return
      }
      await saveLanding(slug, hit.html, hit.origin)
      ok++
      if (ok % 100 === 0) console.log(`  … ${ok} landings SEO guardadas`)
    } catch (err) {
      fail++
      console.warn(`  skip ${slug}: ${err.message}`)
    }
  })

  const manifest = {
    pulledAt: new Date().toISOString(),
    origins: FETCH_ORIGINS,
    method: 'inventory+nexus-url-seo-service-hero',
    candidates: slugs.length,
    expectedCanonical: slugs.length,
    minRequired: MIN_LANDINGS,
    landingsSaved: ok,
    spaSkipped: spa,
    failed: fail,
  }
  await writeFile(join(OUT_DIR, '.manifest.json'), JSON.stringify(manifest, null, 2))

  console.log(`\n✓ Sync SEO: ${ok} landings (spa/miss=${spa}, fail=${fail})`)

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
