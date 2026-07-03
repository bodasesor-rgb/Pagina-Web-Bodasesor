#!/usr/bin/env node
/**
 * Verifica que la cuenta de servicio Google responde (token OAuth).
 * Uso: node scripts/verify-google-credentials.mjs
 */
import fs from 'fs'
import path from 'path'
import { createSign } from 'crypto'

const ROOT = path.resolve(import.meta.dirname, '..')
const defaultPath = path.join(ROOT, 'private/credentials/nexus-ia-power-ef9a95a9817b.json')
const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || defaultPath

if (!fs.existsSync(credPath)) {
  console.error(`❌ No existe: ${credPath}`)
  process.exit(1)
}

const credentials = JSON.parse(fs.readFileSync(credPath, 'utf8'))

function base64url(input) {
  return Buffer.from(input).toString('base64url')
}

const now = Math.floor(Date.now() / 1000)
const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
const payload = base64url(JSON.stringify({
  iss: credentials.client_email,
  scope: 'https://www.googleapis.com/auth/indexing',
  aud: 'https://oauth2.googleapis.com/token',
  iat: now,
  exp: now + 3600,
}))
const unsigned = `${header}.${payload}`
const sign = createSign('RSA-SHA256')
sign.update(unsigned)
sign.end()
const jwt = `${unsigned}.${sign.sign(credentials.private_key).toString('base64url')}`

const res = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: jwt,
  }),
})

if (!res.ok) {
  console.error('❌ Token error:', await res.text())
  process.exit(1)
}

const { access_token } = await res.json()
console.log('✓ Google credentials OK')
console.log(`  Project: ${credentials.project_id}`)
console.log(`  Email:   ${credentials.client_email}`)
console.log(`  Token:   ${access_token.slice(0, 20)}...`)
