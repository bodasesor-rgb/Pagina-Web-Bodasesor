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
  // Per-landing images under /{slug}/ or /nexus-output-pages/
  for (const m of html.matchAll(/(?:src|href|content)="([^"]+\.(?:webp|jpg|jpeg|png))"/gi)) {
    try {
      const abs = new URL(m[1], `${origin}/`)
      if (
        abs.pathname.startsWith(`/${slug}/`) ||
        abs.pathname.startsWith('/nexus-output-pages/')
      ) {
        assets.add(`${origin}${abs.pathname}`)
      }
    } catch {
      /* skip */
    }
  }
  // Global styles/fonts/scripts referenced by landings (site root, not under slug)
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]+\.(?:css|woff2?|ttf|otf|js))"/gi)) {
    try {
      const abs = new URL(m[1], `${origin}/`)
      if (
        abs.pathname.startsWith('/css/') ||
        abs.pathname.startsWith('/fonts/') ||
        abs.pathname.startsWith('/js/')
      ) {
        assets.add(`${origin}${abs.pathname}`)
      }
    } catch {
      /* skip */
    }
  }
  return [...assets]
}

/** Shared Hostinger assets all Nexus landings need (not covered by Vite public/). */
const GLOBAL_SEO_ASSETS = [
  '/css/seo-landing.css',
  // Referenced by landings; also present in SPA public/ — sync keeps Nexus copy as backup
  '/images/sello-garantia-transparent.png',
]

function looksLikeCss(buf) {
  if (!buf || buf.length < 200) return false
  const head = buf.subarray(0, 200).toString('utf8').trimStart()
  if (head.startsWith('<!DOCTYPE') || head.startsWith('<html')) return false
  return /:root|--navy|\.seo-service-hero|font-family/.test(head) || head.includes('{')
}

