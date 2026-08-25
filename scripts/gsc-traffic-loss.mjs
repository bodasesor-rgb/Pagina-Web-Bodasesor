#!/usr/bin/env node
/**
 * Compare GSC page traffic before vs after the June 2026 cliff.
 * Outputs top click/impression losses + redirect flags.
 *
 * Env: GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS
 * Optional: GSC_SITE_URL=sc-domain:bodasesor.com
 *
 * Usage: node scripts/gsc-traffic-loss.mjs
 */
import { writeFile, mkdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadGoogleCredentials, getGoogleAccessToken, GSC_SCOPES } from './lib/google-service-account.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, '.gsc-audit')
const SITE_RAW = (process.env.GSC_SITE_URL || 'sc-domain:bodasesor.com').trim()
const ROW_LIMIT = Number(process.env.GSC_ROW_LIMIT || 25_000)

const BEFORE = { start: '2026-05-24', end: '2026-06-23', label: 'before_drop' }
const AFTER = { start: '2026-07-01', end: '2026-07-31', label: 'after_drop' }

function normalizeSiteUrl(raw) {
  if (raw.startsWith('sc-domain:')) return raw
  return raw.replace(/\/?$/, '/')
}

function pathKey(page) {
  let p = String(page || '').replace(/^https?:\/\/(?:www\.)?[^/]+/i, '') || '/'
  p = p.replace(/\/$/, '') || '/'
  return p.toLowerCase()
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
    throw new Error(`GSC ${method} ${path} → ${res.status}: ${data?.error?.message || text}`)
  }
  return data
}

async function queryPages(token, siteEnc, range) {
  const analytics = await gscFetch(token, `/sites/${siteEnc}/searchAnalytics/query`, {
    method: 'POST',
    body: {
      startDate: range.start,
      endDate: range.end,
      dimensions: ['page'],
      rowLimit: ROW_LIMIT,
      dataState: 'all',
    },
  })
  const map = new Map()
  for (const r of analytics?.rows || []) {
    const page = r.keys?.[0] || ''
    const key = pathKey(page)
    const prev = map.get(key) || { path: key, page, clicks: 0, impressions: 0, positionSum: 0, weight: 0 }
    prev.clicks += r.clicks || 0
    prev.impressions += r.impressions || 0
    prev.positionSum += (r.position || 0) * (r.impressions || 0)
    prev.weight += r.impressions || 0
    if ((r.clicks || 0) >= (prev.bestClicks || 0)) {
      prev.page = page
      prev.bestClicks = r.clicks || 0
    }
    map.set(key, prev)
  }
  for (const row of map.values()) {
    row.position = row.weight ? row.positionSum / row.weight : null
    delete row.positionSum
    delete row.weight
    delete row.bestClicks
  }
  return map
}

async function loadRedirectMapAsync() {
  for (const f of [
    join(ROOT, 'public', 'redirects-map.json'),
    join(ROOT, 'dist', 'redirects-map.json'),
  ]) {
    if (!existsSync(f)) continue
    try {
      return JSON.parse(await readFile(f, 'utf8'))
    } catch {
      /* ignore */
    }
  }
  return null
}

