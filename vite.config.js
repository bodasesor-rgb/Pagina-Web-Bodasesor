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

function buildLegacyBootScript() {
  const result = buildSync({
    entryPoints: ['src/legacy-redirect-boot-entry.js'],
    write: false,
    bundle: true,
    minify: true,
    format: 'iife',
    platform: 'browser',
  })
  return result.outputFiles[0].text
}

function legacyRedirectBootPlugin() {
  let bootScript = ''
  return {
    name: 'legacy-redirect-boot',
    buildStart() {
      bootScript = buildLegacyBootScript()
      this.emitFile({
        type: 'asset',
        fileName: 'legacy-redirect-boot.js',
        source: bootScript,
      })
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== '/legacy-redirect-boot.js') return next()
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
        res.end(buildLegacyBootScript())
      })
    },
    transformIndexHtml(html) {
      return html.replace(
        '</head>',
        '<script src="/legacy-redirect-boot.js" defer></script></head>',
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
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor',
              test: /node_modules[\\/](react|react-dom|wouter|scheduler)[\\/]/,
            },
            {
              name: 'icons',
              test: /node_modules[\\/]lucide-react[\\/]/,
            },
          ],
        },
      },
    },
  },
})
