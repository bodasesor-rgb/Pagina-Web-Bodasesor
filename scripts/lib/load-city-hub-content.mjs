/** Node-safe loader for city hub content (avoids Vite JSON import in scripts). */
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { normalizeCityHubContent } from '../../src/data/city-hub-schema.js'
import { CITY_MAP } from '../../src/data/city-data.js'

const JSON_PATH = join(dirname(fileURLToPath(import.meta.url)), '../../src/data/city-hub-content.json')

export function loadCityHubStore() {
  if (!existsSync(JSON_PATH)) return {}
  return JSON.parse(readFileSync(JSON_PATH, 'utf8'))
}

export function getCityHubContent(hubSlug, citySlug) {
  if (!hubSlug || !citySlug) return null
  const store = loadCityHubStore()
  const raw = store[`${hubSlug}/${citySlug}`]
  if (!raw) return null
  const cityName = CITY_MAP[citySlug]?.name || citySlug
  return normalizeCityHubContent(raw, { hub: hubSlug, city: citySlug, cityName })
}
