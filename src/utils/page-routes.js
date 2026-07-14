/** Route resolution for catch-all handlers — keep in sync with App.jsx routes */

export const STANDALONE_PATHS = new Set([
  '/banquetes-catering',
  '/barras-de-bebidas',
  '/mesas-personalizadas',
  '/combinaciones-mesas-sillas',
  '/vajillas',
  '/colgantes',
  '/entelados',
  '/floreria',
  '/shows',
  '/pistas-tarimas',
  '/salas-periqueras',
  '/reposteria',
  '/wedding-planner',
  '/musica',
  '/fotografia',
  '/alimentos-empresas',
  '/espacios-eventos',
  '/carpas',
  '/audio-iluminacion-video',
  '/galeria',
  '/catalogos',
  '/quienes-somos',
  '/blog',
  '/buscar',
])

/** Catalog prefixes with /{catalog}/:product detail pages */
export const DETAIL_CATALOGS = new Set([
  'pistas-tarimas',
  'vajillas',
  'colgantes',
  'entelados',
  'floreria',
  'shows',
  'reposteria',
  'wedding-planner',
  'musica',
  'fotografia',
  'alimentos-empresas',
  'espacios-eventos',
  'carpas',
  'audio-iluminacion-video',
  'combinaciones',
])

export const BANQUET_PARENT_SLUGS = new Set([
  'banquetes',
  'banquete-kosher',
  'banquete-mexicano',
  'banquete-navideno',
])

/** Nexus / legacy slug → canonical SPA service path */
export const SERVICE_SLUG_ALIASES = {
  banquetes: '/banquetes-catering',
  catering: '/banquetes-catering',
  eventos: '/banquetes-catering',
  mobiliario: '/mesas-sillas',
  'mesas-y-sillas': '/mesas-sillas',
  decoracion: '/floreria',
  flores: '/floreria',
  foto: '/fotografia',
  video: '/fotografia',
  dj: '/musica',
  iluminacion: '/audio-iluminacion-video',
  audio: '/audio-iluminacion-video',
  quince: '/xv-anos',
  quinceanera: '/xv-anos',
  'xv-anos': '/xv-anos',
  '15-anos': '/xv-anos',
  corporativo: '/corporativos',
  empresas: '/alimentos-empresas',
}

function splitCatalogPath(basePath) {
  const segs = basePath.split('/').filter(Boolean)
  if (segs.length < 2) return null
  const catalog = segs[0]
  if (!DETAIL_CATALOGS.has(catalog)) return null
  return { catalog, slug: segs.slice(1).join('/') }
}

/**
 * Resolve a base path (city already stripped) to a route descriptor.
 * @returns {{ kind: string, [key: string]: string }}
 */
export function resolveBasePath(basePath) {
  if (basePath === '/') return { kind: 'home' }

  if (STANDALONE_PATHS.has(basePath)) {
    return { kind: 'standalone', path: basePath }
  }

  const detail = splitCatalogPath(basePath)
  if (detail) return { kind: 'detail', ...detail }

  const segs = basePath.split('/').filter(Boolean)

  if (segs.length === 2 && segs[0] === 'catalogos') {
    return { kind: 'catalogo', slug: segs[1] }
  }

  if (segs.length === 2 && BANQUET_PARENT_SLUGS.has(segs[0])) {
    return { kind: 'banquete-menu', parentSlug: segs[0], menuSlug: segs[1] }
  }

  if (segs.length === 1) {
    return { kind: 'service', slug: segs[0] }
  }

  if (segs.length === 2) {
    const [parent, child] = segs
    if (DETAIL_CATALOGS.has(parent)) {
      return { kind: 'detail', catalog: parent, slug: child }
    }
    if (BANQUET_PARENT_SLUGS.has(parent)) {
      return { kind: 'banquete-menu', parentSlug: parent, menuSlug: child }
    }
    // Standalone hub has its own child pages (e.g. /blog/:slug) — do not collapse to hub
    if (STANDALONE_PATHS.has(`/${parent}`) && parent !== 'blog' && parent !== 'catalogos') {
      return { kind: 'standalone', path: `/${parent}` }
    }
    return { kind: 'service', slug: child }
  }

  return { kind: 'service', slug: segs[segs.length - 1] }
}

/** Resolve /eventos/{slug} Nexus legacy paths like bodas-cdmx */
export function resolveEventosSlug(slug, citySlugs) {
  if (!slug) return '/banquetes-catering'

  for (const citySlug of citySlugs) {
    if (slug.endsWith(`-${citySlug}`) && slug.length > citySlug.length + 1) {
      const service = slug.slice(0, -(citySlug.length + 1))
      const base = SERVICE_SLUG_ALIASES[service] || `/${service}`
      return `${base}/${citySlug}`.replace(/\/+/g, '/')
    }
  }

  const aliased = SERVICE_SLUG_ALIASES[slug]
  if (aliased) return aliased

  return `/${slug}`.replace(/\/+/g, '/')
}
