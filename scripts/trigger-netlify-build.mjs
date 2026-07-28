#!/usr/bin/env node
/**
 * Trigger a Netlify production build via Build Hook URL.
 * Create hook: Netlify → Site → Build & deploy → Build hooks
 *
 * Usage: NETLIFY_BUILD_HOOK=https://... node scripts/trigger-netlify-build.mjs
 */
const hook = process.env.NETLIFY_BUILD_HOOK

if (!hook) {
  console.error('Set NETLIFY_BUILD_HOOK (Netlify → Build hooks → copy URL)')
  process.exit(1)
}

const res = await fetch(hook, { method: 'POST' })
if (!res.ok) {
  console.error(`Build hook failed: ${res.status} ${await res.text()}`)
  process.exit(1)
}

console.log('✓ Netlify build triggered. Wait ~2 min then test:')
console.log('  curl -I https://bodasesor.com/products/tarima-madera')
