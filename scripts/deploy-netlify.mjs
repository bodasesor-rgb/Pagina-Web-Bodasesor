#!/usr/bin/env node
/**
 * Deploy dist/ to Netlify production via API.
 * Requires in .env.local: NETLIFY_AUTH_TOKEN
 * Site ID default: bodasesor.com (resonant-gingersnap-df3cfa)
 */
import { readFile, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const DEFAULT_SITE_ID = 'b3e5d4b5-9b66-4322-b2d7-12252f3625ac'

async function loadEnv() {
  for (const name of ['.env.local', '.env']) {
    const path = join(ROOT, name)
    if (!existsSync(path)) continue
    const text = await readFile(path, 'utf8')
    for (const line of text.split('\n')) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
      if (!m || process.env[m[1]]) continue
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
    }
  }
}

async function main() {
  await loadEnv()
  const token = process.env.NETLIFY_AUTH_TOKEN
  const siteId = process.env.NETLIFY_SITE_ID || DEFAULT_SITE_ID

  if (!token) {
    console.error('Falta NETLIFY_AUTH_TOKEN en .env.local')
    process.exit(1)
  }

  if (!existsSync(DIST)) {
    console.log('Building…')
    execSync('npm run build:netlify', { cwd: ROOT, stdio: 'inherit' })
  }

  console.log('Verificando Nexus en dist/ antes de publicar…')
  execSync('node scripts/guard-nexus-dist.mjs', { cwd: ROOT, stdio: 'inherit' })

  console.log(`Deploying dist/ → ${siteId}…`)
  execSync(
    `npx netlify-cli deploy --prod --dir="${DIST}" --site="${siteId}" --message="Deploy redirects fix"`,
    { cwd: ROOT, stdio: 'inherit', env: { ...process.env, NETLIFY_AUTH_TOKEN: token } },
  )

  console.log('✓ Deployed. Test: curl -I https://bodasesor.com/products/tarima-madera')
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
