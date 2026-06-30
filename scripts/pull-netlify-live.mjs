#!/usr/bin/env node
/**
 * Descarga el deploy publicado actual de Netlify a .netlify-live/
 * Requiere: NETLIFY_AUTH_TOKEN y NETLIFY_SITE_ID (env o .env.local)
 *
 * Uso: node scripts/pull-netlify-live.mjs
 */
import { mkdir, writeFile, rm, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, '.netlify-live')
const ZIP_PATH = join(ROOT, '.netlify-live.zip')

async function loadEnvFile() {
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

async function netlifyFetch(path) {
  const token = process.env.NETLIFY_AUTH_TOKEN
  if (!token) {
    throw new Error(
      'Falta NETLIFY_AUTH_TOKEN. Créalo en https://app.netlify.com/user/applications#personal-access-tokens',
    )
  }
  const res = await fetch(`https://api.netlify.com/api/v1${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Netlify API ${path} → ${res.status}: ${body}`)
  }
  return res
}

function resolveSiteId() {
  const id = process.env.NETLIFY_SITE_ID || process.env.SITE_ID
  if (!id) {
    throw new Error(
      'Falta NETLIFY_SITE_ID o SITE_ID. Netlify → Site configuration → General → API ID',
    )
  }
  return id
}

async function deployHasNexusPages(deployId) {
  const res = await netlifyFetch(`/deploys/${deployId}/files?per_page=1000`)
  const files = await res.json()
  const list = Array.isArray(files) ? files : files?.files ?? []
  return list.some((f) => {
    const p = (f.path || f.name || '').replace(/^\//, '')
    return (
      p.startsWith('eventos/') ||
      p.startsWith('nexus-output-pages/') ||
      p.startsWith('private/nexus-output-pages/')
    )
  })
}

async function pickDeployWithNexus(siteId) {
  const deploysRes = await netlifyFetch(
    `/sites/${siteId}/deploys?per_page=40`,
  )
  const deploys = await deploysRes.json()
  if (!deploys?.length) {
    throw new Error('No hay deploys en este sitio.')
  }

  for (const deploy of deploys) {
    if (deploy.state !== 'ready') continue
    try {
      if (await deployHasNexusPages(deploy.id)) {
        return deploy
      }
    } catch {
      // try next deploy
    }
  }

  return deploys.find((d) => d.state === 'ready') ?? deploys[0]
}

async function main() {
  await loadEnvFile()
  const siteId = resolveSiteId()
  const hasToken = Boolean(process.env.NETLIFY_AUTH_TOKEN)
  console.log(`Site ID: ${siteId.slice(0, 8)}… (token: ${hasToken ? 'sí' : 'no'})`)

  console.log('Buscando deploy con páginas Nexus/SEO…')
  const deploy = await pickDeployWithNexus(siteId)
  if (!deploy?.id) {
    throw new Error('No hay deploy publicado en este sitio.')
  }

  console.log(`Deploy: ${deploy.id} (${deploy.title || deploy.context || 'production'})`)
  console.log(`Fecha: ${deploy.published_at || deploy.created_at}`)

  console.log('Descargando ZIP del deploy…')
  const zipRes = await netlifyFetch(`/deploys/${deploy.id}/zip`)
  const buffer = Buffer.from(await zipRes.arrayBuffer())
  await writeFile(ZIP_PATH, buffer)

  await rm(OUT_DIR, { recursive: true, force: true })
  await mkdir(OUT_DIR, { recursive: true })

  execSync(`unzip -q -o "${ZIP_PATH}" -d "${OUT_DIR}"`, { stdio: 'inherit' })
  await rm(ZIP_PATH, { force: true })

  const manifest = {
    pulledAt: new Date().toISOString(),
    deployId: deploy.id,
    deployUrl: deploy.deploy_ssl_url || deploy.ssl_url || deploy.url,
    siteId,
    commitRef: deploy.commit_ref || null,
    commitMessage: deploy.title || null,
  }
  await writeFile(join(OUT_DIR, '.manifest.json'), JSON.stringify(manifest, null, 2))

  console.log(`\nListo → ${OUT_DIR}`)
  console.log('Revisa .netlify-live/ antes de cambiar y publicar.')
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
