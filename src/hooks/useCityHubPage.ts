import { useEffect, useMemo } from 'react'
import { useCity } from '../context/CityContext'
import { getCityHubContent } from '../data/city-hub-content'
import { applyPageSeo, upsertJsonLd, absoluteUrl } from '../utils/seo-head'
import { buildFaqPageJsonLd, buildServiceCityJsonLd } from '../utils/seo-meta'
import { buildNationalHubCopy } from '../utils/national-service-copy'
import { toSpanishTitleCase, buildHighlightKeywords } from '../utils/spanish-title-case'
import { stripSeoBrand } from '../utils/seo-title'

export type PageSeoOverrides = {
  /** Preferred <title> / og:title source (brand appended via buildSeoTitle) */
  seoTitle?: string
  /** Preferred meta + og description (clamped 130–155) */
  seoDescription?: string
  /** Visible H1 when city-specific copy does not provide one */
  h1?: string
  /** Absolute or site-relative OG image */
  image?: string
}

/**
 * Shared city-hub SEO copy for standalone category pages + ServicePage-compatible fields.
 * National (no-city) pages get the same structure via buildNationalHubCopy.
 * Optional pageSeo overrides (e.g. banquet menu seoTitle/seoDescription) win on national pages
 * and fill gaps on city pages.
 */
export function useCityHubPage(
  hubSlug: string,
  fallbackTitle: string,
  extraKeywords: string[] = [],
  pageSeo: PageSeoOverrides | null = null,
) {
  const { city } = useCity()

  const cityCopy = useMemo(() => {
    const base = city
      ? getCityHubContent(hubSlug, city.slug)
      : buildNationalHubCopy(hubSlug, fallbackTitle)
    if (!base && !pageSeo) return null
    if (!pageSeo) return base
    // City Gemini copy wins when present; pageSeo fills national / missing fields.
    return {
      ...(base || {}),
      h1: city && base?.h1 ? base.h1 : pageSeo.h1 || base?.h1,
      seoTitle: city && base?.seoTitle ? base.seoTitle : pageSeo.seoTitle || base?.seoTitle,
      seoDescription:
        city && base?.seoDescription
          ? base.seoDescription
          : pageSeo.seoDescription || base?.seoDescription,
    }
  }, [city, hubSlug, fallbackTitle, pageSeo])

  const displayH1 = toSpanishTitleCase(
    cityCopy?.h1 ||
      pageSeo?.h1 ||
      (city ? `${fallbackTitle} en ${city.name}` : fallbackTitle),
  )

  const displayHeadline = cityCopy?.headline
    ? toSpanishTitleCase(cityCopy.headline)
    : null

  const displaySectionTitle = cityCopy?.sectionTitle
    ? toSpanishTitleCase(cityCopy.sectionTitle)
    : null

  const keywords = buildHighlightKeywords({
    primaryKeyword: cityCopy?.primaryKeyword || pageSeo?.h1 || fallbackTitle || '',
    zones: cityCopy?.zones || [],
    cityName: city?.name || 'México',
    cityShort: city?.short || '',
    extra: [fallbackTitle, 'Bodas', 'Eventos', 'Catering', 'Banquetes', 'México', ...extraKeywords],
  })

  useEffect(() => {
    const slug = String(hubSlug || '').replace(/^\/+|\/+$/g, '')
    const seoPath = city ? `/${slug}/${city.slug}` : `/${slug}`

    const titleSource =
      cityCopy?.seoTitle ||
      pageSeo?.seoTitle ||
      (city
        ? `${fallbackTitle} en ${city.short || city.name}`
        : fallbackTitle)

    const descSource =
      cityCopy?.seoDescription ||
      pageSeo?.seoDescription ||
      `${fallbackTitle} para bodas y eventos${city ? ` en ${city.name}` : ' en México'}. Cotiza con Bodasesor por WhatsApp.`

    applyPageSeo({
      title: stripSeoBrand(titleSource),
      description: descSource,
      path: seoPath,
      image: pageSeo?.image,
      h1: displayH1,
      cityName: city?.name || '',
      cityShort: null,
      extraKeywords,
    })
  }, [city, cityCopy, fallbackTitle, hubSlug, pageSeo, displayH1, extraKeywords])

  useEffect(() => {
    if (cityCopy?.faqs?.length >= 2) {
      upsertJsonLd('bodasesor-faq-jsonld', buildFaqPageJsonLd(cityCopy.faqs))
    } else {
      upsertJsonLd('bodasesor-faq-jsonld', null)
    }
    if (cityCopy || displayH1) {
      upsertJsonLd(
        'bodasesor-service-city-jsonld',
        buildServiceCityJsonLd({
          name: displayH1,
          description:
            cityCopy?.seoDescription ||
            pageSeo?.seoDescription ||
            displayHeadline ||
            displayH1,
          url: absoluteUrl(city ? `/${hubSlug}/${city.slug}` : `/${hubSlug}`),
          cityName: city?.name || 'México',
          zones: cityCopy?.zones || [],
        }),
      )
    } else {
      upsertJsonLd('bodasesor-service-city-jsonld', null)
    }
    return () => {
      upsertJsonLd('bodasesor-faq-jsonld', null)
      upsertJsonLd('bodasesor-service-city-jsonld', null)
    }
  }, [city, cityCopy, displayH1, displayHeadline, hubSlug, pageSeo])

  return {
    city,
    cityCopy,
    displayH1,
    displayHeadline,
    displaySectionTitle,
    keywords,
  }
}
