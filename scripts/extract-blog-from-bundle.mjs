/**
 * Extract blog posts from live-bundle.js and regenerate src/data/blog-data.js
 *
 * Usage: node scripts/extract-blog-from-bundle.mjs
 */
import fs from 'fs'
import vm from 'vm'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const BUNDLE = path.join(ROOT, 'live-bundle.js')
const OUT = path.join(ROOT, 'src/data/blog-data.js')

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

function estimateReadTime(post) {
  const text = [post.excerpt, ...(post.body || [])].join(' ')
  const plain = text.replace(/<[^>]+>/g, ' ')
  const words = plain.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min`
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

const source = fs.readFileSync(BUNDLE, 'utf8')
const pos = source.indexOf('zl=[{slug:', 350000)
if (pos === -1) {
  console.error('Could not find blog array (zl) in bundle')
  process.exit(1)
}

const arrStr = extractBracketArray(source, pos + 3)
const rawPosts = vm.runInNewContext(`(${arrStr})`, {})

const blogPosts = rawPosts.map((post) => ({
  ...post,
  readTime: post.readTime || estimateReadTime(post),
}))

console.log(`Extracted ${blogPosts.length} blog posts`)

const file = `// Blog posts extracted from bodasesor.com live bundle
export const blogPosts = ${serialize(blogPosts, 1)};

export function getBlogPostBySlug(slug) {
  if (!slug) return null;
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
`

fs.writeFileSync(OUT, file)
console.log('Done:', OUT)
