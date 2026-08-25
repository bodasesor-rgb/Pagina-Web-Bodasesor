import { resolveLegacyPathClient, isLegacyShopifyPath } from './utils/legacy-redirect.js'
import { toCanonicalCityPath } from './utils/city-url.js'

const pathOnly = location.pathname
const search = location.search
const hash = location.hash

function withTrailingSlash(p) {
  if (!p || p === '/') return '/'
  if (p.includes('?') || p.includes('#')) return p
  return p.endsWith('/') ? p : `${p}/`
}

if (isLegacyShopifyPath(pathOnly)) {
  const dest = resolveLegacyPathClient(`${pathOnly}${search}`)
  if (dest) location.replace(dest)
} else {
  const canonical = toCanonicalCityPath(pathOnly)
  const normalized = pathOnly.replace(/\/+$/, '') || '/'
  if (canonical !== normalized) {
    location.replace(`${withTrailingSlash(canonical)}${search}${hash}`)
  }
}
