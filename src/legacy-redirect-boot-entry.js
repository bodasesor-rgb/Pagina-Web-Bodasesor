import { resolveLegacyPathClient, isLegacyShopifyPath } from './utils/legacy-redirect.js'
import { toCanonicalCityPath } from './utils/city-url.js'

const pathOnly = location.pathname
const search = location.search
const hash = location.hash

if (isLegacyShopifyPath(pathOnly)) {
  const dest = resolveLegacyPathClient(`${pathOnly}${search}`)
  if (dest) location.replace(dest)
} else {
  const canonical = toCanonicalCityPath(pathOnly)
  const normalized = pathOnly.replace(/\/+$/, '') || '/'
  if (canonical !== normalized) {
    location.replace(`${canonical}${search}${hash}`)
  }
}
