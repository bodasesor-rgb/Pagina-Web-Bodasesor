import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
function Instagram({ className }) { return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>; }

// Imágenes publicitarias con texto encima (no fotos limpias de eventos)
// Criterios: 607x1080 (plantilla gráfica), banners 1080x566/720x405, dimensiones inusuales, archivos duplicados exactos = mismo template
const EXCLUDED = new Set([
  2, 13, 22, 33, 35, 36, 40, 41, 55, 56,
  59, 62, 66, 68, 75, 76, 80, 84, 86, 89,
  93, 94, 99, 102, 110, 112, 114, 115, 117, 119,
  121, 125, 126, 127, 128, 129, 130, 136, 137, 145,
  152, 156, 157, 160, 165, 172, 173, 177, 179, 180,
  188, 190, 195, 196, 198,
]);

const ALL_PHOTOS = Array.from({ length: 200 }, (_, i) => i + 1)
  .filter(n => !EXCLUDED.has(n))
  .map(n => ({ src: `/images/instagram/ig${n}.jpg`, alt: `Evento real Bodasesor ${n}` }));

const TOTAL_PHOTOS = ALL_PHOTOS.length;

const WHATSAPP_NUMBER = "5215540080373";
const WA_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Hola%2C%20me%20interesa%20cotizar%20mi%20evento`;

export default function GaleriaPage() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Galería de Eventos | Bodasesor";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "ArrowRight") setLightboxIdx(i => ((i ?? 0) + 1) % TOTAL_PHOTOS);
      if (e.key === "ArrowLeft") setLightboxIdx(i => ((i ?? 0) - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS);
      if (e.key === "Escape") setLightboxIdx(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx]);

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "220px" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/galeria/g1.jpg')" }}>
          <div className="absolute inset-0 bg-[#162040]/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-3">
            <Instagram className="w-6 h-6 text-[#f5efe8]" />
            <span className="text-white/70 font-serif text-sm tracking-widest uppercase">@bodasesormx</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
            Galería de Eventos
          </h1>
          <p className="text-white/80 font-serif text-lg max-w-2xl">
            Más de {TOTAL_PHOTOS} fotos reales de eventos realizados por Bodasesor en todo México.
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#162040] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-6">
              {[
                { label: "Fotos reales", value: `${TOTAL_PHOTOS}+` },
                { label: "Eventos realizados", value: "1,000+" },
                { label: "Años de experiencia", value: "15+" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-white font-bold font-serif text-xl">{s.value}</p>
                  <p className="text-white/60 font-serif text-xs">{s.label}</p>
                </div>
              ))}
            </div>
            <a
              href={WA_URL}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-5 py-2.5 rounded-xl font-bold font-serif text-sm transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Cotizar mi evento
            </a>
          </div>
        </div>
      </section>

      {/* ── PHOTO GRID ── */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 space-y-2">
            {ALL_PHOTOS.map((photo, i) => (
              <div
                key={i}
                className="break-inside-avoid cursor-pointer overflow-hidden rounded-lg group relative"
                onClick={() => setLightboxIdx(i)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={e => { (e.target as HTMLImageElement).src = '/images/galeria/g1.jpg'; }}
                />
                <div className="absolute inset-0 bg-[#162040]/0 group-hover:bg-[#162040]/30 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-16 bg-[#162040] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            ¿Tu evento puede estar aquí?
          </h2>
          <p className="text-white/70 font-serif text-lg mb-8">
            Contáctanos hoy y recibe una cotización personalizada en menos de una hora.
          </p>
          <a
            href={WA_URL}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Cotizar por WhatsApp
          </a>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors z-10"
            onClick={() => setLightboxIdx(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors z-10"
            onClick={e => { e.stopPropagation(); setLightboxIdx(i => ((i ?? 0) - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS); }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors z-10"
            onClick={e => { e.stopPropagation(); setLightboxIdx(i => ((i ?? 0) + 1) % TOTAL_PHOTOS); }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <img
            src={ALL_PHOTOS[lightboxIdx].src}
            alt={ALL_PHOTOS[lightboxIdx].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
            onError={e => { (e.target as HTMLImageElement).src = '/images/galeria/g1.jpg'; }}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm font-serif px-4 py-1.5 rounded-full">
            {lightboxIdx + 1} / {TOTAL_PHOTOS}
          </div>
        </div>
      )}
    </div>
  );
}
