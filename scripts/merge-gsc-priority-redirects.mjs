#!/usr/bin/env node
/**
 * Merge missing redirects from .gsc-audit/bad-redirects-priority.json into gsc-force-extra.mjs.
 * Only adds entries where suggestion differs from current final path (curated destinations).
 *
 * Usage: node scripts/merge-gsc-priority-redirects.mjs [--write]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { GSC_FORCE_EXTRA } from './lib/gsc-force-extra.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const AUDIT = join(ROOT, '.gsc-audit', 'bad-redirects-priority.json')
const EXTRA_PATH = join(ROOT, 'scripts', 'lib', 'gsc-force-extra.mjs')
const WRITE = process.argv.includes('--write')

function normPath(p) {
  if (!p) return '/'
  const clean = String(p).replace(/\/+$/, '') || '/'
  return clean.startsWith('/') ? clean : `/${clean}`
}

function loadExisting() {
  const set = new Set(GSC_FORCE_EXTRA.map(([from]) => normPath(from)))
  return set
}

function loadPriority() {
  if (!existsSync(AUDIT)) {
    console.error(`Missing ${AUDIT} — run gsc:recover-top or place audit file first.`)
    process.exit(1)
  }
  const data = JSON.parse(readFileSync(AUDIT, 'utf8'))
  const rows = [...(data.priority || []), ...(data.multiHop || [])]
  return rows.filter((r) => r.suggestionDiffers && r.fromPath && r.suggestion)
}

function toExtraEntry(row) {
  const from = normPath(row.fromPath)
  let to = normPath(row.suggestion)
  if (to !== '/' && !to.endsWith('/')) to = `${to}/`
  return [from, to]
}

function serializeExtra(entries) {
  const lines = entries.map(([from, to]) => `  ['${from}', '${to}'],`)
  return `/**
 * Extra GSC_FORCE redirects (glued legacy + thin product×city → indexable hub×city).
 * Merged into generate-redirects.mjs GSC_FORCE_REDIRECTS.
 * Source: .gsc-audit/gsc-audit-report.json sampleAnalyticsNotInSitemap + bad-redirects-priority.json
 */
export const GSC_FORCE_EXTRA = [
${lines.join('\n')}
]
`
}

function main() {
  const existing = loadExisting()
  const candidates = loadPriority()
  const added = []

  for (const row of candidates) {
    const [from, to] = toExtraEntry(row)
    if (existing.has(from)) continue
    // Skip if suggestion is same as final (already fixed in prod)
    if (normPath(row.final?.replace(/^https?:\/\/[^/]+/, '') || row.toPath) === normPath(to)) {
      continue
    }
    added.push([from, to])
    existing.add(from)
  }

  const merged = [...GSC_FORCE_EXTRA, ...added].sort(([a], [b]) => a.localeCompare(b))

  console.log(`Existing extra: ${GSC_FORCE_EXTRA.length}`)
  console.log(`New from audit: ${added.length}`)
  if (added.length) {
    console.log('Would add:')
    for (const [from, to] of added.slice(0, 30)) {
      console.log(`  ${from} → ${to}`)
    }
    if (added.length > 30) console.log(`  … and ${added.length - 30} more`)
  }

  if (!WRITE) {
    console.log('\nDry run — pass --write to update scripts/lib/gsc-force-extra.mjs')
    return
  }

  writeFileSync(EXTRA_PATH, serializeExtra(merged))
  console.log(`\n✓ Wrote ${merged.length} entries → ${EXTRA_PATH}`)
  console.log('Next: npm run generate:redirects')
}

main()
