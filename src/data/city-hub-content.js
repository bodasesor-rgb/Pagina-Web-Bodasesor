/** Vite/SPA loader — do not import this from Node scripts (use scripts/lib/load-city-hub-content.mjs). */
import data from './city-hub-content.json'
import { normalizeCityHubContent } from './city-hub-schema.js'
import { CITY_MAP } from './city-data.js'

/** @type {Record<string, any>} */
export const CITY_HUB_CONTENT = data

export function getCityHubContent(hubSlug, citySlug) {
  if (!hubSlug || !citySlug) return null
  const raw = CITY_HUB_CONTENT[`${hubSlug}/${citySlug}`]
  if (!raw) return null
  const cityName = CITY_MAP[citySlug]?.name || citySlug
  return normalizeCityHubContent(raw, { hub: hubSlug, city: citySlug, cityName })
}