async function readVendoredPublicAsset(pathname) {
  const local = join(ROOT, 'public', pathname.replace(/^\//, ''))
  if (!existsSync(local)) return null
  const buf = await readFile(local)
  if (pathname.endsWith('.css') && !looksLikeCss(buf)) return null
  if (!buf || buf.length < 50) return null
  return buf
}

async function saveGlobalSeoAssets() {
  let saved = 0
  for (const pathname of GLOBAL_SEO_ASSETS) {
    let buf = null
    let from = null
    for (const origin of FETCH_ORIGINS) {
      const url = `${origin}${pathname}`
      const got = await fetchBuffer(url, { retries: 6 })
      if (!got || got.length < 50) continue
      // Reject SPA soft-404 HTML
      const head = got.subarray(0, 80).toString('utf8')
      if (head.includes('<!DOCTYPE') || head.includes('<html')) {
        console.warn(`  ⚠ ${pathname} from ${origin} looks like HTML (soft-404) — skip`)
        continue
      }
      if (pathname.endsWith('.css') && !looksLikeCss(got)) continue
      buf = got
      from = origin
      break
    }
    if (!buf) {
      const vendored = await readVendoredPublicAsset(pathname)
      if (vendored) {
        buf = vendored
        from = 'public/ (vendored)'
      }
    }
    if (!buf) {
      console.warn(`  ⚠ global asset missing: ${pathname}`)
      continue
    }
    const dest = join(OUT_DIR, pathname.replace(/^\//, ''))
    await mkdir(dirname(dest), { recursive: true })
    await writeFile(dest, buf)
    saved++
    console.log(`  ✓ global ${pathname} (${buf.length}B from ${from})`)
  }
  return saved
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
    const head = buf.subarray(0, 80).toString('utf8')
    if (head.includes('<!DOCTYPE') || head.includes('<html')) continue
    const path = new URL(assetUrl).pathname.replace(/^\//, '')
    const dest = join(OUT_DIR, path)
    await mkdir(dirname(dest), { recursive: true })
    await writeFile(dest, buf)
  }
}

async function countSeoOnDisk() {
  if (!existsSync(OUT_DIR)) return 0
  let count = 0
  const entries = await (await import('node:fs/promises')).readdir(OUT_DIR, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === 'nexus-output-pages') {
      continue
    }
    const indexPath = join(OUT_DIR, entry.name, 'index.html')
    if (!existsSync(indexPath)) continue
    try {
      const html = await readFile(indexPath, 'utf8')
      if (!isSpaShell(html)) count++
    } catch {
      /* skip */
    }
  }
  return count
}

async function pullSlugs(slugs, concurrency) {
  let ok = 0
  let spa = 0
  let fail = 0
  const missed = []

  await mapPool(slugs, concurrency, async (slug) => {
    try {
      const hit = await fetchLanding(slug)
      if (!hit) {
        spa++
        missed.push(slug)
        return
      }
      await saveLanding(slug, hit.html, hit.origin)
      ok++
      if (ok % 100 === 0) console.log(`  … ${ok} landings SEO guardadas (esta pasada)`)
    } catch (err) {
      fail++
      missed.push(slug)
      console.warn(`  skip ${slug}: ${err.message}`)
    }
  })

  return { ok, spa, fail, missed }
}

async function main() {
  console.log(`Sync SEO → ${OUT_DIR}`)
  console.log(`  fetch origins: ${FETCH_ORIGINS.join(' → ')}`)
  const slugs = await loadSlugs()
  console.log(`  inventory slugs: ${slugs.length}`)

  // Prefer fill/update over wipe so a Netlify ZIP seed survives Hostinger rate-limits.
  // Set SEO_SYNC_WIPE=1 for a clean crawl.
  if (process.env.SEO_SYNC_WIPE === '1') {
    console.log('  SEO_SYNC_WIPE=1 — clearing .netlify-live/')
    await rm(OUT_DIR, { recursive: true, force: true })
  }
  await mkdir(OUT_DIR, { recursive: true })
  const seeded = await countSeoOnDisk()
  if (seeded > 0) {
    console.log(`  existing SEO landings on disk (seed): ${seeded}`)
  }

  // Globals first — before Hostinger may rate-limit the landing crawl.
  console.log('\n▶ Sync global SEO assets (/css, shared images)…')
  const globalSaved = await saveGlobalSeoAssets()
  const cssPath = join(OUT_DIR, 'css', 'seo-landing.css')
  if (!existsSync(cssPath) || !looksLikeCss(await readFile(cssPath))) {
    const msg = 'Falta css/seo-landing.css válido tras sync (landings se verían sin estilos).'
    if (process.env.ALLOW_SPA_ONLY_DEPLOY === '1') {
      console.warn(`⚠ ${msg}`)
    } else {
      console.error(`❌ ${msg}`)
      process.exit(1)
    }
  }

  let { ok, spa, fail, missed } = await pullSlugs(slugs, CONCURRENCY)

  // Hostinger often rate-limits mid-crawl on CI; second pass with backoff.
  if (ok + seeded < MIN_LANDINGS && missed.length > 0) {
    console.log(
      `\n▶ Retry ${missed.length} missed landings (fetched=${ok}, seed=${seeded} < ${MIN_LANDINGS}); sleeping 8s…`,
    )
    await new Promise((r) => setTimeout(r, 8000))
    const retryConcurrency = Math.max(1, Math.min(2, CONCURRENCY))
    const round2 = await pullSlugs(missed, retryConcurrency)
    ok += round2.ok
    spa = round2.spa
    fail += round2.fail
    missed = round2.missed
  }

  const onDisk = await countSeoOnDisk()
  const manifest = {
    pulledAt: new Date().toISOString(),
    origins: FETCH_ORIGINS,
    method: 'inventory+nexus-url-seo-service-hero',
    candidates: slugs.length,
    expectedCanonical: slugs.length,
    minRequired: MIN_LANDINGS,
    landingsSaved: ok,
    landingsOnDisk: onDisk,
    seedBeforeSync: seeded,
    spaSkipped: spa,
    failed: fail,
    globalAssetsSaved: globalSaved,
  }
  await writeFile(join(OUT_DIR, '.manifest.json'), JSON.stringify(manifest, null, 2))

  console.log(`\n✓ Sync SEO: fetched=${ok} onDisk=${onDisk} (spa/miss=${spa}, fail=${fail})`)

  if (onDisk < MIN_LANDINGS) {
    const msg = `Solo ${onDisk} landings SEO on disk (need ≥${MIN_LANDINGS}).`
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
