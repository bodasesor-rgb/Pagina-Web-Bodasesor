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
  ['banquetes-para-xv-anos', '/xv-anos'],
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
  // Traffic-recovery: high-intent phrases before broad wedding/food catch-alls
  [/presupuesto.*(boda|bodas)|boda.?economica|pre-?boda/i, '/bodas'],
  [/ramos?.?de.?novia|bouquet.?novia/i, '/floreria/ramos-de-novia'],
  [/centros?.?de.?mesa|arreglos?.?florales?|arcos?.?florales?|flores?.?frescas|florer/i, '/floreria'],
  [/cabina|photobooth|photo.?booth/i, '/fotografia/cabina-fotos'],
  [/quesadillas?/i, '/puestos-quesadillas'],
  [/sangria|refrescos?|margarita|brindis|vino|cerveza|tequila|barra.?libre/i, '/barras-de-bebidas'],
  [/copa|vajilla|cristal|loza|cubier|bomker/i, '/vajillas'],
  [/reuniones?.?familiares?|recepcion|evento.?privado/i, '/banquetes-catering'],
  [/recordatorios?|souvenirs?|recuerdos?.?para.?bodas/i, '/wedding-planner'],
  [/publicidad|activaciones?|corporativ|empresarial|oficinas?/i, '/corporativos'],
  [/galeria|salon|venue|espacio|hacienda|jardin/i, '/espacios-eventos'],
  [/mobiliario.?corporativ|mobiliario/i, '/mesas-sillas'],
  [/catering.?para.?filmaci|catering.?filmaci|catering.?para.?filmacion/i, '/banquetes-catering'],
  [/fotograf|videograf|video.?mapping|video.?bodas|video-de-bodas|streaming|\bfotos?\b/i, '/fotografia'],
  [/ensaladas?/i, '/banquetes-catering'],
  [/bancos?(-de-bar|-vintage|-para)?/i, '/mesas-sillas'],
  [/coordinacion|event.?host|logistica.?de.?eventos|bautizos?/i, '/wedding-planner'],
  [/mole\b/i, '/banquetes-catering'],
  [/batucada/i, '/shows/batucada-brasilena'],
  [/robot.?de.?led|led.?robot|robots?-led/i, '/shows'],
  [/stand.?up|comedy|comedia|teatro|circo|danza|bailarines?/i, '/shows'],
  [/crepas?/i, '/barra-crepas'],
  [/mixolog|cocteles?-mix|bartender/i, '/cocteles-mixologia'],
  [/paletas?(-helad|-para|-de)?/i, '/paletas-helados'],
  [/taquizas?|tacos?-de-guisado|tacos?-guisado|\btacos?\b/i, '/taquiza-guisados'],
  [/parrillada-argentina|banquete-parrillada-argentina/i, '/parrillada-argentina'],
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
  [/taller|curso/i, '/banquetes-catering'],
  [/cotiza|contacto|contact/i, '/banquetes-catering'],
  [/flor|flower|decor|ambientacion|terrarios?/i, '/floreria'],
  [/carpa|toldo|tent|stands?/i, '/carpas'],
  [/tarima|pista|escenario|estrado/i, '/pistas-tarimas'],
  [/silla|mesa|lounge|taburetes?|sofas?|muebles?|periquera|salas?/i, '/mesas-sillas'],
  [/vajilla|cristal|loza|cubier/i, '/vajillas'],
  [/colgante|entelado/i, '/colgantes'],
  [/wedding.?planner|organizador/i, '/wedding-planner'],
  [/novia|novio|\bbodas?\b/i, '/bodas'],
  [/dj|musica|banda|grupo-musical/i, '/musica'],
  [/show|animador|payaso|mago|animacion/i, '/shows'],
  [/audio|ilumin|luz|sonido|pantalla/i, '/audio-iluminacion-video'],
  [/meseros?|servir/i, '/banquetes-catering'],
  [/bebida|barra|coctel|moctel|alcohol/i, '/barras-de-bebidas'],
  [/empresa|business|team.?building/i, '/alimentos-empresas'],
  [/xv|quince/i, '/xv-anos'],
  [/graduaci/i, '/graduaciones'],
  [/baby.?shower/i, '/baby-shower'],
  [/comunion/i, '/primera-comunion'],
  [/cumple/i, '/cumpleanos'],
  [/inflable/i, '/inflables'],
  [/catering|banquete|comida|chef|canape|bocadillo|coffee-break|desayuno|gourmet|servicio/i, '/banquetes-catering'],
  [/variedad|vouge|deloitte|tercera.?ronda/i, '/banquetes-catering'],
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
  parrillada: '/parrillada',
  'banquete-parrillada': '/parrillada',
  'banquete-parrillada-argentina': '/parrillada-argentina',
  'sala-luxor': '/salas/sala-luxor-negro',
  'sala-led': '/salas-periqueras',
  'menu-por-tiempos': '/banquetes/3-tiempos',
  'renta-de-meseros': '/banquetes-catering',
  'puestos-de-comida': '/banquetes-catering',
  'robot-de-leds': '/shows',
  'silla-phoenix': '/mesas-sillas',
  'silla-tiffany': '/sillas/tiffany',
  'silla-ghost': '/sillas/ghost',
  'silla-crossback': '/sillas/crossback',
  'silla-basket': '/sillas/basket',
  'silla-tolix': '/sillas/tolix',
  'silla-camila': '/sillas/camila',
  'silla-antonella': '/sillas/antonella',
  'silla-tiffany-infantil': '/sillas/tiffany-infantil',
  periqueras: '/salas-periqueras',
  sillas: '/mesas-sillas',
  mesas: '/mesas-sillas',
  'periquera-parota': '/periqueras/periquera-parota-nogal',
  'tipos-de-banquetes': '/blog/tipos-de-banquetes',
  'catering-para-filmaciones-cdmx': '/banquetes-catering/ciudad-de-mexico',
  'catering-para-filmaciones': '/banquetes-catering',
  'ensaladas-cdmx': '/banquetes-catering/ciudad-de-mexico',
  ensaladas: '/banquetes-catering',
  'inflables-pachuca': '/inflables/pachuca',
  'precio-de-mobiliario-moderno-cdmx': '/mesas-sillas/ciudad-de-mexico',
  'mesas-de-proyeccion-cdmx-1': '/mesas-sillas/ciudad-de-mexico',
  'mesas-de-proyeccion-cdmx': '/mesas-sillas/ciudad-de-mexico',
  'el-gran-mobiliario-sillas-y-mesas-cdmx': '/mesas-sillas/ciudad-de-mexico',
  'arcos-florales-para-ceremonias-cdmx': '/floreria/ciudad-de-mexico',
  'flores-frescas-cdmx': '/floreria/ciudad-de-mexico',
  'precio-de-decoracion-tematica-cdmx': '/floreria/ciudad-de-mexico',
  'video-de-bodas-cdmx': '/fotografia/ciudad-de-mexico',
  'cotiza-tu-evento': '/banquetes-catering',
  cisidat: '/banquetes-catering',
  'cabo-cakery': '/reposteria',
  'margarita-cdmx': '/barras-de-bebidas/ciudad-de-mexico',
  margarita: '/barras-de-bebidas',
  'brindis-de-boda-cdmx': '/barras-de-bebidas/ciudad-de-mexico',
  'brindis-de-boda': '/barras-de-bebidas',
  'presupuesto-para-bodas-economicas-cdmx': '/bodas/ciudad-de-mexico',
  'presupuesto-para-bodas-economicas': '/bodas',
  'presupuesto-para-una-boda-cdmx': '/bodas/ciudad-de-mexico',
  'presupuesto-para-una-boda': '/bodas',
  'silla-gamma': '/sillas/gamma',
  'banquete-de-boda-2024': '/blog/banquetes-para-bodas-de-lujo',
  'arreglos-florales-2024': '/blog/arreglos-florales-en-un-evento-2024',
  'mi-bautizo-2024': '/blog/lugares-para-un-bautizo-2024',
  'pre-boda-2024': '/bodas/ciudad-de-mexico',
  'eventos-en-espacios-pequenos-2024': '/espacios-eventos',
  'fomentar-la-inclusion-y-la-diversidad-2024': '/blog',
  'catering-cdmx-1': '/banquetes-catering/ciudad-de-mexico',
  'catering-coyoacan': '/banquetes-catering/ciudad-de-mexico',
  'ncatering-catering-cdmx': '/banquetes-catering/ciudad-de-mexico',
  'ncatering-catering': '/banquetes-catering',
  'mobiliario-corporativo': '/mesas-sillas/ciudad-de-mexico',
  'flores-frescas-para-bodas-de-lujo-cdmx': '/floreria/ciudad-de-mexico',
  'flores-frescas-para-bodas-de-lujo': '/floreria',
  'ramos-de-novia-personalizados-cdmx': '/floreria/ciudad-de-mexico',
  'ramos-de-novia-personalizados': '/floreria/ramos-de-novia',
  'arreglos-florales-para-ceremonias-cdmx': '/floreria/ciudad-de-mexico',
  'banquetes-para-fiestas-cdmx': '/banquetes-catering/ciudad-de-mexico',
  'precio-de-catering-para-fiestas-cdmx': '/banquetes-catering/ciudad-de-mexico',
  'catering-empresarial-cdmx': '/alimentos-empresas/ciudad-de-mexico',
  'banquetes-empresariales-cdmx': '/alimentos-empresas/ciudad-de-mexico',
  'precio-de-fotografia-para-bodas-cdmx': '/fotografia/ciudad-de-mexico',
  'eventos-corporativos-gustavo-a-madero': '/corporativos/ciudad-de-mexico',
  'banquetes-para-eventos-privados-cdmx': '/banquetes-catering/ciudad-de-mexico',
  'copa-negra-para-eventos': '/vajillas',
  'quesadillas-cdmx': '/puestos-quesadillas/ciudad-de-mexico',
  quesadillas: '/puestos-quesadillas',
  'sangria-cdmx': '/barras-de-bebidas/ciudad-de-mexico',
  sangria: '/barras-de-bebidas',
  'refrescos-cdmx': '/barras-de-bebidas/ciudad-de-mexico',
  refrescos: '/barras-de-bebidas',
  'reuniones-familiares-cdmx': '/banquetes-catering/ciudad-de-mexico',
  'recepcion-cdmx': '/espacios-eventos/ciudad-de-mexico',
  'galeria': '/espacios-eventos',
  'publicidad-para-eventos-cdmx': '/corporativos/ciudad-de-mexico',
  'recordatorios-de-eventos-cdmx': '/wedding-planner/ciudad-de-mexico',
  'servicio-cdmx': '/banquetes-catering/ciudad-de-mexico',
  'variedad-cdmx': '/banquetes-catering/ciudad-de-mexico',
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

