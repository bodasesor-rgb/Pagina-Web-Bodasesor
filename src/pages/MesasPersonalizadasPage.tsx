import CityLink from "../components/CityLink";
const Link = CityLink;
import { useCity } from "../context/CityContext";

const WA = "https://wa.me/5215540080373?text=";
const waGeneral = WA + encodeURIComponent("Hola, me interesa cotizar una mesa personalizada o decoración de alimentos para mi evento. ¿Me pueden dar información?");

const ITEMS = [
  {
    name: "Mesa de Dulces",
    href: "/mesa-dulces",
    tag: "Mesa candy bar decorada con dulces artesanales, paletas, chocolates y golosinas temáticas para cualquier evento",
    icon: "🍬",
    img: "/images/productos/mesa-dulces.png",
    highlight: "La más solicitada",
  },
  {
    name: "Mesa de Postres",
    href: "/mesa-postres",
    tag: "Mesa de postres gourmet con pasteles miniatura, macarons, cheesecakes y bocados dulces de autor",
    icon: "🎂",
    img: "/images/productos/mesa-postres.png",
    highlight: null,
  },
  {
    name: "Mesa de Quesos",
    href: "/mesa-quesos",
    tag: "Tabla de quesos y charcutería con quesos nacionales e importados, frutos, mermeladas y panes artesanales",
    icon: "🧀",
    img: "/images/productos/mesa-quesos.png",
    highlight: "Perfecta para bodas",
  },
  {
    name: "Cupcakes Gourmet",
    href: "/cupcakes-gourmet",
    tag: "Cupcakes decorados a mano con buttercream de colores personalizados según la temática de tu evento",
    icon: "🧁",
    img: "/images/productos/cupcakes-gourmet.png",
    highlight: null,
  },
  {
    name: "Carrito de Snacks",
    href: "/carrito-snacks",
    tag: "Carrito decorado con palomitas, chips, cacahuates y snacks para darle un toque diferente a tu celebración",
    icon: "🍿",
    img: "/images/productos/carrito-snacks.png",
    highlight: null,
  },
];

export default function MesasPersonalizadasPage() {
  const { city } = useCity();

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#162040] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <nav className="flex items-center gap-2 text-xs text-[#8a9bb5] mb-6 font-serif">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-white/80">Mesas Personalizadas</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              Mesas Personalizadas{city ? ` en ${city.name}` : ''}
            </h1>
            <p className="text-white/70 font-serif text-lg mb-4">
              Mesas candy bar, de postres gourmet, charcutería y más — decoradas a la perfección para complementar tu evento y deleitar a tus invitados.
            </p>
            <p className="text-[#8a9bb5] font-serif text-sm mb-8">
              {ITEMS.length} opciones disponibles. Cada mesa se personaliza con los colores y temática de tu evento.
            </p>
            <a href={waGeneral} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Cotizar mesa personalizada
            </a>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-3 h-64">
            {ITEMS.slice(0, 4).map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-[#0d1630]">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-80"
                  onError={e => { (e.target as HTMLImageElement).src = '/images/galeria-1.png'; }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-[#f5efe8] border-b border-[#162040]/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 text-sm font-serif text-gray-600">
          <span><strong className="text-[#162040]">{ITEMS.length}</strong> tipos de mesas</span>
          <span>•</span>
          <span>Diseño personalizado</span>
          <span>•</span>
          <span>Montaje incluido</span>
          <span>•</span>
          <span>Combinables entre sí</span>
        </div>
      </div>

      {/* Cards principales */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/75 mb-2">Nuestro catálogo</p>
            <h2 className="text-3xl font-serif font-bold text-[#162040]">
              Elige tu mesa ideal
            </h2>
            <p className="text-gray-600 font-serif mt-2 max-w-xl mx-auto">
              Cada mesa se decora con los colores de tu evento y puede combinarse con otros servicios para una experiencia completa.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ITEMS.map(item => (
              <MesaCard key={item.href} {...item} city={city?.name} />
            ))}
          </div>
        </div>
      </section>

      {/* Por qué Bodasesor */}
      <section className="bg-[#f5efe8] py-14 px-4">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="text-2xl font-serif font-bold text-[#162040] mb-3">¿Por qué elegirnos para tu mesa?</h2>
          <p className="text-gray-600 font-serif">Nos encargamos de todo: diseño, decoración, surtido y montaje para que tú solo disfrutes tu evento.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: '🎨', title: 'Diseño personalizado', desc: 'Paleta de colores y temática acordes a tu evento' },
            { icon: '🛒', title: 'Ingredientes frescos', desc: 'Dulces y alimentos de la mejor calidad y frescura' },
            { icon: '🚚', title: 'Montaje incluido', desc: 'Llegamos, instalamos y recogemos todo al final' },
            { icon: '📸', title: 'Fotografiable', desc: 'Diseñadas para ser el punto focal y mejor foto del evento' },
          ].map(f => (
            <div key={f.title} className="text-center">
              <span className="text-3xl">{f.icon}</span>
              <h3 className="font-serif font-bold text-[#162040] text-sm mt-2 mb-1">{f.title}</h3>
              <p className="font-serif text-xs text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#162040] py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            Diseñemos tu mesa juntos
          </h2>
          <p className="text-white/70 font-serif mb-8">
            Cuéntanos la temática, colores y número de invitados — te enviamos propuesta en menos de 24 horas.
          </p>
          <a href={waGeneral} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 py-4 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Cotizar por WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}

function MesaCard({ name, href, tag, icon, img, highlight, city }: {
  name: string; href: string; tag: string; icon: string; img: string; highlight: string | null; city?: string;
}) {
  const waMsg = WA + encodeURIComponent(`Hola, me interesa cotizar "${name}"${city ? ` en ${city}` : ''} para mi evento.`);
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-xl transition-all duration-300 flex flex-col relative">
      {highlight && (
        <div className="absolute top-3 right-3 z-10 bg-[#162040] text-white text-[10px] font-serif font-bold px-2.5 py-1 rounded-full">
          {highlight}
        </div>
      )}
      <Link href={href}>
        <div className="h-52 overflow-hidden bg-[#f5efe8] relative">
          <img src={img} alt="" width={400} height={208} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { (e.target as HTMLImageElement).src = '/images/galeria-1.png'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className="absolute bottom-3 left-3 text-3xl">{icon}</span>
        </div>
      </Link>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-serif font-bold text-[#162040] text-base mb-2">
          {name}{city ? ` en ${city}` : ''}
        </h3>
        <p className="font-serif text-gray-600 text-sm mb-5 leading-relaxed flex-1">{tag}</p>
        <div className="flex gap-2">
          <Link href={href}
            className="flex-1 text-center text-sm font-serif font-semibold text-[#162040] border border-[#162040]/20 py-2.5 rounded-xl hover:bg-[#f5efe8] transition-colors">
            Ver detalle
          </Link>
          <a href={waMsg} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-sm font-serif font-semibold text-white bg-[#0d6849] hover:bg-[#0a5740] py-2.5 rounded-xl transition-colors">
            Cotizar
          </a>
        </div>
      </div>
    </div>
  );
}
