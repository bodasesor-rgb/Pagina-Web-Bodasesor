/**
 * Client-side legacy URL resolver (mirrors scripts/redirect-resolver.mjs).
 * Used when Netlify _redirects / edge are not active yet.
 */
import catalogData from '../data/legacy-catalog-hrefs.json'

const CITY_SUFFIXES = [
  'san-miguel-allende', 'san-luis-potosi', 'ciudad-de-mexico', 'estado-de-mexico',
  'puerto-vallarta', 'los-cabos', 'aguascalientes', 'guadalajara', 'monterrey',
  'cuernavaca', 'cancun', 'tijuana', 'veracruz', 'morelia', 'oaxaca', 'pachuca',
  'queretaro', 'toluca', 'torreon', 'merida', 'puebla', 'leon', 'acapulco',
  'valle-de-bravo', 'cdmx', 'cozumel', 'vallarta',
].sort((a, b) => b.length - a.length)

const COLLECTION_PREFIX_MAP = [
  ['banquetes-para-eventos-pequenos-en', '/banquetes-catering'],
  ['banquetes-para-fiestas-infantiles-en', '/banquetes-catering'],
  ['banquetes-para-xv-anos-en', '/xv-anos'],
  ['banquetes-para-bautizos-en', '/banquetes-catering'],
  ['servicio-de-banqueteria-en', '/banquetes-catering'],
  ['servicio-de-banquetes-en', '/alimentos-empresas'],
  ['decoracion-y-floreria-para-eventos', '/floreria'],
  ['mobiliario-decoracion', '/mesas-sillas'],
  ['mobiliario-para-eventos', '/mesas-sillas'],
  ['reposteria-para-eventos', '/reposteria'],
  ['musica-para-eventos', '/musica'],
  ['shows-para-eventos', '/shows'],
  ['fotografia-y-video', '/fotografia'],
  ['eventos-corporativos', '/corporativos'],
  ['alimentos-empresas', '/alimentos-empresas'],
  ['espacios-eventos', '/espacios-eventos'],
  ['audio-iluminacion-video', '/audio-iluminacion-video'],
  ['pistas-tarimas', '/pistas-tarimas'],
  ['salas-periqueras', '/salas-periqueras'],
  ['wedding-planner', '/wedding-planner'],
  ['primera-comunion', '/primera-comunion'],
  ['graduaciones', '/graduaciones'],
  ['baby-shower', '/baby-shower'],
  ['cumpleanos', '/cumpleanos'],
  ['corporativos', '/corporativos'],
  ['inflables', '/inflables'],
  ['lanzamientos', '/corporativos'],
  ['desayunos', '/banquetes-catering'],
  ['comidas', '/banquetes-catering'],
  ['cenas', '/cenas'],
  ['bodas-en', '/bodas'],
  ['xv-anos', '/xv-anos'],
  ['bodas', '/bodas'],
  ['floreria', '/floreria'],
  ['carpas', '/carpas'],
  ['vajillas', '/vajillas'],
  ['colgantes', '/colgantes'],
  ['shows', '/shows'],
  ['musica', '/musica'],
  ['fotografia', '/fotografia'],
  ['reposteria', '/reposteria'],
  ['banquetes', '/banquetes-catering'],
  ['catering', '/banquetes-catering'],
  ['eventos', '/banquetes-catering'],
]

const KEYWORD_RULES = [
  [/fotograf|photo|video|film/i, '/fotografia'],
  [/flor|flower|decor/i, '/floreria'],
  [/carpa|toldo|tent/i, '/carpas'],
  [/tarima|pista|escenario|estrado/i, '/pistas-tarimas'],
  [/silla|mesa|mobiliario|salas|periquera|lounge/i, '/mesas-sillas'],
  [/vajilla|cristal|loza|cubier/i, '/vajillas'],
  [/colgante|entelado/i, '/colgantes'],
  [/wedding|novia|novio|boda(?!s)/i, '/wedding-planner'],
  [/dj|musica|banda|grupo/i, '/musica'],
  [/show|animador|payaso|mago/i, '/shows'],
  [/reposter|pastel|cupcake|postre/i, '/reposteria'],
  [/audio|ilumin|luz|sonido|pantalla/i, '/audio-iluminacion-video'],
  [/espacio|salon|jardin|hacienda|hotel|restaurante/i, '/espacios-eventos'],
  [/catering|banquete|taquiza|parrill|comida|chef|mesero|buffet|canape|bocadillo|coffee-break/i, '/banquetes-catering'],
  [/bebida|barra|coctel|moctel|vino|cerveza/i, '/barras-de-bebidas'],
  [/empresa|corporativ/i, '/alimentos-empresas'],
  [/xv|quince/i, '/xv-anos'],
  [/graduaci/i, '/graduaciones'],
  [/baby.?shower/i, '/baby-shower'],
  [/comunion/i, '/primera-comunion'],
  [/cumple/i, '/cumpleanos'],
  [/inflable/i, '/inflables'],
]

