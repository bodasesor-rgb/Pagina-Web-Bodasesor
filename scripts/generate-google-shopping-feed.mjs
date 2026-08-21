/**
 * Build Google Merchant / Shopping feed from the public Bodasesor pricing sheet.
 *
 * Column layout matches the official Merchant Center template
 * (id, title, description, availability, … cost_of_goods_sold).
 *
 * Tabs used: "Servicio de alimentos" + "Mesas y Sillas"
 * Output: public/feeds/google-shopping.csv
 *
 * Usage: npm run generate:google-shopping
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { HERO_IMAGES } from '../src/data/product-galleries.js'
import { CATALOGOS } from '../src/data/catalogos-embeds.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_PATH = path.join(ROOT, 'public', 'feeds', 'google-shopping.csv')
const SITE = process.env.SITE_BASE || 'https://bodasesor.com'
const SHEET_ID =
  process.env.GOOGLE_PRICING_SHEET_ID ||
  '1s3DGZZXm3VXxqxyq1cKDnD3DfhGUrVw6ZkpYuN5_pBQ'
const UA = 'BodasesorSync/1.0 (+https://bodasesor.com)'

const SHEETS = [
  { key: 'alimentos', name: 'Servicio de alimentos' },
  { key: 'mesas', name: 'Mesas y Sillas' },
]

/** Catalog slug → hero key in HERO_IMAGES / product pages */
const CATALOG_HERO_ALIASES = {
  'banquete-formal': 'banquetes',
  'barra-de-bebidas': 'barra-bebidas',
  'barra-de-cafe': 'barra-cafe-premium',
  'barra-de-crepas': 'barra-crepas',
  'barra-de-mariscos': 'barra-mariscos',
  'barra-de-paninis': 'barra-paninis',
  'barra-de-pastas-y-ensaladas': 'barra-pastas',
  'barra-de-pizzas': 'barra-pizzas',
  'barra-de-sushi': 'barra-sushi',
  'cocteleria-y-mixologia': 'cocteles-mixologia',
  mocteles: 'barra-mocteles',
  canapes: 'canapes-premium',
  'cupcakes-y-betun': 'cupcakes-gourmet',
  'paletas-de-hielo-y-helados': 'paletas-helados',
  'parrillada-tacos': 'parrillada-tradicional',
  'pozole-y-tostadas': 'pozole-tostadas',
  'puestos-de-comida': 'puestos-antojitos',
  taquiza: 'taquiza-guisados',
  'carrito-de-snacks': 'carrito-snacks',
  'mesa-de-dulces': 'mesa-dulces',
  'mesa-de-postres': 'mesa-postres',
  'mesa-de-quesos': 'mesa-quesos',
  'desayuno-o-brunch': 'desayuno-social',
  'mesas-y-sillas': 'mesas-sillas',
}

const FALLBACK_IMAGES = {
  alimentos: `${SITE}/images/banquete-hero.png`,
  mesas: `${SITE}/images/productos/mesas-sillas.png`,
  sillas: `${SITE}/images/productos/mesas-sillas.png`,
  barras: `${SITE}/images/barras/barra-clasica-blanca.jpg`,
  conjuntos: `${SITE}/images/productos/mesas-sillas.png`,
}

