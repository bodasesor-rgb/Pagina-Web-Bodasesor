#!/usr/bin/env node
/**
 * Fail the build if redirect artifacts are missing or incomplete.
 * Ensures Netlify always ships working legacy redirects.
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const DIST = path.join(ROOT, 'dist')
const REDIRECTS = path.join(DIST, '_redirects')
const MAP = path.join(DIST, 'redirects-map.json')
const EDGE_MAP = path.join(ROOT, 'netlify/edge-functions/redirects-map.json')
const NETLIFY_TOML = path.join(ROOT, 'netlify.toml')

const MIN_RULES = 4000
const REQUIRED_SAMPLES = [
  '/products/tarima-madera',
  '/collections/xv-anos-cdmx',
  '/blogs/noticias/votos-matrimoniales-2024',
]

function fail(msg) {
  console.error(`\n❌ Redirect verification failed: ${msg}`)
  console.error('Run: npm run generate:redirects && npm run build')
  process.exit(1)
}

if (!fs.existsSync(REDIRECTS)) fail('dist/_redirects missing — Netlify will not redirect legacy URLs')
if (!fs.existsSync(MAP)) fail('dist/redirects-map.json missing')
if (!fs.existsSync(EDGE_MAP)) fail('netlify/edge-functions/redirects-map.json missing')

const redirectsText = fs.readFileSync(REDIRECTS, 'utf8')
const ruleCount = redirectsText.split('\n').filter((l) => l && !l.startsWith('#')).length
if (ruleCount < MIN_RULES) {
  fail(`dist/_redirects has only ${ruleCount} rules (expected >= ${MIN_RULES})`)
}

if (!redirectsText.includes('/*  /index.html  200')) {
  fail('dist/_redirects missing SPA fallback at end (/* /index.html 200)')
}

const map = JSON.parse(fs.readFileSync(MAP, 'utf8')).entries
for (const sample of REQUIRED_SAMPLES) {
  if (!map[sample]) fail(`redirects-map missing sample entry: ${sample}`)
}

const toml = fs.readFileSync(NETLIFY_TOML, 'utf8')
if (!toml.includes('legacy-redirect')) {
  fail('netlify.toml missing edge function legacy-redirect')
}

console.log(`✓ Redirects OK: ${ruleCount} rules in dist/_redirects, ${Object.keys(map).length} map entries`)
