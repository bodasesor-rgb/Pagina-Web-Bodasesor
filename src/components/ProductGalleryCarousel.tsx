import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Lightbox } from "./Lightbox";
import { getProductGalleryImages } from "../data/product-galleries";

type ProductGalleryCarouselProps = {
  /** Product / service slug used to resolve gallery images */
  slug?: string;
  /** Optional override when slug is not in the gallery map */
  images?: string[];
  title?: string;
};

/**
 * Main product gallery carousel (arrows, counter, dots, lightbox).
 * Shared by ServicePage and BanqueteMenuDetailPage so banquet tiempos,
 * catering, barras and estaciones all behave the same.
 */
export default function ProductGalleryCarousel({
  slug,
  images: imagesProp,
  title,
}: ProductGalleryCarouselProps) {
  const images =
    imagesProp && imagesProp.length > 0
      ? imagesProp
      : getProductGalleryImages(slug || "");

  const [idx, setIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    setIdx(0);
  }, [slug, imagesProp?.join("|")]);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);
  const label =
    title ||
    (slug || "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  if (!images.length) return null;

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <div
          className="relative h-80 md:h-96 cursor-zoom-in group"
          onClick={() => setLightboxIdx(idx)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setLightboxIdx(idx);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Ver ${label} en grande`}
        >
          <img
            src={images[idx]}
            alt={`${label} para bodas y eventos — foto ${idx + 1} | Bodasesor`}
            className="w-full h-full object-contain bg-[#f5efe8] transition-opacity duration-300"
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/galeria/g1.jpg";
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
            <svg
              className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Ver foto anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-[#162040] min-w-11 min-h-11 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Ver foto siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-[#162040] min-w-11 min-h-11 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
              <div className="absolute bottom-3 right-3 bg-[#162040]/70 text-white text-xs font-serif px-2 py-1 rounded-full pointer-events-none">
                {idx + 1} / {images.length}
              </div>
            </>
          )}
        </div>
        {images.length > 1 && (
          <div
            className="flex justify-center gap-1 py-3 bg-white"
            role="tablist"
            aria-label="Miniaturas de galería"
          >
            {images.map((_, i) => (
              <button
                type="button"
                key={i}
                role="tab"
                aria-label={`Ver foto ${i + 1} de ${images.length}`}
                aria-selected={i === idx}
                onClick={() => setIdx(i)}
                className="inline-flex min-w-11 min-h-11 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    i === idx
                      ? "w-6 bg-[#162040]"
                      : "w-2 bg-gray-300 hover:bg-[#162040]/50"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() =>
            setLightboxIdx(
              (i) => ((i ?? 0) - 1 + images.length) % images.length,
            )
          }
          onNext={() =>
            setLightboxIdx((i) => ((i ?? 0) + 1) % images.length)
          }
        />
      )}
    </>
  );
}
