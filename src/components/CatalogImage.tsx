import OptimizedImage from "./OptimizedImage";

type CatalogImageProps = {
  src?: string | null;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fallback?: string;
  onError?: (e: { currentTarget: HTMLImageElement }) => void;
  "data-testid"?: string;
};

/** Product / catalog thumbnail — WebP, lazy by default, fixed dimensions for CLS. */
export default function CatalogImage({
  src,
  alt,
  title,
  width = 480,
  height = 360,
  priority = false,
  className = "w-full h-full object-cover",
  sizes,
  fallback = "/images/galeria/g1.jpg",
  onError,
  ...rest
}: CatalogImageProps) {
  if (!src) return null;
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      title={title}
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes={sizes}
      onError={
        onError ??
        (fallback
          ? (e) => {
              (e.target as HTMLImageElement).src = fallback;
            }
          : undefined)
      }
      {...rest}
    />
  );
}
