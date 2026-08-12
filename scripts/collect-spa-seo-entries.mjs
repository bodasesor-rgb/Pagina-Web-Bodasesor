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
import { SPA_SEO_HUBS } from '../src/data/spa-seo-hubs.js'
import { CATALOGOS } from '../src/data/catalogos-embeds.js'
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

const HUBS = SPA_SEO_HUBS

/** Service hubs that must keep /{slug} (not /mesas/{rest}) */
const MESA_SERVICE_SLUGS = new Set(['mesa-dulces', 'mesa-postres', 'mesa-quesos'])

function productHref(slug) {
  if (MESA_SERVICE_SLUGS.has(slug)) return `/${slug}`
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

function entry(path, headline, description, h1, cityShort = null, opts = {}) {
  const cleanPath = path.replace(/\/+$/, '') || '/'
  if (cleanPath === '/') return null
  return {
    path: cleanPath,
    title: buildSeoTitle(headline, cityShort),
    description: clipDesc(description),
    h1: h1 || headline,
    canonical: `${SITE_BASE}${cleanPath}`,
    noindex: Boolean(opts?.noindex),
    image: opts?.image || null,
  }
}

/** @returns {Map<string, {path:string,title:string,description:string,h1:string,canonical:string,noindex?:boolean}>} */
export function collectSpaSeoEntries({ includeAllCityProductVariants = true } = {}) {
  const map = new Map()
  const blogSlugs = new Set(blogPosts.map((p) => p.slug).filter(Boolean))

  const put = (e) => {
    if (!e?.path) return
    if (!map.has(e.path)) map.set(e.path, e)
  }

  // Search UI — prerender with noindex (never soft-404 as home)
  put(
    entry(
      '/buscar',
      'Buscar servicios',
      'Busca banquetes, catering, mobiliario y servicios para eventos en Bodasesor.',
      'Buscar servicios',
      null,
      { noindex: true },
    ),
  )

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
    put(
      entry(`/blog/${post.slug}`, post.title, post.excerpt || post.title, post.title, null, {
        image: post.image || null,
      }),
    )
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

  for (const c of CATALOGOS) {
    if (!c?.slug || !c?.title) continue
    put(
      entry(
        `/catalogos/${c.slug}`,
        `${c.title} | Catálogos Bodasesor`,
        `Catálogo ${c.title} de Bodasesor 2026. Cotiza banquetes, barras, mobiliario y más por WhatsApp.`,
        c.title,
      ),
    )
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

  // City variants for EVERY service/product path (prerender only — prevents soft-404).
  // Thin product×city shells are noindex; hub×city already in map stay indexable (put skips).
  // Sitemap uses collectSpaSeoPathsForSitemap() WITHOUT this explosion (crawl budget).
  if (includeAllCityProductVariants) {
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
            { noindex: true },
          ),
        )
      }
    }
  }

  return map
}

export function collectSpaSeoPaths() {
  return [...collectSpaSeoEntries().keys()].sort()
}

/** Sitemap: hubs + hub×city + products + blogs — not every product×city thin shell. */
export function collectSpaSeoPathsForSitemap() {
  return [...collectSpaSeoEntries({ includeAllCityProductVariants: false }).keys()].sort()
}
