/**
 * Nexus blogs ship as static HTML under /blog/{slug}/.
 * The SPA BlogDetailPage only has a short stub in blog-data.js — never show that
 * when the real article exists as static HTML (client-nav would replace it).
 */

export function blogArticleHref(slug) {
  if (!slug) return '/blog/'
  return `/blog/${String(slug).replace(/^\/+|\/+$/g, '')}/`
}

/** True when the listing card must hard-navigate to Nexus static HTML. */
export function prefersStaticBlogHtml(post) {
  if (!post) return false
  if (post.staticHtml === true) return true
  const body = Array.isArray(post.body) ? post.body : []
  if (body.length === 0 || body.length > 4) return false
  return body.some((p) =>
    /artículo completo|HTML Nexus|esta misma URL|esta URL|Lee el artículo|Consulta el artículo|Revisa el artículo/i.test(
      String(p),
    ),
  )
}
