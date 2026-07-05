#!/usr/bin/env node
/**
 * Build seguro: descarga Netlify → build SPA → fusiona páginas Nexus/SEO
 * Uso: node scripts/safe-build.mjs
 */
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

function run(label, cmd, args) {
  console.log(`\n▶ ${label}`)
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: false })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

run('1/3 Descargar producción Netlify', 'node', ['scripts/pull-netlify-live.mjs'])
run('2/3 Build SPA (Vite)', 'npm', ['run', 'build'])
run('3/3 Fusionar páginas Nexus/SEO en dist', 'node', ['scripts/merge-live-into-dist.mjs'])

console.log('\n✓ build:safe listo. Revisa dist/.merge-report.json antes de publicar.')
