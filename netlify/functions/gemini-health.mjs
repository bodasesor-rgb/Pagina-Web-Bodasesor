/**
 * GET /.netlify/functions/gemini-health — Gemini cost-cut observability (V9.32-web).
 */
import {
  getGeminiCallStats,
  geminiCostControlsSummary,
  GEMINI_TEXT_MODEL,
  GEMINI_COST_CUT_VERSION,
  shouldPreferGeminiOverOpenAI,
} from '../../scripts/lib/gemini.mjs'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' }
  }
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'GET only' }),
    }
  }

  const controls = geminiCostControlsSummary()
  const stats = getGeminiCallStats()

  return {
    statusCode: 200,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'ok',
      service: 'Bodasesor Pagina Web — Gemini',
      cost_cut_version: GEMINI_COST_CUT_VERSION,
      llm_model: GEMINI_TEXT_MODEL,
      llm_configured: shouldPreferGeminiOverOpenAI(),
      unified_llm_turn: controls.unified_llm_turn,
      chat_history_max: controls.chat_history_max,
      few_shot_max: controls.few_shot_max,
      context_cache_env: controls.context_cache_env,
      gemini_call_stats: stats,
      features: [
        'gemini-unified-turn',
        'gemini-context-cache-default-off',
        'gemini-history-trim',
        'llm-gemini-flash-lite',
        'gemini-no-image-generation',
      ],
      gemini_policy:
        'V9.32-web: flash-lite; 1 call/chat turn; GEMINI_CONTEXT_CACHE default off; historial≤6; few-shot 0; system estático vs contexto dinámico. Sin Pro/Imagen/Nano Banana.',
    }),
  }
}
