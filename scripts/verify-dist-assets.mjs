#!/usr/bin/env node
/**
 * Fail build if index.html references assets missing from dist/assets/.
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const dist = path.join(ROOT, 'dist')
const indexPath = path.join(dist, 'index.html')
const assetsDir = path.join(dist, 'assets')

if (!fs.existsSync(indexPath)) {
  console.error('❌ dist/index.html missing')
  process.exit(1)
}

const html = fs.readFileSync(indexPath, 'utf8')
const refs = [
  ...html.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g),
].map((m) => m[1].replace(/^\//, ''))

const missing = refs.filter((rel) => !fs.existsSync(path.join(dist, rel)))
if (missing.length) {
  console.error(`❌ ${missing.length} asset(s) referenced in index.html but missing from dist/:`)
  missing.slice(0, 20).forEach((f) => console.error(`  - ${f}`))
  process.exit(1)
}

const assetCount = fs.readdirSync(assetsDir).length
console.log(`✓ dist assets OK: ${refs.length} refs in index.html, ${assetCount} files in assets/`)
