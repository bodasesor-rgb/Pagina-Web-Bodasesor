import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { applyPageSeo, canonicalPath } from '../utils/seo-head'
import { parseCityFromPath } from '../utils/city-url'

type UsePageSeoArgs = {
  title: string
  description?: string
  /** Logical path without city (e.g. /musica/dj). City suffix taken from the URL. */
  path?: string
  h1?: string
  image?: string
  cityName?: string
  cityShort?: string | null
  extraKeywords?: string[]
  /** When false, skip applying (e.g. loading / not found). */
  enabled?: boolean
}

/**
 * Apply full page SEO (title, description, canonical, OG, Twitter) for any route.
 * Canonical/og:url always use the current absolute URL (including city when present).
 */
export function usePageSeo({
  title,
  description,
  path,
  h1,
  image,
  cityName = '',
  cityShort = null,
  extraKeywords = [],
  enabled = true,
}: UsePageSeoArgs) {
  const [location] = useLocation()

  useEffect(() => {
    if (!enabled || !title) return
    const { basePath, city: pathCity } = parseCityFromPath(location)
    const base = (path || basePath || '/').replace(/\/+$/, '') || '/'
    const seoPath = pathCity ? `${base}/${pathCity.slug}` : base === '/' ? '/' : base

    applyPageSeo({
      title,
      description:
        description ||
        `${title} para bodas y eventos${cityName ? ` en ${cityName}` : ' en México'}. Cotiza con Bodasesor por WhatsApp.`,
      path: seoPath || canonicalPath(location),
      h1: h1 || title,
      image,
      cityName,
      cityShort,
      extraKeywords,
    })
  }, [
    enabled,
    title,
    description,
    path,
    h1,
    image,
    cityName,
    cityShort,
    location,
    extraKeywords,
  ])
}
