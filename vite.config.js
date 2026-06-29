import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { buildSync } from 'esbuild'

// Plugin that rewrites /images/ paths to use the configured base URL
// This fixes GitHub Pages sub-path deployments without touching source files
function imageBasePlugin(base) {
  if (!base || base === '/') return null
  const normalBase = base.endsWith('/') ? base : base + '/'
  return {
    name: 'image-base-rewrite',
    transform(code, id) {
      if (!/\.(tsx?|jsx?)$/.test(id)) return null
      // Replace string literals containing /images/ with base-prefixed version
      return code
        .replace(/(['"`])\/images\//g, `$1${normalBase}images/`)
        .replace(/url\((['"]?)\/images\//g, `url($1${normalBase}images/`)
    },
  }
}

function legacyRedirectBootPlugin() {
  let bootScript = ''
  return {
    name: 'legacy-redirect-boot',
    buildStart() {
      const result = buildSync({
        entryPoints: ['src/legacy-redirect-boot-entry.js'],
        write: false,
        bundle: true,
        minify: true,
        format: 'iife',
        platform: 'browser',
      })
      bootScript = result.outputFiles[0].text
    },
    transformIndexHtml(html) {
      if (!bootScript) return html
      return html.replace(
        '</head>',
        `<script>${bootScript}</script></head>`,
      )
    },
  }
}

const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    imageBasePlugin(base),
    legacyRedirectBootPlugin(),
  ],
})
