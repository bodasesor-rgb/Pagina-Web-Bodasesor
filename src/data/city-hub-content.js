/** Vite/SPA loader — do not import this from Node scripts (use scripts/lib/load-city-hub-content.mjs). */
import { normalizeCityHubContent } from './city-hub-schema.js'
import { CITY_MAP } from './city-data.js'

/** @type {Record<string, any> | null} */
let store = null
/** @type {Promise<Record<string, any>> | null} */
let loadPromise = null

/** Lazy-load the 6MB JSON only when a city hub page needs it (keeps initial JS small). */
export function prefetchCityHubContent() {
  if (store) return Promise.resolve(store)
  if (!loadPromise) {
    loadPromise = import('./city-hub-content.json').then((mod) => {
      store = mod.default
      return store
    })
  }
  return loadPromise
}

function lookup(hubSlug, citySlug) {
  if (!store || !hubSlug || !citySlug) return null
  const raw = store[`${hubSlug}/${citySlug}`]
  if (!raw) return null
  const cityName = CITY_MAP[citySlug]?.name || citySlug
  return normalizeCityHubContent(raw, { hub: hubSlug, city: citySlug, cityName })
}

/** Sync read after prefetchCityHubContent() resolves. */
export function getCityHubContent(hubSlug, citySlug) {
  return lookup(hubSlug, citySlug)
}

export async function getCityHubContentAsync(hubSlug, citySlug) {
  await prefetchCityHubContent()
  return lookup(hubSlug, citySlug)
}
