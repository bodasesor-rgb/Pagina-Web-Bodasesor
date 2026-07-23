import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { useCity } from '../context/CityContext'
import { parseCityFromPath } from '../utils/city-url'
import {
  absoluteUrl,
  canonicalPath,
  upsertJsonLd,
  upsertLink,
  upsertMeta,
} from '../utils/seo-head'
import { blogPosts } from '../data/blog-data'
import { clampMetaDescription } from '../utils/seo-meta'

const SITE_BASE = 'https://bodasesor.com'
const PAGE_JSONLD_ID = 'bodasesor-page-jsonld'
const BREADCRUMB_JSONLD_ID = 'bodasesor-breadcrumb-jsonld'

function labelFromSlug(slug) {
  return String(slug || '')
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function buildBreadcrumbJsonLd(items) {
  const list = (items || []).filter((i) => i?.name)
  if (list.length < 2) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: list.map((item, index) => {
      const entry = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      }
      if (item.href) entry.item = absoluteUrl(item.href)
      return entry
    }),
  }
}

/** Fallback breadcrumbs from URL when a page does not mount <Breadcrumbs />. */
function breadcrumbsFromPath(path, basePath, activeCity, blogPost, hubSeo) {
  const items = [{ name: 'Inicio', href: '/' }]

  if (blogPost) {
    items.push({ name: 'Blog', href: '/blog' })
    items.push({ name: blogPost.title })
    return items
  }

  if (hubSeo && basePath !== '/') {
    items.push({ name: hubSeo.title, href: basePath })
    if (activeCity) items.push({ name: activeCity.name })
    return items
  }

  const segs = basePath.split('/').filter(Boolean)
  if (segs.length === 0) return items

  if (segs.length === 1) {
    items.push({ name: labelFromSlug(segs[0]) })
  } else {
    items.push({ name: labelFromSlug(segs[0]), href: `/${segs[0]}` })
    items.push({ name: labelFromSlug(segs[segs.length - 1]) })
  }
  if (activeCity && path !== basePath) {
    // City is last segment of the full path
    const last = items[items.length - 1]
    if (last && !last.href) {
      // keep leaf as service; append city
      items[items.length - 1] = { name: last.name, href: basePath }
      items.push({ name: activeCity.name })
    }
  }
  return items
}

const SEO_MAP = {
  '/': {
    title: 'Banquetes y Catering para Eventos en México',
    desc: 'Banquetes, catering, mobiliario y servicios premium para bodas, quinceañeras y eventos corporativos en México.',
  },
  '/galeria': {
    title: 'Galería de Eventos',
    desc: 'Fotos reales de bodas, banquetes, quinceañeras y eventos corporativos organizados por Bodasesor en México.',
  },
  '/banquetes-catering': {
    title: 'Banquetes y Catering',
    desc: 'Catálogo completo de banquetes formales, catering gourmet, barras de alimentos y estaciones mexicanas para eventos.',
  },
  '/barras-de-bebidas': {
    title: 'Barras de Bebidas',
    desc: 'Barras de bebidas con y sin alcohol para eventos: mocteles, mixología, café premium y carritos de helado.',
  },
  '/wedding-planner': {
    title: 'Wedding Planner',
    desc: 'Servicio de wedding planner profesional. Planeación, coordinación y asesoría para tu boda.',
  },
  '/audio-iluminacion-video': {
    title: 'Audio, Iluminación y Video',
    desc: 'Sonido, iluminación y video profesional para eventos, bodas y corporativos en México.',
  },
  '/salas-periqueras': {
    title: 'Salas y Periqueras',
    desc: 'Renta de salas lounge y periqueras para eventos, bodas y recepciones en México.',
  },
  '/fotografia': {
    title: 'Fotografía y Video',
    desc: 'Fotografía profesional, video, cámara 360, cabina de fotos y más para tu evento.',
  },
  '/quienes-somos': {
    title: 'Quiénes Somos',
    desc: 'Conoce al equipo de Bodasesor Eventos. Más de 10 años organizando eventos en México.',
  },
  '/bodas': {
    title: 'Bodas',
    desc: 'Servicios completos para bodas: catering, decoración, música, fotografía y más.',
  },
  '/corporativos': {
    title: 'Eventos Corporativos',
    desc: 'Catering, mobiliario y servicios para eventos corporativos en México.',
  },
  '/xv-anos': {
    title: 'XV Años',
    desc: 'Servicios completos para XV años: banquete, decoración, música, shows y más.',
  },
  '/baby-shower': {
    title: 'Baby Shower',
    desc: 'Servicios para baby shower: mesa de dulces, decoración, catering y más.',
  },
  '/cumpleanos': {
    title: 'Cumpleaños',
    desc: 'Servicios para fiestas de cumpleaños: catering, decoración, shows e inflables.',
  },
  '/primera-comunion': {
    title: 'Primera Comunión',
    desc: 'Servicios completos para primera comunión: banquete, decoración y más.',
  },
  '/mesas-sillas': {
    title: 'Mesas y Sillas',
    desc: 'Renta de mesas y sillas para bodas, XV años y eventos en México.',
  },
  '/parrillada': {
    title: 'Parrillada para Eventos',
    desc: 'Servicio de parrillada para bodas y eventos en México. Tradicional mexicana o argentina.',
  },
  '/blog': {
    title: 'Blog de Eventos y Bodas',
    desc: 'Consejos, tendencias y guías para planear bodas, XV años y eventos corporativos en México.',
  },
  '/buscar': {
    title: 'Buscar servicios',
    desc: 'Busca banquetes, catering, mobiliario y servicios para eventos en Bodasesor.',
  },
  '/aviso-de-privacidad': {
    title: 'Aviso de Privacidad',
    desc: 'Aviso de privacidad de Bodasesor: tratamiento de datos personales, contacto y derechos ARCO.',
  },
  '/terminos-y-condiciones': {
    title: 'Términos y Condiciones',
    desc: 'Términos y condiciones de uso del sitio y servicios de Bodasesor Eventos en México.',
  },
}

