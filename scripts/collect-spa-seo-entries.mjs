#!/usr/bin/env node
/**
 * Collect SPA detail/hub URLs with title + description for prerender + sitemap.
 */
import { products } from '../src/data/products.js'
import { BANQUET_MENUS } from '../src/data/banquetes-menus.js'
import { SALAS_CATALOG, PERIQUERAS_CATALOG } from '../src/data/salas-periqueras-products.js'
import { WEDDING } from '../src/data/wedding-products.js'
import { MUSICA } from '../src/data/musica-products.js'
import { FOTOGRAFIA } from '../src/data/fotografia-products.js'
import { EMPRESAS } from '../src/data/empresas-products.js'
import { ESPACIOS } from '../src/data/espacios-products.js'
import { REPOSTERIA } from '../src/data/reposteria-products.js'
import { VAJILLAS } from '../src/data/vajillas-products.js'
import { COLGANTES } from '../src/data/colgantes-products.js'
import { PISTAS_TARIMAS } from '../src/data/pistas-tarimas-products.js'
import { ENTELADOS } from '../src/data/entelados-products.js'
import { CARPAS } from '../src/data/carpas-products.js'
import { AUDIO_ILUMINACION } from '../src/data/audio-iluminacion-products.js'
import { FLORERIA } from '../src/data/floreria-products.js'
import { SHOWS } from '../src/data/shows-products.js'
import { COMBINACIONES } from '../src/data/combinaciones-products.js'
import { blogPosts } from '../src/data/blog-data.js'
import { CITY_MAP } from '../src/data/city-data.js'
import { buildSeoTitle } from '../src/utils/seo-title.js'
import { clampMetaDescription } from '../src/utils/seo-meta.js'

/** Unique canonical city slugs for hub×city prerender shells */
const CITY_SLUGS = [...new Set(Object.values(CITY_MAP).map((c) => c.slug))]
const CITY_SLUG_SET = new Set(CITY_SLUGS)

/** Keep in sync with src/utils/city-url.js CITY_EXEMPT_PREFIXES */
const CITY_EXEMPT_PREFIXES = [
  '/blog',
  '/buscar',
  '/quienes-somos',
  '/aviso-de-privacidad',
  '/terminos-y-condiciones',
  '/galeria',
  '/catalogo',
  '/catalogos',
]

const SITE_BASE = (process.env.SITE_BASE || 'https://bodasesor.com').replace(/\/$/, '')

const MOBILIARIO_BARRAS = new Set([
  'barra-clasica-blanca',
  'barra-xl-clasica-negra',
  'barra-rustica',
  'barra-industrial',
])

