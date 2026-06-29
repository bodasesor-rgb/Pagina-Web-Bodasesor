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
  ]

  const entries = Object.entries(map)
    .filter(([from]) => !from.includes(':'))
    .sort(([a], [b]) => a.localeCompare(b))

  for (const [from, to] of entries) {
    lines.push(`${from}  ${toRedirectDest(to)}  301`)
  }

  lines.push('')
  lines.push(`# Fallback for unknown legacy products`)
  lines.push(`/products/:slug  /banquetes-catering  301!`)
  lines.push('')
  lines.push(`# SPA fallback — MUST stay last`)
  lines.push(`/*  /index.html  200`)

  return `${lines.join('\n')}\n`
}

function csvEscape(value) {
  const text = String(value ?? '')
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`
  return text
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

const csv = await downloadSheet()
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
stats.count++

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
