import { useEffect, useMemo } from 'react'
import { useLocation } from 'wouter'
import { CITY_SLUGS } from '../utils/city-url'
import { resolveEventosSlug } from '../utils/page-routes'

/**
 * Nexus /eventos/:slug → canonical SPA route.
 * Pass the FULL slug (including city suffix) — do not strip city before resolve.
 */
export default function EventosLegacyRedirect({ slug }) {
  const [, navigate] = useLocation()
  const target = useMemo(() => resolveEventosSlug(slug, CITY_SLUGS), [slug])

  useEffect(() => {
    navigate(target, { replace: true })

    // If wouter navigation fails to leave /eventos/*, force a hard navigation
    const t = setTimeout(() => {
      const here = window.location.pathname.replace(/\/+$/, '')
      if (here.startsWith('/eventos')) {
        window.location.replace(target)
      }
    }, 1500)

    return () => clearTimeout(t)
  }, [target, navigate])

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3 font-serif text-gray-700 px-4 text-center">
      <p>Redirigiendo…</p>
      <a href={target} className="text-sm underline">
        Continuar a {target}
      </a>
    </div>
  )
}
