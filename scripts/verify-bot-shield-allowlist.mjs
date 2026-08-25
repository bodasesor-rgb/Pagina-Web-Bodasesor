#!/usr/bin/env node
/**
 * Static check: search crawlers must match bot-shield ALLOW patterns.
 * Run in CI so we never ship a shield that 403s Googlebot/Bingbot.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const shieldPath = path.join(ROOT, 'netlify/edge-functions/bot-shield.ts')
const src = fs.readFileSync(shieldPath, 'utf8')

function parseRegexArray(name) {
  const m = src.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\n\\]`))
  if (!m) return null
  const out = []
  for (const line of m[1].split('\n')) {
    const trimmed = line.replace(/\/\/.*$/, '').trim()
    const rm = trimmed.match(/^\/(.+)\/([a-z]*),?\s*$/)
    if (!rm) continue
    out.push(new RegExp(rm[1], rm[2] || undefined))
  }
  return out
}

const patterns = parseRegexArray('ALLOW')
const blockPatterns = parseRegexArray('BLOCK')
if (!patterns?.length || !blockPatterns?.length) {
  console.error('verify-bot-shield-allowlist: could not parse ALLOW/BLOCK lists')
  process.exit(1)
}

const mustAllow = [
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'Googlebot-Image/1.0',
  'Googlebot-Video/1.0',
  'Mozilla/5.0 (compatible; Google-InspectionTool/1.0)',
  'Mozilla/5.0 (compatible; Google-Site-Verification/1.0)',
  'FeedFetcher-Google; (+http://www.google.com/feedfetcher.html)',
  'Mozilla/5.0 (compatible; Google-Read-Aloud; +https://support.google.com/webmasters/answer/1061943)',
  'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  'Mozilla/5.0 (compatible; AdsBot-Google; +http://www.google.com/adsbot.html)',
  'Mozilla/5.0 (compatible; BodasesorNexusVerify/1.0; +https://bodasesor.com)',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 BodasesorSync/1.0 (+https://bodasesor.com)',
  'Mozilla/5.0 (compatible; BodasesorGscAudit/1.0)',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Cursor/1.0',
  'Chrome-Lighthouse',
  'facebookexternalhit/1.1',
  'WhatsApp/2.0',
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)',
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ChatGPT-User/1.0)',
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0; +claudebot@anthropic.com)',
]

const mustBlock = [
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)',
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
  'CCBot/2.0',
  'Mozilla/5.0 (compatible; Google-Extended)',
  'Mozilla/5.0 (Linux; Android 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36 (compatible; Bytespider; +https://zhanzhang.sm.cn/bot.html)',
  'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)',
  'FacebookBot/1.0',
]

let failed = 0
for (const ua of mustAllow) {
  if (!patterns.some((rx) => rx.test(ua))) {
    console.error(`FAIL allow: ${ua}`)
    failed++
  }
}

for (const ua of mustBlock) {
  const allowed = patterns.some((rx) => rx.test(ua))
  const blocked = blockPatterns.some((rx) => rx.test(ua))
  if (allowed || !blocked) {
    console.error(`FAIL block: ${ua} (allowed=${allowed} blocked=${blocked})`)
    failed++
  }
}

if (failed) {
  console.error(`verify-bot-shield-allowlist: ${failed} failure(s)`)
  process.exit(1)
}
console.log(
  `verify-bot-shield-allowlist: ok (allow=${mustAllow.length} block=${mustBlock.length} patterns=${patterns.length})`,
)