const HUBS = [
  { path: '/banquetes-catering', title: 'Banquetes y Catering', desc: 'Catálogo completo de banquetes formales, catering gourmet, barras de alimentos y estaciones mexicanas para eventos.' },
  { path: '/barras-de-bebidas', title: 'Barras de Bebidas', desc: 'Barras de bebidas con y sin alcohol para eventos: mocteles, mixología, café premium y carritos de helado.' },
  { path: '/mesas-personalizadas', title: 'Mesas Personalizadas', desc: 'Mesas temáticas para eventos: dulces, botanas, sushi, charcutería, frutas y más.' },
  { path: '/combinaciones-mesas-sillas', title: 'Combinaciones de Mesas y Sillas', desc: 'Paquetes de mesas y sillas coordinadas para bodas, XV años y eventos corporativos en México.' },
  { path: '/vajillas', title: 'Vajillas para Eventos', desc: 'Renta de vajillas premium para banquetes y eventos: porcelana, cristalería y cubertería.' },
  { path: '/colgantes', title: 'Colgantes Decorativos', desc: 'Colgantes florales, de luces y decorativos para bodas, quinceañeras y eventos especiales.' },
  { path: '/barras', title: 'Barras de Mobiliario', desc: 'Renta de barras de mobiliario para estaciones de bebidas, recepción y open bar.' },
  { path: '/entelados', title: 'Entelados para Eventos', desc: 'Entelados y decoración de mesas para bodas, XV años y eventos sociales en México.' },
  { path: '/floreria', title: 'Florería para Eventos', desc: 'Arreglos florales, centros de mesa y decoración floral para bodas y eventos en México.' },
  { path: '/shows', title: 'Shows y Entretenimiento', desc: 'Shows en vivo, artistas y entretenimiento para bodas, XV años y eventos corporativos.' },
  { path: '/pistas-tarimas', title: 'Pistas y Tarimas', desc: 'Renta de pistas de baile, tarimas y escenarios para eventos en México.' },
  { path: '/salas-periqueras', title: 'Salas y Periqueras', desc: 'Renta de salas lounge y periqueras para eventos, bodas y recepciones en México.' },
  { path: '/reposteria', title: 'Repostería para Eventos', desc: 'Pasteles, mesas de postres, cupcakes y repostería artesanal para bodas y celebraciones.' },
  { path: '/wedding-planner', title: 'Wedding Planner', desc: 'Servicio de wedding planner profesional. Planeación, coordinación y asesoría para tu boda.' },
  { path: '/musica', title: 'Música para Eventos', desc: 'DJ, grupos versátiles, mariachi, saxofonista y música en vivo para bodas y eventos.' },
  { path: '/fotografia', title: 'Fotografía y Video', desc: 'Fotografía profesional, video, cámara 360, cabina de fotos y más para tu evento.' },
  { path: '/espacios-eventos', title: 'Espacios para Eventos', desc: 'Salones, jardines y espacios para bodas, XV años y eventos corporativos en México.' },
  { path: '/carpas', title: 'Carpas para Eventos', desc: 'Renta de carpas para bodas, eventos corporativos y celebraciones al aire libre.' },
  { path: '/alimentos-empresas', title: 'Alimentos para Empresas', desc: 'Coffee break, box lunch, desayunos ejecutivos y catering corporativo en México.' },
  { path: '/audio-iluminacion-video', title: 'Audio, Iluminación y Video', desc: 'Sonido, iluminación y video profesional para eventos, bodas y corporativos en México.' },
  { path: '/mesas-sillas', title: 'Mesas y Sillas', desc: 'Renta de mesas y sillas para bodas, XV años y eventos en México.' },
  { path: '/galeria', title: 'Galería de Eventos', desc: 'Fotos reales de bodas, banquetes, quinceañeras y eventos corporativos organizados por Bodasesor.' },
  { path: '/catalogos', title: 'Catálogos 2026', desc: 'Explora los catálogos 2026 de Bodasesor: banquetes, barras, mobiliario, audio e iluminación y más.' },
  { path: '/quienes-somos', title: 'Quiénes Somos', desc: 'Conoce al equipo de Bodasesor Eventos. Más de 10 años organizando eventos en México.' },
  { path: '/blog', title: 'Blog de Eventos y Bodas', desc: 'Consejos, tendencias y guías para planear bodas, XV años y eventos corporativos en México.' },
  { path: '/bodas', title: 'Bodas', desc: 'Servicios completos para bodas: catering, decoración, música, fotografía y más.' },
  { path: '/corporativos', title: 'Eventos Corporativos', desc: 'Catering, mobiliario y servicios para eventos corporativos en México.' },
  { path: '/xv-anos', title: 'XV Años', desc: 'Servicios completos para XV años: banquete, decoración, música, shows y más.' },
  { path: '/graduaciones', title: 'Graduaciones', desc: 'Servicios para graduaciones: banquete, decoración, música y fotografía.' },
  { path: '/baby-shower', title: 'Baby Shower', desc: 'Servicios para baby shower: mesa de dulces, decoración, catering y más.' },
  { path: '/cumpleanos', title: 'Cumpleaños', desc: 'Servicios para fiestas de cumpleaños: catering, decoración, shows e inflables.' },
  { path: '/primera-comunion', title: 'Primera Comunión', desc: 'Servicios completos para primera comunión: banquete, decoración y más.' },
  { path: '/parrillada', title: 'Parrillada para Eventos', desc: 'Servicio de parrillada para bodas y eventos en México.' },
  // Banquet hubs (indexed heavily; must not soft-404 to home SPA)
  { path: '/banquetes', title: 'Banquetes', desc: 'Banquetes formales para bodas, XV años y eventos: menús por tiempos, buffet y servicio de meseros en México.' },
  { path: '/banquete-kosher', title: 'Banquete Kosher', desc: 'Banquete kosher para bodas y eventos con menús certificados y servicio profesional en México.' },
  { path: '/banquete-mexicano', title: 'Banquete Mexicano', desc: 'Banquete mexicano para bodas y eventos: estaciones, antojitos y menús tradicionales en México.' },
  { path: '/banquete-navideno', title: 'Banquete Navideño', desc: 'Banquete navideño para empresas y eventos: menús de temporada y servicio completo en México.' },
  { path: '/aviso-de-privacidad', title: 'Aviso de Privacidad', desc: 'Aviso de privacidad de Bodasesor: tratamiento de datos personales y derechos ARCO.' },
  { path: '/terminos-y-condiciones', title: 'Términos y Condiciones', desc: 'Términos y condiciones de uso del sitio y servicios de Bodasesor Eventos.' },
]

