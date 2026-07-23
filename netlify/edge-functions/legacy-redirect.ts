import type { Context } from '@netlify/edge-functions'

/** Minimal fallbacks if dist/_redirects is missing from a bad deploy */
const CRITICAL: Record<string, string> = {
  '/products/tarima-madera': 'https://bodasesor.com/pistas-tarimas/tarima-madera',
  '/collections/xv-anos-cdmx': 'https://bodasesor.com/xv-anos/ciudad-de-mexico',
  '/products/tarima-vinil': 'https://bodasesor.com/pistas-tarimas/pista-madera',
}

function resolveDestination(raw: string, origin: string): string {
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  return `${origin}${raw.startsWith('/') ? raw : `/${raw}`}`
}

function lookup(map: Record<string, string>, pathname: string, search: string): string | undefined {
  const withQuery = `${pathname}${search}`
  const withSlash = `${pathname}/`
  return map[withQuery] || map[pathname] || map[withSlash]
}

/**
 * Legacy Shopify paths (/products, /collections, /blogs, /pages).
 *
 * Precise 301 rules live in dist/_redirects (4200+ entries). This edge handler
 * must NOT fetch redirects-map.json — the ~400KB JSON parse can crash the edge
 * isolate and block all legacy URLs with "This edge function has crashed".
 *
 * Default: delegate to Netlify _redirects via context.next().
 * Sync fallbacks below only apply when _redirects is unavailable.
 */
export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url)
  const pathname = decodeURIComponent(url.pathname).replace(/\/+$/, '') || '/'

  const criticalDest = lookup(CRITICAL, pathname, url.search)
  if (criticalDest) {
    try {
      return Response.redirect(resolveDestination(criticalDest, url.origin), 301)
    } catch {
      // fall through to _redirects
    }
  }

  // Pattern fallback if a specific _redirects row is missing
  if (pathname.startsWith('/blogs/noticias/')) {
    let slug = pathname.split('/').pop() || ''
    slug = slug.replace(/®️/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
    if (slug.includes('estrategias-y-consejos')) {
      slug = 'estrategias-y-consejos-para-recaudar-fondos-para-causas-importantes-bodasesor-2024'
    }
    if (slug.includes('tipos-de-banquetes')) {
      slug = 'tipos-de-banquetes'
    }
    if (slug) {
      return Response.redirect(resolveDestination(`/blog/${slug}`, url.origin), 301)
    }
  }
  if (pathname === '/blogs' || pathname === '/blogs/noticias' || pathname.startsWith('/blogs/')) {
    return Response.redirect(resolveDestination('/blog', url.origin), 301)
  }

  return context.next()
}
