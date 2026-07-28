/**
 * Per-page SEO identity + keywords helpers (SPA runtime, prerender, Nexus patch).
 * Author/publisher are always bodasesor.com as requested.
 */

export const SITE_BASE = 'https://bodasesor.com'
export const SITE_AUTHOR = 'bodasesor.com'
export const SITE_PUBLISHER = 'bodasesor.com'

const STOP = new Set([
  'para',
  'con',
  'los',
  'las',
  'del',
  'una',
  'uno',
  'por',
  'que',
  'the',
  'and',
  'de',
  'en',
  'el',
  'la',
  'y',
  'a',
  'o',
  'al',
  'se',
  'su',
  'tus',
  'mi',
  'tu',
  'es',
  'un',
])

/** Human label from a URL slug segment */
export function labelFromSlug(slug) {
  return String(slug || '')
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function tokenize(...parts) {
  const out = []
  for (const part of parts) {
    if (!part) continue
    const raw = String(part)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9áéíóúüñ\s-]/gi, ' ')
      .replace(/[-_/|]+/g, ' ')
    for (const w of raw.split(/\s+/)) {
      if (w.length < 3 || STOP.has(w)) continue
      out.push(w)
    }
  }
  return out
}

function uniquePreserve(list, max = 14) {
  const seen = new Set()
  const out = []
  for (const item of list) {
    const key = String(item).toLowerCase().trim()
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(String(item).trim())
    if (out.length >= max) break
  }
  return out
}

/**
 * Independent keyword string for a page (path + title + city + extras).
 * Always includes bodasesor + eventos mexico as brand anchors.
 */
export function buildPageKeywords({ path = '/', title = '', h1 = '', cityName = '', extra = [] } = {}) {
  const cleanPath = String(path || '/').split(/[?#]/)[0].replace(/\/+$/, '') || '/'
  const segs = cleanPath.split('/').filter(Boolean)
  const pathLabels = segs.map(labelFromSlug)
  const pathTokens = tokenize(segs.join(' '), title, h1, cityName, ...extra)

  const phrases = []
  if (pathLabels.length === 1) phrases.push(pathLabels[0].toLowerCase())
  if (pathLabels.length >= 2) {
    phrases.push(`${pathLabels[0].toLowerCase()} ${pathLabels[pathLabels.length - 1].toLowerCase()}`)
    phrases.push(pathLabels[pathLabels.length - 1].toLowerCase())
  }
  if (cityName) phrases.push(`eventos ${cityName}`)
  if (/banquete|catering|comida|menu/i.test(cleanPath + title + h1)) {
    phrases.push('banquetes', 'catering para eventos')
  }
  if (/boda|wedding/i.test(cleanPath + title + h1)) phrases.push('bodas', 'wedding planner')
  if (/xv|quince/i.test(cleanPath + title + h1)) phrases.push('xv años', 'quinceañeras')
  if (/mobiliario|mesa|silla|sala|periquera|carpa/i.test(cleanPath + title + h1)) {
    phrases.push('renta de mobiliario')
  }
  if (/foto|video|musica|show|dj/i.test(cleanPath + title + h1)) {
    phrases.push('producción de eventos')
  }
  if (cleanPath === '/' || cleanPath === '') {
    phrases.push('banquetes', 'catering', 'bodas', 'eventos corporativos', 'mobiliario para eventos')
  }
  if (/galeria/i.test(cleanPath)) {
    phrases.push(
      'galería de banquetes',
      'bodas reales',
      'catering para eventos',
      'xv años',
      'eventos corporativos',
    )
  }

  const keywords = uniquePreserve(
    [
      ...phrases,
      ...pathTokens,
      ...extra,
      'bodasesor',
      'eventos méxico',
      cityName ? String(cityName).toLowerCase() : '',
    ].filter(Boolean),
    14,
  )
  return keywords.join(', ')
}

/** Alt text from URL/service context — unique per image index when provided */
export function buildImageAlt({ path = '/', title = '', h1 = '', cityName = '', index = null, role = 'foto' } = {}) {
  const segs = String(path || '/')
    .split('/')
    .filter(Boolean)
  const leaf = segs.length ? labelFromSlug(segs[segs.length - 1]) : 'Eventos'
  const core = (h1 || title || leaf).replace(/\s*\|\s*Bodasesor.*$/i, '').trim()
  const city = cityName ? ` en ${cityName}` : ''
  const n = index == null ? '' : ` ${Number(index) + 1}`
  return `${core}${city} — ${role}${n} | Bodasesor`
}

/** Suggested SEO filename stem from URL path (no extension) */
export function imageStemFromPath(path = '/') {
  const clean = String(path || '/')
    .split(/[?#]/)[0]
    .replace(/\/+$/, '')
    .replace(/^\//, '')
  if (!clean) return 'bodasesor-banquetes-eventos-mexico'
  return clean.replace(/\//g, '-').replace(/[^a-z0-9-]+/gi, '-').replace(/-+/g, '-').toLowerCase()
}

export function organizationRef() {
  return {
    '@type': 'Organization',
    name: SITE_AUTHOR,
    url: `${SITE_BASE}/`,
  }
}
