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

        const fallback = resolveLegacyPathClient(`${lookup}${window.location.search}`)
        if (fallback) {
          window.location.replace(
            `${window.location.origin}${fallback.startsWith('/') ? fallback : `/${fallback}`}`,
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

  useEffect(() => {
    if (status === 'missing' || status === 'error') {
      window.location.replace('/banquetes-catering')
    }
  }, [status])

  if (status === 'loading' || status === 'missing' || status === 'error') {
    return (
      <div className="min-h-[50vh] flex items-center justify-center font-serif text-[#162040]">
        Redirigiendo…
      </div>
    )
  }

  return null
}
