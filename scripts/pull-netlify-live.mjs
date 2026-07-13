#!/usr/bin/env node
/**
 * Descarga el deploy publicado actual de Netlify a .netlify-live/
 * Requiere: NETLIFY_AUTH_TOKEN y NETLIFY_SITE_ID (env o .env.local)
 *
 * Uso: node scripts/pull-netlify-live.mjs
 * Opcional: NETLIFY_RESTORE_DEPLOY_ID=<id> para forzar un deploy con Nexus
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
const MIN_NEXUS_LANDINGS = 50

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

async function netlifyFetch(path, { allow404 = false } = {}) {
  const token = process.env.NETLIFY_AUTH_TOKEN
  if (!token) {
    throw new Error(
      'Falta NETLIFY_AUTH_TOKEN. Créalo en https://app.netlify.com/user/applications#personal-access-tokens',
    )
  }
  const res = await fetch(`https://api.netlify.com/api/v1${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (res.status === 404 && allow404) return null
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

function isNexusLandingPath(p) {
  const path = p.replace(/^\//, '').replace(/\\/g, '/')
  if (!path.endsWith('/index.html') && !path.endsWith('\\index.html')) return false

  if (
    path.startsWith('eventos/') ||
    path.startsWith('nexus-output-pages/') ||
    path.startsWith('private/nexus-output-pages/')
  ) {
    return true
  }

  const dir = path.replace(/\/index\.html$/i, '')
  if (!dir || dir.includes('/')) return false

  return (
    dir.includes('-a-domicilio-') ||
    /-(ciudad-de-mexico|guadalajara|monterrey|aguascalientes|cdmx)$/i.test(dir)
  )
}

function countNexusInZip(zipPath) {
  try {
    const listing = execSync(`unzip -Z1 "${zipPath}"`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 })
    return listing.split('\n').filter((line) => isNexusLandingPath(line)).length
  } catch {
    return 0
  }
}

async function tryDownloadZip(deployId) {
  const res = await netlifyFetch(`/deploys/${deployId}/zip`, { allow404: true })
  if (!res) return 0
  const buffer = Buffer.from(await res.arrayBuffer())
  if (buffer.length < 1000) return 0
  await writeFile(ZIP_PATH, buffer)
  return countNexusInZip(ZIP_PATH)
}

async function getPublishedDeploy(siteId) {
  const res = await netlifyFetch(`/sites/${siteId}`)
  const site = await res.json()
  return site.published_deploy || null
}

async function pickDeployWithNexus(siteId) {
  const forcedId = process.env.NETLIFY_RESTORE_DEPLOY_ID
  if (forcedId) {
    console.log(`  forced deploy: ${forcedId.slice(0, 8)}…`)
    const count = await tryDownloadZip(forcedId)
    if (count < MIN_NEXUS_LANDINGS) {
      throw new Error(
        `NETLIFY_RESTORE_DEPLOY_ID=${forcedId} solo tiene ${count} landings Nexus (need ≥${MIN_NEXUS_LANDINGS})`,
      )
    }
    return { id: forcedId, title: 'forced restore', published_at: null }
  }

  const deploysRes = await netlifyFetch(`/sites/${siteId}/deploys?per_page=100`)
  const deploys = await deploysRes.json()
  if (!deploys?.length) {
    throw new Error('No hay deploys en este sitio.')
  }

  const published = await getPublishedDeploy(siteId)
  const ordered = [...deploys]
  if (published?.id) {
    ordered.sort((a, b) => (a.id === published.id ? -1 : b.id === published.id ? 1 : 0))
    console.log(`  published deploy: ${published.id.slice(0, 8)}…`)
  }

  for (const deploy of ordered) {
    if (deploy.state !== 'ready') continue
    try {
      console.log(`  checking zip ${deploy.id.slice(0, 8)}… (${deploy.published_at || deploy.created_at || ''})`)
      const count = await tryDownloadZip(deploy.id)
      if (count >= MIN_NEXUS_LANDINGS) {
        console.log(`  ✓ ${count} Nexus landings in zip`)
        return deploy
      }
      console.log(`  skip ${deploy.id.slice(0, 8)}… — ${count} Nexus landings in zip`)
    } catch (err) {
      console.warn(`  error on ${deploy.id?.slice(0, 8)}…: ${err.message}`)
    }
  }

  throw new Error(
    `No se encontró deploy descargable con ≥${MIN_NEXUS_LANDINGS} páginas Nexus en los últimos 100 deploys.\n` +
      'Solución rápida: Netlify → Deploys → publica un deploy anterior al 12 jul 2026 ~20:19 UTC.\n' +
      'Luego vuelve a lanzar Actions, o añade NETLIFY_RESTORE_DEPLOY_ID con el Deploy ID de ese deploy.',
  )
}

async function main() {
  await loadEnvFile()
  const siteId = resolveSiteId()
  const hasToken = Boolean(process.env.NETLIFY_AUTH_TOKEN)
  console.log(`Site ID: ${siteId.slice(0, 8)}… (token: ${hasToken ? 'sí' : 'no'})`)

  console.log('Buscando deploy con páginas Nexus/SEO (verificación por ZIP)…')
  const deploy = await pickDeployWithNexus(siteId)
  if (!deploy?.id) {
    throw new Error('No hay deploy publicado en este sitio.')
  }

  console.log(`Deploy: ${deploy.id} (${deploy.title || deploy.context || 'production'})`)
  console.log(`Fecha: ${deploy.published_at || deploy.created_at}`)

  if (!existsSync(ZIP_PATH)) {
    throw new Error(`ZIP no disponible para deploy ${deploy.id}`)
  }

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
