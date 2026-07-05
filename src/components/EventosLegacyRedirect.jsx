import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { CITY_SLUGS } from '../utils/city-url'
import { resolveEventosSlug } from '../utils/page-routes'

export default function EventosLegacyRedirect({ slug }) {
  const [, navigate] = useLocation()

  useEffect(() => {
    const target = resolveEventosSlug(slug, CITY_SLUGS)
    navigate(target, { replace: true })
  }, [slug, navigate])

  return (
    <div className="min-h-[40vh] flex items-center justify-center font-serif text-gray-700">
      Redirigiendo…
    </div>
  )
}
