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
  applyPageIdentityMeta,
  applySocialMeta,
  applyPageSeo,
} from '../utils/seo-head'
import { SPA_SEO_HUB_PATHS } from '../data/spa-seo-hubs'
import { clampMetaDescription } from '../utils/seo-meta'
import { organizationRef } from '../utils/seo-page-meta'
import { absoluteOgImage } from '../utils/seo-social'

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
    title: 'Galería de Banquetes y Eventos Reales',
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

/** Thin SPA shells: /{product|detail}/{city} — hubs × city stay indexable. */
function isThinCityProductShell(path, basePath, pathCity) {
  if (!pathCity || basePath === '/' || path.startsWith('/blog')) return false
  if (SPA_SEO_HUB_PATHS.has(basePath)) return false
  return true
}

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

function buildArticleJsonLd({ title, description, url, date, image, keywords }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: date || undefined,
    image: image || undefined,
    keywords: keywords || undefined,
    author: organizationRef(),
    publisher: {
      ...organizationRef(),
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
    let cancelled = false
    const path = canonicalPath(location)
    const { basePath, city: pathCity } = parseCityFromPath(path)
    const activeCity = city || pathCity
    const canonical = absoluteUrl(path)

    upsertLink('canonical', canonical)
    upsertMeta('property', 'og:url', canonical)

    const hubSeo = SEO_MAP[basePath]
    const blogMatch = path.match(/^\/blog\/([^/]+)$/)

    const applyNonBlog = (blogPost = null) => {
      upsertJsonLd(
        BREADCRUMB_JSONLD_ID,
        buildBreadcrumbJsonLd(
          breadcrumbsFromPath(path, basePath, activeCity, blogPost, hubSeo),
        ),
      )

      if (hubSeo && basePath !== '/') {
        const headline = activeCity
          ? `${hubSeo.title} en ${activeCity.short || activeCity.name}`
          : hubSeo.title
        const desc = clampMetaDescription(
          activeCity
            ? `${hubSeo.desc} Cotiza en ${activeCity.name} y área metropolitana.`
            : hubSeo.desc,
        )
        applyPageSeo({
          title: headline,
          description: desc,
          path,
          h1: headline,
          cityName: activeCity?.name,
        })
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
        upsertJsonLd(PAGE_JSONLD_ID, null)
        upsertJsonLd(BREADCRUMB_JSONLD_ID, null)
        if (SEO_MAP['/']) {
          const headline = activeCity
            ? `Banquetes y Catering en ${activeCity.short || activeCity.name}`
            : SEO_MAP['/'].title
          applyPageSeo({
            title: headline,
            description: SEO_MAP['/'].desc,
            path: '/',
            h1: 'Banquetes, catering y servicios para eventos en México',
            cityName: activeCity?.name,
          })
        }
      } else if (path !== '/' && !path.startsWith('/buscar')) {
        // Product / banquet / detail pages own title+OG via applyPageSeo when available.
        // Always keep absolute canonical + og:url; re-sync social after page effects.
        upsertLink('canonical', canonical)
        upsertMeta('property', 'og:url', canonical)
        upsertJsonLd(PAGE_JSONLD_ID, null)
        applyPageIdentityMeta({
          path,
          title: labelFromSlug(basePath.split('/').filter(Boolean).pop() || 'servicio'),
          cityName: activeCity?.name,
        })
        const syncSocialFromDocument = () => {
          if (cancelled) return
          const title = document.title
          const desc = document
            .querySelector('meta[name="description"]')
            ?.getAttribute('content')
          if (!title) return
          applySocialMeta({
            title,
            description:
              desc ||
              `${title.replace(/\s*\|\s*Bodasesor.*$/i, '')}. Cotiza con Bodasesor por WhatsApp.`,
            url: canonical,
          })
        }
        requestAnimationFrame(() => requestAnimationFrame(syncSocialFromDocument))
        setTimeout(syncSocialFromDocument, 80)
      } else {
        applySocialMeta({
          title: document.title || 'Bodasesor',
          description:
            document.querySelector('meta[name="description"]')?.getAttribute('content') ||
            SEO_MAP['/']?.desc ||
            'Bodasesor',
          url: canonical,
        })
        applyPageIdentityMeta({
          path,
          title: document.title,
          cityName: activeCity?.name,
        })
      }

      const noindex =
        NOINDEX_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`)) ||
        isThinCityProductShell(path, basePath, pathCity)
      upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    }

    if (blogMatch) {
      // Lazy-load blog corpus only on article URLs (keeps ~700KB off the home critical path)
      import('../data/blog-data')
        .then(({ blogPosts }) => {
          if (cancelled) return
          const blogPost = blogPosts.find((p) => p.slug === blogMatch[1])
          if (!blogPost) {
            applyNonBlog(null)
            return
          }
          const title = `${blogPost.title} | Bodasesor Blog`
          document.title = title
          const blogDesc = clampMetaDescription(blogPost.excerpt || blogPost.title)
          upsertMeta('name', 'description', blogDesc)
          applySocialMeta({
            title,
            description: blogDesc,
            url: canonical,
            image: blogPost.image,
            type: 'article',
          })
          const keywords = applyPageIdentityMeta({
            path,
            title: blogPost.title,
            h1: blogPost.title,
            extraKeywords: [blogPost.category, 'blog eventos', 'consejos bodas'].filter(Boolean),
          })
          upsertJsonLd(
            BREADCRUMB_JSONLD_ID,
            buildBreadcrumbJsonLd(
              breadcrumbsFromPath(path, basePath, activeCity, blogPost, hubSeo),
            ),
          )
          upsertJsonLd(
            PAGE_JSONLD_ID,
            buildArticleJsonLd({
              title: blogPost.title,
              description: blogPost.excerpt || blogPost.title,
              url: canonical,
              date: blogPost.date,
              image: absoluteOgImage(blogPost.image),
              keywords,
            }),
          )
          upsertMeta('name', 'robots', 'index, follow')
        })
        .catch(() => {
          if (!cancelled) applyNonBlog(null)
        })
    } else {
      applyNonBlog(null)
    }

    return () => {
      cancelled = true
      upsertJsonLd(BREADCRUMB_JSONLD_ID, null)
    }
  }, [location, city])

  return null
}
