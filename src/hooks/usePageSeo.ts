import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { applyPageSeo } from '../utils/seo-head'
import { parseCityFromPath } from '../utils/city-url'

type UsePageSeoArgs = {
  title: string
  description?: string
  /** Path without city segment, e.g. /musica/dj — city suffix added automatically */
  path?: string
  h1?: string
  image?: string
  cityName?: string
  cityShort?: string | null
  extraKeywords?: string[]
  /** When false, skip applying (e.g. loading state) */
  enabled?: boolean
}

/**
 * Apply full page SEO (title, description, canonical, OG, Twitter) for any route.
 * Prefer this over mutating document.title alone.
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
    const { basePath } = parseCityFromPath(location)
    const seoPath = path || basePath || location || '/'
    applyPageSeo({
      title,
      description:
        description ||
        `${title} para bodas y eventos${cityName ? ` en ${cityName}` : ' en México'}. Cotiza con Bodasesor por WhatsApp.`,
      path: seoPath,
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
    // extraKeywords identity — callers should memoize or pass stable arrays
    extraKeywords,
  ])
}
