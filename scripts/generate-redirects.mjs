/**
 * Generate legacy redirect map from Google Sheet "Paginas Bodasesor"
 *
 * Usage: node scripts/generate-redirects.mjs
 * Env:   SITE_BASE (default: https://bodasesor.com)
 */
import fs from 'fs'
import path from 'path'
import { resolveLegacyPath, getCatalogForClient } from './redirect-resolver.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const SHEET_ID = '1IkE_zX3tjkGJuDAMzF09swEWuHSaE1wXY2SqOHNNvpk'
const SHEET_GID = '1705506615'
const LOCAL_CSV = path.join(import.meta.dirname, 'paginas-bodasesor.csv')
const OUT = path.join(ROOT, 'public/redirects-map.json')
const CLIENT_CATALOG_OUT = path.join(ROOT, 'src/data/legacy-catalog-hrefs.json')
const REDIRECTS_FILE = path.join(ROOT, 'public/_redirects')
const UPDATED_CSV = path.join(import.meta.dirname, 'paginas-bodasesor-actualizado.csv')

const SITE_BASE = (process.env.SITE_BASE || 'https://bodasesor.com').replace(/\/$/, '')

/**
 * High-priority redirects from GSC relevance audit (dead / wrong destinations).
 * Written at the TOP of _redirects so they win over generated map rules.
 */
const GSC_FORCE_REDIRECTS = [
  ['/silla-ghost', '/sillas/ghost'],
  ['/silla-crossback', '/sillas/crossback'],
  ['/silla-basket', '/sillas/basket'],
  ['/silla-tolix', '/sillas/tolix'],
  ['/silla-tiffany', '/sillas/tiffany'],
  ['/silla-camila', '/sillas/camila'],
  ['/silla-antonella', '/sillas/antonella'],
  ['/silla-tiffany-infantil', '/sillas/tiffany-infantil'],
  ['/periqueras', '/salas-periqueras'],
  ['/sillas', '/mesas-sillas'],
  ['/mesas', '/mesas-sillas'],
  ['/products/catering-para-filmaciones-cdmx', '/banquetes-catering/ciudad-de-mexico'],
  ['/collections/ensaladas-cdmx', '/banquetes-catering/ciudad-de-mexico'],
  ['/collections/inflables-pachuca', '/inflables/pachuca'],
  ['/collections/precio-de-mobiliario-moderno-cdmx', '/mesas-sillas/ciudad-de-mexico'],
  ['/collections/mesas-de-proyeccion-cdmx-1', '/mesas-sillas/ciudad-de-mexico'],
  ['/collections/mesas-de-proyeccion-cdmx', '/mesas-sillas/ciudad-de-mexico'],
  ['/products/el-gran-mobiliario-sillas-y-mesas-cdmx', '/mesas-sillas/ciudad-de-mexico'],
  ['/collections/arcos-florales-para-ceremonias-cdmx', '/floreria/ciudad-de-mexico'],
  ['/collections/flores-frescas-cdmx', '/floreria/ciudad-de-mexico'],
  ['/collections/precio-de-decoracion-tematica-cdmx', '/floreria/ciudad-de-mexico'],
  ['/collections/video-de-bodas-cdmx', '/fotografia/ciudad-de-mexico'],
  ['/collections/bancos-vintage-elegantes-para-eventos-en-cdmx', '/mesas-sillas/ciudad-de-mexico'],
  ['/collections/bancos-de-bar-para-eventos-en-cdmx', '/mesas-sillas/ciudad-de-mexico'],
  ['/collections/coordinacion-de-eventos-cdmx', '/wedding-planner/ciudad-de-mexico'],
  ['/collections/logistica-de-eventos-en-cdmx', '/wedding-planner/ciudad-de-mexico'],
  ['/collections/event-host-cdmx', '/wedding-planner/ciudad-de-mexico'],
  ['/collections/bautizos-cdmx', '/banquetes-catering/ciudad-de-mexico'],
  ['/collections/mole-cdmx', '/banquetes-catering/ciudad-de-mexico'],
  ['/collections/arreglos-para-aniversarios-cdmx', '/floreria/ciudad-de-mexico'],
  ['/silla-tiffany/ciudad-de-mexico', '/sillas/tiffany/ciudad-de-mexico'],
  ['/silla-antonellaciudad-de-mexico', '/sillas/antonella/ciudad-de-mexico'],
  ['/sillascuernavaca', '/mesas-sillas/cuernavaca'],
  // Remainder: dead blogs, search dumps, home dump, weak topic hubs
  ['/blogs/noticias/banquete-de-boda-2024', '/blog/banquetes-para-bodas-de-lujo'],
  ['/blog/banquete-de-boda-2024', '/blog/banquetes-para-bodas-de-lujo'],
  ['/blogs/noticias/arreglos-florales-2024', '/blog/arreglos-florales-en-un-evento-2024'],
  ['/blog/arreglos-florales-2024', '/blog/arreglos-florales-en-un-evento-2024'],
  ['/blogs/noticias/mi-bautizo-2024', '/blog/lugares-para-un-bautizo-2024'],
  ['/blog/mi-bautizo-2024', '/blog/lugares-para-un-bautizo-2024'],
  ['/blogs/noticias/pre-boda-2024', '/blog/banquetes-para-bodas-de-lujo'],
  ['/blog/pre-boda-2024', '/blog/banquetes-para-bodas-de-lujo'],
  ['/blogs/noticias/eventos-en-espacios-pequenos-2024', '/espacios-eventos'],
  ['/blog/eventos-en-espacios-pequenos-2024', '/espacios-eventos'],
  ['/blogs/noticias/fomentar-la-inclusion-y-la-diversidad-2024', '/blog'],
  ['/blog/fomentar-la-inclusion-y-la-diversidad-2024', '/blog'],
  ['/products/cotiza-tu-evento', '/banquetes-catering'],
  ['/products/cisidat', '/banquetes-catering'],
  ['/products/cabo-cakery', '/reposteria'],
  ['/collections/margarita-cdmx', '/barras-de-bebidas/ciudad-de-mexico'],
  ['/collections/brindis-de-boda-cdmx', '/barras-de-bebidas/ciudad-de-mexico'],
  ['/collections/presupuesto-para-bodas-economicas-cdmx', '/wedding-planner/ciudad-de-mexico'],
  ['/collections/proveedores-de-souvenirs-para-bodas-cdmx', '/wedding-planner/ciudad-de-mexico'],
  ['/collections/proveedores-de-recuerdos-para-bodas-cdmx', '/wedding-planner/ciudad-de-mexico'],
  ['/sillas/silla-gamma', '/sillas/gamma'],
  ['/sillas/silla-gamma/acapulco', '/sillas/gamma/acapulco'],
  ['/b', '/'],
]

