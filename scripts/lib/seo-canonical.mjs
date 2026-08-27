/** Node-safe canonical URL helpers (mirrors src/utils/seo-head.js). */
const SITE_BASE = 'https://bodasesor.com'

export function canonicalPath(pathname) {
  const raw = String(pathname || '/').split(/[?#]/)[0] || '/'
  const clean = raw.replace(/\/+$/, '') || '/'
  if (clean === '/') return '/'
  return `${clean}/`
}

export function absoluteUrl(pathname) {
  const path = canonicalPath(pathname)
  return `${SITE_BASE}${path === '/' ? '/' : path}`
}
