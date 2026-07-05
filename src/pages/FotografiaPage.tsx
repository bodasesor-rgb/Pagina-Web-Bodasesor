import CityLink from "../components/CityLink";
const Link = CityLink;
import { FOTOGRAFIA } from "../data/fotografia-products";
import type { FotografiaProduct } from "../data/fotografia-products";
import { useCity } from "../context/CityContext";

const WA_BASE = "https://wa.me/5215540080373?text=";
const waGeneral = WA_BASE + encodeURIComponent("Hola, me interesa cotizar fotografía y video para mi evento. ¿Me pueden dar información?");

export default function FotografiaPage() {
  const { city } = useCity();
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#162040] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#8a9bb5] mb-3">Bodasesor Eventos</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">Fotografía y Video{city ? ` en ${city.name}` : ''}</h1>
            <p className="text-white/70 font-serif text-lg mb-4">Fotógrafo, cámara 360°, cabinas de fotos, Magic Mirror, Vogue, pantalla verde, Hollywood Photo Booth y producción de video.</p>
            <p className="text-[#8a9bb5] font-serif text-sm mb-8">{FOTOGRAFIA.length} opciones disponibles. Para que cada momento quede capturado a la perfección.</p>
            <a href={waGeneral} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Cotizar fotografía y video
            </a>
          </div>
          <div className="hidden lg:grid grid-cols-3 gap-3 h-56">
            {FOTOGRAFIA.slice(0, 3).map(p => (
              <div key={p.slug} className="rounded-xl overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 py-4">
          <div className="max-w-7xl mx-auto px-4 flex gap-6 text-[#8a9bb5] font-serif text-xs">
            <span>Fotógrafos certificados</span><span>•</span><span>Equipos de última generación</span><span>•</span><span>Entrega digital</span>
          </div>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-2xl text-[#162040]/30 font-serif">⬡</span>
            <div>
              <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/75">Catálogo</p>
              <h2 className="text-2xl font-serif font-bold text-[#162040]">Servicios de Fotografía y Video</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOTOGRAFIA.map(p => <FotoCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#162040] py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">¿Cuál servicio es para tu evento?</h2>
          <p className="text-white/70 font-serif mb-8">Cotización en menos de 24 horas. También podemos armar un paquete combinado.</p>
          <a href={waGeneral} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 py-4 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Cotizar fotografía y video
          </a>
        </div>
      </section>
    </div>
  );
}

function FotoCard({ product }: { product: FotografiaProduct }) {
  const waMsg = WA_BASE + encodeURIComponent(`Hola, me interesa cotizar "${product.name}" para mi evento.`);
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-xl transition-all duration-300">
      <Link href={`/fotografia/${product.slug}`}>
        <div className="h-44 overflow-hidden bg-[#f5efe8]">
          {product.img ? <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="w-full h-full flex items-center justify-center text-[#162040]/20 font-serif text-5xl">⬡</div>}
        </div>
      </Link>
      <div className="p-4">
        <h3 className="font-serif font-bold text-[#162040] text-sm mb-1">{product.name}</h3>
        <p className="font-serif text-gray-600 text-xs mb-3 italic">{product.tagline}</p>
        <p className="font-serif text-gray-600 text-xs mb-4 leading-relaxed line-clamp-2">{product.short}</p>
        <div className="flex gap-2">
          <Link href={`/fotografia/${product.slug}`} className="flex-1 text-center text-xs font-serif font-semibold text-[#162040] border border-[#162040]/20 py-2 rounded-lg hover:bg-[#f5efe8] transition-colors">Ver detalle</Link>
          <a href={waMsg} target="_blank" rel="noopener noreferrer" className="flex-1 text-center text-xs font-serif font-semibold text-white bg-[#0d6849] hover:bg-[#0a5740] py-2 rounded-lg transition-colors">Cotizar</a>
        </div>
      </div>
    </div>
  );
}
