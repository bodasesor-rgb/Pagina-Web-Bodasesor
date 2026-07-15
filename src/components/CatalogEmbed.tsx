import { useEffect, useRef, useState } from "react";

type CatalogoEmbedData = {
  title: string;
  provider: string;
  embedSrc: string;
};

/**
 * Heavy Gamma/Canva iframes load only after the visitor clicks.
 * Facade keeps /catalogos light until someone actually opens a catalog.
 */
export default function CatalogEmbed({
  catalog,
  /** If true, skip the click facade and load as soon as in viewport. */
  autoLoad = false,
  minHeight,
}: {
  catalog: CatalogoEmbedData;
  autoLoad?: boolean;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [activated, setActivated] = useState(false);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const height = minHeight ?? (catalog.provider === "canva" ? 560 : 480);
  const shouldMountIframe = activated || (autoLoad && inView);

  useEffect(() => {
    if (!autoLoad || activated) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoLoad, activated]);

  useEffect(() => {
    setLoaded(false);
  }, [catalog.embedSrc, shouldMountIframe]);

  const providerLabel = catalog.provider === "canva" ? "Canva" : "Gamma";

  return (
    <div
      ref={ref}
      className="relative w-full bg-[#f5efe8] rounded-xl overflow-hidden border border-[#162040]/10"
      style={{ minHeight: shouldMountIframe ? height : Math.min(height, 260) }}
    >
      {!shouldMountIframe && (
        <button
          type="button"
          onClick={() => setActivated(true)}
          className="w-full h-full min-h-[220px] md:min-h-[260px] flex flex-col items-center justify-center gap-3 px-6 py-10 text-center hover:bg-[#ebe3d8] transition-colors cursor-pointer"
          aria-label={`Cargar catálogo ${catalog.title}`}
        >
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#162040] text-white">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </span>
          <span className="text-lg font-serif font-bold text-[#162040]">Cargar catálogo</span>
          <span className="text-sm text-[#162040]/65 font-serif max-w-sm">
            {catalog.title} · se carga al hacer clic ({providerLabel}) para no frenar la página
          </span>
        </button>
      )}

      {shouldMountIframe && (
        <>
          {!loaded && (
            <div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#f5efe8] text-[#162040]/60 font-serif text-sm"
              aria-live="polite"
            >
              <span className="inline-block w-8 h-8 border-2 border-[#162040]/25 border-t-[#162040] rounded-full animate-spin" />
              Cargando {catalog.title}…
            </div>
          )}
          <iframe
            src={catalog.embedSrc}
            title={`Catálogo ${catalog.title} | Bodasesor`}
            className="w-full border-0"
            style={{ height, opacity: loaded ? 1 : 0, transition: "opacity .25s ease" }}
            allow="fullscreen"
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            // Keep interaction inside the embed; no top-level navigation to Gamma/Canva.
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
          />
        </>
      )}
    </div>
  );
}
