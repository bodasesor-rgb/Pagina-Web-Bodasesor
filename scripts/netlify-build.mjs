#!/usr/bin/env node
/**
 * Netlify build: preserve Nexus/SEO pages from current production, then build SPA.
 * Requires NETLIFY_AUTH_TOKEN + NETLIFY_SITE_ID in Netlify env vars for merge.
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

function run(label, cmd, args, { optional = false } = {}) {
  console.log(`\n▶ ${label}`)
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: false })
  if (r.status !== 0 && !optional) process.exit(r.status ?? 1)
  return r.status === 0
}

const hasNetlifyCreds =
  Boolean(process.env.NETLIFY_AUTH_TOKEN) &&
  Boolean(process.env.NETLIFY_SITE_ID || process.env.SITE_ID)

const onNetlify = process.env.NETLIFY === 'true'

if (onNetlify && !hasNetlifyCreds) {
  console.error('\n❌ NETLIFY_AUTH_TOKEN y NETLIFY_SITE_ID son obligatorios en Netlify env vars.')
  console.error('   Sin ellos el build publica solo el SPA y borra ~1.700 páginas Nexus SEO.')
  console.error('   Netlify → Site configuration → Environment variables\n')
  process.exit(1)
}

if (hasNetlifyCreds) {
  const siteRef = process.env.NETLIFY_SITE_ID || process.env.SITE_ID
  console.log(`Netlify merge activo (site ${String(siteRef).slice(0, 8)}…)`)
  run('1/3 Descargar deploy con páginas Nexus/SEO', 'node', ['scripts/pull-netlify-live.mjs'])
} else {
  console.warn('\n⚠ Falta NETLIFY_AUTH_TOKEN o site ID (NETLIFY_SITE_ID / SITE_ID).')
  console.warn(
    '  Las páginas eventos/ y nexus-output-pages/ NO se preservarán en este build.',
  )
  console.warn(
    '  Añádelos en Netlify → Site configuration → Environment variables.\n',
  )
}

run('2/3 Build SPA + redirects', 'npm', ['run', 'build'])

if (existsSync(join(ROOT, '.netlify-live'))) {
  run('3/5 Fusionar páginas Nexus/SEO en dist', 'node', ['scripts/merge-live-into-dist.mjs'])
  run('4/5 Parchear SEO Nexus (titles ≤60, lazy imgs)', 'node', ['scripts/patch-nexus-seo.mjs'])
  run('5/5 Verificar Nexus + redirects tras merge', 'node', ['scripts/guard-nexus-dist.mjs'])
  run('Verificar redirects tras merge', 'node', ['scripts/verify-redirects-deploy.mjs'])
} else if (hasNetlifyCreds) {
  console.warn('⚠ .netlify-live/ vacío — merge omitido')
} else {
  console.warn('⚠ Sin snapshot de producción — merge omitido')
  if (process.env.CI === 'true') {
    console.error('❌ CI build requires NETLIFY_AUTH_TOKEN to preserve Nexus SEO pages')
    process.exit(1)
  }
}

console.log('\n✓ Netlify build listo')
