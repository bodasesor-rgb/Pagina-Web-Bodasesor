import { useEffect } from "react";
import { Link } from "wouter";

const WHATSAPP_NUMBER = "5215540080373";
const WA_BASE = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

function WaSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function CatalogoPistasTarimasPage() {
  useEffect(() => {
    document.title = 'Catálogo Pistas y Tarimas 2026 | Bodasesor';
  }, []);

  const waMsg = WA_BASE + encodeURIComponent('Hola, vi el catálogo de Pistas y Tarimas y me gustaría recibir una cotización personalizada para mi evento.');

  return (
    <div className="min-h-screen bg-[#162040] flex flex-col">

      {/* Top bar */}
      <div className="bg-[#0d1630] px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/pistas-tarimas"
              className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-serif transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Pistas y Tarimas
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white font-serif text-sm font-semibold">Catálogo 2026</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="/catalogos/pistas-tarimas.pdf"
              download="Catalogo-Pistas-Tarimas-Bodasesor-2026.pdf"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-serif text-sm font-semibold transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Descargar PDF
            </a>
            <a
              href={waMsg}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-4 py-2 rounded-lg font-serif text-sm font-bold transition-colors"
            >
              <WaSvg /> Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* PDF embed — full height */}
      <div className="flex-1 w-full" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <iframe
          src="/catalogos/pistas-tarimas.pdf#view=FitH"
          title="Catálogo Pistas y Tarimas 2026 – Bodasesor"
          className="w-full h-full border-0"
          style={{ minHeight: 'calc(100vh - 120px)' }}
        />
      </div>

      {/* Footer CTA */}
      <div className="bg-[#0d1630] px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-white/60 font-serif text-sm">
            ¿Alguna duda? Nuestros asesores están listos para ayudarte
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a href="tel:5215540080373"
              className="flex items-center gap-2 border border-white/20 text-white px-4 py-2 rounded-lg font-serif text-sm hover:bg-white/10 transition-colors">
              Llamar ahora
            </a>
            <a href={waMsg} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-4 py-2 rounded-lg font-serif text-sm font-bold transition-colors">
              <WaSvg /> Cotizar
            </a>
            <Link href="/pistas-tarimas"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-serif text-sm transition-colors">
              Ver productos individuales
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