function productHref(slug) {
  if (slug.startsWith('silla-')) return `/sillas/${slug.slice(6)}`
  if (slug.startsWith('mesa-')) return `/mesas/${slug.slice(5)}`
  if (MOBILIARIO_BARRAS.has(slug)) return `/barras/${slug.slice(6)}`
  return `/${slug}`
}

function clipDesc(text) {
  return clampMetaDescription(text)
}

function isCityExemptPath(path) {
  return CITY_EXEMPT_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))
}

/** City landing / service titles — avoid "Bodas para Bodas y Eventos en X" */
function cityHeadline(baseTitle, cityName) {
  const core = String(baseTitle || '').trim()
  if (!core) return `Servicios para Eventos en ${cityName}`
  if (/en\s+[A-ZÁÉÍÓÚÑ]/i.test(core)) return core
  return `${core} en ${cityName}`
}

/** Only pass abbreviation to title builder when it adds signal (CDMX, GDL…) */
function usefulCityShort(city) {
  if (!city?.short) return null
  const short = city.short.trim()
  const name = String(city.name || '').trim()
  if (!short || !name) return null
  if (short.toLowerCase() === name.toLowerCase()) return null
  // "Morelia" / "Toluca" style — short equals first token
  const first = name.split(/[\s/]/)[0]
  if (short.toLowerCase() === first.toLowerCase()) return null
  return short
}

function entry(path, headline, description, h1, cityShort = null) {
  const cleanPath = path.replace(/\/+$/, '') || '/'
  if (cleanPath === '/') return null
  return {
    path: cleanPath,
    title: buildSeoTitle(headline, cityShort),
    description: clipDesc(description),
    h1: h1 || headline,
    canonical: `${SITE_BASE}${cleanPath}`,
  }
}

