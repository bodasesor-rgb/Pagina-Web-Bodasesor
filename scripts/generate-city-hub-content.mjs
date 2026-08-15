#!/usr/bin/env node
/**
 * Generate unique hub×city SEO copy with Gemini (schema v2, cost-optimized).
 *
 * Usage:
 *   node scripts/generate-city-hub-content.mjs --hub=banquetes
 *   node scripts/generate-city-hub-content.mjs --hub=banquetes --force   # overwrite (schema upgrades)
 *   node scripts/generate-city-hub-content.mjs --hub=banquetes --city=leon
 *
 * Auth: GEMINI_API_KEY / GEMINI_IA
 * Model: gemini-3.1-flash-lite + explicit context cache (see gemini-config.mjs)
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CITY_MAP } from '../src/data/city-data.js'
import { CITY_LOCAL_CONTEXT } from '../src/data/city-local-context.js'
import { SPA_SEO_HUBS } from '../src/data/spa-seo-hubs.js'
import {
  CITY_HUB_SCHEMA_VERSION,
  CITY_HUB_SEO_LIMITS as L,
  isCityHubSchemaCurrent,
} from '../src/data/city-hub-schema.js'
import { geminiGenerate, parseGeminiJson } from './lib/gemini.mjs'
import { GEMINI_TEXT_MODEL } from './lib/gemini-config.mjs'
import { clampMetaDescription } from '../src/utils/seo-meta.js'
import { toSpanishTitleCase } from '../src/utils/spanish-title-case.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_JSON = join(ROOT, 'src/data/city-hub-content.json')
const OUT_JS = join(ROOT, 'src/data/city-hub-content.js')

function parseArgs(argv) {
  const out = { hubs: [], cities: [], force: false, limit: 0 }
  for (const a of argv) {
    if (a === '--force') out.force = true
    else if (a.startsWith('--hub=')) out.hubs = a.slice(6).split(',').map((s) => s.trim()).filter(Boolean)
    else if (a.startsWith('--city=')) out.cities = a.slice(7).split(',').map((s) => s.trim()).filter(Boolean)
    else if (a.startsWith('--limit=')) out.limit = Number(a.slice(8)) || 0
  }
  return out
}

function uniqueCities() {
  const map = new Map()
  for (const c of Object.values(CITY_MAP)) {
    if (!map.has(c.slug)) map.set(c.slug, c)
  }
  return [...map.values()]
}

function loadStore() {
  if (!existsSync(OUT_JSON)) return {}
  return JSON.parse(readFileSync(OUT_JSON, 'utf8'))
}

function writeStore(store) {
  mkdirSync(dirname(OUT_JSON), { recursive: true })
  const sorted = Object.fromEntries(Object.entries(store).sort(([a], [b]) => a.localeCompare(b)))
  writeFileSync(OUT_JSON, `${JSON.stringify(sorted, null, 2)}\n`)
  // Keep JS loader stable (hand-maintained wrapper imports JSON + schema)
  if (!existsSync(OUT_JS)) {
    writeFileSync(
      OUT_JS,
      `import data from './city-hub-content.json'\n` +
        `import { normalizeCityHubContent } from './city-hub-schema.js'\n` +
        `import { CITY_MAP } from './city-data.js'\n` +
        `export const CITY_HUB_CONTENT = data\n` +
        `export function getCityHubContent(hubSlug, citySlug) {\n` +
        `  if (!hubSlug || !citySlug) return null\n` +
        `  const raw = CITY_HUB_CONTENT[\`\${hubSlug}/\${citySlug}\`]\n` +
        `  if (!raw) return null\n` +
        `  return normalizeCityHubContent(raw, { hub: hubSlug, city: citySlug, cityName: CITY_MAP[citySlug]?.name || citySlug })\n` +
        `}\n`,
    )
  }
}

function hubMeta(hubSlug) {
  const path = hubSlug.startsWith('/') ? hubSlug : `/${hubSlug}`
  return SPA_SEO_HUBS.find((h) => h.path === path) || null
}

function clipTitle(s, max = L.seoTitleMax) {
  let t = String(s || '').replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max - 1)
  const sp = cut.lastIndexOf(' ')
  return `${(sp > 20 ? cut.slice(0, sp) : cut).trim()}…`
}

/** Compact user turn — brand rules live in Gemini context cache. */
function buildPrompt({ hub, city, local }) {
  const hubSlug = hub.path.replace(/^\//, '')
  const zones = (local?.zones || []).slice(0, 6).join(', ')
  const menuHint = /tiempos|buffet/i.test(hubSlug)
    ? `Enfócate en el formato de menú (${hub.title}): tiempos/servicio, logística local y por qué conviene en ${city.name}. El menú de platos es referencial (no inventes carta completa); describe el formato y el servicio.`
    : `Cubre el servicio hub con ángulo local de ${city.name}.`

  return `Genera JSON schemaVersion=${CITY_HUB_SCHEMA_VERSION} para landing SEO única.

hub=${hubSlug} title="${hub.title}"
hubDesc=${hub.desc || ''}
city=${city.slug} name="${city.name}" short="${city.short || ''}"
state=${local?.state || 'México'}
zones=${zones || 'área metropolitana'}
notes=${local?.notes || 'Eventos sociales y corporativos'}
${menuHint}

Límites: seoTitle≤${L.seoTitleMax}c, seoDescription ${L.seoDescriptionMin}-${L.seoDescriptionMax}c, h1≤${L.h1Max}c.
Reglas: español MX; sin precios/testimonios/venues inventados; copy no reusable con solo cambiar ciudad.
Campos exactos:
{
  "schemaVersion": ${CITY_HUB_SCHEMA_VERSION},
  "h1": string,
  "sectionTitle": string,
  "headline": string,
  "description": [string, string, string],
  "seoTitle": string,
  "seoDescription": string,
  "primaryKeyword": string,
  "zones": string[${L.zonesMin}-${L.zonesMax}],
  "localBullets": string[${L.localBulletsMin}-${L.localBulletsMax}],
  "faqs": [{"q":string,"a":string},${L.faqsExact} items]
}
sectionTitle ≠ h1. primaryKeyword tipo "${hub.title.toLowerCase()} en ${city.name.toLowerCase()}".`
}

function validateContent(obj, city) {
  if (!obj || typeof obj !== 'object') throw new Error('not an object')
  for (const k of ['h1', 'sectionTitle', 'headline', 'seoTitle', 'seoDescription', 'primaryKeyword']) {
    if (typeof obj[k] !== 'string' || obj[k].trim().length < 5) throw new Error(`bad ${k}`)
  }
  if (obj.sectionTitle.trim() === obj.h1.trim()) throw new Error('sectionTitle equals h1')
  if (!Array.isArray(obj.description) || obj.description.length < 2) throw new Error('bad description')
  if (!Array.isArray(obj.localBullets) || obj.localBullets.length < 2) throw new Error('bad localBullets')
  if (!Array.isArray(obj.faqs) || obj.faqs.length < 2) throw new Error('bad faqs')
  if (!Array.isArray(obj.zones) || obj.zones.length < 1) throw new Error('bad zones')

  const seoTitle = clipTitle(obj.seoTitle, L.seoTitleMax)
  const seoDescription = clampMetaDescription(obj.seoDescription)

  return {
    schemaVersion: CITY_HUB_SCHEMA_VERSION,
    h1: toSpanishTitleCase(clipTitle(obj.h1, L.h1Max)),
    sectionTitle: toSpanishTitleCase(String(obj.sectionTitle).trim()),
    headline: toSpanishTitleCase(clipTitle(obj.headline, L.headlineMax)),
    description: obj.description.map((s) => String(s).trim()).filter(Boolean).slice(0, 4),
    seoTitle: toSpanishTitleCase(seoTitle),
    seoDescription,
    primaryKeyword: toSpanishTitleCase(String(obj.primaryKeyword).trim()),
    zones: obj.zones.map((s) => String(s).trim()).filter(Boolean).slice(0, L.zonesMax),
    localBullets: obj.localBullets.map((s) => String(s).trim()).filter(Boolean).slice(0, L.localBulletsMax),
    faqs: obj.faqs
      .map((f) => ({ q: String(f.q || f.question || '').trim(), a: String(f.a || f.answer || '').trim() }))
      .filter((f) => f.q && f.a)
      .slice(0, L.faqsExact),
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const hubs = (args.hubs.length ? args.hubs : ['banquetes']).map((h) => h.replace(/^\//, ''))
  const cities = uniqueCities().filter((c) => !args.cities.length || args.cities.includes(c.slug))
  const store = loadStore()

  console.log(`Gemini model: ${GEMINI_TEXT_MODEL} | schema v${CITY_HUB_SCHEMA_VERSION}`)
  console.log(`Hubs: ${hubs.join(', ')} | cities: ${cities.length} | force=${args.force}`)

  let done = 0
  let skipped = 0
  let failed = 0

  for (const hubSlug of hubs) {
    const hub = hubMeta(hubSlug)
    if (!hub) {
      console.error(`Unknown hub (not in SPA_SEO_HUBS): ${hubSlug}`)
      process.exit(1)
    }
    for (const city of cities) {
      if (args.limit && done >= args.limit) break
      const key = `${hubSlug}/${city.slug}`
      const existing = store[key]
      // Skip only when already on current schema (unless --force)
      if (!args.force && existing && isCityHubSchemaCurrent(existing)) {
        skipped++
        continue
      }

      const local = CITY_LOCAL_CONTEXT[city.slug]
      process.stdout.write(`→ ${key} ... `)
      try {
        const text = await geminiGenerate(buildPrompt({ hub, city, local }), {
          json: true,
          temperature: 0.85,
          // V9.32-web: cache OFF by default; only when GEMINI_CONTEXT_CACHE=1
          useCache: process.env.GEMINI_CONTEXT_CACHE === '1',
          purpose: 'city-hub',
          model: GEMINI_TEXT_MODEL,
        })
        const parsed = validateContent(parseGeminiJson(text), city)
        store[key] = {
          ...parsed,
          hub: hubSlug,
          city: city.slug,
          generatedAt: new Date().toISOString(),
          model: GEMINI_TEXT_MODEL,
        }
        writeStore(store)
        done++
        console.log('ok')
        await new Promise((r) => setTimeout(r, 350))
      } catch (e) {
        failed++
        console.log(`FAIL ${e.message}`)
      }
    }
  }

  writeStore(store)
  console.log(`Done. generated=${done} skipped=${skipped} failed=${failed} totalKeys=${Object.keys(store).length}`)
  if (failed) process.exitCode = 1
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
