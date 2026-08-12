import { useEffect } from 'react'
import { useCity } from '../context/CityContext'
import { getCityHubContent } from '../data/city-hub-content'
import { buildSeoTitle } from '../utils/seo-title'
import { upsertJsonLd } from '../utils/seo-head'
import { buildFaqPageJsonLd, buildServiceCityJsonLd } from '../utils/seo-meta'
import { toSpanishTitleCase, buildHighlightKeywords } from '../utils/spanish-title-case'

/**
 * Shared city-hub SEO copy for standalone category pages + ServicePage-compatible fields.
 */
export function useCityHubPage(hubSlug: string, fallbackTitle: string) {
  const { city } = useCity()
  const cityCopy = city ? getCityHubContent(hubSlug, city.slug) : null

  const displayH1 = cityCopy?.h1
    ? toSpanishTitleCase(cityCopy.h1)
    : toSpanishTitleCase(city ? `${fallbackTitle} en ${city.name}` : fallbackTitle)

  const displayHeadline = cityCopy?.headline
    ? toSpanishTitleCase(cityCopy.headline)
    : null

  const displaySectionTitle = cityCopy?.sectionTitle
    ? toSpanishTitleCase(cityCopy.sectionTitle)
    : null

  const keywords = buildHighlightKeywords({
    primaryKeyword: cityCopy?.primaryKeyword || '',
    zones: cityCopy?.zones || [],
    cityName: city?.name || '',
    cityShort: city?.short || '',
    extra: [fallbackTitle, 'Bodas', 'Eventos', 'Catering', 'Banquetes'],
  })

  useEffect(() => {
    if (cityCopy?.seoTitle) {
      document.title = buildSeoTitle(cityCopy.seoTitle, null)
    } else if (city) {
      document.title = buildSeoTitle(`${fallbackTitle} en ${city.short || city.name}`, null)
    } else {
      document.title = buildSeoTitle(fallbackTitle, null)
    }
    const meta = document.querySelector('meta[name="description"]')
    if (meta && (cityCopy?.seoDescription || city)) {
      meta.setAttribute(
        'content',
        cityCopy?.seoDescription ||
          `${fallbackTitle} para bodas y eventos${city ? ` en ${city.name}` : ''}. Cotiza con Bodasesor.`,
      )
    }
  }, [city, cityCopy, fallbackTitle])

  useEffect(() => {
    if (city && cityCopy) {
      if (cityCopy.faqs?.length >= 2) {
        upsertJsonLd('bodasesor-faq-jsonld', buildFaqPageJsonLd(cityCopy.faqs))
      }
      upsertJsonLd(
        'bodasesor-service-city-jsonld',
        buildServiceCityJsonLd({
          name: displayH1,
          description: cityCopy.seoDescription || displayHeadline || displayH1,
          url: `https://bodasesor.com/${hubSlug}/${city.slug}`,
          cityName: city.name,
          zones: cityCopy.zones || [],
        }),
      )
    } else {
      upsertJsonLd('bodasesor-faq-jsonld', null)
      upsertJsonLd('bodasesor-service-city-jsonld', null)
    }
    return () => {
      upsertJsonLd('bodasesor-faq-jsonld', null)
      upsertJsonLd('bodasesor-service-city-jsonld', null)
    }
  }, [city, cityCopy, displayH1, displayHeadline, hubSlug])

  return {
    city,
    cityCopy,
    displayH1,
    displayHeadline,
    displaySectionTitle,
    keywords,
  }
}
