import { useEffect } from "react";
import { useCity } from "@/context/CityContext";
import { Link } from "wouter";
import { PERIQUERAS_CATALOG } from "@/data/salas-periqueras-products";

const WHATSAPP_NUMBER = "5215540080373";
const WA_BASE = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

function WaSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type Props = { perSlug?: string };

export default function PeriqueraDetailPage({ perSlug }: Props) {
  const { city } = useCity();
  const per = PERIQUERAS_CATALOG.find(p => p.slug === perSlug);

  useEffect(() => {
    if (per) document.title = `${per.name} | Bodasesor`;
  }, [per]);

  if (!per) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#162040] mb-4">Periquera no encontrada</h1>
          <Link href="/salas-periqueras" className="text-[#162040] underline font-serif">
            Ver catálogo completo
          </Link>
        </div>
      </div>
    );
  }

  const waMsg = WA_BASE + encodeURIComponent(`Hola, me interesa cotizar la periquera: ${per.name} para mi evento.`);
  const allImgs = [per.img, ...per.gallery].filter(Boolean);

  const idx = PERIQUERAS_CATALOG.findIndex(p => p.slug === per.slug);
  const prev = idx > 0 ? PERIQUERAS_CATALOG[idx - 1] : null;
  const next = idx < PERIQUERAS_CATALOG.length - 1 ? PERIQUERAS_CATALOG[idx + 1] : null;

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#162040]">
        <div className="max-w-7xl mx-auto px-4 py-10 lg:py-0 grid lg:grid-cols-5 min-h-[420px] items-center">
          {/* Left: text */}
          <div className="lg:col-span-2 py-10 lg:py-14 lg:pr-8">
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-6 font-serif flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/salas-periqueras" className="hover:text-white transition-colors">Salas y Periqueras</Link>
              <span>/</span>
              <span className="text-white/80">Periqueras</span>
            </nav>
            <div className="inline-block bg-white/10 text-white/70 text-xs font-serif px-3 py-1 rounded-full mb-4">
              {per.grupo}
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-4">
              {per.name}{city ? ` en ${city.name}` : ''}
            </h1>
            <p className="text-white/75 font-serif leading-relaxed mb-6">
              {per.desc}
            </p>

            {/* Specs */}
            <div className="flex flex-wrap gap-3 mb-8 text-sm font-serif">
              {per.dimensions && (
                <span className="flex items-center gap-1.5 bg-white/10 text-white/80 px-3 py-1.5 rounded-lg">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  {per.dimensions}
                </span>
              )}
              {per.capacities && (
                <span className="flex items-center gap-1.5 bg-white/10 text-white/80 px-3 py-1.5 rounded-lg">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {per.capacities}
                </span>
              )}
              {per.colors && (
                <span className="flex items-center gap-1.5 bg-white/10 text-white/80 px-3 py-1.5 rounded-lg">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  {per.colors}
                </span>
              )}
              {per.stock && (
                <span className="flex items-center gap-1.5 bg-white/10 text-white/80 px-3 py-1.5 rounded-lg">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {per.stock}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mb-5">
              <a href={waMsg} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
                <WaSvg /> Cotizar por WhatsApp
              </a>
              <a href="tel:5215540080373"
                className="flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold font-serif hover:bg-white hover:text-[#162040] transition-all duration-300">
                Llamar
              </a>
            </div>
            <Link href="/salas-periqueras"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-serif transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Ver catálogo completo
            </Link>
          </div>

          {/* Right: image */}
          <div className="lg:col-span-3 relative flex gap-3 h-full min-h-[320px] lg:min-h-[420px] items-center py-8 lg:py-10">
            <div className="flex-1 h-[280px] lg:h-[340px] rounded-2xl overflow-hidden bg-[#0d1630]">
              <img src={allImgs[0]} alt={per.name}
                className="w-full h-full object-contain drop-shadow-2xl" />
            </div>
            {allImgs[1] && (
              <div className="w-28 lg:w-36 h-[200px] lg:h-[240px] rounded-xl overflow-hidden bg-[#0d1630] flex-shrink-0 self-end">
                <img src={allImgs[1]} alt={per.name}
                  className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {allImgs.length > 2 && (
        <section className="py-10 px-4 bg-[#f5efe8]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-serif font-bold text-[#162040] mb-5">Galería</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {allImgs.slice(2).map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img src={img} alt={`${per.name} vista ${i + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <section className="py-8 px-4 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
          {prev ? (
            <Link href={`/periqueras/${prev.slug}`}
              className="flex items-center gap-2 text-sm font-serif text-[#162040] hover:underline max-w-[45%]">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="truncate">{prev.name}</span>
            </Link>
          ) : <div />}
          <Link href="/salas-periqueras"
            className="text-xs font-serif font-semibold text-[#162040]/50 hover:text-[#162040] uppercase tracking-wide">
            Ver catálogo
          </Link>
          {next ? (
            <Link href={`/periqueras/${next.slug}`}
              className="flex items-center gap-2 text-sm font-serif text-[#162040] hover:underline max-w-[45%] text-right">
              <span className="truncate">{next.name}</span>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* Related periqueras */}
      <section className="py-10 px-4 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-serif font-bold text-[#162040] mb-5">Otras periqueras disponibles</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PERIQUERAS_CATALOG.filter(p => p.slug !== per.slug).slice(0, 6).map(p => (
              <Link key={p.slug} href={`/periqueras/${p.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-md transition-all">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-serif font-semibold text-[#162040] leading-snug">{p.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
