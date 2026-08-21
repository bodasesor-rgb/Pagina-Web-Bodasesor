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
 * Always prefer context.next() so Netlify applies specific _redirects rows first.
 * Only keep tiny sync CRITICAL fallbacks for known bad deploys.
 *
 * Do NOT splat /blogs/noticias/:slug → /blog/:slug here: that bypasses curated
 * _redirects (slug renames) and creates multi-hop chains
 * (e.g. banquete-de-boda-2024 → banquetes-para-bodas-de-lujo → trailing slash).
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

  // Hub-only fallbacks when no specific _redirects row exists.
  // Post URLs (/blogs/noticias/…) must hit _redirects via context.next().
  if (pathname === '/blogs' || pathname === '/blogs/noticias') {
    return Response.redirect(resolveDestination('/blog', url.origin), 301)
  }

  return context.next()
}
