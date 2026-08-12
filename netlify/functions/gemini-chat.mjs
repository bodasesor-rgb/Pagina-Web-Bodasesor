/**
 * Netlify function: cost-optimized Gemini chat.
 * POST JSON: { message, history?, imageBase64? }
 * Returns: { reply, mediaDescription, cost }
 */
import {
  geminiChat,
  shouldPreferGeminiOverOpenAI,
} from '../../scripts/lib/gemini.mjs'
import { GEMINI_TEXT_MODEL } from '../../scripts/lib/gemini-config.mjs'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' }
  }
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'POST only' }),
    }
  }

  if (!shouldPreferGeminiOverOpenAI()) {
    return {
      statusCode: 503,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Gemini not configured (set GEMINI_API_KEY / GEMINI_IA or service account)',
      }),
    }
  }

  try {
    const payload = JSON.parse(event.body || '{}')
    const message = String(payload.message || '').trim()
    if (!message && !payload.imageBase64) {
      return {
        statusCode: 400,
        headers: { ...cors, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'message or imageBase64 required' }),
      }
    }

    // Client must send history already sanitized (text + mediaDescription only).
    // We sanitize again server-side as a safety net.
    const result = await geminiChat({
      message: message || 'Describe la imagen y ayúdame a cotizar con Bodasesor.',
      history: Array.isArray(payload.history) ? payload.history : [],
      imageBase64: payload.imageBase64 || null,
      model: GEMINI_TEXT_MODEL,
    })

    return {
      statusCode: 200,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    }
  } catch (e) {
    return {
      statusCode: 500,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: e.message || String(e) }),
    }
  }
}
