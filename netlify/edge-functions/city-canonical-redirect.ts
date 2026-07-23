import type { Context } from '@netlify/edge-functions'

/**
 * 301 glued/legacy city URLs to slash-canonical form.
 * Keep CITY_CANONICAL in sync with src/data/city-data.js
 *
 * Examples:
 *   /bodasciudad-de-mexico → /bodas/ciudad-de-mexico
 *   /banquetes/2-tiemposmorelia → /banquetes/2-tiempos/morelia
 *   /bodas/cdmx → /bodas/ciudad-de-mexico
 */
const CITY_CANONICAL: Record<string, string> = {
  'ciudad-de-mexico': 'ciudad-de-mexico',
  cdmx: 'ciudad-de-mexico',
  'estado-de-mexico': 'estado-de-mexico',
  aguascalientes: 'aguascalientes',
  acapulco: 'acapulco',
  cancun: 'cancun',
  cozumel: 'cozumel',
  cuernavaca: 'cuernavaca',
  guadalajara: 'guadalajara',
  leon: 'leon',
  'los-cabos': 'los-cabos',
  merida: 'merida',
  monterrey: 'monterrey',
  morelia: 'morelia',
  oaxaca: 'oaxaca',
  pachuca: 'pachuca',
  puebla: 'puebla',
  'puerto-vallarta': 'puerto-vallarta',
  vallarta: 'puerto-vallarta',
  queretaro: 'queretaro',
  'san-luis-potosi': 'san-luis-potosi',
  'san-miguel-allende': 'san-miguel-allende',
  tijuana: 'tijuana',
  toluca: 'toluca',
  torreon: 'torreon',
  'valle-de-bravo': 'valle-de-bravo',
  veracruz: 'veracruz',
}

const CITY_SLUGS = Object.keys(CITY_CANONICAL).sort((a, b) => b.length - a.length)

const SKIP_PREFIXES = [
  '/assets/',
  '/images/',
  '/css/',
  '/fonts/',
  '/api/',
  '/.netlify/',
  '/products/',
  '/collections/',
  '/blogs/',
  '/pages/',
]

function shouldSkip(pathname: string): boolean {
  if (pathname === '/' || pathname === '') return true
  if (SKIP_PREFIXES.some((p) => pathname.startsWith(p))) return true
  const last = pathname.split('/').pop() || ''
  if (last.includes('.') && !last.startsWith('.')) return true
  return false
}

function stripCityFromSegment(segment: string): { base: string; citySlug: string | null } {
  if (!segment) return { base: segment, citySlug: null }

  for (const citySlug of CITY_SLUGS) {
    if (segment.endsWith(`-en-${citySlug}`) && segment.length > citySlug.length + 4) {
      return { base: segment.slice(0, -(citySlug.length + 4)), citySlug }
    }
    if (segment.endsWith(`-${citySlug}`) && segment.length > citySlug.length + 1) {
      return { base: segment.slice(0, -(citySlug.length + 1)), citySlug }
    }
    if (segment.endsWith(citySlug) && segment.length > citySlug.length) {
      const base = segment.slice(0, -citySlug.length).replace(/-+$/, '')
      if (base) return { base, citySlug }
    }
  }

  return { base: segment, citySlug: null }
}

/** Returns canonical path or null if already canonical / not a city URL */
export function toCanonicalCityPath(pathname: string): string | null {
  const normalized = decodeURIComponent(pathname).replace(/\/+$/, '') || '/'
  if (shouldSkip(normalized)) return null

  const segments = normalized.split('/').filter(Boolean)
  if (segments.length === 0) return null

  const last = segments[segments.length - 1]

  // Already a trailing city segment (maybe alias)
  if (CITY_CANONICAL[last]) {
    const canon = CITY_CANONICAL[last]
    if (last === canon) return null
    const prefix = segments.slice(0, -1)
    return prefix.length ? `/${prefix.join('/')}/${canon}` : `/${canon}`
  }

  // Single-segment city landing is already canonical (or alias handled above)
  if (segments.length === 1 && CITY_CANONICAL[segments[0]]) return null

  const { base, citySlug } = stripCityFromSegment(last)
  if (!citySlug) return null

  const canon = CITY_CANONICAL[citySlug]
  const prefix = segments.slice(0, -1)
  const parts = [...prefix, base, canon].filter(Boolean)
  return `/${parts.join('/')}`
}

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url)
  const pathname = url.pathname.replace(/\/+$/, '') || '/'
  const canonical = toCanonicalCityPath(url.pathname)

  // Always resolve the static/Nexus/SPA response first.
  // Hyphenated Nexus landings (e.g. /banquete-kosher-ciudad-de-mexico) must NOT
  // be 301'd away — they are real SEO HTML with seo-service-hero.
  const response = await context.next()

  if (!canonical || canonical === pathname) {
    return response
  }

  try {
    const ct = response.headers.get('content-type') || ''
    if (response.ok && ct.includes('text/html')) {
      const html = await response.clone().text()
      if (html.includes('seo-service-hero')) {
        return response
      }
    }
  } catch {
    // If we can't inspect the body, prefer preserving the current response
    // over a blind redirect that could orphan Nexus landings.
    return response
  }

  // SPA soft-404 / missing landing → slash-canonical 301
  const dest = new URL(canonical, url.origin)
  dest.search = url.search
  return Response.redirect(dest.toString(), 301)
}
