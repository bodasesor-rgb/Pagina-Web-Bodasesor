import type { Context } from '@netlify/edge-functions'

interface RedirectMapFile {
  entries: Record<string, string>
}

let cachedMap: Record<string, string> | null = null

async function loadMap(origin: string): Promise<Record<string, string>> {
  if (cachedMap) return cachedMap

  const res = await fetch(`${origin}/redirects-map.json`, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) {
    throw new Error(`redirects-map.json ${res.status}`)
  }

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

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url)
  const pathname = decodeURIComponent(url.pathname).replace(/\/+$/, '') || '/'
  const withQuery = `${pathname}${url.search}`
  const withSlash = `${pathname}/`

  try {
    const map = await loadMap(url.origin)
    const dest =
      map[withQuery] ||
      map[pathname] ||
      map[withSlash]

    if (dest) {
      return Response.redirect(resolveDestination(dest, url.origin), 301)
    }
  } catch {
    // _redirects handles legacy URLs when map unavailable
  }

  return context.next()
}
