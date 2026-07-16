/** Responsive image with WebP preference, explicit dimensions and lazy loading. */
export default function OptimizedImage({
  src,
  alt = '',
  width = 400,
  height = 300,
  priority = false,
  className = '',
  sizes,
  onError,
  style,
  ...rest
}) {
  if (!src) return null

  const webpSrc = src.replace(/\.(png|jpe?g)$/i, '.webp')
  const useWebp = webpSrc !== src

  const aspectStyle =
    width && height
      ? { aspectRatio: `${width} / ${height}`, backgroundColor: '#f5efe8', ...style }
      : { backgroundColor: '#f5efe8', ...style }

  const imgProps = {
    alt,
    width,
    height,
    decoding: priority ? 'sync' : 'async',
    loading: priority ? 'eager' : 'lazy',
    fetchPriority: priority ? 'high' : 'auto',
    className,
    style: aspectStyle,
    ...rest,
    onError: (e) => {
      // If webp sibling 404s, fall back to original raster once.
      const el = e.currentTarget
      if (useWebp && el?.dataset?.fallback !== '1' && el.src?.includes('.webp')) {
        el.dataset.fallback = '1'
        el.src = src
        return
      }
      onError?.(e)
    },
  }

  if (!useWebp) {
    return <img src={src} {...imgProps} />
  }

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
      <img src={src} {...imgProps} />
    </picture>
  )
}
