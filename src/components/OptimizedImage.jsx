import { preferWebp, preferWebpSm } from '../utils/image-url'

/** Responsive image with WebP preference, mobile -sm variant, explicit dimensions and lazy loading. */
export default function OptimizedImage({
  src,
  alt = '',
  width = 400,
  height = 300,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, 960px',
  onError,
  style,
  ...rest
}) {
  if (!src) return null

  const webpSrc = preferWebp(src)
  const webpSmSrc = preferWebpSm(src)
  const useWebp = webpSrc !== src
  const useSm = useWebp && webpSmSrc !== webpSrc

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
      {useSm ? (
        <source
          media="(max-width: 768px)"
          srcSet={webpSmSrc}
          type="image/webp"
          sizes="100vw"
        />
      ) : null}
      <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
      <img src={src} {...imgProps} />
    </picture>
  )
}
