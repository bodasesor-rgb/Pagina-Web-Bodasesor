import type { Context } from '@netlify/edge-functions'

interface RedirectMapFile {
  entries: Record<string, string>
}

let cachedMap: Record<string, string> | null = null

async function loadMap(origin: string): Promise<Record<string, string>> {
  if (cachedMap) return cachedMap

  const res = await fetch(`${origin}/redirects-map.json`)
  if (!res.ok) {
    throw new Error(`Failed to load redirects-map.json: ${res.status}`)
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
    // Fall through to SPA if map fails to load
  }

  return context.next()
}