const NOINDEX_PREFIXES = ['/buscar']

function buildServiceJsonLd({ name, description, url, city }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE_BASE}/#localbusiness`,
      name: 'Bodasesor Eventos',
      url: `${SITE_BASE}/`,
      telephone: '+52-55-4008-0373',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ciudad de México',
        addressRegion: 'CDMX',
        addressCountry: 'MX',
      },
      areaServed: { '@type': 'Country', name: 'México' },
    },
    serviceType: name,
  }

  if (city?.name) {
    data.areaServed = {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'Country', name: 'México' },
    }
  }

  return data
}

function buildArticleJsonLd({ title, description, url, date, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: date || undefined,
    image: image || undefined,
    author: {
      '@type': 'Organization',
      name: 'Bodasesor Eventos',
      url: `${SITE_BASE}/`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bodasesor Eventos',
      url: `${SITE_BASE}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_BASE}/favicon.svg`,
      },
    },
    mainEntityOfPage: url,
    inLanguage: 'es-MX',
  }
}

export default function GlobalSEO() {
  const [location] = useLocation()
  const { city } = useCity()

  useEffect(() => {
    const path = canonicalPath(location)
    const { basePath, city: pathCity } = parseCityFromPath(path)
    const activeCity = city || pathCity
    const canonical = absoluteUrl(path)

    // Always set canonical + og:url to the real URL (never leave home stuck).
    upsertLink('canonical', canonical)
    upsertMeta('property', 'og:url', canonical)

    const hubSeo = SEO_MAP[basePath]
    const blogMatch = path.match(/^\/blog\/([^/]+)$/)
    const blogPost = blogMatch
      ? blogPosts.find((p) => p.slug === blogMatch[1])
      : null

    // Path-based BreadcrumbList for crawlers (pages with <Breadcrumbs /> refine it).
    upsertJsonLd(
      BREADCRUMB_JSONLD_ID,
      buildBreadcrumbJsonLd(
        breadcrumbsFromPath(path, basePath, activeCity, blogPost, hubSeo),
      ),
    )

    if (blogPost) {
      const title = `${blogPost.title} | Bodasesor Blog`
      document.title = title
      const blogDesc = clampMetaDescription(blogPost.excerpt || blogPost.title)
      upsertMeta('name', 'description', blogDesc)
      upsertMeta('property', 'og:title', title)
      upsertMeta('property', 'og:description', blogDesc)
      upsertJsonLd(
        PAGE_JSONLD_ID,
        buildArticleJsonLd({
          title: blogPost.title,
          description: blogPost.excerpt || blogPost.title,
          url: canonical,
          date: blogPost.date,
          image: blogPost.image,
        }),
      )
      upsertMeta('name', 'robots', 'index, follow')
      return () => {
        upsertJsonLd(PAGE_JSONLD_ID, null)
        upsertJsonLd(BREADCRUMB_JSONLD_ID, null)
      }
    }

    if (hubSeo && basePath !== '/') {
      // Unique intent: service + use-case + city (no invented prices)
      const title = activeCity
        ? `${hubSeo.title} para Bodas y Eventos en ${activeCity.name} | Bodasesor`
        : `${hubSeo.title} para Bodas y Eventos | Bodasesor`
      const desc = clampMetaDescription(
        activeCity
          ? `${hubSeo.desc} Cotiza en ${activeCity.name} y área metropolitana.`
          : hubSeo.desc,
      )
      document.title = title
      upsertMeta('name', 'description', desc)
      upsertMeta('property', 'og:title', title)
      upsertMeta('property', 'og:description', desc)
      upsertJsonLd(
        PAGE_JSONLD_ID,
        buildServiceJsonLd({
          name: activeCity
            ? `${hubSeo.title} para bodas y eventos en ${activeCity.name}`
            : `${hubSeo.title} para bodas y eventos`,
          description: desc,
          url: canonical,
          city: activeCity,
        }),
      )
    } else if (basePath === '/') {
      // HomeJsonLd owns organization graph; clear page-level schema.
      upsertJsonLd(PAGE_JSONLD_ID, null)
      upsertJsonLd(BREADCRUMB_JSONLD_ID, null)
      if (SEO_MAP['/']) {
        const title = activeCity
          ? `Banquetes y Catering para Bodas y Eventos en ${activeCity.name} | Bodasesor`
          : `${SEO_MAP['/'].title} | Bodasesor`
        document.title = title
      }
    } else if (path !== '/' && !path.startsWith('/buscar')) {
      // Detail pages own their <title>; only attach Service schema from the URL slug.
      const slugPart = basePath.split('/').filter(Boolean).pop() || 'servicio'
      const label = labelFromSlug(slugPart)
      const name = activeCity ? `${label} en ${activeCity.name}` : label
      const desc =
        document.querySelector('meta[name="description"]')?.getAttribute('content') ||
        `${name}. Cotiza banquetes, catering y servicios para eventos con Bodasesor.`
      upsertJsonLd(
        PAGE_JSONLD_ID,
        buildServiceJsonLd({
          name,
          description: desc,
          url: canonical,
          city: activeCity,
        }),
      )
    }

    const noindex = NOINDEX_PREFIXES.some(
      (p) => path === p || path.startsWith(`${p}/`),
    )
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')

    return () => {
      upsertJsonLd(BREADCRUMB_JSONLD_ID, null)
    }
  }, [location, city])

  return null
}
