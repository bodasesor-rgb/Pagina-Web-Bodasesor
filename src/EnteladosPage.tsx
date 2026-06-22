import { Link } from "wouter";
import { ENTELADOS } from "@/data/entelados-products";
import { useCity } from "@/context/CityContext";

const WA_BASE = "https://wa.me/5215540080373?text=";
const waGeneral = WA_BASE + encodeURIComponent("Hola, me interesa cotizar un entelado para techo para mi evento. ¿Me pueden dar información?");

export default function EnteladosPage() {
  const { city } = useCity();
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#162040] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-6 font-serif">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-white/80">Entelados para Techo</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              Entelados para Techo{city ? ` en ${city.name}` : ''}
            </h1>
            <p className="text-white/70 font-serif text-lg mb-4">
              Decoración que transforma espacios. Tela tensada o drapeada con diferentes técnicas artísticas que crean ambientes únicos de alto impacto visual.
            </p>
            <p className="text-white/50 font-serif text-sm mb-8">
              Se adapta a salones, haciendas, jardines y espacios al aire libre. Cotizado por metro cuadrado del área a cubrir.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={waGeneral} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-3 h-80">
              <div className="rounded-2xl overflow-hidden bg-[#0d1630]">
                <img src="/images/entelados/sencillo-1.jpg" alt="Entelado Sencillo" className="w-full h-full object-cover opacity-90" />
              </div>
              <div className="rounded-2xl overflow-hidden bg-[#0d1630]">
                <img src="/images/entelados/completo-1.jpg" alt="Entelado Completo" className="w-full h-full object-cover opacity-90" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#f5efe8] border-b border-[#162040]/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 text-sm font-serif text-[#162040]/70">
          <span><strong className="text-[#162040]">4</strong> estilos disponibles</span>
          <span>•</span>
          <span>Cotizado por m²</span>
          <span>•</span>
          <span>Blanco, marfil, champagne y colores a petición</span>
          <span>•</span>
          <span>Instalación profesional incluida</span>
        </div>
      </div>

      {/* ¿Qué es? */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/40 mb-2">¿Qué es?</p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#162040] mb-4">Decoración de techo que transforma cualquier espacio</h2>
          <p className="text-gray-600 font-serif leading-relaxed max-w-2xl mx-auto">
            Un entelado es la decoración del techo usando tela tensada o drapeada con diferentes técnicas artísticas. Crea ambientes únicos de alto impacto visual y se adapta a cualquier salón, hacienda o espacio al aire libre. Se cotiza por metro cuadrado del área a cubrir.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: '✦', title: 'Transforma cualquier espacio', desc: 'Salones, haciendas, jardines y espacios al aire libre.' },
              { icon: '✦', title: 'Personalizable en color y estilo', desc: 'Blanco, marfil, champagne y colores a petición.' },
              { icon: '✦', title: 'Cotizado por metro cuadrado', desc: 'Precio justo y transparente según el área real.' },
            ].map(f => (
              <div key={f.title} className="bg-[#f5efe8] rounded-2xl p-5 text-left">
                <p className="text-[#162040]/30 font-serif text-lg mb-2">{f.icon}</p>
                <p className="font-serif font-bold text-[#162040] text-sm mb-1">{f.title}</p>
                <p className="font-serif text-xs text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 estilos */}
      <section className="py-12 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/40 mb-2">Catálogo</p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#162040]">Nuestros 4 estilos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ENTELADOS.map(estilo => (
              <div key={estilo.slug}
                className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-xl transition-all duration-300">
                <Link href={`/entelados/${estilo.slug}`}>
                  <div className="h-52 overflow-hidden bg-gray-100">
                    <img src={estilo.img} alt={estilo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </Link>
                <div className="p-5">
                  <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/40 mb-1">Estilo</p>
                  <h3 className="font-serif font-bold text-[#162040] text-base mb-1">{estilo.name}</h3>
                  <p className="font-serif text-gray-500 text-xs mb-3 leading-relaxed">{estilo.tagline}</p>
                  <p className="font-serif text-gray-400 text-xs mb-4 leading-relaxed line-clamp-3">{estilo.short}</p>
                  <div className="flex gap-2">
                    <Link href={`/entelados/${estilo.slug}`}
                      className="flex-1 text-center text-xs font-serif font-semibold text-[#162040] border border-[#162040]/20 py-2 rounded-lg hover:bg-[#f5efe8] transition-colors">
                      Ver detalle
                    </Link>
                    <a href={WA_BASE + encodeURIComponent(`Hola, me interesa cotizar un ${estilo.name} para mi evento.`)}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center text-xs font-serif font-semibold text-white bg-[#25D366] hover:bg-green-500 py-2 rounded-lg transition-colors">
                      Cotizar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complemento esferas */}
      <section className="py-12 px-4 bg-[#f5efe8]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 border border-[#162040]/8">
            <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
              <img src="/images/entelados/page-08.jpg" alt="Esferas decorativas" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/40 mb-1">Complemento</p>
              <h3 className="font-serif font-bold text-[#162040] text-xl mb-2">Esferas Decorativas</h3>
              <p className="font-serif text-gray-500 text-sm leading-relaxed mb-3">
                Esferas en acabado dorado, plateado o cromado (espejo). Se rentan de forma independiente al paquete de entelado y son combinables con cualquier estilo. La cantidad se determina según el diseño y tamaño del espacio.
              </p>
              <a href={waGeneral} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-serif font-semibold text-[#25D366] hover:underline">
                Cotizar esferas + entelado →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo cotizar */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/40 mb-2">Simple y transparente</p>
          <h2 className="text-2xl font-serif font-bold text-[#162040] mb-8">¿Cómo se cotiza?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Mide tu espacio', desc: 'Largo × ancho del área a cubrir = metros cuadrados totales.' },
              { n: '2', title: 'Elige tu estilo', desc: 'Sencillo, A Media, Completo o Con Luz. Cada uno con su propio nivel de elaboración.' },
              { n: '3', title: 'Agrega extras', desc: 'Suma las esferas decorativas que desees. Se cotizan por separado.' },
            ].map(step => (
              <div key={step.n} className="bg-[#f5efe8] rounded-2xl p-6 text-left">
                <div className="w-10 h-10 rounded-full bg-[#162040] text-white font-serif font-bold text-lg flex items-center justify-center mb-4">
                  {step.n}
                </div>
                <h3 className="font-serif font-bold text-[#162040] mb-2">{step.title}</h3>
                <p className="font-serif text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#162040] py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            ¿Listo para transformar tu techo?
          </h2>
          <p className="text-white/70 font-serif mb-8">
            Cotización personalizada en menos de 24 horas. Instalación profesional incluida.
          </p>
          <a href={waGeneral} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Cotizar mi entelado
          </a>
        </div>
      </section>

    </div>
  );
}
