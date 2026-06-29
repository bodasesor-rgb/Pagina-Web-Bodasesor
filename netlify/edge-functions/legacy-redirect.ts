import type { Context } from '@netlify/edge-functions'
import mapFile from './redirects-map.json'

interface RedirectMapFile {
  entries: Record<string, string>
}

const REDIRECT_MAP = (mapFile as RedirectMapFile).entries

function resolveDestination(raw: string, origin: string): string {
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  return `${origin}${raw.startsWith('/') ? raw : `/${raw}`}`
}

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url)
  const pathname = decodeURIComponent(url.pathname).replace(/\/+$/, '') || '/'
  const withQuery = `${pathname}${url.search}`
  const withSlash = `${pathname}/`

  const dest =
    REDIRECT_MAP[withQuery] ||
    REDIRECT_MAP[pathname] ||
    REDIRECT_MAP[withSlash]

  if (dest) {
    return Response.redirect(resolveDestination(dest, url.origin), 301)
  }

  return context.next()
}
