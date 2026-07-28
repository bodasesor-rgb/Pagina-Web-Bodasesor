#!/usr/bin/env node
import puppeteer from 'puppeteer-core'
import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const BASE = process.argv[2] || 'https://bodasesor.com'
const CHROME = spawnSync('which', ['google-chrome', 'chromium', 'chromium-browser'], { encoding: 'utf8' })
  .stdout.trim().split('\n').find(Boolean) || '/usr/bin/google-chrome'

const lines = readFileSync('public/_redirects', 'utf8').split('\n').filter((l) => l && !l.startsWith('#'))
const targets = [...new Set(lines.map((l) => l.split(/\s+/)[1]).filter((t) => t?.startsWith('/') && t !== '/index.html'))]
const step = Math.max(1, Math.floor(targets.length / 60))
const PATHS = []
for (let i = 0; i < targets.length; i += step) PATHS.push(targets[i])
PATHS.push('/eventos/bodas-cdmx', '/silla-tiffany/ciudad-de-mexico', '/bocadillos/ciudad-de-mexico', '/inflables/ciudad-de-mexico')

async function main() {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844 })
  const failed = []

  for (const path of PATHS) {
    try {
      await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle2', timeout: 25000 })
      await new Promise((r) => setTimeout(r, 800))
      const data = await page.evaluate(() => {
        const text = document.body.innerText
        const copy = document.getElementById('static-hero-copy')
        const overlay = copy && getComputedStyle(copy).display !== 'none'
        const brokenImgs = [...document.querySelectorAll('img')].filter((img) => img.complete && img.naturalWidth === 0 && img.src && !img.src.startsWith('data:')).length
        return {
          notFound: /Servicio no encontrado|Producto no encontrado|Página no encontrada|no encontrado/i.test(text),
          overlay,
          brokenImgs,
          snippet: text.slice(0, 80).replace(/\s+/g, ' '),
        }
      })
      if (data.notFound || data.overlay) failed.push({ path, ...data })
    } catch (err) {
      failed.push({ path, error: err.message })
    }
  }

  await browser.close()
  console.log(`Tested ${PATHS.length} paths, failed ${failed.length}`)
  failed.forEach((f) => console.log(JSON.stringify(f)))
  if (failed.length) process.exit(1)
}

main()
