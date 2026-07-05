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
  ...rest
}) {
  if (!src) return null

  const webpSrc = src.replace(/\.(png|jpe?g)$/i, '.webp')
  const useWebp = webpSrc !== src

  const imgProps = {
    alt,
    width,
    height,
    decoding: priority ? 'sync' : 'async',
    loading: priority ? 'eager' : 'lazy',
    fetchPriority: priority ? 'high' : 'auto',
    className,
    onError,
    ...rest,
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
