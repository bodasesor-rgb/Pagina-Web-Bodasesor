/**
 * Canonical Gemini models + cost params for Bodasesor.
 *
 * WHERE TO CHANGE MODELS: edit THIS file only.
 * - Scripts import from `scripts/lib/gemini-config.mjs`
 * - Env overrides (optional): GEMINI_MODEL, GEMINI_IMAGE_MODEL, GEMINI_CACHE_TTL
 *
 * Rules (cost floor):
 * - Text/chat/copy → TEXT_MODEL only (no multi-model fan-out)
 * - Images → IMAGE_MODEL only when generating an image
 * - Never gemini-2.5-flash / gemini-2.0-flash (retired for new AI Studio keys)
 * - Prefer Gemini when GEMINI_API_KEY / GEMINI_IA is set (never OpenAI in that case)
 */

export const GEMINI_TEXT_MODEL = 'gemini-3.1-flash-lite'
export const GEMINI_IMAGE_MODEL = 'imagen-4.0-fast-generate-001'

/** @deprecated use GEMINI_TEXT_MODEL — kept as alias for older imports */
export const DEFAULT_GEMINI_MODEL =
  (process.env.GEMINI_MODEL || '').trim() || GEMINI_TEXT_MODEL

export const DEFAULT_GEMINI_IMAGE_MODEL =
  (process.env.GEMINI_IMAGE_MODEL || '').trim() || GEMINI_IMAGE_MODEL

/** Explicit context cache TTL */
export const GEMINI_CACHE_TTL_SECONDS = Number(process.env.GEMINI_CACHE_TTL || 3600)

/** Gemini 3.x explicit cache minimum (~4096 tokens). Corpus must clear this. */
export const GEMINI_CACHE_MIN_TOKENS = 4096

/** Rough chars/token heuristic for padding checks (conservative). */
export const GEMINI_CHARS_PER_TOKEN = 3.2

export const GEMINI_IMAGE_MAX_EDGE = 1024
export const GEMINI_IMAGE_JPEG_QUALITY = 80

/** Models that must never be selected */
export const GEMINI_BLOCKED_MODELS = Object.freeze([
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'models/gemini-2.5-flash',
  'models/gemini-2.0-flash',
])

export function assertAllowedTextModel(model) {
  const m = String(model || '').replace(/^models\//, '')
  if (GEMINI_BLOCKED_MODELS.some((b) => b.replace(/^models\//, '') === m)) {
    throw new Error(`Blocked Gemini model "${model}". Use ${GEMINI_TEXT_MODEL}.`)
  }
  return m
}

export function resolveTextModel(override) {
  return assertAllowedTextModel(override || DEFAULT_GEMINI_MODEL)
}

/** Prefer Gemini when any Gemini key is present (do not call OpenAI). */
export function shouldPreferGeminiOverOpenAI() {
  return Boolean(
    (process.env.GEMINI_API_KEY || '').trim() ||
      (process.env.GEMINI_IA || '').trim() ||
      (process.env.GOOGLE_API_KEY || '').trim() ||
      process.env.GOOGLE_SERVICE_ACCOUNT_JSON ||
      process.env.GOOGLE_APPLICATION_CREDENTIALS,
  )
}

export const GEMINI_SHORT_SYSTEM_FALLBACK =
  'Eres el asistente virtual de Bodasesor (eventos y banquetes en México). ' +
  'Responde en español de México, tono profesional cercano. No inventes precios ni venues. ' +
  'Invita a cotizar por WhatsApp +52 55 4008 0373 cuando falte detalle comercial.'