/** @returns {Map<string, {path:string,title:string,description:string,h1:string,canonical:string}>} */
export function collectSpaSeoEntries() {
  const map = new Map()
  const blogSlugs = new Set(blogPosts.map((p) => p.slug).filter(Boolean))

  const put = (e) => {
    if (!e?.path) return
    if (!map.has(e.path)) map.set(e.path, e)
  }

  // City landings: /cuernavaca, /ciudad-de-mexico — must not soft-404 to home
  for (const citySlug of CITY_SLUGS) {
    const city = CITY_MAP[citySlug]
    if (!city) continue
    put(
      entry(
        `/${citySlug}`,
        `Banquetes y Eventos en ${city.name}`,
        `Banquetes, catering, mobiliario y servicios para bodas y eventos en ${city.name}. Cotiza con Bodasesor.`,
        `Banquetes y Eventos en ${city.name}`,
        usefulCityShort(city),
      ),
    )
  }

  for (const h of HUBS) {
    put(entry(h.path, h.title, h.desc, h.title))
    if (isCityExemptPath(h.path)) continue
    for (const citySlug of CITY_SLUGS) {
      const city = CITY_MAP[citySlug]
      const cityName = city?.name || citySlug
      const headline = cityHeadline(h.title, cityName)
      put(
        entry(
          `${h.path}/${citySlug}`,
          headline,
          `${h.desc} Cotiza en ${cityName} y área metropolitana.`,
          headline,
          usefulCityShort(city),
        ),
      )
    }
  }

  for (const post of blogPosts) {
    if (!post?.slug || !post?.title) continue
    put(entry(`/blog/${post.slug}`, post.title, post.excerpt || post.title, post.title))
  }

  for (const p of products) {
    const name = p.title || p.name
    if (!name || !p.slug) continue
    // Blog articles duplicated into products.js — keep only /blog/{slug}
    if (blogSlugs.has(p.slug)) continue
    const href = productHref(p.slug)
    const desc =
      p.seoDescription ||
      (Array.isArray(p.description) ? p.description[0] : p.description) ||
      p.headline ||
      name
    put(entry(href, p.seoTitle || name, desc, name))
  }

  for (const m of BANQUET_MENUS) {
    const href = `${m.parentHref}/${m.slug}`
    put(entry(href, m.seoTitle || m.name, m.seoDescription || m.headline || m.name, m.name))
  }

  for (const s of SALAS_CATALOG) {
    put(entry(`/salas/${s.slug}`, s.name, s.desc || s.short || s.name, s.name))
  }
  for (const p of PERIQUERAS_CATALOG) {
    put(entry(`/periqueras/${p.slug}`, p.name, p.desc || p.short || p.name, p.name))
  }

  const catalogs = [
    [WEDDING, (i) => `/wedding-planner/${i.slug}`, 'name'],
    [MUSICA, (i) => `/musica/${i.slug}`, 'name'],
    [FOTOGRAFIA, (i) => `/fotografia/${i.slug}`, 'name'],
    [EMPRESAS, (i) => `/alimentos-empresas/${i.slug}`, 'name'],
    [ESPACIOS, (i) => `/espacios-eventos/${i.slug}`, 'name'],
    [REPOSTERIA, (i) => `/reposteria/${i.slug}`, 'name'],
    [VAJILLAS, (i) => `/vajillas/${i.slug}`, 'name'],
    [COLGANTES, (i) => `/colgantes/${i.slug}`, 'name'],
    [PISTAS_TARIMAS, (i) => `/pistas-tarimas/${i.slug}`, 'name'],
    [ENTELADOS, (i) => `/entelados/${i.slug}`, 'name'],
    [CARPAS, (i) => `/carpas/${i.slug}`, 'name'],
    [AUDIO_ILUMINACION, (i) => `/audio-iluminacion-video/${i.slug}`, 'name'],
    [FLORERIA, (i) => `/floreria/${i.slug}`, 'name'],
    [SHOWS, (i) => `/shows/${i.slug}`, 'name'],
    [COMBINACIONES, (i) => `/combinaciones/${i.slug}`, 'label'],
  ]

  for (const [list, hrefFn, nameKey] of catalogs) {
    for (const item of list) {
      const name = item[nameKey] || item.name
      if (!name || !item.slug) continue
      put(entry(hrefFn(item), name, item.desc || item.short || name, name))
    }
  }

  // City variants for EVERY service/product path (not only HUBS).
  // Without these, Netlify serves dist/index.html (home canonical) → soft-404 in Google.
  const bases = [...map.values()]
  for (const base of bases) {
    if (isCityExemptPath(base.path)) continue
    const segs = base.path.split('/').filter(Boolean)
    if (!segs.length || CITY_SLUG_SET.has(segs[segs.length - 1])) continue
    // Bare city landing already handled
    if (segs.length === 1 && CITY_SLUG_SET.has(segs[0])) continue

    const headlineBase = base.h1 || base.title
    for (const citySlug of CITY_SLUGS) {
      const city = CITY_MAP[citySlug]
      const cityName = city?.name || citySlug
      const headline = cityHeadline(headlineBase, cityName)
      put(
        entry(
          `${base.path}/${citySlug}`,
          headline,
          `${base.description} Cotiza en ${cityName} y área metropolitana.`,
          headline,
          usefulCityShort(city),
        ),
      )
    }
  }

  return map
}

export function collectSpaSeoPaths() {
  return [...collectSpaSeoEntries().keys()].sort()
}
