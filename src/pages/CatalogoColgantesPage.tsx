import { useEffect } from "react";
import { useLocation } from "wouter";
import CityLink from "../components/CityLink";
const Link = CityLink;

const WA_MSG = "https://wa.me/5215540080373?text=" + encodeURIComponent("Hola, me interesa cotizar un colgante premium para mi evento. ¿Pueden enviarme más información?");

export default function CatalogoColgantesPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    document.title = "Catálogo Colgantes 2026 | Bodasesor";
  }, []);

  return (
    <div className="min-h-screen bg-[#f5efe8] flex flex-col">

      <div className="bg-[#162040] px-4 py-3 flex items-center justify-between">
        <nav className="flex items-center gap-2 text-xs text-white/60 font-serif">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/colgantes" className="hover:text-white transition-colors">Colgantes Premium</Link>
          <span>/</span>
          <span className="text-white/90">Catálogo 2026</span>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLocation("/colgantes")}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-serif px-4 py-2 rounded-lg transition-colors"
          >
            Ver catálogo interactivo
          </button>
          <a href={WA_MSG} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-green-500 text-white text-xs font-serif px-4 py-2 rounded-lg transition-colors font-bold">
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#162040] mb-4">
          Catálogo de Colgantes 2026
        </h1>
        <p className="text-gray-600 font-serif text-lg max-w-xl mb-8">
          Descubre nuestra colección de colgantes premium para transformar cualquier espacio en tu evento.
        </p>
        <Link
          href="/colgantes"
          className="inline-flex items-center gap-2 bg-[#162040] hover:bg-[#1a2a52] text-white px-8 py-4 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105"
        >
          Ver catálogo completo
        </Link>
      </div>

    </div>
  );
}
