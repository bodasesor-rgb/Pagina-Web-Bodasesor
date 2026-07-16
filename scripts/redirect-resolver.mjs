/**
 * Resolve legacy Shopify URLs to valid bodasesor.com pages.
 * Prefer named product/catalog pages over generic hubs.
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')

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

/** Specific rules first — avoid dumping everything into /banquetes-catering */
const KEYWORD_RULES = [
  [/cabina|photobooth|photo.?booth|\bfotos?\b/i, '/fotografia/cabina-fotos'],
  [/fotograf|videograf|video.?mapping|video.?bodas|filmaci|streaming/i, '/fotografia'],
  [/batucada/i, '/shows/batucada-brasilena'],
  [/robot.?de.?led|led.?robot|robots?-led/i, '/shows'],
  [/stand.?up|comedy|comedia|teatro|circo|danza|bailarines?/i, '/shows'],
  [/crepas?/i, '/barra-crepas'],
  [/mixolog|cocteles?-mix|bartender/i, '/cocteles-mixologia'],
  [/paletas?(-helad|-para|-de)?/i, '/paletas-helados'],
  [/taquizas?|tacos?-de-guisado|tacos?-guisado|\btacos?\b/i, '/taquiza-guisados'],
  [/tacos?-parrill|parrillada/i, '/parrillada'],
  [/paninis?/i, '/barra-paninis'],
  [/sushi/i, '/barra-sushi'],
  [/mariscos?/i, '/barra-mariscos'],
  [/pasta/i, '/barra-pastas'],
  [/pizzas?/i, '/barra-pizzas'],
  [/tamales?|sopes?|tapas?|snacks?|antojitos?/i, '/banquetes-catering'],
  [/tres.?leches|pastel|cupcake|postre|dulces?|reposter/i, '/reposteria'],
  [/menu-por-tiempos|por-tiempos|3-tiempos|4-tiempos|2-tiempos/i, '/banquetes/3-tiempos'],
  [/buffet/i, '/banquetes/buffet'],
  [/joyer[ií]a|\bjoyas?\b|\banillos?\b|towers-rings|fusao-rings|oroplata|sion-joyas/i, '/wedding-planner'],
  [/vocalista|cantante|mariachi|trio-musical/i, '/musica'],
  [/transporte|trajes?|vestidos?/i, '/wedding-planner'],
  [/testimonios?|opiniones?/i, '/quienes-somos'],
  [/taller|curso/i, '/'],
  [/cotiza|contacto|contact/i, '/'],
  [/flor|flower|decor|ambientacion|terrarios?/i, '/floreria'],
  [/carpa|toldo|tent|stands?/i, '/carpas'],
  [/tarima|pista|escenario|estrado/i, '/pistas-tarimas'],
  [/silla|mesa|mobiliario|salas?|periquera|lounge|taburetes?|sofas?|muebles?/i, '/mesas-sillas'],
  [/vajilla|cristal|loza|cubier/i, '/vajillas'],
  [/colgante|entelado/i, '/colgantes'],
  [/wedding|novia|novio|bodas?/i, '/wedding-planner'],
  [/dj|musica|banda|grupo-musical/i, '/musica'],
  [/show|animador|payaso|mago/i, '/shows'],
  [/audio|ilumin|luz|sonido|pantalla/i, '/audio-iluminacion-video'],
  [/espacio|salon|jardin|hacienda|hotel|restaurante|santa-fe-roof|lucerna/i, '/espacios-eventos'],
  [/meseros?|servir/i, '/banquetes-catering'],
  [/bebida|barra|coctel|moctel|vino|cerveza|alcohol|tequila/i, '/barras-de-bebidas'],
  [/empresa|corporativ|business|oficinas?|activaciones?|team.?building/i, '/alimentos-empresas'],
  [/xv|quince/i, '/xv-anos'],
  [/graduaci/i, '/graduaciones'],
  [/baby.?shower/i, '/baby-shower'],
  [/comunion/i, '/primera-comunion'],
  [/cumple/i, '/cumpleanos'],
  [/inflable/i, '/inflables'],
  [/catering|banquete|comida|chef|canape|bocadillo|coffee-break|desayuno|gourmet/i, '/banquetes-catering'],
]

