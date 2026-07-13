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
  console.warn('\n⚠ NETLIFY_AUTH_TOKEN / NETLIFY_SITE_ID no configurados — build SPA-only.')
}

if (hasNetlifyCreds) {
  const siteRef = process.env.NETLIFY_SITE_ID || process.env.SITE_ID
  console.log(`Netlify merge opcional (site ${String(siteRef).slice(0, 8)}…)`)
  run('1/3 Descargar producción (opcional)', 'node', ['scripts/pull-netlify-live.mjs'], { optional: true })
} else {
  console.warn('\n⚠ Sin credenciales Netlify — build SPA-only.')
}

run('2/3 Build SPA + redirects', 'npm', ['run', 'build'])

if (existsSync(join(ROOT, '.netlify-live'))) {
  run('3/4 Fusionar snapshot en dist (opcional)', 'node', ['scripts/merge-live-into-dist.mjs'], { optional: true })
  run('4/4 Parchear HTML estático (opcional)', 'node', ['scripts/patch-nexus-seo.mjs'], { optional: true })
}

run('Verificar redirects en dist', 'node', ['scripts/verify-redirects-deploy.mjs'])

console.log('\n✓ Netlify build listo')
