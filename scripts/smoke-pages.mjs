#!/usr/bin/env node
/**
 * Smoke-test key routes in a headless browser.
 * Usage: node scripts/smoke-pages.mjs [baseUrl]
 */
import puppeteer from 'puppeteer-core'
import { spawnSync } from 'node:child_process'

const BASE = process.argv[2] || 'https://bodasesor.com'

const CHROME = spawnSync('which', ['chromium', 'chromium-browser', 'google-chrome'], { encoding: 'utf8' })
  .stdout.trim().split('\n').find(Boolean)
  || '/usr/bin/chromium-browser'

const PATHS = [
  '/banquetes-catering/ciudad-de-mexico',
  '/pistas-tarimas/tarima-madera',
  '/baby-shower/ciudad-de-mexico',
  '/mesas-sillas/ciudad-de-mexico',
  '/floreria/centros-de-mesa/ciudad-de-mexico',
  '/bodas',
  '/xv-anos/monterrey',
  '/products/tarima-madera',
]

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844 })

  const results = []
  for (const path of PATHS) {
    const url = `${BASE}${path}`
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
      await new Promise((r) => setTimeout(r, 1500))
      const data = await page.evaluate(() => {
        const body = document.body.innerText
        const hasNotFound = /Servicio no encontrado|Producto no encontrado|Página no encontrada/i.test(body)
        const copy = document.getElementById('static-hero-copy')
        let hasHeroOverlay = false
        if (copy) {
          const style = getComputedStyle(copy)
          hasHeroOverlay = style.display !== 'none' && style.visibility !== 'hidden'
        }
        return { hasNotFound, hasHeroOverlay, snippet: body.slice(0, 200) }
      })
      const title = await page.title()
      results.push({
        path,
        ok: !data.hasNotFound && !data.hasHeroOverlay,
        ...data,
        title,
      })
    } catch (err) {
      results.push({ path, ok: false, error: err.message })
    }
  }

  await browser.close()
  console.log(JSON.stringify(results, null, 2))
  const failed = results.filter((r) => !r.ok)
  if (failed.length) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
