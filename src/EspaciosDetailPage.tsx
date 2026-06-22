import { Link } from "wouter";
import { useCity } from "@/context/CityContext";
import { ESPACIOS } from "@/data/espacios-products";

const WA_BASE = "https://wa.me/5215540080373?text=";

export default function EspaciosDetailPage({ slug }: { slug?: string }) {
  const { city } = useCity();
  const product = ESPACIOS.find(p => p.slug === slug);
  if (!product) return <div className="min-h-screen flex items-center justify-center font-serif text-[#162040]">Espacio no encontrado.</div>;

  const others = ESPACIOS.filter(p => p.slug !== slug);
  const waMsg = WA_BASE + encodeURIComponent(`Hola, me interesa conocer más sobre sus ${product.name} para mi evento. ¿Tienen disponibilidad?`);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f5efe8] border-b border-[#162040]/10 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 font-serif text-xs text-[#162040]/50">
          <Link href="/" className="hover:text-[#162040]">Inicio</Link><span>/</span>
          <Link href="/espacios-eventos" className="hover:text-[#162040]">Espacios para Eventos</Link><span>/</span>
          <span className="text-[#162040]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="rounded-2xl overflow-hidden bg-[#f5efe8] h-96 lg:h-auto">
            {product.img ? (
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#162040]/20 font-serif text-8xl">⬡</div>
            )}
          </div>
          <div>
            <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/40 mb-2">Espacios para Eventos</p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#162040] mb-2">{product.name}{city ? ` en ${city.name}` : ''}</h1>
            <p className="font-serif text-[#162040]/60 italic mb-6">{product.tagline}</p>
            <p className="font-serif text-gray-600 leading-relaxed mb-8">{product.desc}</p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-serif font-bold text-[#162040] text-sm mb-3 uppercase tracking-wide">Características</h3>
                <ul className="space-y-2">
                  {product.incluye.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-serif text-sm text-gray-600">
                      <span className="text-[#162040]/40 mt-0.5">◎</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#162040] text-sm mb-3 uppercase tracking-wide">Ideal para</h3>
                <ul className="space-y-2">
                  {product.idealPara.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-serif text-sm text-gray-600">
                      <span className="text-[#162040]/40 mt-0.5">✦</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a href={waMsg} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold font-serif text-lg w-full justify-center transition-all duration-300 hover:scale-105">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Consultar disponibilidad
            </a>
          </div>
        </div>

        {others.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#162040] mb-6">Otros espacios disponibles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {others.map(p => (
                <Link key={p.slug} href={`/espacios-eventos/${p.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-lg transition-all">
                  <div className="h-48 overflow-hidden bg-[#f5efe8]">
                    {p.img && <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-[#162040] text-sm mb-1">{p.name}</h3>
                    <p className="font-serif text-gray-400 text-xs italic">{p.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