const PRODUCT_ALIASES = {
  'tarima-pintada-a-mano': '/pistas-tarimas/pista-pintada-mano',
  'tarima-vinil': '/pistas-tarimas/pista-madera',
  'tarima-basica-cdmx': '/pistas-tarimas/tarima-madera',
  'tarima-charol': '/pistas-tarimas/tarima-charol',
  'tarima-madera': '/pistas-tarimas/tarima-madera',
  'pista-pintada-mano': '/pistas-tarimas/pista-pintada-mano',
  'pista-pintada-a-mano': '/pistas-tarimas/pista-pintada-mano',
  'floreria-decoracion': '/floreria',
  'fotografia-video': '/fotografia',
  'mesas-sillas': '/mesas-sillas',
  'barra-bebidas': '/barra-bebidas',
  'cabina-de-fotos-para-eventos': '/fotografia/cabina-fotos',
  'cabina-de-fotos': '/fotografia/cabina-fotos',
  'cabina-fotos': '/fotografia/cabina-fotos',
  'batucada-para-eventos': '/shows/batucada-brasilena',
  'batucada': '/shows/batucada-brasilena',
  'crepas-para-eventos': '/barra-crepas',
  'crepas': '/barra-crepas',
  mixologia: '/cocteles-mixologia',
  'cocteles-mixologia': '/cocteles-mixologia',
  'paletas-para-eventos': '/paletas-helados',
  paletas: '/paletas-helados',
  'taquizas': '/taquiza-guisados',
  'taquiza': '/taquiza-guisados',
  'tacos-de-guisado': '/taquiza-guisados',
  'tacos-parrillada': '/parrillada',
  'sala-luxor': '/salas/sala-luxor-negro',
  'sala-led': '/salas-periqueras',
  'menu-por-tiempos': '/banquetes/3-tiempos',
  'renta-de-meseros': '/banquetes-catering',
  'puestos-de-comida': '/banquetes-catering',
  'robot-de-leds': '/shows',
  'silla-phoenix': '/mesas-sillas',
  'silla-tiffany': '/sillas/tiffany',
  'periquera-parota': '/periqueras/periquera-parota-nogal',
}

const SEO_TRAILING = [
  '-para-eventos-y-bodas',
  '-para-eventos',
  '-para-bodas',
  '-para-fiestas',
  '-para-xv-anos',
  '-de-renta',
  '-renta-de',
  '-cdmx-periqueras-para-eventos',
  '-periqueras-para-eventos',
]

function loadCatalog() {
  const productSlugs = new Set(
    [...fs.readFileSync(path.join(ROOT, 'src/data/products.js'), 'utf8').matchAll(/slug: "([^"]+)"/g)]
      .map((m) => m[1]),
  )

  const catalogPaths = new Map()
  const dataDir = path.join(ROOT, 'src/data')
  const files = fs
    .readdirSync(dataDir)
    .filter((f) => f.endsWith('-products.js') || f === 'banquetes-menus.js')

  for (const file of files) {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8')
    for (const m of content.matchAll(/"href":\s*"(\/[^"]+)"/g)) {
      const href = m[1]
      if (href === '/banquetes' || href.split('/').filter(Boolean).length < 2) {
        // keep menu detail paths; skip bare hubs for fuzzy product matching noise
        if (href.split('/').filter(Boolean).length < 2) continue
      }
      const slug = href.split('/').filter(Boolean).pop()
      if (slug && !catalogPaths.has(slug)) catalogPaths.set(slug, href)
    }
  }

  // Also index products.js hrefs that look like catalog detail paths
  const productsSrc = fs.readFileSync(path.join(ROOT, 'src/data/products.js'), 'utf8')
  for (const m of productsSrc.matchAll(/href:\s*"(\/[^"]+)"/g)) {
    const href = m[1]
    const parts = href.split('/').filter(Boolean)
    if (parts.length < 2) continue
    const slug = parts[parts.length - 1]
    if (slug && !catalogPaths.has(slug)) catalogPaths.set(slug, href)
  }

  return { productSlugs, catalogPaths }
}

