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
  }
}

// NOTE: Do not load main CSS async — it caused a ~1s FOUC (stacked/unstyled layout)
// on every page while waiting for onload to promote preload → stylesheet.

function deferNonCriticalPreloadsPlugin() {
  return {
    name: 'defer-non-critical-preloads',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        let out = html
          .replace(/<link rel="modulepreload" crossorigin href="\/assets\/icons-[^"]+">\n?/g, '')
          .replace(/<link rel="modulepreload" crossorigin href="\/assets\/vendor-[^"]+">\n?/g, '')
          .replace(/<link rel="modulepreload" crossorigin href="\/assets\/rolldown-runtime-[^"]+">\n?/g, '')

        // Move main stylesheet before module scripts so first paint isn't unstyled.
        const cssLink = out.match(/<link\s+rel="stylesheet"[^>]*href="\/assets\/[^"]+\.css"[^>]*>/i)
        if (cssLink) {
          out = out.replace(cssLink[0], '')
          if (/<\/title>/i.test(out)) {
            out = out.replace(/<\/title>/i, `</title>\n    ${cssLink[0]}`)
          } else {
            out = out.replace(/<\/head>/i, `    ${cssLink[0]}\n  </head>`)
          }
        }
        return out
      },
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
    deferNonCriticalPreloadsPlugin(),
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
            {
              name: 'products',
              test: /src[\\/]data[\\/]products\.js$/,
            },
            {
              name: 'blog-data',
              test: /src[\\/]data[\\/]blog-data/,
            },
            {
              name: 'search-index',
              test: /src[\\/]data[\\/]search-index/,
            },
          ],
        },
      },
    },
  },
})
