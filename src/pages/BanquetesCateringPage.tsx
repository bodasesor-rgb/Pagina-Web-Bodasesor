import CityLink from "../components/CityLink";
const Link = CityLink;
import { useCity } from "../context/CityContext";

const WA = "https://wa.me/5215540080373?text=";
const waGeneral = WA + encodeURIComponent("Hola, me interesa cotizar un servicio de banquetes o catering para mi evento. ¿Me pueden dar información?");
const waLink = (name: string) => WA + encodeURIComponent(`Hola, me interesa cotizar "${name}" para mi evento.`);

const CATEGORIES = [
  {
    id: "banquetes",
    label: "Banquetes",
    icon: "🍽️",
    desc: "Alta cocina servida a la mesa con chefs ejecutivos, meseros y vajilla premium.",
    bg: "bg-white",
    items: [
      { name: "Banquete Formal",    href: "/banquetes",         tag: "Gastronomía de lujo para tu celebración más importante",         img: "/images/banquete-hero.png" },
      { name: "Banquete Kosher",    href: "/banquete-kosher",   tag: "Certificación rabínica, ingredientes kosher y menús tradicionales",img: "/images/banquete-kosher-hero.png" },
      { name: "Banquete Mexicano",  href: "/banquete-mexicano", tag: "Recetas regionales auténticas con técnicas contemporáneas",       img: "/images/banquete-mexicano-hero.png" },
      { name: "Banquete Navideño",  href: "/banquete-navideno", tag: "Cena de gala navideña para posadas y fiestas de fin de año",      img: "/images/banquete-navideno-hero.png" },
    ],
  },
  {
    id: "catering",
    label: "Catering",
    icon: "👨‍🍳",
    desc: "Platillos gourmet preparados en sitio para todo tipo de evento.",
    bg: "bg-[#f5efe8]/40",
    items: [
      { name: "Pozole y Tostadas",   href: "/pozole-tostadas",   tag: "Pozole rojo, blanco y verde con todos los acompañantes",      img: "/images/productos/pozole-tostadas.png" },
      { name: "Paella",              href: "/paella",             tag: "Paella española auténtica cocinada en vivo con mariscos",      img: "/images/productos/paella.png" },
      { name: "Comida Corrida",      href: "/comida-corrida",     tag: "Menú del día completo para comedores y eventos de empresa",    img: "/images/empresas/comida-corrida.png" },
      { name: "Coffee Break",        href: "/coffee-break",       tag: "Café de especialidad, pastelería y snacks para corporativos",  img: "/images/empresas/coffee-break.png" },
      { name: "Bocadillos",          href: "/bocadillos",         tag: "Bocadillos gourmet para cócteles y recepciones elegantes",     img: "/images/productos/bocadillos.png" },
      { name: "Canapés Premium",     href: "/canapes-premium",    tag: "Canapés de autor para bodas y eventos de lujo",               img: "/images/productos/canapes-premium.png" },
      { name: "Desayuno Social",     href: "/desayuno-social",    tag: "Brunch y desayunos para eventos matutinos y corporativos",     img: "/images/productos/desayuno-social.png" },
    ],
  },
  {
    id: "alimentos",
    label: "Barras de Alimentos",
    icon: "🥗",
    desc: "Estaciones temáticas de comida preparada al momento frente a tus invitados.",
    bg: "bg-white",
    items: [
      { name: "Barra de Crepas",            href: "/barra-crepas",   tag: "Crepas dulces y saladas preparadas al momento",                img: "/images/productos/barra-crepas.png" },
      { name: "Barra de Sushi y Poke Bowl", href: "/barra-sushi",    tag: "Sushi rolls, nigiri y poke bowls con chef japonés",            img: "/images/productos/barra-sushi.png" },
      { name: "Barra de Mariscos",          href: "/barra-mariscos", tag: "Cocteles de camarón, ostiones y ceviche fresco",               img: "/images/productos/barra-mariscos.png" },
      { name: "Barra de Paninis",           href: "/barra-paninis",  tag: "Paninis artesanales con pan fresco e ingredientes gourmet",    img: "/images/productos/barra-paninis.png" },
      { name: "Barra de Pastas",            href: "/barra-pastas",   tag: "Pastas italianas preparadas al momento con diferentes salsas", img: "/images/productos/barra-pastas.png" },
      { name: "Barra de Pizzas",            href: "/barra-pizzas",   tag: "Pizzas artesanales al horno con variedad de ingredientes",     img: "/images/productos/barra-pizzas.png" },
      { name: "Barra Americana",            href: "/barra-americana",tag: "Hamburguesas, hot dogs y papas para eventos y fiestas",        img: "/images/productos/barra-americana.png" },
      { name: "Barra Yucateca",             href: "/barra-yucateca", tag: "Cochinita pibil, salbutes y panuchos auténticos yucatecos",    img: "/images/productos/barra-yucateca.png" },
    ],
  },
  {
    id: "estaciones",
    label: "Estaciones",
    icon: "🔥",
    desc: "Puestos y estaciones de comida típica mexicana cocinada en vivo.",
    bg: "bg-[#f5efe8]/40",
    items: [
      { name: "Parrillada Argentina",    href: "/parrillada-argentina",    tag: "Cortes premium a la parrilla con asadores profesionales",       img: "/images/productos/parrillada-argentina.png" },
      { name: "Parrillada Tradicional",  href: "/parrillada-tradicional",  tag: "Parrillada mexicana para reuniones familiares y eventos",       img: "/images/productos/parrillada-tradicional.png" },
      { name: "Taquiza de Guisados",     href: "/taquiza-guisados",        tag: "Variedad de guisados auténticos servidos en tortilla",          img: "/images/productos/taquiza-guisados.png" },
      { name: "Puestos de Antojitos",    href: "/puestos-antojitos",       tag: "Tacos, sopes, gorditas y más antojitos mexicanos",              img: "/images/productos/puestos-antojitos.png" },
      { name: "Puestos de Quesadillas",  href: "/puestos-quesadillas",     tag: "Quesadillas de tortilla azul o blanca con variedad de rellenos",img: "/images/productos/puestos-quesadillas.png" },
      { name: "Carrito de Snacks",       href: "/carrito-snacks",          tag: "Carrito de snacks dulces y salados para eventos y fiestas",     img: "/images/productos/carrito-snacks.png" },
    ],
  },
];

