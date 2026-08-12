#!/usr/bin/env node
/**
 * Verify city-hub-content.json for SEO structure (Lighthouse-oriented + uniqueness).
 *
 * Usage:
 *   node scripts/verify-city-hub-seo.mjs
 *   node scripts/verify-city-hub-seo.mjs --require-v2
 */
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  CITY_HUB_SCHEMA_VERSION,
  CITY_HUB_SEO_LIMITS as L,
  normalizeCityHubContent,
  isCityHubSchemaCurrent,
} from '../src/data/city-hub-schema.js'
import { CITY_MAP } from '../src/data/city-data.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PATH = join(ROOT, 'src/data/city-hub-content.json')
const requireV2 = process.argv.includes('--require-v2')

function cityName(slug) {
  return CITY_MAP[slug]?.name || slug
}

function trigramJaccard(a, b) {
  const grams = (t) => {
    const w = t.toLowerCase().split(/\s+/).filter(Boolean)
    const s = new Set()
    for (let i = 0; i < w.length - 2; i++) s.add(w.slice(i, i + 3).join(' '))
    return s
  }
  const A = grams(a)
  const B = grams(b)
  if (!A.size || !B.size) return 0
  let inter = 0
  for (const g of A) if (B.has(g)) inter++
  return inter / (A.size + B.size - inter)
}

function main() {
  if (!existsSync(PATH)) {
    console.error('missing city-hub-content.json')
    process.exit(1)
  }
  const store = JSON.parse(readFileSync(PATH, 'utf8'))
  const keys = Object.keys(store)
  if (!keys.length) {
    console.log('verify-city-hub-seo: empty store (ok until generation)')
    return
  }

  const issues = []
  const byHub = new Map()

  for (const key of keys) {
    // Nested hubs: banquetes/4-tiempos/leon → hub=banquetes/4-tiempos, city=leon
    const parts = key.split('/')
    const city = parts.pop()
    const hub = parts.join('/')
    const name = cityName(city)
    const n = normalizeCityHubContent(store[key], { hub, city, cityName: name })
    const prefix = key

    if (requireV2 && !isCityHubSchemaCurrent(store[key])) {
      issues.push(`${prefix}: schemaVersion < ${CITY_HUB_SCHEMA_VERSION}`)
    }
    if (!n.h1) issues.push(`${prefix}: missing h1`)
    if (n.h1.length > L.h1Max) issues.push(`${prefix}: h1 too long (${n.h1.length}>${L.h1Max})`)
    if (!n.sectionTitle) issues.push(`${prefix}: missing sectionTitle`)
    if (n.sectionTitle && n.sectionTitle === n.h1) {
      issues.push(`${prefix}: sectionTitle must differ from h1`)
    }
    if (!n.seoTitle) issues.push(`${prefix}: missing seoTitle`)
    if (n.seoTitle.length > L.seoTitleMax + 5) {
      issues.push(`${prefix}: seoTitle long (${n.seoTitle.length})`)
    }
    if (!n.seoDescription) issues.push(`${prefix}: missing seoDescription`)
    if (n.seoDescription.length > L.seoDescriptionMax + 10) {
      issues.push(`${prefix}: seoDescription long (${n.seoDescription.length})`)
    }
    if (n.description.length < 2) issues.push(`${prefix}: need ≥2 description paragraphs`)
    if (n.localBullets.length < L.localBulletsMin) {
      issues.push(`${prefix}: need ≥${L.localBulletsMin} localBullets`)
    }
    if (n.faqs.length < 2) issues.push(`${prefix}: need ≥2 faqs`)
    const blob = `${n.h1} ${n.headline} ${n.description.join(' ')}`.toLowerCase()
    if (name && !blob.includes(name.toLowerCase().slice(0, 4))) {
      issues.push(`${prefix}: city name weak/missing in body`)
    }

    if (!byHub.has(hub)) byHub.set(hub, [])
    byHub.get(hub).push({ key, text: n.description.join(' ') })
  }

  // Uniqueness within hub
  for (const [hub, rows] of byHub) {
    for (let i = 0; i < rows.length; i++) {
      for (let j = i + 1; j < rows.length; j++) {
        const sim = trigramJaccard(rows[i].text, rows[j].text)
        if (sim >= 0.72) {
          issues.push(
            `${hub}: high duplicate similarity ${sim.toFixed(2)} between ${rows[i].key} and ${rows[j].key}`,
          )
        }
      }
    }
  }

  const v2count = keys.filter((k) => isCityHubSchemaCurrent(store[k])).length
  console.log(
    JSON.stringify(
      {
        entries: keys.length,
        schemaV2: v2count,
        schemaTarget: CITY_HUB_SCHEMA_VERSION,
        issueCount: issues.length,
        issues: issues.slice(0, 40),
      },
      null,
      2,
    ),
  )

  if (issues.length) {
    console.error('verify-city-hub-seo: FAIL')
    process.exit(1)
  }
  console.log('verify-city-hub-seo: ok')
}

main()
