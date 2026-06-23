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
  '/quienes-somos': null,
  '/blog': null,
}

function stripCityFromSegment(segment) {
  if (!segment) return { base: segment, citySlug: null }

  for (const citySlug of CITY_SLUGS) {
    // Direct concatenation: banquetescuernavaca
    if (segment.endsWith(citySlug) && segment.length > citySlug.length) {
      return { base: segment.slice(0, -citySlug.length), citySlug }
    }
    // Legacy: banquetes-en-cuernavaca
    if (segment.endsWith(`-en-${citySlug}`) && segment.length > citySlug.length + 4) {
      return { base: segment.slice(0, -(citySlug.length + 4)), citySlug }
    }
  }

  return { base: segment, citySlug: null }
}

/** Strip city suffix from a single slug segment */
export function stripCityFromSlug(slug) {
  return stripCityFromSegment(slug).base
}

/** Parse city and base path from a URL pathname */
export function parseCityFromPath(path) {
  const normalized = path.replace(/\/+$/, '') || '/'
  const segments = normalized.split('/').filter(Boolean)

  if (segments.length === 0) {
    return { city: null, basePath: '/' }
  }

  // City landing: /cuernavaca, /ciudad-de-mexico
  if (segments.length === 1 && CITY_MAP[segments[0]]) {
    return { city: CITY_MAP[segments[0]], basePath: '/' }
  }

  const last = segments[segments.length - 1]
  const { base, citySlug } = stripCityFromSegment(last)

  if (citySlug) {
    const baseSegments = [...segments.slice(0, -1), base].filter(Boolean)
    return {
      city: CITY_MAP[citySlug],
      basePath: baseSegments.length ? `/${baseSegments.join('/')}` : '/',
    }
  }

  return { city: null, basePath: normalized }
}

/** Remove city suffix from a full path */
export function stripCityFromPath(path) {
  return parseCityFromPath(path).basePath
}

/**
 * Apply city to a path — always updates the URL.
 * Home → /{citySlug}  (e.g. /cuernavaca, /ciudad-de-mexico)
 * Services → /{service}{citySlug}  (e.g. /banquetescuernavaca)
 */
export function withCityPath(path, citySlug) {
  if (!citySlug || !CITY_MAP[citySlug]) return stripCityFromPath(path)
  if (isCityExemptPath(path)) return stripCityFromPath(path)

  const { basePath } = parseCityFromPath(path)

  if (basePath === '/') {
    return `/${citySlug}`
  }

  const segments = basePath.split('/').filter(Boolean)
  const last = segments.pop()
  segments.push(`${last}${citySlug}`)
  return `/${segments.join('/')}`
}

/** Whether a slug param is a known city landing page */
export function isCityLandingSlug(slug) {
  return Boolean(slug && CITY_MAP[slug])
}

/** Resolve a product/page slug that may include a city suffix */
export function resolveBaseSlug(slug) {
  return stripCityFromSlug(slug)
}
