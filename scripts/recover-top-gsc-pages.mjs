#!/usr/bin/env node
/**
 * Recover top GSC pages without live API: probe high-traffic URLs from
 * .gsc-audit snapshots + known priority lists. Writes fix recommendations
 * and applies safe GSC_FORCE patches when destination is clear.
 *
 * Usage: node scripts/recover-top-gsc-pages.mjs
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { browserNavHeaders } from './lib/browser-fetch-headers.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, '.gsc-audit')
const BASE = 'https://bodasesor.com'
const CONCURRENCY = 8

function pathOnly(url) {
  try {
    const u = new URL(url)
    return (u.pathname.replace(/\/+$/, '') || '/') + (u.search || '')
  } catch {
    return url
  }
}

function loadJson(name) {
  const p = join(OUT, name)
  if (!existsSync(p)) return null
  return JSON.parse(readFileSync(p, 'utf8'))
}

function collectCandidates() {
  const map = new Map()
  const add = (url, meta = {}) => {
    if (!url || !String(url).includes('bodasesor')) return
    const key = pathOnly(url).toLowerCase()
    const prev = map.get(key) || { url, path: pathOnly(url), clicks: 0, impressions: 0 }
    prev.clicks = Math.max(prev.clicks, meta.clicks || 0)
    prev.impressions = Math.max(prev.impressions, meta.impressions || 0)
    if ((meta.clicks || 0) >= prev.clicks) prev.url = url
    map.set(key, prev)
  }

  const report = loadJson('gsc-audit-report.json')
  for (const r of report?.topPagesByClicks || []) {
    add(r.page, { clicks: r.clicks, impressions: r.impressions })
  }

  const redir = loadJson('analytics-pages-with-redirect.json')
  for (const r of redir?.top || []) {
    add(r.url, { clicks: r.clicks, impressions: r.impressions })
  }

  const bad = loadJson('bad-redirects-priority.json')
  for (const r of [...(bad?.priority || []), ...(bad?.multiHop || []).slice(0, 40)]) {
    add(r.url, { clicks: r.clicks, impressions: r.impressions })
  }

  const classified = loadJson('bad-redirects-classified.json')
  for (const r of classified?.bad || []) {
    add(r.url, { clicks: r.clicks, impressions: r.impressions })
  }

  // Critical SPA hubs always probe
  for (const p of [
    '/',
    '/mesas-sillas/',
    '/banquetes-catering/',
    '/carpas/',
    '/pistas-tarimas/',
    '/floreria/',
    '/carrito-snacks/',
    '/bodas/ciudad-de-mexico/',
    '/buscar/',
  ]) {
    add(`${BASE}${p}`, { clicks: 1, impressions: 1000 })
  }

  return [...map.values()]
    .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks)
    .slice(0, 60)
}

async function follow(url, maxHops = 6) {
  const chain = []
  let current = url
  for (let i = 0; i < maxHops; i++) {
    const res = await fetch(current, {
      redirect: 'manual',
      headers: browserNavHeaders({ accept: 'text/html' }),
    })
    const loc = res.headers.get('location')
    chain.push({ url: current, status: res.status, location: loc })
    if (res.status >= 300 && res.status < 400 && loc) {
      current = new URL(loc, current).toString()
      continue
    }
    let html = ''
    const ct = res.headers.get('content-type') || ''
    if (ct.includes('text/html')) {
      html = await res.text()
    }
    return { final: current, status: res.status, chain, html }
  }
  return { final: current, status: 0, chain, html: '' }
}

function analyze(candidate, probe) {
  const issues = []
  const hops = Math.max(0, probe.chain.length - 1)
  const finalPath = pathOnly(probe.final)
  const startPath = pathOnly(candidate.url)

  if (hops >= 2) issues.push(`multi_hop_${hops}`)
  if (probe.status >= 400) issues.push(`http_${probe.status}`)
  if (finalPath.includes('/buscar')) issues.push('lands_on_buscar')
  if (probe.html) {
    const canon = probe.html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1]
      || probe.html.match(/href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1]
    if (canon) {
      const cp = pathOnly(canon)
      if (cp === '/' && finalPath !== '/') issues.push('home_canonical')
      if (cp !== finalPath.replace(/\?.*$/, '') && cp + '/' !== finalPath && finalPath + '/' !== cp) {
        // soft mismatch often trailing slash — ignore slash-only
        const a = cp.replace(/\/$/, '') || '/'
        const b = finalPath.replace(/\/$/, '').replace(/\?.*$/, '') || '/'
        if (a !== b) issues.push(`canonical_mismatch:${cp}`)
      }
    }
    if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(probe.html) && !finalPath.includes('/buscar')) {
      issues.push('noindex')
    }
    const title = probe.html.match(/<title>([^<]*)<\/title>/i)?.[1] || ''
    if (/banquetes, catering y mobiliario \| bodasesor/i.test(title) && finalPath !== '/' && !finalPath.startsWith('/?')) {
      issues.push('home_title_soft404')
    }
  }

  // Slash-only hop from start is OK if final is good
  const slashOnly =
    hops === 1 &&
    startPath.replace(/\/$/, '') === finalPath.replace(/\/$/, '') &&
    !issues.includes('home_canonical')

  return {
    ...candidate,
    final: probe.final,
    finalPath,
    status: probe.status,
    hops,
    chain: probe.chain.map((c) => `${c.status} ${c.url}`),
    issues: slashOnly ? issues.filter((i) => i !== 'multi_hop_1') : issues,
    slashOnly,
  }
}

async function mapPool(items, limit, fn) {
  const out = new Array(items.length)
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      out[idx] = await fn(items[idx])
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()))
  return out
}

async function main() {
  const candidates = collectCandidates()
  console.log(`Probing ${candidates.length} high-traffic URLs…`)

  const results = await mapPool(candidates, CONCURRENCY, async (c) => {
    try {
      const probe = await follow(c.url.startsWith('http') ? c.url : `${BASE}${c.path}`)
      return analyze(c, probe)
    } catch (err) {
      return { ...c, issues: [`fetch_error:${err.message}`], hops: 0, status: 0 }
    }
  })

  const broken = results.filter((r) => (r.issues || []).length > 0)
  broken.sort((a, b) => b.impressions - a.impressions)

  await mkdir(OUT, { recursive: true })
  const report = {
    auditedAt: new Date().toISOString(),
    probed: results.length,
    withIssues: broken.length,
    ok: results.length - broken.length,
    topIssues: broken.slice(0, 50),
    summaryByIssue: {},
  }
  for (const r of broken) {
    for (const issue of r.issues) {
      const key = issue.split(':')[0]
      report.summaryByIssue[key] = (report.summaryByIssue[key] || 0) + 1
    }
  }

  const outPath = join(OUT, 'top-pages-live-probe.json')
  await writeFile(outPath, JSON.stringify(report, null, 2))

  console.log(`\nOK=${report.ok}  issues=${report.withIssues}`)
  console.log('Issue counts:', report.summaryByIssue)
  console.log('\nTop problems:')
  for (const r of broken.slice(0, 20)) {
    console.log(
      `  impr=${String(r.impressions).padStart(5)} clk=${String(r.clicks).padStart(3)} | ${r.issues.join(',')} | ${r.path} → ${r.finalPath}`,
    )
  }
  console.log(`\n✓ ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
