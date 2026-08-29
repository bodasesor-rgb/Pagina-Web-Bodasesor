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
import { SPA_SEO_HUBS, SPA_SEO_HUB_PATHS } from '../data/spa-seo-hubs'
import { HOME_SERP } from '../data/priority-hub-serp.js'
import { clampMetaDescription } from '../utils/seo-meta'
import { organizationRef } from '../utils/seo-page-meta'
import { absoluteOgImage } from '../utils/seo-social'
import { hasStaticBlogHtml } from '../data/static-blog-slugs'

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
    const last = items[items.length - 1]
    if (last && !last.href) {
      items[items.length - 1] = { name: last.name, href: basePath }
      items.push({ name: activeCity.name })
    }
  }
  return items
}

/** Full hub inventory (SPA_SEO_HUBS) + home/search overrides — every indexed route. */
const SEO_MAP = {
  '/': {
    title: HOME_SERP.title,
    desc: HOME_SERP.desc,
  },
  '/buscar': {
    title: 'Buscar servicios',
    desc: 'Busca banquetes, catering, mobiliario y servicios para eventos en Bodasesor. Cotiza por WhatsApp sin compromiso.',
  },
  ...Object.fromEntries(
    SPA_SEO_HUBS.map((h) => [h.path, { title: h.title, desc: h.desc }]),
  ),
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
        // Every non-hub route still gets full page SEO immediately (absolute OG/canonical).
        // Lazy pages refine with richer copy via applyPageSeo / useCityHubPage.
        const slugPart = basePath.split('/').filter(Boolean).pop() || 'servicio'
        const label = labelFromSlug(slugPart)
        const headline = activeCity ? `${label} en ${activeCity.short || activeCity.name}` : label
        const desc = clampMetaDescription(
          activeCity
            ? `${label} para bodas y eventos en ${activeCity.name}. Cotiza con Bodasesor por WhatsApp.`
            : `${label} para bodas y eventos en México. Cotiza con Bodasesor por WhatsApp.`,
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
            name: headline,
            description: desc,
            url: canonical,
            city: activeCity,
          }),
        )
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
      // Nexus static HTML owns title/meta — never paint blog-data stubs during client nav.
      if (hasStaticBlogHtml(blogMatch[1])) {
        return () => {
          cancelled = true
        }
      }

      // Lazy-load blog corpus only on SPA-only article URLs
      import('../data/blog-feed')
        .then(({ getBlogFeed }) => {
          if (cancelled) return
          const blogPost = getBlogFeed().find((p) => p.slug === blogMatch[1])
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