export default function BanquetesCateringPage() {
  const { city } = useCity();
  const total = CATEGORIES.reduce((s, c) => s + c.items.length, 0);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#162040] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <nav className="flex items-center gap-2 text-xs text-[#8a9bb5] mb-6 font-serif">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-white/80">Banquetes y Catering</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              Banquetes y Catering{city ? ` en ${city.name}` : ''}
            </h1>
            <p className="text-white/70 font-serif text-lg mb-4">
              Desde banquetes formales de alta cocina hasta estaciones de antojitos mexicanos — todo el servicio de alimentos para tu evento en un solo catálogo.
            </p>
            <p className="text-[#8a9bb5] font-serif text-sm mb-8">
              {total} servicios disponibles. Banquetes formales, catering gourmet, barras de alimentos y estaciones temáticas.
            </p>
            <a href={waGeneral} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Cotizar servicio de alimentos
            </a>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-3 h-64">
            {["/images/banquete-hero.png", "/images/banquete-mexicano-hero.png", "/images/instagram/ig1.jpg", "/images/instagram/ig18.jpg"].map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-[#0d1630]">
                <img src={src} alt="" className="w-full h-full object-cover opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-[#f5efe8] border-b border-[#162040]/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 text-sm font-serif text-[#162040]/70">
          <span><strong className="text-[#162040]">{total}</strong> servicios disponibles</span>
          <span>•</span>
          <span>Banquetes, catering y estaciones</span>
          <span>•</span>
          <span>Chefs certificados</span>
          <span>•</span>
          <span>Cotización personalizada</span>
        </div>
      </div>

      {/* SEO Description */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-4 font-serif text-gray-600 text-sm leading-relaxed">
          <p>
            Nuestro servicio de <strong>banquetes y catering en México</strong> está diseñado para todo tipo de celebración: desde una íntima boda civil hasta una convención corporativa con cientos de comensales. Contamos con <strong>chefs ejecutivos certificados</strong>, menús personalizados y logística completa de alimentos y bebidas para que tu evento sea perfecto desde el primer bocado hasta el último.
          </p>
          <p>
            Ofrecemos <strong>banquetes formales de alta cocina</strong>, <strong>catering gourmet servido en sitio</strong>, <strong>barras de alimentos temáticas</strong> y <strong>estaciones de comida mexicana</strong>. Cada propuesta incluye vajilla, meseros, chefs, montaje y desmontaje. Nuestros servicios de <strong>banquete para boda</strong>, <strong>banquete kosher</strong>, <strong>paella española</strong> y <strong>taquiza de guisados</strong> son los más solicitados en la Ciudad de México, Estado de México, Guadalajara y Monterrey.
          </p>
          <p>
            Ya sea que busques un <strong>catering para evento corporativo</strong>, un <strong>coffee break empresarial</strong>, una <strong>barra de sushi</strong> o una <strong>parrillada argentina</strong> para tu fiesta, tenemos la solución ideal. Cotizamos sin costo en menos de 24 horas con menú adaptado a tu número de invitados, tipo de evento y presupuesto.
          </p>
        </div>
      </section>

      {/* Categorías quick-nav */}
      <section className="py-8 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => (
              <a key={cat.id} href={`#${cat.id}`}
                className="bg-[#f5efe8] rounded-2xl p-5 hover:shadow-md transition-all border border-[#162040]/5 hover:border-[#162040]/20 text-center">
                <p className="text-3xl mb-2">{cat.icon}</p>
                <p className="font-serif font-bold text-[#162040] mb-1 text-sm">{cat.label}</p>
                <p className="font-serif text-xs text-gray-600 mb-2 hidden sm:block line-clamp-2">{cat.desc}</p>
                <p className="font-serif text-xs text-[#162040]/75 font-semibold">{cat.items.length} servicios →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Secciones por categoría */}
      {CATEGORIES.map((cat, ci) => (
        <section key={cat.id} id={cat.id} className={`py-12 px-4 ${cat.bg}`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/75">Categoría</p>
                <h2 className="text-2xl font-serif font-bold text-[#162040]">{cat.label}</h2>
                <p className="text-sm text-gray-600 font-serif">{cat.desc}</p>
              </div>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${cat.items.length >= 6 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
              {cat.items.map(item => (
                <ServiceCard key={item.href} name={item.name} href={item.href} tag={item.tag} img={item.img} city={city?.name} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-[#162040] py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">¿Qué servicio es para tu evento?</h2>
          <p className="text-white/70 font-serif mb-8">
            Cotización personalizada en menos de 24 horas. También podemos combinar varios servicios para tu evento.
          </p>
          <a href={waGeneral} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 py-4 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Cotizar para mi evento
          </a>
        </div>
      </section>

    </div>
  );
}

function ServiceCard({ name, href, tag, img, city }: { name: string; href: string; tag: string; img: string; city?: string }) {
  const waMsg = WA + encodeURIComponent(`Hola, me interesa cotizar "${name}"${city ? ` en ${city}` : ''} para mi evento.`);
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-xl transition-all duration-300">
      <Link href={href}>
        <div className="h-44 overflow-hidden bg-[#f5efe8]">
          <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { (e.target as HTMLImageElement).src = '/images/galeria-1.png'; }} />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="font-serif font-bold text-[#162040] text-sm mb-1">{name}{city ? ` en ${city}` : ''}</h3>
        <p className="font-serif text-gray-600 text-xs mb-4 leading-relaxed line-clamp-2">{tag}</p>
        <div className="flex gap-2">
          <Link href={href}
            className="flex-1 text-center text-xs font-serif font-semibold text-[#162040] border border-[#162040]/20 py-2 rounded-lg hover:bg-[#f5efe8] transition-colors">
            Ver detalle
          </Link>
          <a href={waMsg} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-xs font-serif font-semibold text-white bg-[#0d6849] hover:bg-[#0a5740] py-2 rounded-lg transition-colors">
            Cotizar
          </a>
        </div>
      </div>
    </div>
  );
}
