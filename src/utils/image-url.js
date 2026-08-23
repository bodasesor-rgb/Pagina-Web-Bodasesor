/** Prefer WebP sibling URL when the build has generated one. */
export function preferWebp(src) {
  if (!src || typeof src !== 'string') return src
  return src.replace(/\.(png|jpe?g)$/i, '.webp')
}

/** Mobile-optimized WebP (480px max edge, generated at build). */
export function preferWebpSm(src) {
  const webp = preferWebp(src)
  if (!webp.endsWith('.webp')) return webp
  return webp.replace(/\.webp$/i, '-sm.webp')
}
