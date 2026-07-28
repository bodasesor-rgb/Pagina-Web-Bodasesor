#!/usr/bin/env node
/**
 * Unit checks for glued-city → slash canonical paths.
 * Mirrors netlify/edge-functions/city-canonical-redirect.ts + src/utils/city-url.js
 */
import path from 'path'
import { pathToFileURL, fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const cityDataPath = pathToFileURL(path.join(ROOT, 'src/data/city-data.js')).href
const { CITY_MAP } = await import(cityDataPath)

const CITY_SLUGS = Object.keys(CITY_MAP).sort((a, b) => b.length - a.length)

function stripCityFromSegment(segment) {
  if (!segment) return { base: segment, citySlug: null }
  for (const citySlug of CITY_SLUGS) {
    if (segment.endsWith(`-en-${citySlug}`) && segment.length > citySlug.length + 4) {
      return { base: segment.slice(0, -(citySlug.length + 4)), citySlug }
    }
    if (segment.endsWith(`-${citySlug}`) && segment.length > citySlug.length + 1) {
      return { base: segment.slice(0, -(citySlug.length + 1)), citySlug }
    }
    if (segment.endsWith(citySlug) && segment.length > citySlug.length) {
      const base = segment.slice(0, -citySlug.length).replace(/-+$/, '')
      if (base) return { base, citySlug }
    }
  }
  return { base: segment, citySlug: null }
}

function toCanonical(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  const segments = normalized.split('/').filter(Boolean)
  if (!segments.length) return normalized
  const last = segments[segments.length - 1]
  if (CITY_MAP[last]) {
    const canon = CITY_MAP[last].slug
    if (last === canon) return normalized
    const prefix = segments.slice(0, -1)
    return prefix.length ? `/${prefix.join('/')}/${canon}` : `/${canon}`
  }
  const { base, citySlug } = stripCityFromSegment(last)
  if (!citySlug) return normalized
  const canon = CITY_MAP[citySlug].slug
  const prefix = segments.slice(0, -1)
  return `/${[...prefix, base, canon].filter(Boolean).join('/')}`
}

const cases = [
  ['/bodasciudad-de-mexico', '/bodas/ciudad-de-mexico'],
  ['/carpasmorelia', '/carpas/morelia'],
  ['/banquetes/2-tiemposmorelia', '/banquetes/2-tiempos/morelia'],
  ['/banquete-kosherciudad-de-mexico', '/banquete-kosher/ciudad-de-mexico'],
  ['/cupcakes-gourmetciudad-de-mexico', '/cupcakes-gourmet/ciudad-de-mexico'],
  ['/desayunospuerto-vallarta', '/desayunos/puerto-vallarta'],
  ['/bodas/cdmx', '/bodas/ciudad-de-mexico'],
  ['/cdmx', '/ciudad-de-mexico'],
  ['/bodas/ciudad-de-mexico', '/bodas/ciudad-de-mexico'],
  ['/carpas/morelia', '/carpas/morelia'],
  ['/blog', '/blog'],
]

let failed = 0
for (const [from, expect] of cases) {
  const got = toCanonical(from)
  const ok = got === expect
  console.log(`${ok ? '✓' : '✗'} ${from} → ${got}${ok ? '' : ` (expected ${expect})`}`)
  if (!ok) failed++
}

if (failed) {
  console.error(`\n${failed} glued-city check(s) failed`)
  process.exit(1)
}
console.log('\n✓ Glued-city canonicalization OK')
