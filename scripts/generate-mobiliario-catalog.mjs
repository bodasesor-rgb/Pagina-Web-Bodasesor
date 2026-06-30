import fs from 'fs'
import path from 'path'
import { execSync } from 'node:child_process'

const ROOT = path.resolve(import.meta.dirname, '..')

function slugToName(slug) {
  const special = {
    dj: 'DJ',
    'xv-anos': 'XV Años',
    'a-media': 'A Media',
    'con-luz': 'Con Luz',
    'line-array': 'Line Array',
    'par-led': 'Par LED',
    'pixel-bars': 'Pixel Bars',
    'uplighting': 'Uplighting',
    'truss-dmx': 'Truss DMX',
    'gobos': 'Gobos',
    'blinders-strobes': 'Blinders y Strobes',
    'maquinas-humo': 'Máquinas de Humo',
    'efectos-led': 'Efectos LED',
    'cabezas-moviles': 'Cabezas Móviles',
    'guirnaldas-luces': 'Guirnaldas de Luces',
    'pantalla-led': 'Pantalla LED',
    'transmision-vivo': 'Transmisión en Vivo',
    'audio-basico': 'Audio Básico',
    'audio-line-array': 'Audio Line Array',
  }
  if (special[slug]) return special[slug]
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function writeModule(filePath, content) {
  fs.writeFileSync(path.join(ROOT, filePath), content, 'utf8')
  console.log('Wrote', filePath)
}

function listImages(dir) {
  const full = path.join(ROOT, 'public/images', dir)
  if (!fs.existsSync(full)) return []
  return fs.readdirSync(full).filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
}

const DEFAULT_INCLUYE = [
  'Servicio profesional con personal certificado',
  'Coordinación previa con el organizador',
  'Montaje, operación y desmontaje',
  'Supervisión el día del evento',
]

// ── Salas y Periqueras ────────────────────────────────────────────────────────
function buildSalasPeriqueras() {
  if (!fs.existsSync(path.join(ROOT, 'live-bundle.js'))) {
    console.warn('Skipping salas/periqueras: live-bundle.js not found')
    return { salas: 0, periqueras: 0 }
  }
  execSync('node scripts/extract-salas-from-bundle.mjs', { stdio: 'inherit', cwd: ROOT })
  const counts = execSync(
    `node -e "import('./src/data/salas-periqueras-products.js').then(m=>process.stdout.write(m.SALAS_CATALOG.length+','+m.PERIQUERAS_CATALOG.length))"`,
    { cwd: ROOT, encoding: 'utf8' }
  )
  const [salas, periqueras] = counts.trim().split(',').map(Number)
  return { salas, periqueras }
}

// ── Vajillas ──────────────────────────────────────────────────────────────────
const VAJILLA_CAT_RULES = [
  { cat: 'lozas', label: 'Lozas', match: (f) => /^vaj-0[23457]/.test(f) || f.includes('crown') || f.includes('anfora') || f.includes('santa-anita') || f.includes('luminarc') },
  { cat: 'ceramica', label: 'Cerámicas', match: (f) => /ceramica|vaj-08|vaj-12|vaj-14|vaj-20/.test(f) },
  { cat: 'mauve', label: 'Línea Mauve', match: (f) => /mauve|vaj-1[5-9]/.test(f) },
  { cat: 'rustica', label: 'Colecciones Rústicas', match: (f) => /peltre|barro|laja|mediterraneo|vaj-2[468]|vaj-30/.test(f) },
  { cat: 'especial', label: 'Colecciones Especiales', match: (f) => /regina|gold|melamina|barroco|vaj-23|vaj-31|vaj-32|vaj-33/.test(f) },
  { cat: 'platos', label: 'Platos Base', match: (f) => /platos-base|plato-madera|vaj-3[569]|vaj-41/.test(f) },
  { cat: 'cubiertos', label: 'Cubiertos', match: (f) => /cubiertos|vaj-42/.test(f) },
  { cat: 'cristaleria', label: 'Cristalería', match: (f) => /cristal|copas|vasos/.test(f) },
]

function vajillaCategory(file) {
  for (const rule of VAJILLA_CAT_RULES) {
    if (rule.match(file)) return rule
  }
  return { cat: 'lozas', label: 'Lozas' }
}

function buildVajillas() {
  const files = listImages('vajillas')
  const items = files.map((file) => {
    const slug = file.replace(/\.(png|jpg|jpeg|webp)$/i, '')
    const { cat, label } = vajillaCategory(slug)
    const name = slugToName(slug.replace(/^vaj-\d+-?/, '').replace(/^vaj-/, ''))
    return {
      slug,
      name: name.startsWith('Vaj') ? name : `Vajilla ${name}`,
      cat,
      catLabel: label,
      short: `Colección ${name.toLowerCase()} para eventos de alto nivel.`,
      desc: `Renta de vajilla ${name.toLowerCase()} con entrega, montaje de mesa y retiro incluidos. Ideal para bodas, XV años y eventos corporativos.`,
      img: `/images/vajillas/${file}`,
      tags: [label, 'Eventos', 'Renta'],
      piezas: ['Plato trinche', 'Plato sopero', 'Plato postre', 'Taza y platillo'],
    }
  })

  const nav = { lozas: [], ceramica: [], mauve: [], rustica: [], especial: [], platos: [], cubiertos: [], cristaleria: [] }
  for (const v of items) {
    if (nav[v.cat]) nav[v.cat].push({ href: `/vajillas/${v.slug}`, name: v.name })
  }

  const byCategory = {}
  for (const v of items) {
    if (!byCategory[v.cat]) byCategory[v.cat] = []
    byCategory[v.cat].push(v)
  }

  writeModule(
    'src/data/vajillas-products.js',
    `export const vajillasNavItems = ${JSON.stringify(nav, null, 2)}

export const VAJILLAS = ${JSON.stringify(items, null, 2)}

export const VAJILLAS_BY_CATEGORY = ${JSON.stringify(byCategory, null, 2)}

/** @typedef {'lozas'|'ceramica'|'mauve'|'rustica'|'especial'|'platos'|'cubiertos'|'cristaleria'} VajillaCat */
export const VajillaCat = ''
`
  )
  return items.length
}

// ── Colgantes ─────────────────────────────────────────────────────────────────
const COLGANTE_CAT_RULES = [
  { cat: 'floral', label: 'Colgantes Florales', match: (f) => /col-0[126]|col-07|col-12|col-15|flor|wisteria|orquidea|cherry/.test(f) },
  { cat: 'follaje', label: 'Follaje y Pampas', match: (f) => /col-0[389]|col-13|follaje|pampas/.test(f) },
  { cat: 'luminoso', label: 'Luminosos y Disco', match: (f) => /col-0[5]|col-11|col-14|disco|burbuvelas|cristal/.test(f) },
  { cat: 'estructura', label: 'Estructuras Especiales', match: (f) => /col-0[4]|col-10|col-16|estructura|herreria|tubos/.test(f) },
]

function colganteCategory(file) {
  for (const rule of COLGANTE_CAT_RULES) {
    if (rule.match(file)) return rule
  }
  return { cat: 'floral', label: 'Colgantes Florales' }
}

function buildColgantes() {
  const files = listImages('colgantes')
  const items = files.map((file) => {
    const slug = file.replace(/\.(png|jpg|jpeg|webp)$/i, '')
    const { cat, label } = colganteCategory(slug)
    const name = slugToName(slug.replace(/^col-\d+-?/, ''))
    return {
      slug,
      name: `Colgante ${name}`,
      cat,
      catLabel: label,
      short: `Instalación de techo ${name.toLowerCase()} para bodas y eventos premium.`,
      desc: `Colgante premium con diseño ${name.toLowerCase()}. Instalación profesional incluida para transformar tu venue.`,
      img: `/images/colgantes/${file}`,
      tags: [label, 'Instalación incluida', 'Premium'],
      elementos: ['Estructura de soporte', 'Materiales decorativos', 'Iluminación complementaria', 'Instalación y desmontaje'],
      dimensiones: 'Según dimensiones del venue',
    }
  })

  const nav = { floral: [], follaje: [], luminoso: [], estructura: [] }
  for (const c of items) nav[c.cat].push({ href: `/colgantes/${c.slug}`, name: c.name })

  const byCategory = {}
  for (const c of items) {
    if (!byCategory[c.cat]) byCategory[c.cat] = []
    byCategory[c.cat].push(c)
  }

  writeModule(
    'src/data/colgantes-products.js',
    `export const colgantesNavItems = ${JSON.stringify(nav, null, 2)}

export const COLGANTES = ${JSON.stringify(items, null, 2)}

export const COLGANTES_BY_CATEGORY = ${JSON.stringify(byCategory, null, 2)}

/** @typedef {'floral'|'follaje'|'luminoso'|'estructura'} ColganteCat */
export const ColganteCat = ''
`
  )
  return items.length
}

// ── Pistas y Tarimas ──────────────────────────────────────────────────────────
function pistaCategory(slug) {
  if (slug.startsWith('tarima')) return { cat: 'tarimas', label: 'Tarimas Básicas' }
  if (slug.startsWith('estrado')) return { cat: 'escenarios', label: 'Escenarios y Estrados' }
  if (slug.startsWith('pista')) return { cat: 'pistas', label: 'Pistas de Baile' }
  return { cat: 'sets', label: 'Sets Completos' }
}

function buildPistasTarimas() {
  const files = listImages('pistas')
  const items = files.map((file) => {
    const slug = file.replace(/\.(png|jpg|jpeg|webp)$/i, '')
    const { cat, label } = pistaCategory(slug)
    const name = slugToName(slug)
    return {
      slug,
      name,
      cat,
      catLabel: label,
      short: `${name} profesional para eventos, bodas y corporativos.`,
      desc: `Renta de ${name.toLowerCase()} con entrega, armado y retiro. Superficies de alta calidad para pistas de baile, escenarios y tarimas.`,
      img: `/images/pistas/${file}`,
      tags: [label, 'Montaje incluido', 'Eventos'],
      features: DEFAULT_INCLUYE,
    }
  })

  const nav = { tarimas: [], pistas: [], escenarios: [], sets: [] }
  for (const p of items) nav[p.cat].push({ href: `/pistas-tarimas/${p.slug}`, name: p.name })

  writeModule(
    'src/data/pistas-tarimas-products.js',
    `export const pistasTarimasNavItems = ${JSON.stringify(nav, null, 2)}

export const PISTAS_TARIMAS = ${JSON.stringify(items, null, 2)}

/** @typedef {'tarimas'|'pistas'|'escenarios'|'sets'} PistaTarimaCat */
export const PistaTarimaCat = {}
`
  )
  return items.length
}

// ── Entelados ─────────────────────────────────────────────────────────────────
const ENTELADO_STYLES = [
  { slug: 'sencillo', name: 'Entelado Sencillo', prefix: 'sencillo', tagline: 'Elegancia minimalista para espacios íntimos' },
  { slug: 'a-media', name: 'Entelado a Media', prefix: 'a-media', tagline: 'Cobertura parcial con impacto visual' },
  { slug: 'completo', name: 'Entelado Completo', prefix: 'completo', tagline: 'Transformación total del techo' },
  { slug: 'con-luz', name: 'Entelado con Luz', prefix: 'con-luz', tagline: 'Tela con iluminación integrada' },
]

function buildEntelados() {
  const files = listImages('entelados')
  const items = ENTELADO_STYLES.map((style) => {
    const imgPages = files
      .filter((f) => f.startsWith(style.prefix))
      .map((f) => `/images/entelados/${f}`)
    return {
      slug: style.slug,
      name: style.name,
      tagline: style.tagline,
      short: `${style.name} para techo. Decoración de tela tensada o drapeada que transforma cualquier espacio.`,
      desc: `Instalación profesional de ${style.name.toLowerCase()}. Cotizado por metro cuadrado del área a cubrir.`,
      img: imgPages[0] ?? `/images/entelados/${style.prefix}-1.jpg`,
      imgPages: imgPages.length ? imgPages : [`/images/entelados/${style.prefix}-1.jpg`],
      incluye: ['Tela premium', 'Estructura de soporte', 'Instalación profesional', 'Desmontaje al finalizar'],
      colores: ['Blanco', 'Marfil', 'Champagne', 'Colores a petición'],
      idealPara: ['Bodas', 'XV Años', 'Eventos corporativos', 'Fiestas privadas'],
    }
  })

  writeModule(
    'src/data/entelados-products.js',
    `export const enteladosNavItems = ${JSON.stringify(items.map((e) => ({ href: `/entelados/${e.slug}`, name: e.name })), null, 2)}

export const ENTELADOS = ${JSON.stringify(items, null, 2)}

/** @typedef {${items.map((e) => `'${e.slug}'`).join(' | ')}} EnteladoSlug */
export const EnteladoSlug = ''
`
  )
  return items.length
}

// ── Audio, Iluminación y Video ────────────────────────────────────────────────
const AUDIO_CAT_RULES = [
  { cat: 'audio', label: 'Audio Profesional', match: (s) => s.startsWith('audio') },
  { cat: 'video', label: 'Video y Pantallas', match: (s) => /pantalla|transmision/.test(s) },
  { cat: 'iluminacion', label: 'Iluminación de Impacto', match: () => true },
]

function audioCategory(slug) {
  for (const rule of AUDIO_CAT_RULES) {
    if (rule.match(slug)) return rule
  }
  return { cat: 'iluminacion', label: 'Iluminación de Impacto' }
}

function buildAudio() {
  const files = listImages('audio')
  const items = files.map((file) => {
    const slug = file.replace(/\.(png|jpg|jpeg|webp)$/i, '')
    const { cat, label } = audioCategory(slug)
    const name = slugToName(slug)
    return {
      slug,
      name,
      category: cat,
      categoryLabel: label,
      tagline: `${name} profesional para eventos`,
      short: `Renta de ${name.toLowerCase()} con operador técnico certificado.`,
      desc: `Servicio de ${name.toLowerCase()} para bodas, XV años, corporativos y conciertos. Equipo de grado profesional.`,
      img: `/images/audio/${file}`,
      incluye: DEFAULT_INCLUYE,
      idealPara: ['Bodas', 'XV Años', 'Corporativos', 'Conciertos'],
    }
  })

  const groups = [
    { heading: 'Audio Profesional', href: '/audio-iluminacion-video#audio', items: [] },
    { heading: 'Iluminación de Impacto', href: '/audio-iluminacion-video#iluminacion', items: [] },
    { heading: 'Video y Pantallas', href: '/audio-iluminacion-video#video', items: [] },
  ]
  for (const item of items) {
    const g = groups.find((x) => x.heading === item.categoryLabel)
    if (g) g.items.push({ href: `/audio-iluminacion-video/${item.slug}`, name: item.name })
  }

  writeModule(
    'src/data/audio-iluminacion-products.js',
    `export const audioIluminacionNavGroups = ${JSON.stringify(groups, null, 2)}

export const AUDIO_ILUMINACION = ${JSON.stringify(items, null, 2)}

/** @typedef {'audio'|'iluminacion'|'video'} AudioIluminacionCategory */
/** @typedef {typeof AUDIO_ILUMINACION[number]} AudioIluminacionProduct */
`
  )
  return items.length
}

// ── Combinaciones ─────────────────────────────────────────────────────────────
const COMBINACIONES_RAW = [
  { label: 'Mesa Redonda + Silla Tiffany', img: '/images/mesas/conj-redonda-mantel-tiffany.jpg' },
  { label: 'Mesa Redonda + Silla Luis XV', img: '/images/mesas/conj-redonda-mantel-luis-xv.jpg' },
  { label: 'Mesa Redonda + Crossback Caoba', img: '/images/mesas/conj-redonda-mantel-crossback-caoba.jpg' },
  { label: 'Mesa Redonda + Crossback Natural', img: '/images/mesas/conj-redonda-mantel-crossback-natural.jpg' },
  { label: 'Mesa Redonda + Antonella Blanca', img: '/images/mesas/conj-redonda-mantel-antonella-blanca.jpg' },
  { label: 'Mesa Redonda + Avant Garde', img: '/images/mesas/conj-redonda-mantel-avant-garden.jpg' },
  { label: 'Mesa Redonda Crossback (sin mantel)', img: '/images/mesas/conj-redonda-crossback-caoba.jpg' },
  { label: 'Mesa Mármol Blanca + Camila', img: '/images/mesas/conj-marmol-blanca-camila.jpg' },
  { label: 'Mesa Mármol Negra + Camila', img: '/images/mesas/conj-marmol-negra-camila.jpg' },
  { label: 'Mesa Black Shine + Camila', img: '/images/mesas/conj-black-shine-camila.jpg' },
  { label: 'Mesa Mármol + Antonella Blanca', img: '/images/mesas/conj-marmol-antonella-blanca.jpg' },
  { label: 'Mesa Mármol + Antonella Negra', img: '/images/mesas/conj-marmol-antonella-negra.jpg' },
  { label: 'Mesa Cuadrada + Avant Garde', img: '/images/mesas/conj-cuad-avant-garden.jpg' },
  { label: 'Tablón + Avant Garde', img: '/images/mesas/conj-rect-avant-garden.jpg' },
  { label: 'Tablón + Crossback Caoba', img: '/images/mesas/conj-rect-crossback-caoba.jpg' },
  { label: 'Tablón + Mariantonieta Caoba', img: '/images/mesas/conj-rect-mariantonieta-caoba.jpg' },
  { label: 'Mesa Espejo + Luis XV', img: '/images/mesas/conj-espejo-luis-xv.jpg' },
]

function buildCombinaciones() {
  const items = COMBINACIONES_RAW.map((c) => {
    const slug = c.label
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    return {
      slug,
      label: c.label,
      img: c.img,
      desc: `Combinación ${c.label} para eventos elegantes.`,
      detail: 'Incluye mesa, sillas, mantel (cuando aplica), entrega, armado y retiro.',
      tags: ['Mesas y Sillas', 'Mobiliario', 'Eventos'],
    }
  })

  writeModule('src/data/combinaciones-products.js', `export const COMBINACIONES = ${JSON.stringify(items, null, 2)}\n`)
  return items.length
}

// ── Run ───────────────────────────────────────────────────────────────────────
const salas = buildSalasPeriqueras()
const counts = {
  salas,
  vajillas: buildVajillas(),
  colgantes: buildColgantes(),
  pistas: buildPistasTarimas(),
  entelados: buildEntelados(),
  audio: buildAudio(),
  combinaciones: buildCombinaciones(),
}
console.log('Done:', counts)
