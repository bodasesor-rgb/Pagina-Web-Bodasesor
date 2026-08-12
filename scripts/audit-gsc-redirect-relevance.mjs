#!/usr/bin/env node
/**
 * From Google Search Console Search Analytics pages (+ redirects-map),
 * follow live redirects and flag destinations that don't relate to the source.
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=private/credentials/gsc-sa.json \
 *     node scripts/audit-gsc-redirect-relevance.mjs
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadGoogleCredentials, getGoogleAccessToken, GSC_SCOPES } from './lib/google-service-account.mjs'
import { browserNavHeaders } from './lib/browser-fetch-headers.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SITE = (process.env.GSC_SITE_URL || 'sc-domain:bodasesor.com').trim()
const DAYS = Number(process.env.GSC_DAYS || 28)
const BASE = 'https://bodasesor.com'
const OUT = join(ROOT, '.gsc-audit')
const CONCURRENCY = Number(process.env.REDIRECT_AUDIT_CONCURRENCY || 12)

const creds = loadGoogleCredentials()
if (!creds) {
  console.error('Missing Google credentials (GOOGLE_APPLICATION_CREDENTIALS or GOOGLE_SERVICE_ACCOUNT_JSON)')
  process.exit(1)
}
const token = await getGoogleAccessToken(creds, GSC_SCOPES)

function ymd(d) {
  return d.toISOString().slice(0, 10)
}
const end = new Date()
end.setUTCDate(end.getUTCDate() - 1)
const start = new Date(end)
start.setUTCDate(start.getUTCDate() - (DAYS - 1))

async function fetchAllPages() {
  const rows = []
  let startRow = 0
  const rowLimit = 25_000
  while (true) {
    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: ymd(start),
          endDate: ymd(end),
          dimensions: ['page'],
          rowLimit,
          startRow,
        }),
      },
    )
    const data = await res.json()
    if (!res.ok) throw new Error(`GSC analytics ${res.status}: ${JSON.stringify(data)}`)
    const batch = data.rows || []
    rows.push(...batch)
    console.log(`GSC pages fetched: ${rows.length}`)
    if (batch.length < rowLimit) break
    startRow += batch.length
  }
  return rows
}

const STOP = new Set([
  'de', 'la', 'el', 'en', 'y', 'para', 'del', 'los', 'las', 'un', 'una', 'a', 'con', 'por',
  'the', 'and', 'or', 'of', 'cdmx', 'mexico', 'eventos', 'bodasesor', 'www', 'https', 'http',
  'com', 'html', 'noticias', 'collections', 'products', 'pages', 'blogs', 'blog',
])

function tokens(pathOrUrl) {
  try {
    const u = pathOrUrl.startsWith('http') ? new URL(pathOrUrl) : new URL(pathOrUrl, BASE)
    const parts = u.pathname
      .toLowerCase()
      .replace(/[^a-z0-9áéíóúñü/-]+/gi, ' ')
      .split(/[\/\s_-]+/)
      .filter((t) => t && t.length > 2 && !STOP.has(t) && !/^\d+$/.test(t))
    return new Set(parts)
  } catch {
    return new Set()
  }
}

function overlapScore(a, b) {
  const A = tokens(a)
  const B = tokens(b)
  if (!A.size || !B.size) return 0
  let inter = 0
  for (const t of A) if (B.has(t)) inter++
  return inter / Math.min(A.size, B.size)
}

function classify(fromPath, toPath, statusFinal, chain) {
  const from = fromPath.replace(/\/+$/, '') || '/'
  const to = toPath.replace(/\/+$/, '') || '/'
  const score = overlapScore(from, to)
  const issues = []
  if (statusFinal >= 400) issues.push('dest_http_error')
  if (to === '/' && from !== '/') issues.push('redirect_to_home')
  if (chain.filter((c) => c.status >= 300 && c.status < 400).length > 3) issues.push('long_chain')
  if (from.replace(/\/$/, '') === to.replace(/\/$/, '')) {
    return { kind: 'slash_normalize', score: 1, issues }
  }
  if (score >= 0.5) return { kind: 'relevant', score, issues }
  if (score >= 0.25) return { kind: 'partial', score, issues }
  issues.push('low_relevance')
  return { kind: 'mismatch', score, issues }
}

async function follow(url) {
  const chain = []
  let current = url
  for (let i = 0; i < 8; i++) {
    const res = await fetch(current, { headers: browserNavHeaders(), redirect: 'manual' })
    const location = res.headers.get('location')
    chain.push({ url: current, status: res.status, location })
    if (res.status >= 300 && res.status < 400 && location) {
      current = new URL(location, current).href
      continue
    }
    const buf = Buffer.from(await res.arrayBuffer())
    const text = buf.toString('utf8', 0, Math.min(buf.length, 12_000))
    const title = (text.match(/<title[^>]*>([^<]*)/i) || [])[1] || ''
    const soft404 = /Página no encontrada|Servicio no encontrado|Producto no encontrado/i.test(text)
    return {
      finalUrl: current,
      finalStatus: res.status,
      title: title.trim(),
      soft404,
      chain,
    }
  }
  return { finalUrl: current, finalStatus: 0, title: '', soft404: false, chain }
}

const rows = await fetchAllPages()
const mapPath = join(ROOT, 'public/redirects-map.json')
const redirectMap = existsSync(mapPath) ? JSON.parse(readFileSync(mapPath, 'utf8')) : {}

const candidates = new Map()
for (const r of rows) {
  const page = r.keys[0]
  candidates.set(page, {
    clicks: r.clicks || 0,
    impressions: r.impressions || 0,
    position: r.position || 0,
    source: 'gsc',
  })
}
for (const from of Object.keys(redirectMap)) {
  const url = from.startsWith('http') ? from : BASE + (from.startsWith('/') ? from : `/${from}`)
  if (!candidates.has(url)) {
    candidates.set(url, { clicks: 0, impressions: 0, position: 0, source: 'map' })
  }
}

const sitemap = new Set()
const smFile = existsSync(join(ROOT, 'public/sitemap.xml'))
  ? join(ROOT, 'public/sitemap.xml')
  : join(ROOT, 'dist/sitemap.xml')
if (existsSync(smFile)) {
  const sm = readFileSync(smFile, 'utf8')
  for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    try {
      sitemap.add(new URL(m[1]).pathname.replace(/\/+$/, '') || '/')
    } catch {
      /* ignore */
    }
  }
}

