import type { Context } from '@netlify/edge-functions'

/**
 * Edge redirects for Bodasesor:
 * 301 glued/legacy city URLs to slash-canonical form.
 *
 * NOTE: Do NOT strip trailing slashes here. Netlify Pretty URLs 301
 * /path → /path/ for directory index.html shells; stripping the other way
 * causes an infinite redirect loop.
 *
 * Keep CITY_CANONICAL in sync with src/data/city-data.js
 *
 * Examples:
 *   /bodasciudad-de-mexico → /bodas/ciudad-de-mexico/  (trailing / = one hop)
 *   /banquetes/2-tiemposmorelia → /banquetes/2-tiempos/morelia/
 *   /bodas/cdmx → /bodas/ciudad-de-mexico/
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
  // Static blog posts keep city words in the slug (e.g. ...-bodas-cdmx).
  // Never rewrite /blog/* into /blog/.../ciudad-de-mexico.
  '/blog/',
  '/blog',
  '/pages/',
  '/buscar',
  '/galeria',
  '/catalogos',
  '/aviso-de-privacidad',
  '/terminos-y-condiciones',
  '/quienes-somos',
]

function shouldSkip(pathname: string): boolean {
  if (pathname === '/' || pathname === '') return true
  // Blog slugs are never city routes (…-bodas-cdmx must stay intact).
  if (pathname === '/blog' || pathname.startsWith('/blog/')) return true
  if (SKIP_PREFIXES.some((p) => pathname === p || pathname.startsWith(p))) return true
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

/** Prefer trailing slash so Netlify Pretty URLs do not add a second 301 hop. */
export function withTrailingSlash(pathname: string): string {
  if (!pathname || pathname === '/') return '/'
  if (pathname.includes('?') || pathname.includes('#')) return pathname
  return pathname.endsWith('/') ? pathname : `${pathname}/`
}

/** Returns canonical path (no trailing slash) or null if already canonical / not a city URL */
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

  // Bot shield / upstream errors — never invent a city 301.
  if (response.status === 403 || response.status >= 500) {
    return response
  }

  // After P0 (/* → /404.html 404), glued legacy URLs no longer soft-200 the SPA.
  // Still 301 them to slash-canonical; only real Nexus HTML below is preserved.
  if (response.status === 404) {
    const destPath = withTrailingSlash(canonical)
    const dest = new URL(destPath, 'https://bodasesor.com')
    dest.search = url.search
    return Response.redirect(dest.toString(), 301)
  }

  if (!response.ok) {
    return response
  }

  try {
    const ct = response.headers.get('content-type') || ''
    if (ct.includes('text/html')) {
      const html = await response.clone().text()
      // Preserve Nexus landings AND static blog HTML (blogs use seo-blog-*, not seo-service-hero).
      if (
        html.includes('seo-service-hero') ||
        html.includes('seo-section') ||
        html.includes('seo-blog-') ||
        html.includes('seo-blog-conversion')
      ) {
        return response
      }
    }
  } catch {
    // If we can't inspect the body, prefer preserving the current response
    // over a blind redirect that could orphan Nexus landings.
    return response
  }

  // SPA soft-404 / missing landing → one-hop 301 to apex + trailing slash
  // (absolute apex skips an extra www→apex hop when edge runs on www)
  const destPath = withTrailingSlash(canonical)
  const dest = new URL(destPath, 'https://bodasesor.com')
  dest.search = url.search
  return Response.redirect(dest.toString(), 301)
}
