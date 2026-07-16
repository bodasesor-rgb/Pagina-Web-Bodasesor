#!/usr/bin/env node
/**
 * Generate public/sitemap.xml from canonical SPA routes + redirect destinations.
 * Usage: node scripts/generate-sitemap.mjs
 */
import fs from 'fs'
import path from 'path'
import { collectSpaSeoPaths } from './collect-spa-seo-entries.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const SITE_BASE = (process.env.SITE_BASE || 'https://bodasesor.com').replace(/\/$/, '')
const OUT = path.join(ROOT, 'public/sitemap.xml')

const STANDALONE = [
  '/banquetes-catering', '/barras-de-bebidas', '/mesas-personalizadas',
  '/combinaciones-mesas-sillas', '/vajillas', '/colgantes', '/barras', '/entelados',
  '/floreria', '/shows', '/pistas-tarimas', '/salas-periqueras', '/reposteria',
  '/wedding-planner', '/musica', '/fotografia', '/alimentos-empresas',
  '/espacios-eventos', '/carpas', '/audio-iluminacion-video', '/galeria',
  '/catalogos',
  '/quienes-somos', '/blog', '/buscar',
]

const EVENT_TYPES = [
  '/bodas', '/xv-anos', '/corporativos', '/graduaciones', '/baby-shower',
  '/cumpleanos', '/primera-comunion', '/cenas', '/inflables', '/mesas-sillas',
]

const CITIES = [
  'ciudad-de-mexico', 'estado-de-mexico', 'aguascalientes', 'acapulco', 'cancun',
  'cozumel', 'cuernavaca', 'guadalajara', 'leon', 'los-cabos', 'merida',
  'monterrey', 'morelia', 'oaxaca', 'pachuca', 'puebla', 'puerto-vallarta',
  'queretaro', 'san-luis-potosi', 'san-miguel-allende', 'tijuana', 'toluca',
  'torreon', 'valle-de-bravo', 'veracruz',
]

const PRIORITY_KEY = [
  ['/', '1.0'],
  ['/banquetes-catering', '0.9'],
  ['/bodas', '0.9'],
  ['/xv-anos', '0.9'],
  ['/wedding-planner', '0.85'],
]

function priorityFor(path) {
  for (const [prefix, p] of PRIORITY_KEY) {
    if (path === prefix) return p
  }
  if (STANDALONE.includes(path) || EVENT_TYPES.includes(path)) return '0.8'
  if (CITIES.some((c) => path === `/${c}`)) return '0.75'
  if (path.split('/').filter(Boolean).length >= 2) return '0.7'
  return '0.65'
}

function collectPaths() {
  const paths = new Set(['/'])

  for (const p of [...STANDALONE, ...EVENT_TYPES]) paths.add(p)
  for (const city of CITIES) paths.add(`/${city}`)

  const priorityServices = ['bodas', 'xv-anos', 'banquetes-catering', 'wedding-planner', 'mesas-sillas']
  for (const city of CITIES) {
    paths.add(`/${city}`)
    for (const svc of priorityServices) {
      paths.add(`/${svc}/${city}`)
    }
  }

  const mapPath = path.join(ROOT, 'public/redirects-map.json')
  if (fs.existsSync(mapPath)) {
    const entries = JSON.parse(fs.readFileSync(mapPath, 'utf8')).entries ?? {}
    for (const dest of Object.values(entries)) {
      if (typeof dest !== 'string') continue
      let pathname = dest
      if (dest.startsWith(SITE_BASE)) pathname = dest.slice(SITE_BASE.length)
      if (!pathname.startsWith('/') || pathname.includes('/blog/')) continue
      if (pathname.startsWith('/products/') || pathname.startsWith('/collections/')) continue
      paths.add(pathname.replace(/\/+$/, '') || '/')
    }
  }

  // All SPA product/detail + hub URLs (same inventory as prerender shells)
  for (const p of collectSpaSeoPaths()) paths.add(p)

  return [...paths].sort()
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const paths = collectPaths()
const today = new Date().toISOString().slice(0, 10)

const body = paths.map((p) => {
  const loc = `${SITE_BASE}${p === '/' ? '' : p}`
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priorityFor(p)}</priority>
  </url>`
}).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

fs.writeFileSync(OUT, xml)
console.log(`✓ sitemap.xml: ${paths.length} URLs → ${OUT}`)