const CITY_TAIL =
  /(ciudad-de-mexico|cdmx|guadalajara|monterrey|morelia|puebla|cancun|cuernavaca|queretaro|toluca|pachuca|leon|merida|oaxaca|tijuana|torreon|acapulco|cozumel|veracruz|aguascalientes|estado-de-mexico|puerto-vallarta|los-cabos|san-luis-potosi|san-miguel-allende|valle-de-bravo)$/i

function likelyRedirect(url) {
  let p
  try {
    p = new URL(url).pathname
  } catch {
    return false
  }
  const norm = p.replace(/\/+$/, '') || '/'
  if (redirectMap[norm] || redirectMap[p] || redirectMap[`${norm}/`]) return true
  if (/^\/(products|collections|blogs|pages)\//.test(norm)) return true
  const last = norm.split('/').pop() || ''
  if (CITY_TAIL.test(last) && !sitemap.has(norm)) return true
  if (!sitemap.has(norm)) return true
  return false
}

const toProbe = [...candidates.entries()].filter(([url]) => likelyRedirect(url))
toProbe.sort((a, b) => b[1].impressions - a[1].impressions || b[1].clicks - a[1].clicks)
console.log(`Candidates: ${candidates.size} | likely redirects to probe: ${toProbe.length}`)

const results = []
let cursor = 0
async function worker() {
  while (cursor < toProbe.length) {
    const idx = cursor++
    const [url, meta] = toProbe[idx]
    try {
      const followed = await follow(url)
      const fromPath = new URL(url).pathname
      const toPath = new URL(followed.finalUrl).pathname
      const had3xx = followed.chain.some((c) => c.status >= 300 && c.status < 400)
      const pathChanged = fromPath.replace(/\/$/, '') !== toPath.replace(/\/$/, '')
      const redirected = had3xx || pathChanged
      if (!redirected && followed.finalStatus === 200) {
        results.push({
          url,
          ...meta,
          redirected: false,
          finalUrl: followed.finalUrl,
          finalStatus: followed.finalStatus,
          title: followed.title,
          kind: 'no_redirect',
          score: 1,
          issues: [],
        })
      } else {
        const cls = classify(fromPath, toPath, followed.finalStatus, followed.chain)
        if (followed.soft404) cls.issues.push('soft404')
        results.push({
          url,
          ...meta,
          redirected: true,
          finalUrl: followed.finalUrl,
          finalStatus: followed.finalStatus,
          title: followed.title,
          chainLen: followed.chain.filter((c) => c.status >= 300 && c.status < 400).length,
          ...cls,
        })
      }
    } catch (e) {
      results.push({
        url,
        ...meta,
        redirected: true,
        kind: 'error',
        score: 0,
        issues: ['fetch_error'],
        error: e.message,
        finalUrl: '',
        finalStatus: 0,
        title: '',
      })
    }
    if (idx && idx % 150 === 0) console.log(`  probed ${idx}/${toProbe.length}`)
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()))

const redirects = results.filter((r) => r.redirected)
const mismatches = redirects
  .filter(
    (r) =>
      r.kind === 'mismatch' ||
      r.kind === 'error' ||
      r.issues?.includes('redirect_to_home') ||
      r.issues?.includes('soft404') ||
      r.issues?.some((i) => i.startsWith('dest_http') || i.startsWith('http_')),
  )
  .sort((a, b) => b.impressions - a.impressions || a.score - b.score)
const partial = redirects
  .filter((r) => r.kind === 'partial')
  .sort((a, b) => b.impressions - a.impressions)
const relevant = redirects.filter((r) => r.kind === 'relevant' || r.kind === 'slash_normalize')

const summary = {
  gscPages: rows.length,
  probed: toProbe.length,
  redirectsFound: redirects.length,
  relevant: relevant.length,
  partial: partial.length,
  mismatches: mismatches.length,
  noRedirectStillLive: results.filter((r) => !r.redirected).length,
}

console.log('\n=== SUMMARY ===')
console.log(JSON.stringify(summary, null, 2))

console.log('\n=== MISMATCH / BAD (top 50 by impressions) ===')
for (const r of mismatches.slice(0, 50)) {
  console.log(
    `[${r.kind}] score=${Number(r.score || 0).toFixed(2)} impr=${Math.round(r.impressions)} clicks=${Math.round(r.clicks)} issues=${(r.issues || []).join(',')}`,
  )
  console.log(`  FROM ${r.url}`)
  console.log(`  TO   ${r.finalUrl} (${r.finalStatus}) ${(r.title || '').slice(0, 70)}`)
}

console.log('\n=== PARTIAL (top 25) ===')
for (const r of partial.slice(0, 25)) {
  console.log(`[partial] score=${r.score.toFixed(2)} impr=${Math.round(r.impressions)}`)
  console.log(`  FROM ${r.url}`)
  console.log(`  TO   ${r.finalUrl}`)
}

await mkdir(OUT, { recursive: true })
const outFile = join(OUT, 'gsc-redirect-relevance.json')
await writeFile(
  outFile,
  JSON.stringify(
    {
      auditedAt: new Date().toISOString(),
      site: SITE,
      days: DAYS,
      summary,
      mismatches,
      partial: partial.slice(0, 300),
      relevantSample: relevant.slice(0, 80),
    },
    null,
    2,
  ),
)
console.log(`\n✓ Wrote ${outFile}`)
if (mismatches.length) process.exitCode = 2
