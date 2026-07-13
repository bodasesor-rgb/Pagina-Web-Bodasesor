#!/usr/bin/env node
/**
 * Netlify build: preserve Nexus/SEO pages from current production, then build SPA.
 * Requires NETLIFY_AUTH_TOKEN + NETLIFY_SITE_ID in CI to merge Nexus before deploy.
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const allowSpaOnly = process.env.ALLOW_SPA_ONLY_DEPLOY === '1'
const inCi = process.env.CI === 'true'

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

if ((inCi || onNetlify) && !hasNetlifyCreds && !allowSpaOnly) {
  console.error('\n❌ NETLIFY_AUTH_TOKEN y NETLIFY_SITE_ID son obligatorios en CI/Netlify.')
  console.error('   Sin ellos el build publica solo el SPA y borra ~1.700 páginas Nexus SEO.')
  console.error('   Netlify → Site configuration → Environment variables\n')
  process.exit(1)
}

if (hasNetlifyCreds) {
  const siteRef = process.env.NETLIFY_SITE_ID || process.env.SITE_ID
  console.log(`Netlify merge activo (site ${String(siteRef).slice(0, 8)}…)`)
  run('1/3 Descargar deploy con páginas Nexus/SEO', 'node', ['scripts/pull-netlify-live.mjs'])
} else if (!allowSpaOnly) {
  console.warn('\n⚠ Falta NETLIFY_AUTH_TOKEN o site ID (NETLIFY_SITE_ID / SITE_ID).')
  console.warn('  Las páginas eventos/ y nexus-output-pages/ NO se preservarán en este build.')
}

run('2/3 Build SPA + redirects', 'npm', ['run', 'build'])

if (existsSync(join(ROOT, '.netlify-live'))) {
  run('3/5 Fusionar páginas Nexus/SEO en dist', 'node', ['scripts/merge-live-into-dist.mjs'])
  run('4/5 Parchear SEO Nexus (titles ≤60, lazy imgs)', 'node', ['scripts/patch-nexus-seo.mjs'])
  run('5/5 Verificar Nexus en dist', 'node', ['scripts/guard-nexus-dist.mjs'])
} else if (hasNetlifyCreds && !allowSpaOnly) {
  console.error('\n❌ .netlify-live/ vacío — no hay snapshot Nexus para fusionar.')
  console.error('   Re-deploy Nexus SEO o fija NETLIFY_RESTORE_DEPLOY_ID con un deploy histórico.')
  process.exit(1)
} else if (!allowSpaOnly && inCi) {
  console.error('\n❌ CI build requires Nexus snapshot in .netlify-live/')
  process.exit(1)
} else if (allowSpaOnly) {
  console.warn('\n⚠ ALLOW_SPA_ONLY_DEPLOY=1 — build SPA-only (re-deploy Nexus after publish).')
}

run('Verificar redirects en dist', 'node', ['scripts/verify-redirects-deploy.mjs'])

console.log('\n✓ Netlify build listo')
