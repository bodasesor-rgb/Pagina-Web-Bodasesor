import { useEffect, useMemo } from 'react'
import { useBrowserLocation } from 'wouter/use-browser-location'
import { resolveLegacyPathClient } from '../utils/legacy-redirect'

function normalizePath(path) {
  const decoded = decodeURIComponent(path)
  return decoded.replace(/\/+$/, '') || '/'
}

function toAbsolute(dest) {
  if (!dest) return `${window.location.origin}/banquetes-catering`
  if (dest.startsWith('http')) return dest
  return `${window.location.origin}${dest.startsWith('/') ? dest : `/${dest}`}`
}

/**
 * Client-side redirect for legacy Shopify URLs.
 * Always resolves immediately — never hangs on "Redirigiendo…".
 */
export default function LegacyShopifyRedirect() {
  const [path] = useBrowserLocation()
  const lookup = normalizePath(path)
  const resolved = useMemo(
    () =>
      resolveLegacyPathClient(
        `${lookup}${typeof window !== 'undefined' ? window.location.search : ''}`,
      ) || '/banquetes-catering',
    [lookup],
  )

  useEffect(() => {
    const target = toAbsolute(resolved)
    window.location.replace(target)

    // Hard fallback if navigation is blocked / soft-hangs
    const t = setTimeout(() => {
      if (window.location.pathname.replace(/\/+$/, '') === lookup) {
        window.location.href = target
      }
    }, 1800)

    return () => clearTimeout(t)
  }, [lookup, resolved])

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 font-serif text-[#162040] px-4 text-center">
      <p>Redirigiendo…</p>
      <a href={resolved} className="text-sm underline text-[#162040]/80">
        Continuar a {resolved}
      </a>
    </div>
  )
}
