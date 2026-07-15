import { useEffect, useState } from "react";

type CatalogoEmbedData = {
  title: string;
  provider: string;
  embedSrc: string;
};

/** Origins used by catalog iframe providers — warm DNS/TLS early. */
export const CATALOG_EMBED_ORIGINS = [
  "https://gamma.app",
  "https://www.canva.com",
] as const;

export function ensureCatalogPreconnects() {
  if (typeof document === "undefined") return;
  for (const href of CATALOG_EMBED_ORIGINS) {
    if (!document.head.querySelector(`link[data-catalog-preconnect="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = href;
      link.crossOrigin = "anonymous";
      link.dataset.catalogPreconnect = href;
      document.head.appendChild(link);
    }
    if (!document.head.querySelector(`link[data-catalog-dns="${href}"]`)) {
      const dns = document.createElement("link");
      dns.rel = "dns-prefetch";
      dns.href = href;
      dns.dataset.catalogDns = href;
      document.head.appendChild(dns);
    }
  }
}

/**
 * Off-screen warmer so hover / intent starts fetching before "Ver catálogo".
 * Browser HTTP cache then makes the visible iframe much faster.
 */
export function CatalogEmbedWarmer({ src }: { src: string | null }) {
  if (!src) return null;
  return (
    <iframe
      src={src}
      title="Prefetch catálogo"
      tabIndex={-1}
      aria-hidden="true"
      className="pointer-events-none fixed w-px h-px opacity-0 overflow-hidden -left-[9999px]"
      loading="eager"
      referrerPolicy="no-referrer"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
    />
  );
}

/** Visible catalog iframe — mounts immediately (no second click). */
export default function CatalogEmbed({
  catalog,
  minHeight,
}: {
  catalog: CatalogoEmbedData;
  minHeight?: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const height = minHeight ?? (catalog.provider === "canva" ? 560 : 480);

  useEffect(() => {
    ensureCatalogPreconnects();
    setLoaded(false);
  }, [catalog.embedSrc]);

  return (
    <div
      className="relative w-full bg-[#f5efe8] rounded-xl overflow-hidden border border-[#162040]/10"
      style={{ minHeight: height }}
    >
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
        className="w-full border-0 bg-white"
        style={{ height }}
        allow="fullscreen"
        loading="eager"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
      />
    </div>
  );
}
