/**
 * Unified blog feed for the SPA /blog hub.
 * Nexus /blog/articulos/ cards (blog-listing.json) come first;
 * legacy blog-data.js stubs fill any gaps.
 */
import listing from './blog-listing.json' with { type: 'json' }
import {
  blogPosts as legacyBlogPosts,
  getBlogPostBySlug as getLegacyBlogPostBySlug,
} from './blog-data.js'

export function getBlogFeed() {
  const nexus = Array.isArray(listing?.posts) ? listing.posts : []
  const seen = new Set(nexus.map((p) => p.slug))
  const legacy = legacyBlogPosts.filter((p) => p?.slug && !seen.has(p.slug))
  return [...nexus, ...legacy]
}

/** @deprecated Prefer getBlogFeed() — kept for call sites that expect an array binding. */
export const blogPosts = getBlogFeed()

export function getBlogPostBySlug(slug) {
  if (!slug) return null
  const hit = getBlogFeed().find((p) => p.slug === slug)
  if (hit) return hit
  return getLegacyBlogPostBySlug(slug)
}
