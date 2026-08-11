#!/usr/bin/env node
/**
 * Audit Google Search Console for bodasesor.com (persistent agent access).
 *
 * Requires:
 *   GOOGLE_SERVICE_ACCOUNT_JSON  — service account key JSON (string)
 *   — OR — GOOGLE_APPLICATION_CREDENTIALS — path to key file
 *   Service account email must be added as user on the GSC property
 *   (Search Console → Settings → Users and permissions).
 *
 * Env:
 *   GSC_SITE_URL=https://bodasesor.com/   (trailing slash recommended)
 *   GSC_DAYS=28
 *   GSC_ROW_LIMIT=25000
 *
 * Usage:
 *   npm run gsc:audit
 *   node scripts/gsc-audit.mjs
 *   node scripts/gsc-audit.mjs --inspect=/banquete-de-lujo-estado-de-mexico/
 *
 * See SETUP_GSC_ACCESS.md
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadGoogleCredentials, getGoogleAccessToken, GSC_SCOPES } from './lib/google-service-account.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SITE = (process.env.GSC_SITE_URL || 'https://bodasesor.com/').replace(/\/?$/, '/')
const SITE_ENC = encodeURIComponent(SITE)
const DAYS = Number(process.env.GSC_DAYS || 28)
const ROW_LIMIT = Number(process.env.GSC_ROW_LIMIT || 25_000)
const OUT_DIR = join(ROOT, '.gsc-audit')

function parseArgs(argv) {
  const out = { inspect: null }
  for (const a of argv) {
    if (a.startsWith('--inspect=')) out.inspect = a.slice('--inspect='.length)
  }
  return out
}

async function gscFetch(token, path, { method = 'GET', body } = {}) {
  const res = await fetch(`https://www.googleapis.com/webmasters/v3${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { raw: text }
  }
  if (!res.ok) {
    const msg = data?.error?.message || text || res.statusText
    throw new Error(`GSC ${method} ${path} → ${res.status}: ${msg}`)
  }
  return data
}

async function urlInspect(token, inspectionUrl) {
  const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inspectionUrl,
      siteUrl: SITE,
      languageCode: 'es',
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(`URL Inspection ${res.status}: ${JSON.stringify(data)}`)
  }
  return data
}

function loadSitemapPaths() {
  const candidates = [
    join(ROOT, 'public', 'sitemap.xml'),
    join(ROOT, 'dist', 'sitemap.xml'),
  ]
  const paths = new Set()
  for (const f of candidates) {
    if (!existsSync(f)) continue
    const xml = readFileSync(f, 'utf8')
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      let p = m[1].trim().replace(/^https?:\/\/[^/]+/, '') || '/'
      p = p.replace(/\/$/, '') || '/'
      paths.add(p)
    }
  }
  // Also try live sitemap if local missing
  return paths
}

async function fetchLiveSitemapPaths() {
  const paths = new Set()
  try {
    const res = await fetch(`${SITE.replace(/\/$/, '')}/sitemap.xml`, {
      headers: { 'user-agent': 'BodasesorGscAudit/1.0' },
    })
    if (!res.ok) return paths
    const xml = await res.text()
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      let p = m[1].trim().replace(/^https?:\/\/[^/]+/, '') || '/'
      p = p.replace(/\/$/, '') || '/'
      paths.add(p)
    }
  } catch {
    /* ignore */
  }
  return paths
}

