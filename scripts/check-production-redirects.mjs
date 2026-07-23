#!/usr/bin/env node
/**
 * Smoke-test production legacy redirects (curl).
 * Usage: node scripts/check-production-redirects.mjs
 */
const SAMPLES = [
  { url: 'https://bodasesor.com/products/tarima-madera', expectStatus: 301 },
  { url: 'https://bodasesor.com/collections/xv-anos-cdmx', expectStatus: 301 },
  { url: 'https://bodasesor.com/blogs/noticias/votos-matrimoniales-2024', expectStatus: 301 },
  { url: 'https://bodasesor.com/bodasciudad-de-mexico', expectStatus: 301, expectLocationIncludes: '/bodas/ciudad-de-mexico' },
  { url: 'https://bodasesor.com/carpasmorelia', expectStatus: 301, expectLocationIncludes: '/carpas/morelia' },
  { url: 'https://bodasesor.com/banquetes/2-tiemposmorelia', expectStatus: 301, expectLocationIncludes: '/banquetes/2-tiempos/morelia' },
  { url: 'https://bodasesor.com/desayunospuerto-vallarta', expectStatus: 301, expectLocationIncludes: '/desayunos/puerto-vallarta' },
]

let failed = 0

for (const { url, expectStatus, expectLocationIncludes } of SAMPLES) {
  const res = await fetch(url, {
    redirect: 'manual',
    headers: {
      'user-agent':
        'Mozilla/5.0 (compatible; BodasesorRedirectCheck/1.0; +https://bodasesor.com)',
    },
  })
  const loc = res.headers.get('location') || ''
  let ok = res.status === expectStatus
  if (ok && expectLocationIncludes) {
    ok = loc.includes(expectLocationIncludes)
  }
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
