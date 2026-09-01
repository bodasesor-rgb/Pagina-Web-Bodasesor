import { parseCityFromPath } from './city-url'
import {
  STANDALONE_PATHS,
  DETAIL_CATALOGS,
  resolveBasePath,
} from './page-routes'

const CATALOG_VERTICAL_HUB = {
  '/catalogo/pistas-tarimas': '/pistas-tarimas',
  '/catalogo/vajillas': '/vajillas',
  '/catalogo/colgantes': '/colgantes',
}

const LEGACY_SKIP_PREFIXES = [
  '/products/',
  '/collections/',
  '/pages/',
  '/blogs/',
  '/eventos/',
]

function splitCatalogPath(basePath) {
  const segs = basePath.split('/').filter(Boolean)
  if (segs.length < 2) return null
  const catalog = segs[0]
  if (!DETAIL_CATALOGS.has(catalog)) return null
  return { catalog, slug: segs.slice(1).join('/') }
}

/** Routes that already render SeoRelatedLinks (richer hub + city links). */
function hasDedicatedSeoRelatedLinks(basePath) {
  if (/^\/(sillas|mesas|barras)\//.test(basePath)) return true

  const resolved = resolveBasePath(basePath)
  if (resolved.kind === 'banquete-menu') return true
  if (resolved.kind === 'service') {
    if (basePath.startsWith('/salas/')) return false
    if (basePath.startsWith('/periqueras/')) return false
    if (basePath.startsWith('/catalogo/')) return false
    return true
  }
  return false
}

export function resolveGlobalInternalLinksExclude(basePath) {
  if (STANDALONE_PATHS.has(basePath)) return basePath

  const vertical = CATALOG_VERTICAL_HUB[basePath]
  if (vertical) return vertical

  const detail = splitCatalogPath(basePath)
  if (detail) return `/${detail.catalog}`

  if (basePath.startsWith('/blog/')) return '/blog'
  if (basePath.startsWith('/salas/')) return '/salas-periqueras'
  if (basePath.startsWith('/periqueras/')) return '/salas-periqueras'
  if (basePath.startsWith('/catalogos/')) return '/catalogos'

  const resolved = resolveBasePath(basePath)
  if (resolved.kind === 'catalogo') return '/catalogos'
  if (resolved.kind === 'standalone') return resolved.path

  return undefined
}

/**
 * Whether to render the global PageInternalLinks block (before footer).
 * @param {string} basePath city-stripped path
 */
export function shouldShowGlobalInternalLinks(basePath) {
  if (!basePath || basePath === '/') return false
  if (LEGACY_SKIP_PREFIXES.some((p) => basePath.startsWith(p))) return false
  if (hasDedicatedSeoRelatedLinks(basePath)) return false
  return true
}

/**
 * @param {string} pathname full location from wouter
 */
export function getGlobalInternalLinksProps(pathname) {
  const normalized = (pathname || '/').replace(/\/+$/, '') || '/'
  const { basePath } = parseCityFromPath(normalized)
  if (!shouldShowGlobalInternalLinks(basePath)) return null
  return {
    excludeHref: resolveGlobalInternalLinksExclude(basePath),
  }
}
