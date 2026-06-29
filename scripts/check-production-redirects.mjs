#!/usr/bin/env node
/**
 * Smoke-test production legacy redirects (curl).
 * Usage: node scripts/check-production-redirects.mjs
 */
const SAMPLES = [
  { url: 'https://bodasesor.com/products/tarima-madera', expectStatus: 301 },
  { url: 'https://bodasesor.com/collections/xv-anos-cdmx', expectStatus: 301 },
  { url: 'https://bodasesor.com/blogs/noticias/votos-matrimoniales-2024', expectStatus: 301 },
]

let failed = 0

for (const { url, expectStatus } of SAMPLES) {
  const res = await fetch(url, { redirect: 'manual' })
  const ok = res.status === expectStatus
  const loc = res.headers.get('location') || ''
  console.log(`${ok ? '✓' : '✗'} ${url} → ${res.status} ${loc}`)
  if (!ok) failed++
}

const mapRes = await fetch('https://bodasesor.com/redirects-map.json')
const ct = mapRes.headers.get('content-type') || ''
const mapOk = mapRes.ok && ct.includes('json')
console.log(`${mapOk ? '✓' : '✗'} redirects-map.json → ${mapRes.status} ${ct}`)
if (!mapOk) failed++

if (failed) {
  console.error(`\n${failed} production redirect check(s) failed.`)
  console.error('Likely causes: Nexus manual deploy, netlify.toml [[redirects]] /*, or failed Netlify build.')
  process.exit(1)
}

console.log('\n✓ Production redirects OK')
