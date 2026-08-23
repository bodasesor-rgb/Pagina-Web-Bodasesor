import { createContext, useContext, useState, useEffect } from 'react'
import { useBrowserLocation } from 'wouter/use-browser-location'
import { parseCityFromPath, toCanonicalCityPath } from '../utils/city-url'
import { prefetchCityHubContent } from '../data/city-hub-content'

const CityContext = createContext({ city: null, setCity: () => {} })

/** Read city from the real browser URL on first paint (avoid national flash). */
function cityFromWindow() {
  if (typeof window === 'undefined') return null
  try {
    return parseCityFromPath(window.location.pathname).city || null
  } catch {
    return null
  }
}

/** Keeps CityContext in sync with the current URL and normalizes legacy city URLs */
export function CityUrlSync() {
  const [fullPath, setFullPath] = useBrowserLocation()
  const { setCity } = useContext(CityContext)

  useEffect(() => {
    const canonical = toCanonicalCityPath(fullPath)
    const { city } = parseCityFromPath(canonical)
    setCity(city)

    if (city) {
      const warm = () => prefetchCityHubContent()
      if ('requestIdleCallback' in window) {
        requestIdleCallback(warm, { timeout: 6000 })
      } else {
        setTimeout(warm, 2000)
      }
    }

    const normalized = fullPath.replace(/\/+$/, '') || '/'
    if (canonical !== normalized) {
      setFullPath(canonical, { replace: true })
    }
  }, [fullPath, setFullPath, setCity])

  return null
}

export function CityProvider({ children }) {
  const [city, setCity] = useState(cityFromWindow)
  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  )
}

export function useCity() {
  return useContext(CityContext)
}