function ymd(d) {
  return d.toISOString().slice(0, 10)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const creds = loadGoogleCredentials()
  if (!creds) {
    console.error(`
❌ Falta credencial de Google Search Console.

Configura UNA de estas:
  export GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
  export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json

Luego añade el email de la service account como usuario en GSC
(propiedad ${SITE}) con permiso Completo o Restringido (lectura).

Guía: SETUP_GSC_ACCESS.md
`)
    process.exit(1)
  }

  console.log('══════════════════════════════════════════════════')
  console.log(' GSC audit — Google Search Console')
  console.log(` site=${SITE}`)
  console.log(` sa=${creds.client_email}`)
  console.log(` days=${DAYS}`)
  console.log('══════════════════════════════════════════════════')

  const token = await getGoogleAccessToken(creds, GSC_SCOPES)

  // 1) Confirm property access
  const sites = await gscFetch(token, '/sites')
  const siteEntries = sites?.siteEntry || []
  const matched = siteEntries.find((s) => {
    const u = (s.siteUrl || '').replace(/\/?$/, '/')
    return u === SITE || u === SITE.replace(/\/$/, '') || s.siteUrl === `sc-domain:bodasesor.com`
  })
  console.log(`\nProperties visible to SA: ${siteEntries.length}`)
  for (const s of siteEntries.slice(0, 20)) {
    console.log(`  - ${s.siteUrl} (${s.permissionLevel || '?'})`)
  }
  if (!matched && !siteEntries.some((s) => String(s.siteUrl).includes('bodasesor'))) {
    console.error(`\n❌ La service account NO ve la propiedad ${SITE}.`)
    console.error('   En Search Console → Usuarios y permisos → añade:')
    console.error(`   ${creds.client_email}`)
    process.exit(1)
  }

  // 2) Sitemaps submitted
  let sitemaps = { sitemap: [] }
  try {
    sitemaps = await gscFetch(token, `/sites/${SITE_ENC}/sitemaps`)
  } catch (err) {
    console.warn(`⚠ sitemaps: ${err.message}`)
  }
  const smList = sitemaps?.sitemap || []
  console.log(`\nSitemaps in GSC: ${smList.length}`)
  for (const sm of smList) {
    const errs = sm.errors || 0
    const warns = sm.warnings || 0
    const indexed = sm.contents?.[0]?.indexed || '?'
    const submitted = sm.contents?.[0]?.submitted || '?'
    console.log(
      `  - ${sm.path} lastSubmitted=${sm.lastSubmitted || '?'} errors=${errs} warnings=${warns} submitted=${submitted} indexed=${indexed}`,
    )
  }

  // 3) Search analytics — pages with clicks/impressions (proxy of known/indexed surface)
  const end = new Date()
  const start = new Date(Date.now() - DAYS * 86400000)
  const analytics = await gscFetch(token, `/sites/${SITE_ENC}/searchAnalytics/query`, {
    method: 'POST',
    body: {
      startDate: ymd(start),
      endDate: ymd(end),
      dimensions: ['page'],
      rowLimit: ROW_LIMIT,
      dataState: 'all',
    },
  })
  const rows = analytics?.rows || []
  const withImpressions = new Set()
  for (const r of rows) {
    const page = r.keys?.[0] || ''
    let p = page.replace(/^https?:\/\/[^/]+/, '') || '/'
    p = p.replace(/\/$/, '') || '/'
    withImpressions.add(p)
  }
  console.log(`\nSearch Analytics (${DAYS}d): ${rows.length} pages with data`)

  // 4) Compare vs sitemap
  let sitemapPaths = loadSitemapPaths()
  if (sitemapPaths.size < 100) {
    const live = await fetchLiveSitemapPaths()
    for (const p of live) sitemapPaths.add(p)
  }
  console.log(`Sitemap paths: ${sitemapPaths.size}`)

  const inSitemapNoAnalytics = [...sitemapPaths].filter((p) => !withImpressions.has(p))
  const analyticsNotInSitemap = [...withImpressions].filter((p) => !sitemapPaths.has(p))

  // Heuristic buckets
  const nexusMissingAnalytics = inSitemapNoAnalytics.filter(
    (p) => p !== '/' && !p.startsWith('/blog') && !p.startsWith('/assets'),
  )

  console.log(`\nIn sitemap but NO impressions/clicks in ${DAYS}d: ${inSitemapNoAnalytics.length}`)
  console.log(`  (many are normal for new/low-demand URLs; not the same as GSC "not indexed")`)
  console.log(`Analytics pages not in current sitemap: ${analyticsNotInSitemap.length}`)

  await mkdir(OUT_DIR, { recursive: true })
  const report = {
    auditedAt: new Date().toISOString(),
    site: SITE,
    serviceAccount: creds.client_email,
    days: DAYS,
    sitemaps: smList,
    analyticsPages: rows.length,
    sitemapPaths: sitemapPaths.size,
    inSitemapNoAnalyticsCount: inSitemapNoAnalytics.length,
    analyticsNotInSitemapCount: analyticsNotInSitemap.length,
    sampleInSitemapNoAnalytics: inSitemapNoAnalytics.slice(0, 100),
    sampleAnalyticsNotInSitemap: analyticsNotInSitemap.slice(0, 50),
    topPagesByClicks: rows
      .slice()
      .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
      .slice(0, 30)
      .map((r) => ({
        page: r.keys?.[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      })),
    note:
      'GSC UI "Why pages aren\'t indexed" reasons are not fully exposed via API. ' +
      'Use URL Inspection for samples, and export CSV from GSC Pages for full reason breakdown.',
  }
  const reportPath = join(OUT_DIR, 'gsc-audit-report.json')
  await writeFile(reportPath, JSON.stringify(report, null, 2))
  await writeFile(
    join(OUT_DIR, 'sitemap-no-analytics.txt'),
    inSitemapNoAnalytics.join('\n') + '\n',
  )
  console.log(`\n✓ Report → ${reportPath}`)
  console.log(`✓ List   → ${join(OUT_DIR, 'sitemap-no-analytics.txt')}`)

  // 5) Optional URL inspection
  if (args.inspect) {
    const path = args.inspect.startsWith('http')
      ? args.inspect
      : `${SITE.replace(/\/$/, '')}${args.inspect.startsWith('/') ? '' : '/'}${args.inspect}`
    console.log(`\n▶ URL Inspection: ${path}`)
    try {
      const insp = await urlInspect(token, path)
      const result = insp?.inspectionResult?.indexStatusResult || {}
      console.log(`  coverageState: ${result.coverageState || '?'}`)
      console.log(`  indexingState: ${result.indexingState || '?'}`)
      console.log(`  robotsTxtState: ${result.robotsTxtState || '?'}`)
      console.log(`  pageFetchState: ${result.pageFetchState || '?'}`)
      console.log(`  verdict: ${insp?.inspectionResult?.indexStatusResult?.verdict || result.verdict || '?'}`)
      await writeFile(join(OUT_DIR, 'url-inspection.json'), JSON.stringify(insp, null, 2))
    } catch (err) {
      console.error(`  URL Inspection failed: ${err.message}`)
      console.error('  (Enable "Search Console API" and ensure SA has access)')
    }
  } else {
    console.log('\nTip: inspect one URL with:')
    console.log('  node scripts/gsc-audit.mjs --inspect=/banquete-de-lujo-estado-de-mexico/')
  }

  console.log('\n✓ GSC access OK — listo para auditorías futuras')
  void nexusMissingAnalytics
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
