import { CITY_MAP } from '../data/city-data'

/** City slugs sorted longest-first for reliable suffix matching */
export const CITY_SLUGS = Object.keys(CITY_MAP).sort((a, b) => b.length - a.length)

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

/** Strip `-en-{city}` or `-{city}` suffix from a slug segment */
export function stripCityFromSlug(slug) {
  if (!slug) return slug
  for (const citySlug of CITY_SLUGS) {
    if (slug.endsWith(`-en-${citySlug}`)) {
      return slug.slice(0, -(citySlug.length + 4))
    }
    if (slug.endsWith(`-${citySlug}`)) {
      return slug.slice(0, -(citySlug.length + 1))
    }
  }
  return slug
}

/** Parse city and base path from a URL pathname */
export function parseCityFromPath(path) {
  const normalized = path.replace(/\/+$/, '') || '/'
  const segments = normalized.split('/').filter(Boolean)

  if (segments.length === 0) {
    return { city: null, basePath: '/' }
  }

  // City landing: /ciudad-de-mexico
  if (segments.length === 1 && CITY_MAP[segments[0]]) {
    return { city: CITY_MAP[segments[0]], basePath: '/' }
  }

  // Check last segment for city suffix
  const last = segments[segments.length - 1]
  for (const citySlug of CITY_SLUGS) {
    if (last.endsWith(`-en-${citySlug}`)) {
      const baseLast = last.slice(0, -(citySlug.length + 4))
      const baseSegments = [...segments.slice(0, -1), baseLast]
      return {
        city: CITY_MAP[citySlug],
        basePath: baseSegments.length ? `/${baseSegments.join('/')}` : '/',
      }
    }
    if (last.endsWith(`-${citySlug}`) && !last.endsWith(`-en-${citySlug}`)) {
      const baseLast = last.slice(0, -(citySlug.length + 1))
      const baseSegments = [...segments.slice(0, -1), baseLast]
      return {
        city: CITY_MAP[citySlug],
        basePath: baseSegments.length ? `/${baseSegments.join('/')}` : '/',
      }
    }
  }

  return { city: null, basePath: normalized }
}

/** Remove city suffix from a full path */
export function stripCityFromPath(path) {
  return parseCityFromPath(path).basePath
}

/** Apply city to a path — home becomes /{city}, others get -en-{city} suffix */
export function withCityPath(path, citySlug) {
  if (!citySlug || !CITY_MAP[citySlug]) return stripCityFromPath(path)

  const { basePath } = parseCityFromPath(path)

  if (basePath === '/') {
    return `/${citySlug}`
  }

  const segments = basePath.split('/').filter(Boolean)
  const last = segments.pop()
  segments.push(`${last}-en-${citySlug}`)
  return `/${segments.join('/')}`
}

/** Whether a slug param is a known city landing page */
export function isCityLandingSlug(slug) {
  return Boolean(slug && CITY_MAP[slug])
}
