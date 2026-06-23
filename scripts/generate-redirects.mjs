/**
 * Generate legacy redirect map from Google Sheet "Paginas Bodasesor"
 *
 * Usage: node scripts/generate-redirects.mjs
 * Env:   SITE_BASE (default: https://bodasesor.com)
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const SHEET_ID = '1IkE_zX3tjkGJuDAMzF09swEWuHSaE1wXY2SqOHNNvpk'
const SHEET_GID = '1705506615'
const LOCAL_CSV = path.join(import.meta.dirname, 'paginas-bodasesor.csv')
const OUT = path.join(ROOT, 'public/redirects-map.json')
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

function extractPathOnly(destUrl) {
  if (!destUrl?.trim()) return null
  if (destUrl.startsWith('http://') || destUrl.startsWith('https://')) {
    return new URL(destUrl).pathname.replace(/\/+$/, '') || '/'
  }
  return destUrl.startsWith('/') ? destUrl.replace(/\/+$/, '') || '/' : `/${destUrl}`
}

function blogSlug(fromPath) {
  const match = fromPath.match(/^\/blogs\/noticias\/([^/?#]+)/)
  if (!match) return null
  let slug = decodeURIComponent(match[1])
  slug = slug
    .replace(/®️/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  if (slug.includes('estrategias-y-consejos')) {
    slug = 'estrategias-y-consejos-para-recaudar-fondos-para-causas-importantes-bodasesor-2024'
  }
  return slug
}

function blogDestination(fromPath) {
  const slug = blogSlug(fromPath)
  if (slug) return `${SITE_BASE}/blog/${slug}`
  return `${SITE_BASE}/blog`
}

function pageDestination(fromPath) {
  if (fromPath.startsWith('/pages/quienes-somos')) return `${SITE_BASE}/quienes-somos`
  if (fromPath.startsWith('/pages/contact')) return `${SITE_BASE}/`
  return null
}

/** All redirects go to bodasesor.com — never to resonant/SEO site */
function destinationForRow(fromPath, sheetDest) {
  const page = pageDestination(fromPath)
  if (page) return page

  if (fromPath.startsWith('/blogs/')) {
    return blogDestination(fromPath)
  }

  if (fromPath.startsWith('/products/')) {
    const slug = fromPath.replace(/^\/products\//, '').split('?')[0]
    return `${SITE_BASE}/${slug}`
  }

  if (fromPath.startsWith('/collections/')) {
    const mapped = extractPathOnly(sheetDest)
    if (mapped && mapped !== '/') {
      const clean = mapped.replace(/^\/eventos\//, '/')
      return `${SITE_BASE}${clean}`
    }
    const slug = fromPath.replace(/^\/collections\//, '').split('?')[0]
    return `${SITE_BASE}/${slug}`
  }

  const mapped = extractPathOnly(sheetDest)
  if (mapped && mapped !== '/') {
    const clean = mapped.replace(/^\/eventos\//, '/')
    return `${SITE_BASE}${clean}`
  }

  return null
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
      const text = await res.text()
      return text
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
  const dest = destinationForRow(fromPath, row['URL Nueva (destino)'])
  let note = row['Ciudad detectada'] || ''

  if (!dest) {
    stats.skipped++
    continue
  }

  if (fromPath.startsWith('/products/')) {
    stats.products++
    note = '(producto → bodasesor.com)'
  } else if (fromPath.startsWith('/collections/')) {
    stats.collections++
    note = note || '(collection → bodasesor.com)'
  } else if (fromPath.startsWith('/blogs/')) {
    stats.blogs++
    note = note || '(blog → bodasesor.com)'
  } else if (fromPath.startsWith('/pages/')) {
    stats.pages++
    note = note || '(página → bodasesor.com)'
  }

  updatedRows.push({ original, dest, note })
  addEntry(map, fromPath, dest, stats)
}

// Fallback for products not in the sheet
map['/products/:slug'] = `${SITE_BASE}/:slug`
stats.count++

const output = {
  generatedAt: new Date().toISOString(),
  siteBase: SITE_BASE,
  totalRules: Object.keys(map).length,
  entries: map,
}

fs.writeFileSync(OUT, JSON.stringify(output, null, 0))

const redirectsTxt = `# Legacy Shopify redirects — all go to bodasesor.com
/products/:slug  ${SITE_BASE}/:slug  301!
`

fs.writeFileSync(REDIRECTS_FILE, redirectsTxt)

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
console.log(`  Output: ${OUT}`)
console.log(`  Updated sheet CSV: ${UPDATED_CSV}`)
