import { products } from './products.js'
import { BANQUET_MENUS, banquetesNavGroups } from './banquetes-menus.js'
import { SALAS_CATALOG, PERIQUERAS_CATALOG } from './salas-periqueras-products.js'
import { WEDDING } from './wedding-products.js'
import { MUSICA } from './musica-products.js'
import { FOTOGRAFIA } from './fotografia-products.js'
import { EMPRESAS } from './empresas-products.js'
import { ESPACIOS } from './espacios-products.js'
import { REPOSTERIA } from './reposteria-products.js'
import { VAJILLAS } from './vajillas-products.js'
import { COLGANTES } from './colgantes-products.js'
import { PISTAS_TARIMAS } from './pistas-tarimas-products.js'
import { ENTELADOS } from './entelados-products.js'
import { CARPAS } from './carpas-products.js'
import { AUDIO_ILUMINACION } from './audio-iluminacion-products.js'
import { FLORERIA } from './floreria-products.js'
import { SHOWS } from './shows-products.js'
import { COMBINACIONES } from './combinaciones-products.js'

function normalizeText(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function productHref(slug) {
  if (slug.startsWith('silla-')) return `/sillas/${slug.slice(6)}`
  if (slug.startsWith('mesa-')) return `/mesas/${slug.slice(5)}`
  // Furniture barras (not food/drink flat /barra-* pages)
  const mobiliarioBarras = new Set([
    'barra-clasica-blanca',
    'barra-xl-clasica-negra',
    'barra-rustica',
    'barra-industrial',
  ])
  if (mobiliarioBarras.has(slug)) return `/barras/${slug.slice(6)}`
  return `/${slug}`
}

function addEntry(map, name, href, category) {
  if (!name || !href) return
  const norm = normalizeText(name)
  const key = href
  if (map.has(key)) {
    const existing = map.get(key)
    if (!existing.keywords.includes(norm)) existing.keywords.push(norm)
    return
  }
  map.set(key, {
    name,
    href,
    category: category || '',
    norm: normalizeText(name),
    categoryNorm: normalizeText(category),
    keywords: [norm],
  })
}

function buildIndex() {
  const map = new Map()

  for (const p of products) {
    const name = p.title || p.name
    if (!name) continue
    addEntry(map, name, productHref(p.slug), p.categoryLabel || p.category || 'Servicios')
  }

  for (const m of BANQUET_MENUS) {
    addEntry(map, m.name, `${m.parentHref}/${m.slug}`, 'Banquetes')
  }

  for (const group of banquetesNavGroups) {
    for (const item of group.items) {
      addEntry(map, item.name, item.href, group.heading)
    }
  }

  for (const s of SALAS_CATALOG) {
    addEntry(map, s.name, `/salas/${s.slug}`, 'Salas')
  }
  for (const p of PERIQUERAS_CATALOG) {
    addEntry(map, p.name, `/periqueras/${p.slug}`, 'Periqueras')
  }

  const catalogEntries = [
    [WEDDING, (i) => `/wedding-planner/${i.slug}`, 'Wedding Planner', 'name'],
    [MUSICA, (i) => `/musica/${i.slug}`, 'Música', 'name'],
    [FOTOGRAFIA, (i) => `/fotografia/${i.slug}`, 'Fotografía', 'name'],
    [EMPRESAS, (i) => `/alimentos-empresas/${i.slug}`, 'Alimentos Empresas', 'name'],
    [ESPACIOS, (i) => `/espacios-eventos/${i.slug}`, 'Espacios', 'name'],
    [REPOSTERIA, (i) => `/reposteria/${i.slug}`, 'Repostería', 'name'],
    [VAJILLAS, (i) => `/vajillas/${i.slug}`, 'Vajillas', 'name'],
    [COLGANTES, (i) => `/colgantes/${i.slug}`, 'Colgantes', 'name'],
    [PISTAS_TARIMAS, (i) => `/pistas-tarimas/${i.slug}`, 'Pistas y Tarimas', 'name'],
    [ENTELADOS, (i) => `/entelados/${i.slug}`, 'Entelados', 'name'],
    [CARPAS, (i) => `/carpas/${i.slug}`, 'Carpas', 'name'],
    [AUDIO_ILUMINACION, (i) => `/audio-iluminacion-video/${i.slug}`, 'Audio e Iluminación', 'name'],
    [FLORERIA, (i) => `/floreria/${i.slug}`, 'Florería', 'name'],
    [SHOWS, (i) => `/shows/${i.slug}`, 'Shows', 'name'],
    [COMBINACIONES, (i) => `/combinaciones/${i.slug}`, 'Combinaciones', 'label'],
  ]

  for (const [list, hrefFn, category, nameKey] of catalogEntries) {
    for (const item of list) {
      addEntry(map, item[nameKey], hrefFn(item), category)
    }
  }

  const pages = [
    ['Banquetes y Catering', '/banquetes-catering'],
    ['Barras de Bebidas', '/barras-de-bebidas'],
    ['Mesas y Sillas', '/mesas-sillas'],
    ['Mesas Personalizadas', '/mesas-personalizadas'],
    ['Salas y Periqueras', '/salas-periqueras'],
    ['Combinaciones Mesas y Sillas', '/combinaciones-mesas-sillas'],
    ['Vajillas y Estilo', '/vajillas'],
    ['Colgantes Premium', '/colgantes'],
    ['Entelados para Techo', '/entelados'],
    ['Pistas y Tarimas', '/pistas-tarimas'],
    ['Carpas para Eventos', '/carpas'],
    ['Florería y Decoración', '/floreria'],
    ['Shows para Eventos', '/shows'],
    ['Repostería', '/reposteria'],
    ['Wedding Planner', '/wedding-planner'],
    ['Música para Eventos', '/musica'],
    ['Fotografía y Video', '/fotografia'],
    ['Alimentos para Empresas', '/alimentos-empresas'],
    ['Espacios para Eventos', '/espacios-eventos'],
    ['Audio, Iluminación y Video', '/audio-iluminacion-video'],
    ['Galería', '/galeria'],
    ['Blog', '/blog'],
  ]
  for (const [name, href] of pages) {
    addEntry(map, name, href, 'Catálogo')
  }

  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, 'es'))
}

