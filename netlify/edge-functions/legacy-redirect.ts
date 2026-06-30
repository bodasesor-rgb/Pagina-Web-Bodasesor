import type { Context } from '@netlify/edge-functions'

interface RedirectMapFile {
  entries: Record<string, string>
}

/** Backup if redirects-map.json is unavailable (bad deploy / SPA rewrite) */
const CRITICAL: Record<string, string> = {
  '/products/tarima-madera': 'https://bodasesor.com/pistas-tarimas/tarima-madera',
  '/collections/xv-anos-cdmx': 'https://bodasesor.com/xv-anos/ciudad-de-mexico',
  '/products/tarima-vinil': 'https://bodasesor.com/pistas-tarimas/pista-madera',
}

let cachedMap: Record<string, string> | null = null

async function loadMap(origin: string): Promise<Record<string, string>> {
  if (cachedMap) return cachedMap

  const res = await fetch(`${origin}/redirects-map.json`, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`redirects-map.json ${res.status}`)

  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('json')) {
    throw new Error('redirects-map.json returned non-JSON')
  }

  const data = (await res.json()) as RedirectMapFile
  cachedMap = data.entries
  return cachedMap
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

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url)
  const pathname = decodeURIComponent(url.pathname).replace(/\/+$/, '') || '/'

  let dest: string | undefined

  try {
    const map = await loadMap(url.origin)
    dest = lookup(map, pathname, url.search)
  } catch {
    dest = lookup(CRITICAL, pathname, url.search)
  }

  if (dest) {
    return Response.redirect(resolveDestination(dest, url.origin), 301)
  }

  if (pathname.startsWith('/pages/')) {
    return Response.redirect(`${url.origin}/`, 301)
  }

  if (pathname.startsWith('/collections/')) {
    return Response.redirect(`${url.origin}/banquetes-catering`, 301)
  }

  if (pathname.startsWith('/products/')) {
    return Response.redirect(`${url.origin}/banquetes-catering`, 301)
  }

  return context.next()
}
