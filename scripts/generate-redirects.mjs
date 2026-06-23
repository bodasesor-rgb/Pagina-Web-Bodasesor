/**
 * Generate legacy redirect map from Google Sheet "Paginas Bodasesor"
 *
 * Usage: node scripts/generate-redirects.mjs
 * Env:   SEO_REDIRECT_BASE (default: https://resonant-gingersnap-df3cfa.netlify.app)
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const SHEET_ID = '1IkE_zX3tjkGJuDAMzF09swEWuHSaE1wXY2SqOHNNvpk'
const SHEET_GID = '1705506615'
const LOCAL_CSV = path.join(import.meta.dirname, 'paginas-bodasesor.csv')
const OUT = path.join(ROOT, 'public/redirects-map.json')
const REDIRECTS_FILE = path.join(ROOT, 'public/_redirects')

const SEO_BASE = (process.env.SEO_REDIRECT_BASE || 'https://resonant-gingersnap-df3cfa.netlify.app').replace(/\/$/, '')
const SITE_BASE = (process.env.SITE_BASE || 'https://bodasesor.com').replace(/\/$/, '')
const UPDATED_CSV = path.join(import.meta.dirname, 'paginas-bodasesor-actualizado.csv')

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

function resolveDestination(destUrl, fromPath) {
  const absolute = toAbsoluteUrl(destUrl, fromPath)
  if (!absolute) return null
  // redirects-map stores absolute URLs for external + internal
  return absolute
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
  if (fromPath.startsWith('/blogs/')) return `${SITE_BASE}/blog`
  return `${SITE_BASE}/blog`
}

function pageDestination(fromPath) {
  if (fromPath.startsWith('/pages/quienes-somos')) return `${SITE_BASE}/quienes-somos`
  if (fromPath.startsWith('/pages/contact')) return `${SITE_BASE}/`
  return null
}

function toAbsoluteUrl(dest, fromPath) {
  if (!dest?.trim()) return null

  if (dest.startsWith('http://') || dest.startsWith('https://')) {
    const parsed = new URL(dest)
    if (parsed.hostname.includes('resonant-gingersnap-df3cfa.netlify.app')) {
      return `${SEO_BASE}${parsed.pathname}${parsed.search}`
    }
    return dest
  }

  const pathOnly = dest.startsWith('/') ? dest : `/${dest}`
  if (pathOnly.startsWith('/blog') || pathOnly.startsWith('/quienes-somos') || pathOnly === '/') {
    return `${SITE_BASE}${pathOnly === '/' ? '' : pathOnly}`
  }
  return `${SITE_BASE}${pathOnly}`
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
      fs.writeFileSync(LOCAL_CSV, text)
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
  let dest = resolveDestination(row['URL Nueva (destino)'], fromPath)
  let note = row['Ciudad detectada'] || ''

  if (!dest) {
    if (fromPath.startsWith('/blogs/')) {
      dest = blogDestination(fromPath)
      note = note || '(blog → bodasesor.com)'
      stats.blogs++
    } else if (fromPath.startsWith('/pages/')) {
      dest = pageDestination(fromPath)
      note = note || '(página → bodasesor.com)'
      stats.pages++
    } else {
      stats.skipped++
      continue
    }
  } else if (fromPath.startsWith('/products/')) {
    stats.products++
  } else if (fromPath.startsWith('/collections/')) {
    stats.collections++
  } else if (fromPath.startsWith('/pages/')) {
    const override = pageDestination(fromPath)
    if (override) dest = override
    stats.pages++
  } else if (fromPath.startsWith('/blogs/')) {
    dest = blogDestination(fromPath)
    note = note || '(blog → bodasesor.com)'
    stats.blogs++
  }

  updatedRows.push({
    original,
    dest,
    note,
  })

  addEntry(map, fromPath, dest, stats)
}

// Wildcard-style fallbacks for products not explicitly listed
map['/products/:slug'] = `${SEO_BASE}/eventos/:slug`
stats.count++

const output = {
  generatedAt: new Date().toISOString(),
  seoBase: SEO_BASE,
  totalRules: Object.keys(map).length,
  entries: map,
}

fs.writeFileSync(OUT, JSON.stringify(output, null, 0))

const redirectsTxt = `# Legacy Shopify redirects — generated from Google Sheet "Paginas Bodasesor"
# Exact matches are handled by the legacy-redirect edge function via redirects-map.json

/products/:slug  ${SEO_BASE}/eventos/:slug  301!

# SPA fallback is configured in netlify.toml
`

fs.writeFileSync(REDIRECTS_FILE, redirectsTxt)

const updatedCsvLines = [
  'URL Original (bodasesor.com),URL Nueva (destino),Ciudad detectada',
  ...updatedRows.map((r) =>
    [csvEscape(r.original), csvEscape(r.dest), csvEscape(r.note)].join(','),
  ),
]
fs.writeFileSync(UPDATED_CSV, `${updatedCsvLines.join('\n')}\n`)
fs.writeFileSync(LOCAL_CSV, `${updatedCsvLines.join('\n')}\n`)

console.log('Generated redirects:')
console.log(`  Site base: ${SITE_BASE}`)
console.log(`  SEO base: ${SEO_BASE}`)
console.log(`  Products: ${stats.products}`)
console.log(`  Collections: ${stats.collections}`)
console.log(`  Blogs: ${stats.blogs}`)
console.log(`  Pages: ${stats.pages}`)
console.log(`  Skipped: ${stats.skipped}`)
console.log(`  Total map entries: ${Object.keys(map).length}`)
console.log(`  Output: ${OUT}`)
console.log(`  Updated sheet CSV: ${UPDATED_CSV}`)