function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        field += ch
      }
      continue
    }

    if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      row.push(field)
      field = ''
    } else if (ch === '\n' || (ch === '\r' && next === '\n')) {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
      if (ch === '\r') i++
    } else if (ch !== '\r') {
      field += ch
    }
  }

  if (field.length || row.length) {
    row.push(field)
    rows.push(row)
  }

  const [header, ...data] = rows
  return data.map((cells) => Object.fromEntries(header.map((h, idx) => [h, cells[idx] ?? ''])))
}

function normalizePath(url) {
  try {
    const parsed = new URL(url)
    let pathname = decodeURIComponent(parsed.pathname).replace(/\/+$/, '') || '/'
    const search = parsed.search || ''
    return `${pathname}${search}`
  } catch {
    return url
  }
}

function addEntry(map, fromPath, to, stats) {
  if (!fromPath || !to) return
  map[fromPath] = to
  stats.count++

  if (!fromPath.endsWith('/') && !fromPath.includes('?')) {
    map[`${fromPath}/`] = to
    stats.count++
  }
}

function toRedirectDest(to) {
  if (to.startsWith(SITE_BASE)) return to.slice(SITE_BASE.length) || '/'
  if (to.startsWith('http://') || to.startsWith('https://')) return to
  return to.startsWith('/') ? to : `/${to}`
}

function buildRedirectsFile(map) {
  const lines = [
    '# Auto-generated — npm run generate:redirects',
    `# ${Object.keys(map).length} rules + fallback`,
    '',
    '# GSC relevance overrides (must stay above map rules)',
  ]
  for (const [from, to] of GSC_FORCE_REDIRECTS) {
    lines.push(`${from}  ${to}  301`)
    if (!from.endsWith('/') && !from.includes('?')) lines.push(`${from}/  ${to}  301`)
  }
  lines.push('')

  const forceFrom = new Set(
    GSC_FORCE_REDIRECTS.flatMap(([from]) =>
      !from.endsWith('/') && !from.includes('?') ? [from, `${from}/`] : [from],
    ),
  )

  const entries = Object.entries(map)
    .filter(([from]) => !from.includes(':') && !forceFrom.has(from))
    .sort(([a], [b]) => a.localeCompare(b))

  for (const [from, to] of entries) {
    lines.push(`${from}  ${toRedirectDest(to)}  301`)
  }

  lines.push('')
  // Do NOT force /banquete-kosher|/banquete-mexicano → /index.html 200!
  // That served the HOME shell (soft-404 for crawlers). Hubs use prerendered
  // dist/{hub}/index.html (correct title/canonical); neverCopyPrefixes still
  // blocks Nexus HTML from shadowing ServicePage.
  lines.push(`# Banquet menu subpages — always SPA (Nexus has parent HTML but not menu subdirs)`)
  lines.push(`/banquetes/:menu  /index.html  200`)
  lines.push(`/banquete-kosher/:menu  /index.html  200`)
  lines.push(`/banquete-mexicano/:menu  /index.html  200`)
  lines.push(`/banquete-navideno/:menu  /index.html  200`)
  lines.push('')
  lines.push(`# Fallback for unknown legacy pages`)
  lines.push(`/pages/:slug  /  301!`)
  lines.push('')
  lines.push(`# Fallback for unknown legacy collections`)
  lines.push(`/collections/:slug  /banquetes-catering  301!`)
  lines.push('')
  lines.push(`# Fallback for unknown legacy products`)
  lines.push(`/products/:slug  /banquetes-catering  301!`)
  lines.push('')
  lines.push(`# Blog posts not listed in the CSV map`)
  lines.push(`/blogs/noticias/*  /blog/:splat  301`)
  lines.push(`/blogs/*  /blog  301`)
  lines.push('')
  lines.push(`# Unknown URLs → real 404 (no soft-404 home). Known SPA/Nexus/blog paths are static files or explicit 200 rewrites above.`)
  lines.push(`/*  /404.html  404`)

  return `${lines.join('\n')}\n`
}

