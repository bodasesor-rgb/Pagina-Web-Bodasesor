import { useEffect, useRef, useState } from "react";

type CatalogoEmbedData = {
  title: string;
  provider: string;
  embedSrc: string;
};

/** Embed only — never link to gamma.app / canva edit URLs. */
export default function CatalogEmbed({
  catalog,
  eager = false,
  minHeight,
}: {
  catalog: CatalogoEmbedData;
  eager?: boolean;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);
  const height = minHeight ?? (catalog.provider === "canva" ? 640 : 560);

  useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  return (
    <div
      ref={ref}
      className="w-full bg-[#f5efe8] rounded-xl overflow-hidden border border-[#162040]/10"
    >
      {visible ? (
        <iframe
          src={catalog.embedSrc}
          title={`Catálogo ${catalog.title} | Bodasesor`}
          className="w-full border-0"
          style={{ height }}
          allow="fullscreen"
          loading={eager ? "eager" : "lazy"}
          referrerPolicy="no-referrer"
          // Keep interaction inside the embed; no top-level navigation to Gamma/Canva.
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
        />
      ) : (
        <div
          className="flex items-center justify-center text-[#162040]/50 font-serif text-sm"
          style={{ height: Math.min(height, 280) }}
        >
          Cargando catálogo…
        </div>
      )}
    </div>
  );
}