export function getCatalogForClient() {
  const { productSlugs, catalogPaths } = loadCatalog()
  return {
    productSlugs: [...productSlugs],
    catalogPaths: Object.fromEntries(catalogPaths),
  }
}

const { productSlugs, catalogPaths } = loadCatalog()

/** Strip trailing -1/-2, city suffixes, and common SEO tails. */
export function stripCitySuffix(slug) {
  let working = String(slug || '')
    .toLowerCase()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  working = working.replace(/-\d+$/, '')

  for (const city of CITY_SUFFIXES) {
    // banquetes-en-cuernavaca
    if (working.endsWith(`-en-${city}`) && working.length > city.length + 4) {
      let base = working.slice(0, -(city.length + 4)).replace(/-\d+$/, '')
      base = stripSeoTrailing(base)
      return { base, city }
    }
    if (working.endsWith(`-${city}`) && working.length > city.length + 1) {
      let base = working.slice(0, -(city.length + 1)).replace(/-\d+$/, '')
      base = stripSeoTrailing(base)
      return { base, city }
    }
  }

  // city embedded before trailing SEO junk: foo-cdmx-periqueras-para-eventos
  for (const city of CITY_SUFFIXES) {
    const token = `-${city}-`
    const idx = working.lastIndexOf(token)
    if (idx > 0) {
      let base = working.slice(0, idx).replace(/-\d+$/, '')
      base = stripSeoTrailing(base)
      return { base, city }
    }
  }

  return { base: stripSeoTrailing(working), city: null }
}

function stripSeoTrailing(base) {
  let out = base
  let changed = true
  while (changed) {
    changed = false
    for (const tail of SEO_TRAILING) {
      if (out.endsWith(tail) && out.length > tail.length + 2) {
        out = out.slice(0, -tail.length)
        changed = true
      }
    }
  }
  return out.replace(/-\d+$/, '')
}

function normalizeCity(city) {
  if (!city) return null
  return city === 'cdmx' ? 'ciudad-de-mexico' : city
}

const NO_CITY_PATHS = new Set([
  '/',
  '/quienes-somos',
  '/galeria',
  '/blog',
  '/catalogos',
  '/buscar',
])

