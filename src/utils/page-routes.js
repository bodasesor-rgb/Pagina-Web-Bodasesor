/** Route resolution for catch-all handlers — keep in sync with App.jsx routes */

export const STANDALONE_PATHS = new Set([
  '/banquetes-catering',
  '/barras-de-bebidas',
  '/mesas-personalizadas',
  '/combinaciones-mesas-sillas',
  '/vajillas',
  '/colgantes',
  '/barras',
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
  '/aviso-de-privacidad',
  '/terminos-y-condiciones',
  '/blog',
  '/buscar',
])

/** Catalog prefixes with /{catalog}/:product detail pages */
export const DETAIL_CATALOGS = new Set([
  'pistas-tarimas',
  'vajillas',
  'colgantes',
  'barras',
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

const KNOWN_ONE_SEGMENT = new Set([
  ...Object.keys(SERVICE_SLUG_ALIASES),
  ...[...STANDALONE_PATHS].map((p) => p.replace(/^\//, '')),
  'bodas',
  'xv-anos',
  'graduaciones',
  'baby-shower',
  'primera-comunion',
  'cumpleanos',
  'corporativos',
  'inflables',
  'cenas',
  'mesas-sillas',
  'banquetes-catering',
])

function isKnownServicePath(pathname) {
  const base = pathname.replace(/\/+$/, '') || '/'
  if (base === '/') return true
  if (STANDALONE_PATHS.has(base)) return true
  const segs = base.split('/').filter(Boolean)
  if (segs.length === 1) return KNOWN_ONE_SEGMENT.has(segs[0])
  if (segs.length >= 2 && DETAIL_CATALOGS.has(segs[0])) return true
  if (segs.length >= 2 && BANQUET_PARENT_SLUGS.has(segs[0])) return true
  return false
}

/** Resolve /eventos/{slug} Nexus legacy paths like bodas-cdmx */
export function resolveEventosSlug(slug, citySlugs) {
  if (!slug) return '/banquetes-catering'

  const cities = [...citySlugs].sort((a, b) => b.length - a.length)

  for (const citySlug of cities) {
    if (slug.endsWith(`-${citySlug}`) && slug.length > citySlug.length + 1) {
      const service = slug.slice(0, -(citySlug.length + 1))
      const base = SERVICE_SLUG_ALIASES[service] || `/${service}`
      const target = `${base}/${citySlug}`.replace(/\/+/g, '/')
      // Unknown vendor/service slugs → hub, not a dead /{random}/city page
      if (!isKnownServicePath(base)) return '/banquetes-catering'
      return target
    }
  }

  const aliased = SERVICE_SLUG_ALIASES[slug]
  if (aliased) return aliased

  const fallback = `/${slug}`.replace(/\/+/g, '/')
  if (!isKnownServicePath(fallback)) return '/banquetes-catering'
  return fallback
}