function slugify(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

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
      } else if (ch === '"') inQuotes = false
      else field += ch
      continue
    }
    if (ch === '"') inQuotes = true
    else if (ch === ',') {
      row.push(field)
      field = ''
    } else if (ch === '\n' || (ch === '\r' && next === '\n')) {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
      if (ch === '\r') i++
    } else if (ch !== '\r') field += ch
  }
  if (field.length || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

function rowsToObjects(matrix) {
  if (!matrix.length) return []
  const headers = matrix[0].map((h) => String(h || '').trim())
  return matrix.slice(1).map((cells) => {
    const obj = {}
    headers.forEach((h, i) => {
      obj[h] = cells[i] == null ? '' : String(cells[i]).trim()
    })
    return obj
  })
}

function parseMoney(raw) {
  if (!raw) return null
  const cleaned = String(raw)
    .replace(/[^\d.,-]/g, '')
    .replace(/,/g, '')
  const n = Number.parseFloat(cleaned)
  if (!Number.isFinite(n) || n <= 0) return null
  return n.toFixed(2)
}

function csvEscape(value) {
  const s = String(value ?? '')
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function absoluteUrl(urlOrPath) {
  if (!urlOrPath) return ''
  const s = String(urlOrPath).trim()
  if (!s || /sin slug|gamma\.app|canva\.com/i.test(s)) return ''
  if (/^https?:\/\//i.test(s)) {
    try {
      const u = new URL(s)
      if (!/bodasesor\.com$/i.test(u.hostname.replace(/^www\./, ''))) return ''
      u.hash = ''
      u.search = ''
      return u.toString().replace(/\/$/, '') || SITE
    } catch {
      return ''
    }
  }
  if (s.startsWith('/')) return `${SITE}${s}`
  return ''
}

function pathFromLink(link) {
  try {
    return new URL(link).pathname.replace(/\/$/, '') || '/'
  } catch {
    return ''
  }
}

function heroKeyCandidatesFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  if (!parts.length) return []
  const [kind, slug] = parts
  const out = []
  if (kind === 'mesas' && slug) out.push(`mesa-${slug}`, slug)
  if (kind === 'sillas' && slug) out.push(`silla-${slug}`, slug)
  if (kind === 'barras' && slug) out.push(`barra-${slug}`, slug)
  if (kind === 'combinaciones' && slug) out.push(slug, `mesa-${slug}`)
  if (kind === 'catalogos' && slug) {
    out.push(CATALOG_HERO_ALIASES[slug] || slug, slug)
    const cat = CATALOGOS.find((c) => c.slug === slug)
    if (cat?.relatedHref) {
      const rel = cat.relatedHref.replace(/^\//, '').split('/')[0]
      if (rel) out.push(rel, CATALOG_HERO_ALIASES[rel] || rel)
    }
  }
  if (parts.length === 1) out.push(parts[0])
  return [...new Set(out.filter(Boolean))]
}

function resolveImage(link, fallbackKey) {
  const pathname = pathFromLink(link)
  for (const key of heroKeyCandidatesFromPath(pathname)) {
    const img = HERO_IMAGES[key]
    if (typeof img === 'string' && img.startsWith('/')) return `${SITE}${img}`
  }
  return FALLBACK_IMAGES[fallbackKey] || FALLBACK_IMAGES.alimentos
}

async function fetchSheet(sheetName) {
  const enc = encodeURIComponent(sheetName)
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${enc}`
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`Sheet "${sheetName}" HTTP ${res.status}`)
  const text = await res.text()
  if (/^<!DOCTYPE html/i.test(text) || /Accounts|Sign in/i.test(text.slice(0, 200))) {
    throw new Error(`Sheet "${sheetName}" not publicly readable`)
  }
  return rowsToObjects(parseCsv(text))
}

function get(row, ...names) {
  for (const name of names) {
    if (row[name] != null && String(row[name]).trim() !== '') return String(row[name]).trim()
    const found = Object.keys(row).find(
      (k) => k.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() ===
        name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(),
    )
    if (found && String(row[found]).trim() !== '') return String(row[found]).trim()
  }
  return ''
}

/** Official Merchant Center template column order (exact headers). */
const COLUMNS = [
  'id',
  'title',
  'description',
  'availability',
  'availability_date',
  'expiration_date',
  'link',
  'mobile_link',
  'image_link',
  'price',
  'sale_price',
  'sale_price_effective_date',
  'identifier_exists',
  'gtin',
  'mpn',
  'brand',
  'product_highlight',
  'product_detail',
  'additional_image_link',
  'condition',
  'adult',
  'color',
  'size',
  'size_type',
  'size_system',
  'gender',
  'material',
  'pattern',
  'age_group',
  'multipack',
  'is bundle',
  'unit_pricing_measure',
  'unit_pricing_base_measure',
  'energy_efficiency_class',
  'min_energy_efficiency_class',
  'max_energy_efficiency',
  'item_group_id',
  'video_link',
  'virtual_model_link',
  'cost_of_goods_sold',
]

function emptyMerchantRow() {
  const row = {}
  for (const col of COLUMNS) row[col] = ''
  return row
}

function merchantProduct({
  id,
  title,
  description,
  link,
  image_link,
  price,
  item_group_id,
  product_highlight = '',
  product_detail = '',
  color = '',
  _kind = '',
}) {
  const row = emptyMerchantRow()
  row.id = id
  row.title = String(title).slice(0, 150)
  row.description = String(description).slice(0, 5000)
  row.availability = 'in_stock'
  row.link = link
  row.mobile_link = link
  row.image_link = image_link
  row.price = price
  row.identifier_exists = 'no'
  row.brand = 'Bodasesor'
  row.product_highlight = product_highlight
  row.product_detail = product_detail
  row.condition = 'new'
  row.adult = 'no'
  row.color = color
  row.item_group_id = item_group_id
  row._kind = _kind
  return row
}

function buildAlimentosProducts(rows) {
  const products = []
  for (const row of rows) {
    const servicio = get(row, 'Servicio')
    const nivel = get(row, 'Nivel')
    const price = parseMoney(get(row, 'Precio Unitario'))
    const minPrice = parseMoney(get(row, 'Precio Minimo de salida', 'Precio Mínimo de salida'))
    const link = absoluteUrl(get(row, 'Link catalogo', 'Link catálogo'))
    const includes = get(row, 'Que Incluye', 'Qué Incluye')
    const extras = get(row, 'Extras')
    if (!servicio || !price || !link) continue

    const title = nivel ? `${servicio} — ${nivel}` : servicio
    const id = `ali-${slugify(servicio)}-${slugify(nivel || 'base')}`
    const descParts = [
      `${title} de Bodasesor para eventos en CDMX y área metropolitana.`,
      includes ? `Incluye: ${includes}.` : '',
      extras ? `Extras: ${extras}.` : '',
      minPrice ? `Precio mínimo de salida desde $${minPrice} MXN.` : '',
      `Precio unitario de referencia: $${price} MXN. Cotiza disponibilidad y montaje en bodasesor.com.`,
    ].filter(Boolean)

    const highlights = [
      `"Servicio de alimentos Bodasesor"`,
      nivel ? `"Nivel ${nivel}"` : '',
      `"Disponible en CDMX"`,
    ].filter(Boolean)

    products.push(
      merchantProduct({
        id,
        title,
        description: descParts.join(' '),
        link,
        image_link: resolveImage(link, 'alimentos'),
        price: `${price} MXN`,
        item_group_id: `ali-${slugify(servicio)}`,
        product_highlight: highlights.join(', '),
        product_detail: `Categoría:alimentos:${servicio}`,
        _kind: 'alimentos',
      }),
    )
  }
  return products
}

function buildMesasProducts(rows) {
  const products = []
  for (const row of rows) {
    const categoria = get(row, 'Categoría', 'Categoria') || 'Mobiliario'
    const articulo = get(row, 'Artículo', 'Articulo')
    const descripcion = get(row, 'Descripción', 'Descripcion')
    const price = parseMoney(get(row, 'Precio'))
    const minPrice = parseMoney(get(row, 'Precio de salida minimo', 'Precio de salida mínimo'))
    const link = absoluteUrl(get(row, 'Link Catalogo', 'Link Catálogo', 'Link catalogo'))
    if (!articulo || !price || !link) continue

    const id = `mob-${slugify(categoria)}-${slugify(articulo)}`
    const title = `Renta ${articulo}`.slice(0, 150)
    const fallbackKey =
      /silla/i.test(categoria) || /silla/i.test(articulo)
        ? 'sillas'
        : /barra/i.test(categoria)
          ? 'barras'
          : /conjunto/i.test(categoria)
            ? 'conjuntos'
            : 'mesas'

    const colorMatch = descripcion.match(/Color:\s*([^|]+)/i)
    const color = colorMatch ? colorMatch[1].trim() : ''

    const descParts = [
      `Renta de ${articulo} para eventos con Bodasesor.`,
      descripcion ? `${descripcion}.` : '',
      minPrice ? `Precio mínimo de salida desde $${minPrice} MXN.` : '',
      `Precio de renta de referencia: $${price} MXN. Disponible en CDMX y zona metropolitana.`,
    ].filter(Boolean)

    products.push(
      merchantProduct({
        id,
        title,
        description: descParts.join(' '),
        link,
        image_link: resolveImage(link, fallbackKey),
        price: `${price} MXN`,
        item_group_id: `mob-${slugify(pathFromLink(link) || articulo)}`,
        product_highlight: `"Renta de mobiliario", "Categoría ${categoria}", "CDMX y zona metropolitana"`,
        product_detail: `Categoría:mobiliario:${categoria}`,
        color,
        _kind: 'mobiliario',
      }),
    )
  }
  return products
}

function toCsv(products) {
  const lines = [COLUMNS.join(',')]
  for (const p of products) {
    lines.push(COLUMNS.map((c) => csvEscape(p[c] ?? '')).join(','))
  }
  return `${lines.join('\n')}\n`
}

async function main() {
  const byKey = {}
  for (const sheet of SHEETS) {
    process.stdout.write(`Fetching "${sheet.name}"… `)
    byKey[sheet.key] = await fetchSheet(sheet.name)
    console.log(`${byKey[sheet.key].length} rows`)
  }

  const products = [
    ...buildMesasProducts(byKey.mesas),
    ...buildAlimentosProducts(byKey.alimentos),
  ]

  // Stable unique ids
  const seen = new Set()
  const unique = []
  for (const p of products) {
    if (seen.has(p.id)) {
      let n = 2
      while (seen.has(`${p.id}-${n}`)) n++
      p.id = `${p.id}-${n}`
    }
    seen.add(p.id)
    unique.push(p)
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
  fs.writeFileSync(OUT_PATH, toCsv(unique), 'utf8')

  const mobiliario = unique.filter((p) => p._kind === 'mobiliario').length
  const alimentos = unique.filter((p) => p._kind === 'alimentos').length
  console.log(`Wrote ${unique.length} products → ${path.relative(ROOT, OUT_PATH)}`)
  console.log(`  columns: ${COLUMNS.length} (Merchant template)`)
  console.log(`  mobiliario: ${mobiliario}`)
  console.log(`  alimentos:  ${alimentos}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
