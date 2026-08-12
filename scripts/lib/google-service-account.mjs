/**
 * Google service-account JWT → access token (no external deps).
 * Env: GOOGLE_SERVICE_ACCOUNT_JSON = full JSON key as string
 */
import { createSign } from 'node:crypto'
import { readFileSync, existsSync } from 'node:fs'

export function loadGoogleCredentials() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (raw && raw.trim()) {
    return JSON.parse(raw)
  }
  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS
  if (path && existsSync(path)) {
    return JSON.parse(readFileSync(path, 'utf8'))
  }
  return null
}

function base64url(input) {
  return Buffer.from(input).toString('base64url')
}

/**
 * @param {object} credentials service account JSON
 * @param {string|string[]} scopes
 */
export async function getGoogleAccessToken(credentials, scopes) {
  const scope = Array.isArray(scopes) ? scopes.join(' ') : scopes
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const payload = base64url(
    JSON.stringify({
      iss: credentials.client_email,
      scope,
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  )
  const unsigned = `${header}.${payload}`
  const sign = createSign('RSA-SHA256')
  sign.update(unsigned)
  sign.end()
  const signature = sign.sign(credentials.private_key).toString('base64url')
  const jwt = `${unsigned}.${signature}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  if (!res.ok) {
    throw new Error(`Google token error: ${await res.text()}`)
  }
  const data = await res.json()
  return data.access_token
}

export const GSC_SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
]
