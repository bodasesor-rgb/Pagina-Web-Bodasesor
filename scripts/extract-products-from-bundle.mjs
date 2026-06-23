/**
 * Extract full product data from live-bundle.js (original bodasesor.com build)
 * and regenerate src/data/products.js with varieties, menuExample, serviceTiers, etc.
 *
 * Usage: node scripts/extract-products-from-bundle.mjs
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

function buildHelperContext(source) {
  return HELPER_VARS.map((name) => {
    const arr = extractHelperVar(source, name)
    return arr ? `var ${name}=${arr};` : null
  }).filter(Boolean).join('\n')
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
  // Ensure included items work with ServicePage (title+desc or text)
  if (Array.isArray(copy.included)) {
    copy.included = copy.included.map((item) => {
      if (item.title && item.desc) return item
      if (item.text) return { icon: item.icon ?? '✓', title: item.title ?? '', desc: item.text, text: item.text }
      return item
    })
  }
  return copy
}

const source = fs.readFileSync(BUNDLE, 'utf8')
const helperCode = buildHelperContext(source)

const arrayNames = [...source.matchAll(/(\w+)=\[\{slug:"/g)]
  .filter((m) => m.index > 350000 && m.index < 1_300_000)
  .map((m) => m[1])

const bySlug = new Map()
for (const name of arrayNames) {
  const arrStr = extractProductArray(source, name)
  if (!arrStr) continue
  try {
    const products = vm.runInNewContext(`${helperCode};(${arrStr})`, {})
    for (const p of products) {
      if (p?.slug) bySlug.set(p.slug, normalizeProduct(p))
    }
    console.log(`OK ${name}: ${products.length} products`)
  } catch (e) {
    console.warn(`SKIP ${name}: ${e.message.slice(0, 80)}`)
  }
}

// Keep order from existing products.js
const currentSrc = fs.readFileSync(OUT, 'utf8')
const slugs = [...currentSrc.matchAll(/"slug": "([^"]+)"/g)].map((m) => m[1])
const products = slugs.map((slug) => {
  const extracted = bySlug.get(slug)
  if (!extracted) {
    console.warn(`Missing in bundle: ${slug}`)
    return null
  }
  return extracted
}).filter(Boolean)

console.log(`\nWriting ${products.length} products (${bySlug.size} total in bundle)`)

const file = `// Products extracted from bodasesor.com live bundle — full data restored
const DEFAULT_PRODUCT = {
  related: [],
  included: [],
  whyUs: [],
  varieties: [],
  menuExample: [],
  serviceTiers: [],
  integralServices: [],
};

const PRODUCTS = ${serialize(products, 1)};

export function getProductBySlug(slug) {
  if (!slug) return null;

  let p = PRODUCTS.find(p => p.slug === slug);
  if (p) return { ...DEFAULT_PRODUCT, ...p };

  const citySuffixes = [
    'san-miguel-allende','san-luis-potosi','ciudad-de-mexico','estado-de-mexico',
    'puerto-vallarta','los-cabos','aguascalientes','guadalajara','monterrey',
    'cancun','cuernavaca','tijuana','veracruz','morelia','oaxaca','pachuca',
    'queretaro','toluca','torreon','merida','puebla','leon',
  ].sort((a, b) => b.length - a.length);

  for (const city of citySuffixes) {
    if (slug.endsWith(city) && slug.length > city.length) {
      p = PRODUCTS.find(p => p.slug === slug.slice(0, -city.length));
      if (p) return { ...DEFAULT_PRODUCT, ...p, slug };
    }
    if (slug.endsWith('-en-' + city)) {
      p = PRODUCTS.find(p => p.slug === slug.slice(0, -(city.length + 4)));
      if (p) return { ...DEFAULT_PRODUCT, ...p, slug };
    }
  }
  return null;
}

export function getRelatedProducts(slug, limit = 4) {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return PRODUCTS
    .filter(p => p.slug !== slug && p.category === product.category)
    .slice(0, limit);
}

export function getBlogPostBySlug(slug) { return null; }
export const ProductData = {};
export const products = PRODUCTS;
`

fs.writeFileSync(OUT, file)
console.log('Done:', OUT)

const ban = products.find((p) => p.slug === 'banquetes')
console.log('banquetes check:', {
  varieties: ban?.varieties?.length,
  serviceTiers: ban?.serviceTiers?.length,
  menuExample: ban?.menuExample?.length,
  whyUs: ban?.whyUs?.length,
})