/** Hubs that keep indexable /{hub}/{city} shells (see spa-seo-hubs.js). */
const CITY_INDEXABLE_HUBS = new Set([
  'banquetes-catering',
  'barras-de-bebidas',
  'mesas-personalizadas',
  'combinaciones-mesas-sillas',
  'vajillas',
  'colgantes',
  'barras',
  'entelados',
  'floreria',
  'shows',
  'pistas-tarimas',
  'salas-periqueras',
  'reposteria',
  'wedding-planner',
  'musica',
  'fotografia',
  'espacios-eventos',
  'carpas',
  'alimentos-empresas',
  'audio-iluminacion-video',
  'mesas-sillas',
  'bodas',
  'corporativos',
  'xv-anos',
  'graduaciones',
  'baby-shower',
  'cumpleanos',
  'primera-comunion',
  'cenas',
  'comidas',
  'desayunos',
  'lanzamientos',
  'parrillada',
  'banquetes',
  'banquete-kosher',
  'banquete-mexicano',
  'banquete-navideno',
  'mesa-dulces',
  'mesa-postres',
  'mesa-quesos',
  'cupcakes-gourmet',
  'barra-bebidas',
  'barra-mocteles',
  'cocteles-mixologia',
  'barra-cafe-premium',
  'paletas-helados',
  'inflables',
  'puestos-quesadillas',
  // Banquet format hubs (indexable with city)
  'banquetes/2-tiempos',
  'banquetes/3-tiempos',
  'banquetes/4-tiempos',
  'banquetes/buffet',
  'banquete-kosher/2-tiempos',
  'banquete-kosher/3-tiempos',
  'banquete-kosher/4-tiempos',
  'banquete-kosher/buffet',
  'banquete-mexicano/2-tiempos',
  'banquete-mexicano/3-tiempos',
  'banquete-mexicano/4-tiempos',
  'banquete-mexicano/buffet',
  'banquete-navideno/2-tiempos',
  'banquete-navideno/3-tiempos',
  'banquete-navideno/4-tiempos',
  'banquete-navideno/buffet',
])