function csvEscape(value) {
  const text = String(value ?? '')
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`
  return text
}

async function loadCsv() {
  if (process.env.REDIRECTS_REFRESH_SHEET !== '1' && fs.existsSync(LOCAL_CSV)) {
    console.log(`Using cached ${LOCAL_CSV} (set REDIRECTS_REFRESH_SHEET=1 to refresh from Google Sheet)`)
    return fs.readFileSync(LOCAL_CSV, 'utf8')
  }
  return downloadSheet()
}

async function downloadSheet() {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.text()
    } catch (err) {
      if (attempt === 3 && fs.existsSync(LOCAL_CSV)) {
        console.warn(`Sheet download failed (${err.message}), using cached ${LOCAL_CSV}`)
        return fs.readFileSync(LOCAL_CSV, 'utf8')
      }
      if (attempt === 3) throw err
      await new Promise((r) => setTimeout(r, attempt * 1000))
    }
  }

  throw new Error('Unable to load redirect sheet')
}

const stats = { count: 0, products: 0, collections: 0, blogs: 0, pages: 0, skipped: 0 }
const map = {}
const updatedRows = []

const csv = await loadCsv()
const rows = parseCsv(csv)

for (const row of rows) {
  const original = row['URL Original (bodasesor.com)']
  if (!original) continue

  const fromPath = normalizePath(original)
  const resolved = resolveLegacyPath(fromPath)

  if (!resolved) {
    stats.skipped++
    continue
  }

  const dest = resolved.startsWith('http') ? resolved : `${SITE_BASE}${resolved}`
  let note = ''

  if (fromPath.startsWith('/products/')) {
    stats.products++
    note = '(producto → página válida)'
  } else if (fromPath.startsWith('/collections/')) {
    stats.collections++
    note = '(collection → página válida)'
  } else if (fromPath.startsWith('/blogs/')) {
    stats.blogs++
    note = '(blog → bodasesor.com)'
  } else if (fromPath.startsWith('/pages/')) {
    stats.pages++
    note = '(página → bodasesor.com)'
  }

  updatedRows.push({ original, dest, note })
  addEntry(map, fromPath, dest, stats)
}

map['/products/:slug'] = `${SITE_BASE}/banquetes-catering`
map['/pages/:slug'] = `${SITE_BASE}/`
map['/collections/:slug'] = `${SITE_BASE}/banquetes-catering`
stats.count += 3

for (const [from, to] of GSC_FORCE_REDIRECTS) {
  addEntry(map, from, `${SITE_BASE}${to}`, stats)
}

const output = {
  generatedAt: new Date().toISOString(),
  siteBase: SITE_BASE,
  totalRules: Object.keys(map).length,
  entries: map,
}

fs.writeFileSync(OUT, JSON.stringify(output, null, 0))
fs.writeFileSync(CLIENT_CATALOG_OUT, JSON.stringify(getCatalogForClient(), null, 0))

const redirectsContent = buildRedirectsFile(map)
fs.writeFileSync(REDIRECTS_FILE, redirectsContent)
console.log(`  _redirects rules: ${redirectsContent.split('\n').filter((l) => l && !l.startsWith('#')).length}`)

const updatedCsvLines = [
  'URL Original (bodasesor.com),URL Nueva (destino),Ciudad detectada',
  ...updatedRows.map((r) =>
    [csvEscape(r.original), csvEscape(r.dest), csvEscape(r.note)].join(','),
  ),
]
fs.writeFileSync(UPDATED_CSV, `${updatedCsvLines.join('\n')}\n`)

console.log('Generated redirects:')
console.log(`  Site base: ${SITE_BASE}`)
console.log(`  Products: ${stats.products}`)
console.log(`  Collections: ${stats.collections}`)
console.log(`  Blogs: ${stats.blogs}`)
console.log(`  Pages: ${stats.pages}`)
console.log(`  Skipped: ${stats.skipped}`)
console.log(`  Total map entries: ${Object.keys(map).length}`)
console.log('Samples:')
for (const sample of [
  '/products/tarima-vinil',
  '/products/tarima-pintada-a-mano',
  '/collections/xv-anos-cdmx',
  '/collections/wedding-planner-cuernavaca',
  '/blogs/noticias/votos-matrimoniales-2024',
]) {
  console.log(`  ${sample} → ${map[sample]}`)
}
console.log(`  Output: ${OUT}`)
console.log(`  Updated sheet CSV: ${UPDATED_CSV}`)