function classify(path) {
  if (path.includes('buscar')) return 'buscar'
  if (path.startsWith('/collections/') || path.startsWith('/products/') || path.startsWith('/blogs/')) {
    return 'shopify_legacy'
  }
  if (/[a-z](cdmx|monterrey|guadalajara|puebla|merida)$/i.test(path.replace(/\//g, ''))) {
    return 'glued_city'
  }
  if (path.startsWith('/blog/')) return 'blog'
  if ((path.match(/\//g) || []).length >= 2) return 'hub_or_product_city'
  return 'hub_or_product'
}

async function main() {
  const creds = loadGoogleCredentials()
  if (!creds) {
    console.error('❌ Falta GOOGLE_SERVICE_ACCOUNT_JSON o GOOGLE_APPLICATION_CREDENTIALS')
    console.error('   Ver SETUP_GSC_ACCESS.md')
    process.exit(1)
  }

  const token = await getGoogleAccessToken(creds, GSC_SCOPES)
  const sites = await gscFetch(token, '/sites')
  const siteEntries = sites?.siteEntry || []
  let site = normalizeSiteUrl(SITE_RAW)
  const matched = siteEntries.find((s) => String(s.siteUrl || '').includes('bodasesor'))
  if (matched?.siteUrl) site = matched.siteUrl
  const siteEnc = encodeURIComponent(site)

  console.log(`GSC traffic loss — site=${site}`)
  console.log(`Before: ${BEFORE.start} → ${BEFORE.end}`)
  console.log(`After:  ${AFTER.start} → ${AFTER.end}`)

  const [beforeMap, afterMap] = await Promise.all([
    queryPages(token, siteEnc, BEFORE),
    queryPages(token, siteEnc, AFTER),
  ])

  const keys = new Set([...beforeMap.keys(), ...afterMap.keys()])
  const redirectMap = await loadRedirectMapAsync()
  const rows = []

  for (const key of keys) {
    const b = beforeMap.get(key)
    const a = afterMap.get(key)
    const clicksBefore = b?.clicks || 0
    const clicksAfter = a?.clicks || 0
    const impBefore = b?.impressions || 0
    const impAfter = a?.impressions || 0
    const clickDelta = clicksAfter - clicksBefore
    const impDelta = impAfter - impBefore
    if (clicksBefore < 2 && impBefore < 200) continue
    rows.push({
      path: key,
      page: a?.page || b?.page,
      clicksBefore,
      clicksAfter,
      clickDelta,
      impressionsBefore: impBefore,
      impressionsAfter: impAfter,
      impressionDelta: impDelta,
      positionBefore: b?.position ?? null,
      positionAfter: a?.position ?? null,
      kind: classify(key),
      redirectTo: redirectMap?.[key] || redirectMap?.[`${key}/`] || null,
      vanished: clicksBefore >= 3 && clicksAfter === 0,
    })
  }

  rows.sort((x, y) => x.clickDelta - y.clickDelta)
  const topLoss = rows.slice(0, 50)
  const byKind = {}
  for (const r of topLoss) {
    byKind[r.kind] = (byKind[r.kind] || 0) + 1
  }

  const totals = {
    clicksBefore: [...beforeMap.values()].reduce((s, r) => s + r.clicks, 0),
    clicksAfter: [...afterMap.values()].reduce((s, r) => s + r.clicks, 0),
    impressionsBefore: [...beforeMap.values()].reduce((s, r) => s + r.impressions, 0),
    impressionsAfter: [...afterMap.values()].reduce((s, r) => s + r.impressions, 0),
  }

  await mkdir(OUT_DIR, { recursive: true })
  const out = {
    auditedAt: new Date().toISOString(),
    site,
    before: BEFORE,
    after: AFTER,
    totals,
    topLossByClicks: topLoss,
    kindBreakdownTop50: byKind,
    vanishedWithPriorClicks: rows.filter((r) => r.vanished).slice(0, 40),
  }
  const outPath = join(OUT_DIR, 'traffic-loss-top50.json')
  await writeFile(outPath, JSON.stringify(out, null, 2))

  console.log('\nTotals:')
  console.log(
    `  clicks ${totals.clicksBefore.toFixed(0)} → ${totals.clicksAfter.toFixed(0)} (${(
      totals.clicksAfter - totals.clicksBefore
    ).toFixed(0)})`,
  )
  console.log(
    `  impressions ${totals.impressionsBefore.toFixed(0)} → ${totals.impressionsAfter.toFixed(0)} (${(
      totals.impressionsAfter - totals.impressionsBefore
    ).toFixed(0)})`,
  )
  console.log('\nTop 15 click losses:')
  for (const r of topLoss.slice(0, 15)) {
    console.log(
      `  ${r.clickDelta.toFixed(0).padStart(5)} clk | ${r.impressionDelta.toFixed(0).padStart(7)} imp | ${r.kind.padEnd(18)} | ${r.path}`,
    )
  }
  console.log(`\n✓ ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
