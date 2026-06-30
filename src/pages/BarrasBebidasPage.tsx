import CityLink from "../components/CityLink";
const Link = CityLink;
import { useCity } from "../context/CityContext";

const WA = "https://wa.me/5215540080373?text=";
const waGeneral = WA + encodeURIComponent("Hola, me interesa cotizar una barra de bebidas para mi evento. ¿Me pueden dar información?");

const ITEMS = [
  {
    name: "Barra de Bebidas",
    href: "/barra-bebidas",
    tag: "Barras de aguas frescas, refrescos, jugos naturales y bebidas personalizadas para tus invitados",
    icon: "🥤",
    img: "/images/productos/barra-bebidas.png",
  },
  {
    name: "Barra de Mocteles",
    href: "/barra-mocteles",
    tag: "Bebidas sin alcohol inspiradas en cócteles clásicos: presentación elegante y sabores únicos para todos",
    icon: "🍹",
    img: "/images/productos/barra-mocteles.png",
  },
  {
    name: "Cocteles y Mixología",
    href: "/cocteles-mixologia",
    tag: "Bartenders profesionales con carta de cócteles artesanales y show de flairytending para tus invitados",
    icon: "🍸",
    img: "/images/productos/cocteles-mixologia.png",
  },
  {
    name: "Barra de Café Premium",
    href: "/barra-cafe-premium",
    tag: "Barista certificado, máquina espresso profesional, café de especialidad y bebidas calientes gourmet",
    icon: "☕",
    img: "/images/productos/barra-cafe-premium.png",
  },
  {
    name: "Paletas y Helados",
    href: "/paletas-helados",
    tag: "Carrito de paletas artesanales, helados y nieves para refrescar a tus invitados con variedad de sabores",
    icon: "🧁",
    img: "/images/productos/paletas-helados.png",
  },
];

export default function BarrasBebidasPage() {
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
              <span className="text-white/80">Barras de Bebidas</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              Barras de Bebidas{city ? ` en ${city.name}` : ''}
            </h1>
            <p className="text-white/70 font-serif text-lg mb-4">
              Desde barras de aguas frescas hasta bartenders de mixología premium — todo para mantener a tus invitados bien servidos durante tu evento.
            </p>
            <p className="text-white/50 font-serif text-sm mb-8">
              {ITEMS.length} opciones disponibles. Con y sin alcohol, café de especialidad y carritos de helado.
            </p>
            <a href={waGeneral} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Cotizar barra de bebidas
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
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 text-sm font-serif text-[#162040]/70">
          <span><strong className="text-[#162040]">{ITEMS.length}</strong> opciones de barras</span>
          <span>•</span>
          <span>Con y sin alcohol</span>
          <span>•</span>
          <span>Bartenders certificados</span>
          <span>•</span>
          <span>Montaje incluido</span>
        </div>
      </div>

      {/* SEO Description */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-4 font-serif text-gray-600 text-sm leading-relaxed">
          <p>
            Las <strong>barras de bebidas para eventos</strong> son un elemento fundamental para la experiencia de tus invitados. Ofrecemos <strong>barra de aguas frescas artesanales</strong>, <strong>barra de mocteles sin alcohol</strong>, <strong>coctelería y mixología premium</strong> con bartenders certificados, <strong>café de especialidad con barista</strong> y <strong>carritos de paletas y helados artesanales</strong>. Cada barra incluye montaje, cristalería o vajilla desechable premium, decoración y desmontaje.
          </p>
          <p>
            Nuestro servicio de <strong>open bar para bodas</strong> y eventos sociales puede combinar diferentes barras en un solo paquete: bebidas sin alcohol para niños y conductores, coctelería para adultos y café para los postres. El <strong>show de flair bartending</strong> es una opción espectacular que entretiene a tus invitados mientras disfrutan de sus bebidas.
          </p>
          <p>
            También atendemos <strong>barras de café para eventos corporativos</strong>, desayunos de trabajo y coffee breaks. Nuestros baristasutilizan máquinas de espresso profesionales y café de especialidad de origen. Solicita tu cotización y dinos el número de invitados, la duración del evento y los tipos de bebida que prefieres.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section className="py-8 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {ITEMS.map(item => (
              <a key={item.href} href={`#${item.href.slice(1)}`}
                className="flex items-center gap-2 bg-[#f5efe8] border border-[#162040]/10 rounded-full px-4 py-2 font-serif text-sm text-[#162040] hover:border-[#162040]/30 hover:shadow-sm transition-all">
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ITEMS.map(item => (
              <BebidaCard key={item.href} {...item} city={city?.name} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#162040] py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            ¿Qué bebidas quieres en tu evento?
          </h2>
          <p className="text-white/70 font-serif mb-8">
            Podemos combinar varias barras en un solo paquete. Cotización personalizada en menos de 24 horas.
          </p>
          <a href={waGeneral} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Solicitar cotización
          </a>
        </div>
      </section>

    </div>
  );
}

function BebidaCard({ name, href, tag, icon, img, city }: {
  name: string; href: string; tag: string; icon: string; img: string; city?: string;
}) {
  const waMsg = WA + encodeURIComponent(`Hola, me interesa cotizar "${name}"${city ? ` en ${city}` : ''} para mi evento.`);
  return (
    <div id={href.slice(1)} className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-xl transition-all duration-300 flex flex-col">
      <Link href={href}>
        <div className="h-52 overflow-hidden bg-[#f5efe8] relative">
          <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { (e.target as HTMLImageElement).src = '/images/galeria-1.png'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className="absolute bottom-3 left-3 text-3xl">{icon}</span>
        </div>
      </Link>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-serif font-bold text-[#162040] text-base mb-2">
          {name}{city ? ` en ${city}` : ''}
        </h3>
        <p className="font-serif text-gray-500 text-sm mb-5 leading-relaxed flex-1">{tag}</p>
        <div className="flex gap-2">
          <Link href={href}
            className="flex-1 text-center text-sm font-serif font-semibold text-[#162040] border border-[#162040]/20 py-2.5 rounded-xl hover:bg-[#f5efe8] transition-colors">
            Ver detalle
          </Link>
          <a href={waMsg} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-sm font-serif font-semibold text-white bg-[#25D366] hover:bg-green-500 py-2.5 rounded-xl transition-colors">
            Cotizar
          </a>
        </div>
      </div>
    </div>
  );
}
