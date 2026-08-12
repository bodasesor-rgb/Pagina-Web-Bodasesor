#!/usr/bin/env node
/**
 * Apply Spanish Title Case to h1 / sectionTitle / headline / seoTitle in city-hub-content.json
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { toSpanishTitleCase } from '../src/utils/spanish-title-case.js'

const PATH = join(dirname(fileURLToPath(import.meta.url)), '../src/data/city-hub-content.json')
const store = JSON.parse(readFileSync(PATH, 'utf8'))
let n = 0
for (const [key, row] of Object.entries(store)) {
  let changed = false
  for (const field of ['h1', 'sectionTitle', 'headline', 'seoTitle', 'primaryKeyword']) {
    if (typeof row[field] !== 'string' || !row[field].trim()) continue
    const next = toSpanishTitleCase(row[field])
    // primaryKeyword often better sentence-ish lowercase for matching — still Title Case phrases look fine in UI
    if (field === 'primaryKeyword') {
      // keep mostly lowercase keyword style but capitalize place names via title case of whole phrase
      // use title case for consistency with headings
    }
    if (next !== row[field]) {
      row[field] = next
      changed = true
    }
  }
  if (changed) {
    store[key] = row
    n++
  }
}
writeFileSync(PATH, `${JSON.stringify(store, null, 2)}\n`)
console.log(`normalize-city-hub-titlecase: updated ${n} entries`)
