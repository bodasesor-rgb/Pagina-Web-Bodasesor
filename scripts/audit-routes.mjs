#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

// Load products slug set via regex (avoid full bundle)
const productsSrc = readFileSync(join(__dirname, '../src/data/products.js'), 'utf8')
const productSlugs = new Set([...productsSrc.matchAll(/\bslug:\s*["']([^"']+)["']/g)].map((m) => m[1]))

const { CITY_MAP } = await import('../src/data/city-data.js')

const CITY_SLUGS = Object.keys(CITY_MAP).sort((a, b) => b.length - a.length)

function stripCityFromSegment(segment) {
  if (!segment) return { base: segment, citySlug: null }
  for (const citySlug of CITY_SLUGS) {
    if (segment.endsWith(citySlug) && segment.length > citySlug.length) {
      return { base: segment.slice(0, -citySlug.length), citySlug }
    }
    if (segment.endsWith(`-en-${citySlug}`) && segment.length > citySlug.length + 4) {
      return { base: segment.slice(0, -(citySlug.length + 4)), citySlug }
    }
  }
  return { base: segment, citySlug: null }
}

function parseCityFromPath(path) {
  const normalized = path.replace(/\/+$/, '') || '/'
  const segments = normalized.split('/').filter(Boolean)
  if (segments.length === 0) return { basePath: '/' }
  if (segments.length === 1 && CITY_MAP[segments[0]]) return { basePath: '/' }
  const lastSeg = segments[segments.length - 1]
  if (segments.length >= 2 && CITY_MAP[lastSeg]) {
    const baseSegments = segments.slice(0, -1)
    return { basePath: baseSegments.length ? `/${baseSegments.join('/')}` : '/' }
  }
  const { base, citySlug } = stripCityFromSegment(lastSeg)
  if (citySlug) {
    const baseSegments = [...segments.slice(0, -1), base].filter(Boolean)
    return { basePath: baseSegments.length ? `/${baseSegments.join('/')}` : '/' }
  }
  return { basePath: normalized }
}

const STANDALONE = new Set([
  '/banquetes-catering', '/barras-de-bebidas', '/mesas-personalizadas',
  '/combinaciones-mesas-sillas', '/vajillas', '/colgantes', '/entelados',
  '/floreria', '/shows', '/pistas-tarimas', '/salas-periqueras', '/reposteria',
  '/wedding-planner', '/musica', '/fotografia', '/alimentos-empresas',
  '/espacios-eventos', '/carpas', '/audio-iluminacion-video', '/galeria',
  '/quienes-somos', '/blog', '/buscar',
])

const DETAIL_PREFIXES = [
  '/pistas-tarimas', '/vajillas', '/colgantes', '/entelados', '/floreria',
  '/shows', '/reposteria', '/wedding-planner', '/musica', '/fotografia',
  '/alimentos-empresas', '/espacios-eventos', '/carpas', '/audio-iluminacion-video',
  '/combinaciones', '/salas', '/periqueras', '/reposteria',
]

function resolveRoute(basePath) {
  if (basePath === '/') return { ok: true, handler: 'Home' }
  if (STANDALONE.has(basePath)) return { ok: true, handler: 'Standalone' }
  for (const p of DETAIL_PREFIXES) {
    if (basePath.startsWith(`${p}/`)) {
      return { ok: true, handler: 'Detail', prefix: p, slug: basePath.slice(p.length + 1) }
    }
  }
  if (/^\/(banquetes|banquete-)/.test(basePath)) return { ok: true, handler: 'BanqueteMenu' }
  if (/^\/blog\//.test(basePath)) return { ok: true, handler: 'Blog' }

  const segs = basePath.split('/').filter(Boolean)
  if (segs.length === 1) {
    if (productSlugs.has(segs[0])) return { ok: true, handler: 'ServicePage' }
    return { ok: false, handler: 'ServicePage-miss', slug: segs[0] }
  }
  if (segs.length === 2) {
    const parent = `/${segs[0]}`
    if (STANDALONE.has(parent)) return { ok: true, handler: 'Standalone' }
    if (DETAIL_PREFIXES.includes(parent)) return { ok: true, handler: 'Detail', slug: segs[1] }
    // Current TwoSegmentCatchAll bug: only parent → ServicePage
    if (productSlugs.has(segs[0])) {
      return { ok: false, handler: 'TwoSegmentCatchAll-bug', parent: segs[0], lost: segs[1] }
    }
    return { ok: false, handler: 'TwoSegment-unknown', path: basePath }
  }
  return { ok: false, handler: 'MultiSegment', path: basePath }
}

const lines = readFileSync(join(__dirname, '../public/_redirects'), 'utf8').split('\n')
const targets = [...new Set(
  lines
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => l.split(/\s+/)[1])
    .filter((t) => t?.startsWith('/')),
)]

const problems = []
for (const t of targets) {
  const { basePath } = parseCityFromPath(t)
  const r = resolveRoute(basePath)
  if (!r.ok) problems.push({ target: t, basePath, ...r })
}

console.log(`Targets: ${targets.length}, Problems: ${problems.length}`)
const byHandler = {}
for (const p of problems) byHandler[p.handler] = (byHandler[p.handler] || 0) + 1
console.log('By handler:', byHandler)
console.log('\nSamples:')
problems.slice(0, 30).forEach((p) => console.log(p))
