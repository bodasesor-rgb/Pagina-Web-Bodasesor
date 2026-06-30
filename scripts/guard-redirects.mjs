#!/usr/bin/env node
/**
 * Guard rails — fail early if redirect config is broken or regressed.
 * Run before build and in CI on every PR.
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const MIN_RULES = 4000
const FORBIDDEN_TOML_PATTERNS = [
  /\[\[redirects\]\][\s\S]*?from\s*=\s*"\/\*"[\s\S]*?to\s*=\s*"\/index\.html"[\s\S]*?status\s*=\s*200/m,
]

export function fail(msg) {
  console.error(`\n❌ Redirect guard failed: ${msg}`)
  process.exit(1)
}

export function guardNetlifyToml(root = ROOT) {
  const tomlPath = path.join(root, 'netlify.toml')
  if (!fs.existsSync(tomlPath)) fail('netlify.toml missing')

  const toml = fs.readFileSync(tomlPath, 'utf8')

  for (const pattern of FORBIDDEN_TOML_PATTERNS) {
    if (pattern.test(toml)) {
      fail(
        'netlify.toml has [[redirects]] /* → /index.html 200 — this OVERRIDES dist/_redirects and breaks all legacy URLs. Remove it; SPA fallback belongs only at the end of _redirects.',
      )
    }
  }

  if (!toml.includes('legacy-redirect')) {
    fail('netlify.toml missing edge function legacy-redirect')
  }

  if (!toml.includes('publish = "dist"')) {
    fail('netlify.toml must publish = "dist" (not backend/.netlify-publish or other paths)')
  }

  if (!toml.includes('npm run build') && !toml.includes('netlify-build.mjs')) {
    fail('netlify.toml build must run npm run build or scripts/netlify-build.mjs (generates _redirects)')
  }
}

export function guardRedirectsFile(filePath, label, minRules = MIN_RULES) {
  if (!fs.existsSync(filePath)) fail(`${label} missing: ${filePath}`)

  const text = fs.readFileSync(filePath, 'utf8')
  const ruleCount = text.split('\n').filter((l) => l && !l.startsWith('#')).length

  if (ruleCount < minRules) {
    fail(`${label} has only ${ruleCount} rules (expected >= ${minRules})`)
  }

  if (!text.includes('/*  /index.html  200')) {
    fail(`${label} missing SPA fallback at end (/* /index.html 200)`)
  }

  if (!text.includes('/products/:slug')) {
    fail(`${label} missing /products/:slug fallback rule`)
  }

  return ruleCount
}

export function guardPublicRedirects(root = ROOT) {
  return guardRedirectsFile(path.join(root, 'public/_redirects'), 'public/_redirects')
}

export function guardDistArtifacts(root = ROOT) {
  const dist = path.join(root, 'dist')
  const ruleCount = guardRedirectsFile(path.join(dist, '_redirects'), 'dist/_redirects')

  const mapPath = path.join(dist, 'redirects-map.json')
  if (!fs.existsSync(mapPath)) fail('dist/redirects-map.json missing')

  const map = JSON.parse(fs.readFileSync(mapPath, 'utf8')).entries
  const samples = [
    '/products/tarima-madera',
    '/collections/xv-anos-cdmx',
    '/blogs/noticias/votos-matrimoniales-2024',
  ]
  for (const sample of samples) {
    if (!map[sample]) fail(`redirects-map missing: ${sample}`)
  }

  const indexHtml = path.join(dist, 'index.html')
  if (fs.existsSync(indexHtml)) {
    const html = fs.readFileSync(indexHtml, 'utf8')
    if (!html.includes('legacy-redirect-boot.js') && !html.includes('/products/')) {
      fail('dist/index.html missing legacy redirect boot script')
    }
  }

  const edgeMap = path.join(root, 'netlify/edge-functions/redirects-map.json')
  if (fs.existsSync(edgeMap)) {
    const size = fs.statSync(edgeMap).size
    if (size > 100_000) {
      fail(
        `netlify/edge-functions/redirects-map.json is ${size} bytes — do NOT embed in edge (breaks Netlify builds). Use public/redirects-map.json only.`,
      )
    }
  }

  return { ruleCount, mapEntries: Object.keys(map).length }
}

export function runPreBuildGuards(root = ROOT) {
  guardNetlifyToml(root)
  guardPublicRedirects(root)
  console.log('✓ Redirect pre-build guards OK')
}

// CLI: node scripts/guard-redirects.mjs [--dist]
const isMain = process.argv[1]?.replace(/\\/g, '/').endsWith('scripts/guard-redirects.mjs')
if (isMain) {
  runPreBuildGuards()
  if (process.argv.includes('--dist')) {
    const { ruleCount, mapEntries } = guardDistArtifacts()
    console.log(`✓ Redirect dist guards OK: ${ruleCount} rules, ${mapEntries} map entries`)
  }
}