const PRODUCT_ALIASES = {
  'tarima-pintada-a-mano': '/pistas-tarimas/pista-pintada-mano',
  'tarima-vinil': '/pistas-tarimas/pista-madera',
  'tarima-basica-cdmx': '/pistas-tarimas/tarima-madera',
  'tarima-charol': '/pistas-tarimas/tarima-charol',
  'tarima-madera': '/pistas-tarimas/tarima-madera',
  'floreria-decoracion': '/floreria',
  'fotografia-video': '/fotografia',
  'mesas-sillas': '/mesas-sillas',
  'barra-bebidas': '/barra-bebidas',
}

const productSlugs = new Set(catalogData.productSlugs)
const catalogPaths = new Map(Object.entries(catalogData.catalogPaths))

function stripCitySuffix(slug) {
  for (const city of CITY_SUFFIXES) {
    if (slug.endsWith(`-${city}`) && slug.length > city.length + 1) {
      return { base: slug.slice(0, -(city.length + 1)), city }
    }
  }
  return { base: slug, city: null }
}

function normalizeCity(city) {
  if (!city) return null
  return city === 'cdmx' ? 'ciudad-de-mexico' : city
}

function withCity(pathname, city) {
  if (!city) return pathname
  const normalized = normalizeCity(city)
  const base = pathname.replace(/\/+$/, '') || '/'
  if (base === '/') return `/${normalized}`
  return `${base}/${normalized}`.replace(/\/+/g, '/')
}

function matchKeyword(slug) {
  for (const [re, dest] of KEYWORD_RULES) {
    if (re.test(slug)) return dest
  }
  return null
}

function matchCollectionBase(base) {
  for (const [prefix, dest] of COLLECTION_PREFIX_MAP) {
    if (base === prefix || base.startsWith(`${prefix}-`)) return dest
  }
  return null
}

function resolveProductSlug(slug) {
  if (PRODUCT_ALIASES[slug]) return PRODUCT_ALIASES[slug]

  const { base, city } = stripCitySuffix(slug)

  if (productSlugs.has(base)) return withCity(`/${base}`, city)
  if (catalogPaths.has(base)) return withCity(catalogPaths.get(base), city)

  for (const [catSlug, catPath] of catalogPaths) {
    if (base.includes(catSlug) || catSlug.includes(base)) {
      return withCity(catPath, city)
    }
  }

  const keyword = matchKeyword(base)
  if (keyword) return withCity(keyword, city)

  if (productSlugs.has(slug)) return `/${slug}`
  if (catalogPaths.has(slug)) return catalogPaths.get(slug)

  return '/banquetes-catering'
}

export function resolveLegacyPathClient(fromPath) {
  const path = decodeURIComponent(fromPath).replace(/\/+$/, '') || '/'

  if (path.startsWith('/pages/quienes-somos')) return '/quienes-somos'
  if (path.startsWith('/pages/contact')) return '/'

  if (path.startsWith('/blogs/noticias/')) {
    let slug = path.split('/').pop() || ''
    slug = slug.replace(/®️/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
    if (slug.includes('estrategias-y-consejos')) {
      slug = 'estrategias-y-consejos-para-recaudar-fondos-para-causas-importantes-bodasesor-2024'
    }
    return `/blog/${slug}`
  }

  if (path.startsWith('/blogs/')) return '/blog'

  if (path.startsWith('/products/')) {
    const slug = path.replace(/^\/products\//, '').split('?')[0]
    return resolveProductSlug(slug)
  }

  if (path.startsWith('/collections/')) {
    const slug = path.replace(/^\/collections\//, '').split('?')[0]
    const { base, city } = stripCitySuffix(slug)

    if (productSlugs.has(base)) return withCity(`/${base}`, city)

    const mapped = matchCollectionBase(base)
    if (mapped) return withCity(mapped, city)

    if (productSlugs.has(slug)) return `/${slug}`

    const keyword = matchKeyword(base)
    if (keyword) return withCity(keyword, city)

    return '/banquetes-catering'
  }

  return null
}

export function isLegacyShopifyPath(path) {
  const p = path.replace(/\/+$/, '') || '/'
  return (
    p.startsWith('/products/') ||
    p.startsWith('/collections/') ||
    p.startsWith('/blogs/') ||
    p.startsWith('/pages/')
  )
}
