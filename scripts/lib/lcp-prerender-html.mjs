/** Build static LCP hero HTML + preload tags for prerendered SPA shells. */

export function heroWebpUrls(imagePath) {
  if (!imagePath || typeof imagePath !== 'string') return null
  if (!/^\/images\//.test(imagePath)) return null
  const webp = imagePath.replace(/\.(png|jpe?g)$/i, '.webp')
  const sm = webp.replace(/\.webp$/i, '-sm.webp')
  return { webp, sm, raster: imagePath }
}

export function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function escapeAttr(s) {
  return escapeHtml(s).replace(/'/g, '&#39;')
}

/** Inject preload + visible hero shell so inner pages paint before React (mobile LCP). */
export function injectServiceLcpShell(html, entry) {
  const urls = heroWebpUrls(entry?.image)
  if (!urls || !entry?.h1) return html

  let out = html

  const preloads = `    <link rel="preload" as="image" type="image/webp" href="${escapeAttr(urls.sm)}" media="(max-width: 768px)" fetchpriority="high" />
    <link rel="preload" as="image" type="image/webp" href="${escapeAttr(urls.webp)}" media="(min-width: 769px)" fetchpriority="high" />
`
  out = out.replace(/<\/head>/i, `${preloads}  </head>`)

  const shell = `<div id="spa-lcp-prerender" class="spa-lcp-prerender">
    <picture id="spa-lcp-hero" class="spa-lcp-hero">
      <source media="(max-width: 768px)" srcset="${escapeAttr(urls.sm)}" type="image/webp" />
      <source srcset="${escapeAttr(urls.webp)}" type="image/webp" />
      <img src="${escapeAttr(urls.raster)}" alt="${escapeAttr(entry.h1)}" width="1200" height="675" fetchpriority="high" decoding="sync" />
    </picture>
    <div class="spa-lcp-overlay" aria-hidden="true"></div>
    <div id="spa-lcp-copy" class="spa-lcp-copy">
      <h1>${escapeHtml(entry.h1)}</h1>
    </div>
  </div>
`

  if (out.includes('id="spa-lcp-prerender"')) return out
  out = out.replace('<div id="root"></div>', `${shell}<div id="root"></div>`)
  return out
}
