import { useEffect, useState } from 'react'
import { useBrowserLocation } from 'wouter/use-browser-location'
import { resolveLegacyPathClient } from '../utils/legacy-redirect'

function normalizePath(path) {
  const decoded = decodeURIComponent(path)
  return decoded.replace(/\/+$/, '') || '/'
}

/**
 * Client-side redirect for legacy Shopify URLs.
 * Runs instantly via resolver logic; full map is fallback only.
 */
export default function LegacyShopifyRedirect() {
  const [path] = useBrowserLocation()
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    const lookup = normalizePath(path)
    const resolved = resolveLegacyPathClient(`${lookup}${window.location.search}`)

    if (resolved) {
      window.location.replace(resolved)
      return
    }

    const withSlash = `${lookup}/`
    fetch('/redirects-map.json', { credentials: 'same-origin' })
      .then((res) => {
        if (!res.ok) throw new Error(`redirects-map ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const entries = data?.entries ?? data
        const dest =
          entries[lookup] ||
          entries[withSlash] ||
          entries[`${lookup}${window.location.search}`]

        if (dest) {
          window.location.replace(
            dest.startsWith('http')
              ? dest
              : `${window.location.origin}${dest.startsWith('/') ? dest : `/${dest}`}`,
          )
          return
        }

        setStatus('missing')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [path])

  if (status === 'loading') {
    return (
      <div className="min-h-[50vh] flex items-center justify-center font-serif text-[#162040]">
        Redirigiendo…
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5efe8] text-[#162040] px-4">
      <h1 className="text-4xl font-serif font-bold mb-4">Página no disponible</h1>
      <p className="text-lg mb-8 text-gray-600 text-center max-w-md">
        Esta URL antigua ya no existe. Te llevamos al catálogo principal.
      </p>
      <a
        href="/banquetes-catering"
        className="bg-[#162040] text-white px-6 py-3 rounded-xl font-bold font-serif hover:bg-[#1e2d52] transition-colors"
      >
        Ver servicios
      </a>
    </div>
  )
}
