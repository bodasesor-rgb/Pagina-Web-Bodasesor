#!/usr/bin/env node
/**
 * Verify Gemini cost optimizations.
 * Offline checks always run. Live chat runs only if GEMINI_API_KEY / GEMINI_IA is set
 * (service accounts are restricted on Generative Language — use AI Studio auth keys).
 */
import sharp from 'sharp'
import {
  sanitizeHistoryForApi,
  compressImageForGemini,
  geminiChat,
  getOrCreateSystemCache,
  getGeminiAuth,
} from './lib/gemini.mjs'
import { GEMINI_TEXT_MODEL, GEMINI_BLOCKED_MODELS, assertAllowedTextModel } from './lib/gemini-config.mjs'
import { brandCorpusTokenEstimate } from './lib/gemini-brand-corpus.mjs'

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

async function offline() {
  assert(GEMINI_TEXT_MODEL === 'gemini-3.1-flash-lite', 'TEXT model must be flash-lite')
  assert(brandCorpusTokenEstimate() >= 4096, 'corpus must be ≥4096 tokens')
  assertAllowedTextModel(GEMINI_TEXT_MODEL)
  for (const b of ['gemini-2.5-flash', 'gemini-2.0-flash']) {
    let threw = false
    try {
      assertAllowedTextModel(b)
    } catch {
      threw = true
    }
    assert(threw, `should block ${b}`)
  }

  const dirty = [
    {
      role: 'user',
      parts: [{ text: 'mira' }, { inlineData: { mimeType: 'image/png', data: 'AAAA' } }],
      mediaDescription: 'Salón azul',
    },
    { role: 'model', text: 'ok' },
  ]
  const clean = sanitizeHistoryForApi(dirty)
  const blob = JSON.stringify(clean)
  assert(!blob.includes('inlineData'), 'history must not re-send inlineData')
  assert(blob.includes('Salón azul'), 'mediaDescription must remain as text')

  const bigPng = await sharp({
    create: { width: 2400, height: 1800, channels: 3, background: { r: 22, g: 32, b: 64 } },
  })
    .png()
    .toBuffer()
  const compressed = await compressImageForGemini(bigPng)
  assert(compressed.stats.savedPercent >= 70, `expected ≥70% save, got ${compressed.stats.savedPercent}`)
  assert(compressed.mimeType === 'image/jpeg', 'must be jpeg')
  assert(compressed.stats.widthAfter <= 1024 && compressed.stats.heightAfter <= 1024, 'must fit 1024')

  return { dirty, bigPng, compressed }
}

async function live(dirty, bigPng) {
  const auth = await getGeminiAuth()
  if (auth.mode !== 'apiKey') {
    return {
      skipped: true,
      reason:
        'Set GEMINI_API_KEY or GEMINI_IA (AI Studio auth key). Service accounts are restricted for Gemini generateContent.',
    }
  }

  const c1 = await getOrCreateSystemCache({ model: GEMINI_TEXT_MODEL })
  const chat1 = await geminiChat({ message: 'Hola Bodasesor, cotizar en León', history: [] })
  const chat2 = await geminiChat({
    message: '¿Y barra?',
    history: [
      { role: 'user', text: 'Hola Bodasesor, cotizar en León' },
      { role: 'model', text: chat1.reply },
    ],
  })
  const chatImg = await geminiChat({
    message: 'Foto del salón',
    history: sanitizeHistoryForApi(dirty),
    imageBuffer: bigPng,
  })

  assert(chat1.cost.model === GEMINI_TEXT_MODEL, 'chat model')
  assert(chatImg.cost.imageCompressed === true, 'imageCompressed')
  assert(chatImg.cost.imageStats.savedPercent >= 70, 'live image save')

  return {
    skipped: false,
    cacheCreate: {
      cached: c1.cached,
      cacheReused: c1.cacheReused,
      cacheFallback: c1.cacheFallback,
      error: c1.error || null,
    },
    chat1: chat1.cost,
    chat2: chat2.cost,
    chatImg: {
      imageCompressed: chatImg.cost.imageCompressed,
      savedPercent: chatImg.cost.imageStats?.savedPercent,
      mediaDescription: chatImg.mediaDescription,
      cacheFallback: chatImg.cost.cacheFallback,
      cached: chatImg.cost.cached,
      cacheReused: chatImg.cost.cacheReused,
    },
  }
}

async function main() {
  const { dirty, bigPng, compressed } = await offline()
  const liveReport = await live(dirty, bigPng)
  const report = {
    model: GEMINI_TEXT_MODEL,
    corpusTokens: brandCorpusTokenEstimate(),
    blockedModels: GEMINI_BLOCKED_MODELS,
    imageCompressed: true,
    savedPercent: compressed.stats.savedPercent,
    live: liveReport,
  }
  console.log(JSON.stringify(report, null, 2))
  console.log('verify-gemini-cost-optim: ok')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
