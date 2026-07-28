/**
 * Patch coffee-break and comida-corrida in products.js with full ServicePage data
 * from the live bundle (V3 array). The variety schema (li array) was overwriting
 * the correct product entries during extraction.
 *
 * Usage: node scripts/patch-catering-products.mjs
 */
import fs from 'fs'
import vm from 'vm'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const BUNDLE = path.join(ROOT, 'live-bundle.js')
const OUT = path.join(ROOT, 'src/data/products.js')

const HELPER_VARS = [
  'Qe', 'We', 'ma', 'sl', 'on', 'Be', 'Ge', 'Le', 'Je', 'zo', 'Zn', 'hr', 'xr',
  'ol', 'br', 'Jn', 'yr', 'ts', 'U3', 'No', 'jr', 'X3', 'Ah', 'kh', 'zu', 'wr', 'rl', 'E7',
]

const PATCH_SLUGS = ['coffee-break', 'comida-corrida']

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

function extractHelperVar(source, name) {
  const marker = `${name}=[`
  const pos = source.indexOf(marker, 350000)
  if (pos === -1) return null
  return extractBracketArray(source, pos + name.length + 1)
}

function extractProductArray(source, name) {
  const marker = `${name}=[{slug:`
  const pos = source.indexOf(marker, 350000)
  if (pos === -1) return null
  return extractBracketArray(source, pos + name.length + 1)
}

function serialize(value, indent = 0) {
  const pad = '  '.repeat(indent)
  const padIn = '  '.repeat(indent + 1)
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'string') return JSON.stringify(value)
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    const items = value.map((v) => `${padIn}${serialize(v, indent + 1)}`).join(',\n')
    return `[\n${items}\n${pad}]`
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined)
    if (entries.length === 0) return '{}'
    const lines = entries.map(([k, v]) => {
      const key = /^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)
      return `${padIn}${key}: ${serialize(v, indent + 1)}`
    }).join(',\n')
    return `{\n${lines}\n${pad}}`
  }
  return JSON.stringify(value)
}

function normalizeProduct(p) {
  const copy = { ...p }
  if (Array.isArray(copy.included)) {
    copy.included = copy.included.map((item) => {
      if (item.title && item.desc) return item
      if (item.text) return { icon: item.icon ?? '✓', title: item.title ?? '', desc: item.text, text: item.text }
      return item
    })
  }
  return copy
}

function findObjectEnd(text, startIdx) {
  let depth = 0
  let inString = false
  let escape = false
  for (let i = startIdx; i < text.length; i++) {
    const ch = text[i]
    if (inString) {
      if (escape) escape = false
      else if (ch === '\\') escape = true
      else if (ch === '"') inString = false
      continue
    }
    if (ch === '"') inString = true
    else if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) return i + 1
    }
  }
  return -1
}

const source = fs.readFileSync(BUNDLE, 'utf8')
const helperCode = HELPER_VARS.map((name) => {
  const arr = extractHelperVar(source, name)
  return arr ? `var ${name}=${arr};` : null
}).filter(Boolean).join('\n')

const arrStr = extractProductArray(source, 'V3')
if (!arrStr) {
  console.error('V3 product array not found in bundle')
  process.exit(1)
}

const v3Products = vm.runInNewContext(`${helperCode};(${arrStr})`, {})
const patches = new Map(
  v3Products
    .filter((p) => PATCH_SLUGS.includes(p.slug))
    .map((p) => [p.slug, normalizeProduct(p)])
)

for (const slug of PATCH_SLUGS) {
  if (!patches.has(slug)) {
    console.error(`Missing ${slug} in V3 array`)
    process.exit(1)
  }
}

let productsSrc = fs.readFileSync(OUT, 'utf8')

for (const slug of PATCH_SLUGS) {
  const marker = `slug: "${slug}"`
  const start = productsSrc.indexOf(marker)
  if (start === -1) {
    console.error(`Could not find ${slug} in products.js`)
    process.exit(1)
  }
  const objStart = productsSrc.lastIndexOf('{', start)
  const objEnd = findObjectEnd(productsSrc, objStart)
  if (objStart === -1 || objEnd === -1) {
    console.error(`Could not parse object for ${slug}`)
    process.exit(1)
  }
  const replacement = serialize(patches.get(slug), 3)
  productsSrc = productsSrc.slice(0, objStart) + replacement + productsSrc.slice(objEnd)
  console.log(`Patched ${slug}: title="${patches.get(slug).title}"`)
}

fs.writeFileSync(OUT, productsSrc)
console.log('Done:', OUT)
