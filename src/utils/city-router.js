import { useCallback } from 'react'
import { useBrowserLocation } from 'wouter/use-browser-location'
import {
  parseCityFromPath,
  stripCityFromPath,
  withCityPath,
  isCityExemptPath,
} from './city-url'

function normalizePath(path) {
  const p = path.replace(/\/+$/, '') || '/'
  return p.startsWith('/') ? p : `/${p}`
}

/**
 * Wouter location hook: routes match base path; browser URL keeps /city as its own segment.
 */
export function useCityAwareLocation() {
  const [fullPath, setFullPath] = useBrowserLocation()
  const { basePath, city } = parseCityFromPath(fullPath)

  const navigate = useCallback(
    (to, opts) => {
      if (typeof to !== 'string') {
        setFullPath(to, opts)
        return
      }

      if (to.startsWith('/') && !to.startsWith('//')) {
        const parsed = parseCityFromPath(to)
        if (parsed.city) {
          setFullPath(to, opts)
          return
        }

        const normalizedTo = normalizePath(to)
        const strippedCurrent = normalizePath(stripCityFromPath(fullPath))

        // City badge / "quitar ciudad": navigate to base path without re-appending city
        if (city && normalizedTo === strippedCurrent) {
          setFullPath(normalizedTo, opts)
          return
        }

        const stripped = stripCityFromPath(to)
        const target =
          city?.slug && !isCityExemptPath(stripped)
            ? withCityPath(stripped, city.slug)
            : stripped
        setFullPath(target, opts)
        return
      }

      setFullPath(to, opts)
    },
    [city, fullPath, setFullPath],
  )

  return [basePath, navigate]
}
