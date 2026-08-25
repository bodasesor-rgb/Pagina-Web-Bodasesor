import type { Context } from '@netlify/edge-functions'

/** Minimal fallbacks if dist/_redirects is missing / stale from a bad deploy */
const CRITICAL: Record<string, string> = {
  '/products/tarima-madera': 'https://bodasesor.com/pistas-tarimas/tarima-madera/',
  '/collections/xv-anos-cdmx': 'https://bodasesor.com/xv-anos/ciudad-de-mexico/',
  '/products/tarima-vinil': 'https://bodasesor.com/pistas-tarimas/pista-madera/',
  // High-impression Shopify banquetes collections (must not land on /banquetes menu hub)
  '/collections/banquetes-cdmx': 'https://bodasesor.com/banquetes-catering/ciudad-de-mexico/',
  '/collections/banquetes-cdmx-1': 'https://bodasesor.com/banquetes-catering/ciudad-de-mexico/',
  '/collections/banquetes-cdmx-2': 'https://bodasesor.com/banquetes-catering/ciudad-de-mexico/',
  '/collections/banquetes-en-cdmx': 'https://bodasesor.com/banquetes-catering/ciudad-de-mexico/',
  '/collections/banquetes-para-bodas-cdmx': 'https://bodasesor.com/banquetes-catering/ciudad-de-mexico/',
  '/collections/banquetes-para-bodas-cdmx-1': 'https://bodasesor.com/banquetes-catering/ciudad-de-mexico/',
  '/collections/banquetes-para-eventos-cdmx': 'https://bodasesor.com/banquetes-catering/ciudad-de-mexico/',
  '/collections/banquetes-para-fiestas': 'https://bodasesor.com/banquetes-catering/',
  '/collections/banquetes-para-fiestas-cdmx': 'https://bodasesor.com/banquetes-catering/ciudad-de-mexico/',
  '/collections/banquetes-para-xv-anos-cdmx': 'https://bodasesor.com/xv-anos/ciudad-de-mexico/',
  // Top GSC multi-hop leftovers (www → apex path → final). Edge on www collapses to one hop.
  '/products/catering-cdmx-1': 'https://bodasesor.com/banquetes-catering/ciudad-de-mexico/',
  '/products/ncatering-catering-cdmx': 'https://bodasesor.com/banquetes-catering/ciudad-de-mexico/',
  '/collections/precio-de-catering-para-fiestas-cdmx':
    'https://bodasesor.com/banquetes-catering/ciudad-de-mexico/',
  '/collections/servicios-de-catering-cdmx': 'https://bodasesor.com/banquetes-catering/ciudad-de-mexico/',
  '/collections/catering-empresarial-cdmx': 'https://bodasesor.com/alimentos-empresas/ciudad-de-mexico/',
  '/collections/banquetes-empresariales-cdmx':
    'https://bodasesor.com/alimentos-empresas/ciudad-de-mexico/',
  '/collections/banquetes-empresariales-en-cdmx':
    'https://bodasesor.com/alimentos-empresas/ciudad-de-mexico/',
  '/collections/flores-frescas-para-bodas-de-lujo-cdmx':
    'https://bodasesor.com/floreria/ciudad-de-mexico/',
  '/collections/arreglos-florales-para-ceremonias-cdmx':
    'https://bodasesor.com/floreria/ciudad-de-mexico/',
  '/collections/proveedores-de-letras-gigantes-cdmx':
    'https://bodasesor.com/floreria/ciudad-de-mexico/',
  '/collections/mobiliario-corporativo': 'https://bodasesor.com/mesas-sillas/ciudad-de-mexico/',
  '/collections/presupuesto-para-una-boda-cdmx': 'https://bodasesor.com/bodas/ciudad-de-mexico/',
  '/collections/wedding-planner-queretaro': 'https://bodasesor.com/wedding-planner/queretaro/',
  '/collections/wedding-planner-valle-de-bravo':
    'https://bodasesor.com/wedding-planner/valle-de-bravo/',
  '/collections/musica-para-eventos-guadalajara': 'https://bodasesor.com/musica/guadalajara/',
  '/collections/precio-de-fotografia-para-bodas-cdmx':
    'https://bodasesor.com/fotografia/ciudad-de-mexico/',
  '/collections/eventos-corporativos-gustavo-a-madero':
    'https://bodasesor.com/corporativos/ciudad-de-mexico/',
}

function withTrailingSlash(raw: string): string {
  if (!raw || raw === '/') return '/'
  try {
    if (raw.startsWith('http://') || raw.startsWith('https://')) {
      const u = new URL(raw)
      if (u.search || u.hash || u.pathname === '/') return raw
      if (!u.pathname.endsWith('/')) u.pathname += '/'
      return u.toString()
    }
  } catch {
    /* ignore */
  }
  if (raw.includes('?') || raw.includes('#')) return raw
  return raw.endsWith('/') ? raw : `${raw}/`
}

function resolveDestination(raw: string, _origin: string): string {
  // Always apex — collapses www + path into one Location when edge handles the request.
  if (raw.startsWith('http://') || raw.startsWith('https://')) return withTrailingSlash(raw)
  const path = raw.startsWith('/') ? raw : `/${raw}`
  return withTrailingSlash(`https://bodasesor.com${path}`)
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
    return Response.redirect(resolveDestination('/blog/', url.origin), 301)
  }

  return context.next()
}
