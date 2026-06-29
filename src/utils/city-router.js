import { useCallback } from 'react'
import { useBrowserLocation } from 'wouter/use-browser-location'
import {
  parseCityFromPath,
  stripCityFromPath,
  withCityPath,
  isCityExemptPath,
} from './city-url'

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
    [city, setFullPath],
  )

  return [basePath, navigate]
}
