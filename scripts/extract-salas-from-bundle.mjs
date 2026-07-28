/**
 * Extract salas (qs) and periqueras (ws) from live-bundle.js
 * and regenerate src/data/salas-periqueras-products.js
 *
 * Usage: node scripts/extract-salas-from-bundle.mjs
 */
import fs from 'fs'
import vm from 'vm'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const BUNDLE = path.join(ROOT, 'live-bundle.js')
const OUT = path.join(ROOT, 'src/data/salas-periqueras-products.js')

function extractBracketArray(source, startBracketIdx) {
  let depth = 0
  for (let i = startBracketIdx; i < source.length; i++) {
    if (source[i] === '[') depth++
    else if (source[i] === ']') {
      depth--
      if (depth === 0) return source.slice(startBracketIdx, i + 1)
    }
  }
  return null
}

function extractCatalogArray(source, name) {
  const marker = `${name}=[{`
  const pos = source.indexOf(marker, 350000)
  if (pos === -1) return null
  return extractBracketArray(source, pos + name.length + 1)
}

const source = fs.readFileSync(BUNDLE, 'utf8')

const salas = vm.runInNewContext(`(${extractCatalogArray(source, 'qs')})`, {})
const periqueras = vm.runInNewContext(`(${extractCatalogArray(source, 'ws')})`, {})

if (!salas?.length || !periqueras?.length) {
  console.error('Could not extract salas/periqueras from bundle')
  process.exit(1)
}

console.log(`Extracted ${salas.length} salas, ${periqueras.length} periqueras`)

const file = `// Salas y periqueras extracted from bodasesor.com live bundle
export const salasNavItems = ${JSON.stringify(salas.map((s) => ({ href: `/salas/${s.slug}`, name: s.name })), null, 2)}

export const periquerasNavItems = ${JSON.stringify(periqueras.map((p) => ({ href: `/periqueras/${p.slug}`, name: p.name })), null, 2)}

export const SALAS_CATALOG = ${JSON.stringify(salas, null, 2)}

export const PERIQUERAS_CATALOG = ${JSON.stringify(periqueras, null, 2)}
`

fs.writeFileSync(OUT, file)
console.log('Done:', OUT)
