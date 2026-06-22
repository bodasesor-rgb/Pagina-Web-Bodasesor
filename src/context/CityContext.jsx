import { createContext, useContext, useState } from 'react'

const CityContext = createContext(null)

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