function withCity(pathname, city) {
  if (!city) return pathname
  const normalized = normalizeCity(city)
  const base = pathname.replace(/\/+$/, '') || '/'
  if (base === '/') return `/${normalized}`
  if (base.startsWith('/buscar')) return base
  if (NO_CITY_PATHS.has(base)) return base
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

/** Prefer the longest meaningful catalog slug match. */
function bestCatalogMatch(base) {
  if (!base || base.length < 4) return null
  let best = null
  let bestScore = 0

  for (const [catSlug, catPath] of catalogPaths) {
    if (base === catSlug) return catPath

    let score = 0
    if (base.includes(catSlug) && catSlug.length >= 6) {
      score = catSlug.length + 20
    } else if (catSlug.includes(base) && base.length >= 6) {
      score = base.length + 10
    } else {
      // token overlap (sala-luxor vs sala-luxor-negro)
      const a = new Set(base.split('-').filter((t) => t.length > 2))
      const b = catSlug.split('-').filter((t) => t.length > 2)
      const overlap = b.filter((t) => a.has(t)).length
      if (overlap >= 2 && overlap / b.length >= 0.5) {
        score = overlap * 5 + Math.min(base.length, catSlug.length)
      }
    }

    if (score > bestScore) {
      bestScore = score
      best = catPath
    }
  }

  return bestScore >= 10 ? best : null
}

function resolveProductSlug(slug) {
  const decoded = decodeURIComponent(slug).toLowerCase()
  if (PRODUCT_ALIASES[decoded]) return PRODUCT_ALIASES[decoded]

  const { base, city } = stripCitySuffix(decoded)
  if (PRODUCT_ALIASES[base]) return withCity(PRODUCT_ALIASES[base], city)

  if (productSlugs.has(base)) return withCity(`/${base}`, city)
  if (catalogPaths.has(base)) return withCity(catalogPaths.get(base), city)

  const catalogHit = bestCatalogMatch(base)
  if (catalogHit) return withCity(catalogHit, city)

  const keyword = matchKeyword(base) || matchKeyword(decoded)
  if (keyword) return withCity(keyword, city)

  if (productSlugs.has(decoded)) return `/${decoded}`
  if (catalogPaths.has(decoded)) return catalogPaths.get(decoded)

  // Unknown: send to search with readable query (better than wrong hub)
  const q = base.replace(/-/g, ' ').trim()
  return q ? `/buscar?q=${encodeURIComponent(q)}` : '/banquetes-catering'
}

export function resolveLegacyPath(fromPath) {
  if (fromPath.startsWith('/pages/quienes-somos')) return '/quienes-somos'
  if (fromPath.startsWith('/pages/contact')) return '/'
  if (fromPath.startsWith('/pages/contacto')) return '/'

  if (fromPath.startsWith('/blogs/noticias/')) {
    let slug = decodeURIComponent(fromPath.split('/').pop() || '')
    slug = slug.replace(/®️/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
    if (slug.includes('estrategias-y-consejos')) {
      slug = 'estrategias-y-consejos-para-recaudar-fondos-para-causas-importantes-bodasesor-2024'
    }
    return `/blog/${slug}`
  }

  if (fromPath.startsWith('/blogs/')) return '/blog'

  if (fromPath.startsWith('/products/')) {
    const slug = fromPath.replace(/^\/products\//, '').split('?')[0]
    return resolveProductSlug(slug)
  }

  if (fromPath.startsWith('/collections/')) {
    const slug = fromPath.replace(/^\/collections\//, '').split('?')[0]
    const decoded = decodeURIComponent(slug).toLowerCase()
    const { base, city } = stripCitySuffix(decoded)

    if (PRODUCT_ALIASES[base]) return withCity(PRODUCT_ALIASES[base], city)
    if (productSlugs.has(base)) return withCity(`/${base}`, city)

    const mapped = matchCollectionBase(base)
    if (mapped) return withCity(mapped, city)

    const catalogHit = bestCatalogMatch(base)
    if (catalogHit) return withCity(catalogHit, city)

    if (productSlugs.has(decoded)) return `/${decoded}`

    const keyword = matchKeyword(base) || matchKeyword(decoded)
    if (keyword) return withCity(keyword, city)

    const q = base.replace(/-/g, ' ').trim()
    return q ? `/buscar?q=${encodeURIComponent(q)}` : '/banquetes-catering'
  }

  return null
}

export function validateResolver() {
  const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'public/redirects-map.json'), 'utf8')).entries
  let ok = 0
  let bad = 0
  for (const [from, dest] of Object.entries(map)) {
    if (!from.startsWith('/products/') && !from.startsWith('/collections/')) continue
    if (from.includes(':')) continue
    const pathOnly = dest.replace('https://bodasesor.com', '')
    if (pathOnly.startsWith('/buscar')) {
      ok++
      continue
    }
    const slug = pathOnly.split('/').filter(Boolean).pop()
    const valid =
      productSlugs.has(slug) ||
      [...catalogPaths.values()].some((p) => p === pathOnly || pathOnly.startsWith(`${p}/`)) ||
      [
        '/banquetes-catering',
        '/banquetes',
        '/bodas',
        '/xv-anos',
        '/blog',
        '/pistas-tarimas',
        '/floreria',
        '/mesas-sillas',
        '/shows',
        '/musica',
        '/fotografia',
        '/wedding-planner',
        '/quienes-somos',
        '/',
      ].some((p) => pathOnly === p || pathOnly.startsWith(`${p}/`))
    if (valid) ok++
    else bad++
  }
  return { ok, bad }
}
