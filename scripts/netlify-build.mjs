#!/usr/bin/env node
/**
 * Compatibility shim — production builds MUST go through netlify-build-nexus.mjs.
 * Kept so older docs/CI that call `netlify-build.mjs` still preserve Nexus SEO.
 */
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
console.warn('⚠ scripts/netlify-build.mjs → reenviando a scripts/netlify-build-nexus.mjs')

const r = spawnSync(process.execPath, ['scripts/netlify-build-nexus.mjs'], {
  cwd: root,
  stdio: 'inherit',
  env: process.env,
})
process.exit(r.status ?? 1)
