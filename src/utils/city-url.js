import { CITY_MAP } from '../data/city-data'

/** City slugs sorted longest-first for reliable suffix matching */
export const CITY_SLUGS = Object.keys(CITY_MAP).sort((a, b) => b.length - a.length)

/** Paths that should never receive a city suffix */
export const CITY_EXEMPT_PREFIXES = [
  '/blog',
  '/buscar',
  '/quienes-somos',
  '/galeria',
  '/catalogo',
  '/catalogos',
]

export function isCityExemptPath(path) {
  const { basePath } = parseCityFromPath(path)
  return CITY_EXEMPT_PREFIXES.some(
    (prefix) => basePath === prefix || basePath.startsWith(`${prefix}/`),
  )
}

/** Pages with dedicated routes (not only ServicePage catch-all) */
export const STANDALONE_PAGE_ROUTES = {
  '/banquetes-catering': null,
  '/barras-de-bebidas': null,
  '/mesas-personalizadas': null,
  '/combinaciones-mesas-sillas': null,
  '/vajillas': null,
  '/colgantes': null,
  '/barras': null,
  '/entelados': null,
  '/floreria': null,
  '/shows': null,
  '/pistas-tarimas': null,
  '/salas-periqueras': null,
  '/reposteria': null,
  '/wedding-planner': null,
  '/musica': null,
  '/fotografia': null,
  '/alimentos-empresas': null,
  '/espacios-eventos': null,
  '/carpas': null,
  '/audio-iluminacion-video': null,
  '/galeria': null,
  '/catalogos': null,
  '/quienes-somos': null,
  '/blog': null,
}

function stripCityFromSegment(segment) {
  if (!segment) return { base: segment, citySlug: null }

  for (const citySlug of CITY_SLUGS) {
    // Hyphenated legacy: bodas-cdmx, banquetes-cuernavaca
    if (segment.endsWith(`-${citySlug}`) && segment.length > citySlug.length + 1) {
      return { base: segment.slice(0, -(citySlug.length + 1)), citySlug }
    }
    // Legacy with preposition: banquetes-en-cuernavaca
    if (segment.endsWith(`-en-${citySlug}`) && segment.length > citySlug.length + 4) {
      return { base: segment.slice(0, -(citySlug.length + 4)), citySlug }
    }
    // Legacy concatenation: banquetescuernavaca
    if (segment.endsWith(citySlug) && segment.length > citySlug.length) {
      const base = segment.slice(0, -citySlug.length).replace(/-+$/, '')
      if (base) return { base, citySlug }
    }
  }

  return { base: segment, citySlug: null }
}

/** Strip city suffix from a single slug segment (legacy URLs) */
export function stripCityFromSlug(slug) {
  return stripCityFromSegment(slug).base
}

function normalizePath(path) {
  const p = path.replace(/\/+$/, '') || '/'
  return p.startsWith('/') ? p : `/${p}`
}

/** Parse city and base path from a URL pathname */
export function parseCityFromPath(path) {
  const normalized = normalizePath(path)
  const segments = normalized.split('/').filter(Boolean)

  if (segments.length === 0) {
    return { city: null, basePath: '/' }
  }

  // City landing: /cuernavaca, /ciudad-de-mexico
  if (segments.length === 1 && CITY_MAP[segments[0]]) {
    return { city: CITY_MAP[segments[0]], basePath: '/' }
  }

  // Canonical: /banquete-kosher/3-tiempos/cuernavaca
  const lastSeg = segments[segments.length - 1]
  if (segments.length >= 2 && CITY_MAP[lastSeg]) {
    const baseSegments = segments.slice(0, -1)
    return {
      city: CITY_MAP[lastSeg],
      basePath: baseSegments.length ? `/${baseSegments.join('/')}` : '/',
    }
  }

  // Legacy: city glued to last segment
  const { base, citySlug } = stripCityFromSegment(lastSeg)
  if (citySlug) {
    const baseSegments = [...segments.slice(0, -1), base].filter(Boolean)
    return {
      city: CITY_MAP[citySlug],
      basePath: baseSegments.length ? `/${baseSegments.join('/')}` : '/',
    }
  }

  return { city: null, basePath: normalized }
}

/** Remove city from a full path */
export function stripCityFromPath(path) {
  return parseCityFromPath(path).basePath
}

/**
 * Apply city to a path.
 * Home → /{citySlug}
 * Services → /{service}/{citySlug}  (e.g. /banquete-kosher/3-tiempos/cuernavaca)
 * Preserves ?query and #hash (hash must stay after city: /path/city#section).
 */
export function withCityPath(path, citySlug) {
  if (!citySlug || !CITY_MAP[citySlug]) return stripCityFromPath(path.split(/[?#]/)[0] || path)

  const qIdx = path.indexOf('?')
  const hIdx = path.indexOf('#')
  let suffix = ''
  let pathOnly = path
  if (qIdx >= 0 || hIdx >= 0) {
    const cut = Math.min(
      qIdx >= 0 ? qIdx : path.length,
      hIdx >= 0 ? hIdx : path.length,
    )
    suffix = path.slice(cut)
    pathOnly = path.slice(0, cut)
  }

  if (isCityExemptPath(pathOnly)) {
    return stripCityFromPath(pathOnly) + suffix
  }

  const { basePath } = parseCityFromPath(pathOnly)

  if (basePath === '/') {
    return `/${citySlug}${suffix}`
  }

  return `${basePath}/${citySlug}${suffix}`.replace(/([^:]\/)\/+/g, '$1')
}

/** Convert legacy concatenated city URLs to slash format */
export function toCanonicalCityPath(path) {
  const normalized = normalizePath(path)
  const { city, basePath } = parseCityFromPath(normalized)
  if (!city) return normalized

  const segments = normalized.split('/').filter(Boolean)
  if (segments.length >= 2 && segments[segments.length - 1] === city.slug) {
    return normalized
  }

  return withCityPath(basePath, city.slug)
}

/** Whether a slug param is a known city landing page */
export function isCityLandingSlug(slug) {
  return Boolean(slug && CITY_MAP[slug])
}

/** Resolve a product/page slug that may include a city suffix (legacy) */
export function resolveBaseSlug(slug) {
  return stripCityFromSlug(slug)
}
