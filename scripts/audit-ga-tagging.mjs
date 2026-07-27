#!/usr/bin/env node
/**
 * Audit Google Analytics (gtag) presence on production HTML pages.
 * Usage: node scripts/audit-ga-tagging.mjs
 */
import { browserNavHeaders } from './lib/browser-fetch-headers.mjs'

const BASE = (process.env.BASE_URL || 'https://bodasesor.com').replace(/\/$/, '')
const GA_ID = 'G-6VGGKNB77P'
const CONCURRENCY = Number(process.env.CONCURRENCY || 16)

async function sitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`, { headers: browserNavHeaders() })
  const xml = await res.text()
  return [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))]
}

const EXTRA = [
  `${BASE}/`,
  `${BASE}/banquetes/ciudad-de-mexico`,
  `${BASE}/cuernavaca`,
  `${BASE}/banquete-kosher-ciudad-de-mexico`,
  `${BASE}/banquete-de-lujo-estado-de-mexico`,
  `${BASE}/banquete-3-tiempos-a-domicilio-aguascalientes`,
  `${BASE}/blog/votos-matrimoniales-2024`,
  `${BASE}/bodas/ciudad-de-mexico`,
  `${BASE}/carpas/morelia`,
  `${BASE}/desayunos/puerto-vallarta`,
]

function analyze(html, url) {
  const hasId = html.includes(GA_ID)
  const hasGtm = html.includes('googletagmanager.com/gtag/js')
  const hasConfig = html.includes(`gtag('config'`) || html.includes(`gtag("config"`)
  const hasDataLayer = html.includes('dataLayer')
  const isNexus = html.includes('seo-service-hero')
  const isSpa = html.includes('id="root"') && /\/assets\/index-[^"']+\.js/.test(html)
  const issues = []
  if (!hasId) issues.push('missing_ga_id')
  if (!hasGtm) issues.push('missing_gtm_script')
  if (!hasConfig) issues.push('missing_gtag_config')
  if (!hasDataLayer) issues.push('missing_datalayer')
  return { url, hasId, hasGtm, hasConfig, hasDataLayer, isNexus, isSpa, bytes: html.length, issues }
}

async function probe(url) {
  try {
    const res = await fetch(url, {
      headers: browserNavHeaders({ accept: 'text/html' }),
      redirect: 'follow',
    })
    if (!res.ok) return { url, status: res.status, issues: [`http_${res.status}`] }
    const ct = res.headers.get('content-type') || ''
    if (!ct.includes('text/html')) return { url, status: res.status, issues: ['not_html'], skipped: true }
    const html = await res.text()
    return { status: res.status, ...analyze(html, url) }
  } catch (err) {
    return { url, issues: [`fetch_error:${err.message}`] }
  }
}

async function mapPool(items, limit, fn) {
  const out = new Array(items.length)
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      out[idx] = await fn(items[idx])
      if ((idx + 1) % 100 === 0 || idx + 1 === items.length) {
        process.stderr.write(`  probed ${idx + 1}/${items.length}\n`)
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()))
  return out
}

async function main() {
  const urls = [...new Set([...(await sitemapUrls()), ...EXTRA])]
  console.log(`GA tagging audit BASE=${BASE} urls=${urls.length}`)
  const results = await mapPool(urls, CONCURRENCY, probe)
  const checked = results.filter((r) => !r.skipped)
  const missing = checked.filter((r) => r.issues?.some((i) => i.startsWith('missing_')))
  const errors = checked.filter((r) => r.issues?.some((i) => i.startsWith('http_') || i.startsWith('fetch_')))
  const ok = checked.filter((r) => !r.issues?.length)
  const nexusOk = checked.filter((r) => r.isNexus && !r.issues?.length).length
  const nexusBad = checked.filter((r) => r.isNexus && r.issues?.length)
  const spaOk = checked.filter((r) => r.isSpa && !r.issues?.length).length
  const spaBad = checked.filter((r) => r.isSpa && r.issues?.length)

  const summary = {
    total: urls.length,
    checked: checked.length,
    taggedOk: ok.length,
    missingTag: missing.length,
    httpErrors: errors.length,
    nexusTagged: nexusOk,
    nexusMissing: nexusBad.length,
    spaTagged: spaOk,
    spaMissing: spaBad.length,
    coveragePct: checked.length ? Math.round((ok.length / checked.length) * 1000) / 10 : 0,
  }
  console.log('\n=== SUMMARY ===')
  console.log(JSON.stringify(summary, null, 2))
  if (missing.length) {
    console.log('\n=== MISSING GA (max 40) ===')
    for (const r of missing.slice(0, 40)) {
      console.log(`  [${r.issues.join(',')}] nexus=${!!r.isNexus} spa=${!!r.isSpa} ${r.url}`)
    }
  }
  console.log('\n=== EXTRAS ===')
  for (const u of EXTRA) {
    const r = results.find((x) => x.url === u || x.url === `${u}/`)
    const hit = r || results.find((x) => (x.url || '').replace(/\/$/, '') === u.replace(/\/$/, ''))
    if (hit) console.log(`  ${(hit.issues || []).join('|') || 'OK'} ${hit.url}`)
  }

  // Write for follow-up
  const { writeFileSync } = await import('node:fs')
  writeFileSync('/tmp/ga-audit-summary.json', JSON.stringify(summary, null, 2))
  writeFileSync(
    '/tmp/ga-audit-missing.json',
    JSON.stringify(
      missing.map((r) => ({ url: r.url, issues: r.issues, isNexus: r.isNexus, isSpa: r.isSpa })),
      null,
      2,
    ),
  )

  if (missing.length > 0) process.exit(2)
  console.log('\n✓ All checked HTML pages include GA tag')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
