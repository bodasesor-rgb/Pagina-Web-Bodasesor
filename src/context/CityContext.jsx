import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { parseCityFromPath } from '../utils/city-url'

const CityContext = createContext({ city: null, setCity: () => {} })

/** Keeps CityContext in sync with the current URL */
export function CityUrlSync() {
  const [location] = useLocation()
  const { setCity } = useContext(CityContext)

  useEffect(() => {
    const { city } = parseCityFromPath(location)
    setCity(city)
  }, [location, setCity])

  return null
}

export function CityProvider({ children }) {
  const [city, setCity] = useState(null)
  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  )
}

export function useCity() {
  return useContext(CityContext)
}
