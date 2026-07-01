import { resolveLegacyPathClient, isLegacyShopifyPath } from './utils/legacy-redirect.js'

const path = `${location.pathname}${location.search}`
if (isLegacyShopifyPath(location.pathname)) {
  const dest = resolveLegacyPathClient(path)
  if (dest) location.replace(dest)
}