const CITY_SLUG_SET = new Set(CITY_SUFFIXES)

/**
 * Attach city only to indexable hubs.
 * Never emit thin product×city paths (noindex) like /floreria/ramos/ciudad-de-mexico.
 * Deep product + city → promote to /{hub}/{city}. Lone product slug → keep national page.
 */
function withCity(pathname, city) {
  if (!city) return pathname
  const normalized = normalizeCity(city)
  let segs = (pathname.replace(/\/+$/, '') || '/')
    .split('/')
    .filter(Boolean)

  if (!segs.length) return '/'
  if (segs[0] === 'buscar') return pathname.startsWith('/') ? pathname : `/${pathname}`

  if (CITY_SLUG_SET.has(segs[segs.length - 1])) {
    segs = segs.slice(0, -1)
  }
  if (!segs.length) return '/'

  const basePath = `/${segs.join('/')}`
  if (NO_CITY_PATHS.has(basePath)) return basePath

  // /banquetes/3-tiempos + city → indexable format×city
  if (segs.length === 2 && CITY_INDEXABLE_HUBS.has(`${segs[0]}/${segs[1]}`)) {
    return `/${segs[0]}/${segs[1]}/${normalized}`
  }

  // /floreria/ramos-de-novia + city → /floreria/{city} (not thin product×city)
  if (segs.length >= 2) {
    const hub = segs[0]
    if (CITY_INDEXABLE_HUBS.has(hub)) return `/${hub}/${normalized}`
    return basePath
  }

  const hub = segs[0]
  if (CITY_INDEXABLE_HUBS.has(hub)) return `/${hub}/${normalized}`
  return `/${hub}`
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

/**
 * Prefer longest meaningful catalog match.
 * Avoid short substring traps (e.g. "rustica" inside mesa-rustica → /barras/rustica).
 */
function bestCatalogMatch(base) {
  if (!base || base.length < 4) return null
  let best = null
  let bestScore = 0

  for (const [catSlug, catPath] of catalogPaths) {
    if (base === catSlug) return catPath

    let score = 0
    if (base.startsWith(`${catSlug}-`) || catSlug.startsWith(`${base}-`)) {
      score = Math.max(base.length, catSlug.length) + 40
    } else if (base.includes(catSlug) && catSlug.length >= 12) {
      score = catSlug.length + 20
    } else if (catSlug.includes(base) && base.length >= 10) {
      score = base.length + 10
    } else {
      const a = new Set(base.split('-').filter((t) => t.length > 2))
      const b = catSlug.split('-').filter((t) => t.length > 2)
      const overlap = b.filter((t) => a.has(t)).length
      if (overlap >= 2 && overlap / b.length >= 0.6) {
        score = overlap * 5 + Math.min(base.length, catSlug.length)
      }
    }

    if (score > bestScore) {
      bestScore = score
      best = catPath
    }
  }

  return bestScore >= 18 ? best : null
}

/** Map Shopify mesa/silla/barra handles to SPA detail routes. */
function resolveMobiliarioPath(base) {
  if (!base) return null

  // Combination listings → hub (not a random barra/silla)
  if (base.startsWith('mesa-') && base.includes('silla-')) {
    return '/mesas-sillas'
  }

  const prefixes = [
    ['silla-', '/sillas/'],
    ['mesa-', '/mesas/'],
    ['barra-', '/barras/'],
  ]

  for (const [prefix, pathPrefix] of prefixes) {
    if (!base.startsWith(prefix)) continue
    const candidates = [...productSlugs]
      .filter((s) => s.startsWith(prefix))
      .sort((a, b) => b.length - a.length)
    for (const slug of candidates) {
      if (base === slug || base.startsWith(`${slug}-`)) {
        return `${pathPrefix}${slug.slice(prefix.length)}`
      }
    }
  }

  return null
}

function resolveProductSlug(slug) {
  const decoded = decodeURIComponent(slug).toLowerCase()
  if (PRODUCT_ALIASES[decoded]) return PRODUCT_ALIASES[decoded]

  const { base, city } = stripCitySuffix(decoded)
  if (PRODUCT_ALIASES[base]) return withCity(PRODUCT_ALIASES[base], city)

  if (productSlugs.has(base)) return withCity(`/${base}`, city)
  if (catalogPaths.has(base)) return withCity(catalogPaths.get(base), city)

  const mobiliario = resolveMobiliarioPath(base)
  if (mobiliario) return withCity(mobiliario, city)

  const catalogHit = bestCatalogMatch(base)
  if (catalogHit) return withCity(catalogHit, city)

  const keyword = matchKeyword(base) || matchKeyword(decoded)
  if (keyword) return withCity(keyword, city)

  if (productSlugs.has(decoded)) return `/${decoded}`
  if (catalogPaths.has(decoded)) return catalogPaths.get(decoded)

  // Never dump to /buscar — soft SEO sink. Prefer hub (+ city when known).
  return withCity('/banquetes-catering', city)
}

export function resolveLegacyPath(fromPath) {
  if (fromPath.startsWith('/pages/quienes-somos')) return '/quienes-somos'
  if (fromPath.startsWith('/pages/contact')) return '/'
  if (fromPath.startsWith('/pages/contacto')) return '/'

  // Bare legacy slugs still in GSC (e.g. /silla-ghost, /periqueras, /silla-tiffany/ciudad-de-mexico)
  {
    const bare = fromPath.split('?')[0].replace(/\/+$/, '') || '/'
    const parts = bare.split('/').filter(Boolean).map((p) => decodeURIComponent(p).toLowerCase())
    if (parts.length === 1) {
      const { base, city } = stripCitySuffix(parts[0])
      if (PRODUCT_ALIASES[base]) return withCity(PRODUCT_ALIASES[base], city)
      if (PRODUCT_ALIASES[parts[0]]) return PRODUCT_ALIASES[parts[0]]
    }
    if (parts.length === 2 && PRODUCT_ALIASES[parts[0]]) {
      const { base: cityBase, city: glued } = stripCitySuffix(parts[1])
      // /silla-tiffany/ciudad-de-mexico or /silla-tiffany/cdmx
      if (CITY_SUFFIXES.includes(parts[1]) || CITY_SUFFIXES.includes(cityBase)) {
        const city = CITY_SUFFIXES.includes(parts[1]) ? parts[1] : glued || cityBase
        return withCity(PRODUCT_ALIASES[parts[0]], city === 'cdmx' ? 'ciudad-de-mexico' : city)
      }
    }
  }

  if (fromPath.startsWith('/blogs/noticias/')) {
    let slug = decodeURIComponent(fromPath.split('/').pop() || '')
    slug = slug.replace(/®️/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
    if (slug.includes('estrategias-y-consejos')) {
      slug = 'estrategias-y-consejos-para-recaudar-fondos-para-causas-importantes-bodasesor-2024'
    }
    if (slug.includes('tipos-de-banquetes')) {
      slug = 'tipos-de-banquetes'
    }
    if (PRODUCT_ALIASES[slug]) return PRODUCT_ALIASES[slug]
    return `/blog/${slug}`
  }

  if (fromPath.startsWith('/blog/') && !fromPath.startsWith('/blogs/')) {
    const slug = decodeURIComponent(fromPath.replace(/^\/blog\//, '').split('?')[0]).replace(/\/+$/, '')
    if (slug && PRODUCT_ALIASES[slug]) return PRODUCT_ALIASES[slug]
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
    if (PRODUCT_ALIASES[decoded]) return withCity(PRODUCT_ALIASES[decoded], city)

    // Prefix map BEFORE productSlugs — "banquetes" product slug otherwise steals
    // Shopify collections (banquetes-cdmx → /banquetes instead of /banquetes-catering).
    const mapped =
      matchCollectionBase(decoded) ||
      matchCollectionBase(base) ||
      matchCollectionBase(stripSeoTrailing(base))
    if (mapped) return withCity(mapped, city)

    if (productSlugs.has(base)) {
      if (base === 'banquetes') return withCity('/banquetes-catering', city)
      return withCity(`/${base}`, city)
    }

    const mobiliario = resolveMobiliarioPath(base)
    if (mobiliario) return withCity(mobiliario, city)

    const catalogHit = bestCatalogMatch(base)
    if (catalogHit) return withCity(catalogHit, city)

    if (productSlugs.has(decoded)) return `/${decoded}`

    const keyword = matchKeyword(base) || matchKeyword(decoded)
    if (keyword) return withCity(keyword, city)

    return withCity('/banquetes-catering', city)
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