export const SEARCH_INDEX = buildIndex()

export function searchProducts(query, limit = 12) {
  const q = normalizeText(query)
  if (!q) return []

  const tokens = q.split(/\s+/).filter(Boolean)

  const scored = []
  for (const item of SEARCH_INDEX) {
    const haystack = `${item.norm} ${item.categoryNorm} ${item.keywords.join(' ')}`
    let score = 0

    if (tokens.length === 1) {
      const token = tokens[0]
      const nameIdx = item.norm.indexOf(token)
      const catIdx = item.categoryNorm.indexOf(token)
      if (nameIdx === -1 && catIdx === -1) continue
      if (nameIdx === 0) score += 200
      else if (nameIdx > 0) score += 120 - nameIdx
      if (item.norm.split(/\s+/).some((w) => w.startsWith(token))) score += 40
      if (catIdx >= 0) score += 30 - catIdx
      if (item.norm === token) score += 100
    } else {
      if (!tokens.every((t) => haystack.includes(t))) continue
      score += 150
      if (item.norm.startsWith(tokens[0])) score += 50
      tokens.forEach((t) => {
        const idx = item.norm.indexOf(t)
        if (idx >= 0) score += 30 - Math.min(idx, 25)
      })
    }

    scored.push({ item, score })
  }

  scored.sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name, 'es'))
  return scored.slice(0, limit).map((s) => s.item)
}

export function searchProductsAll(query) {
  return searchProducts(query, SEARCH_INDEX.length)
}
