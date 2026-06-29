import { useEffect, useState } from 'react'
import { useBrowserLocation } from 'wouter/use-browser-location'

function normalizePath(path) {
  const decoded = decodeURIComponent(path)
  return decoded.replace(/\/+$/, '') || '/'
}

function resolveDest(raw, origin) {
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  return `${origin}${raw.startsWith('/') ? raw : `/${raw}`}`
}

/**
 * Client-side fallback when Netlify _redirects / edge miss a legacy Shopify URL.
 * Loads the redirect map only for /products|collections|blogs|pages paths.
 */
export default function LegacyShopifyRedirect() {
  const [path] = useBrowserLocation()
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    const lookup = normalizePath(path)
    const withSlash = `${lookup}/`

    import('../../netlify/edge-functions/redirects-map.json')
      .then((mod) => {
        if (cancelled) return
        const entries = mod.default?.entries ?? mod.entries
        const dest =
          entries[lookup] ||
          entries[withSlash] ||
          entries[`${lookup}${window.location.search}`]

        if (dest) {
          window.location.replace(resolveDest(dest, window.location.origin))
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
