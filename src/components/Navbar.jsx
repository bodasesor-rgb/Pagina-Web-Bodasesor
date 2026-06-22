import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useCity } from "../context/CityContext";
import { CITY_MAP } from "../data/city-data";
import { salasNavItems, periquerasNavItems } from "../data/salas-periqueras-products";
import { pistasTarimasNavItems } from "../data/pistas-tarimas-products";
import { vajillasNavItems } from "../data/vajillas-products";
import { colgantesNavItems } from "../data/colgantes-products";
import { enteladosNavItems } from "../data/entelados-products";
import { carpasNavItems } from "../data/carpas-products";
import { floreriaNavItems } from "../data/floreria-products";
import { showsNavItems } from "../data/shows-products";
import { reposteriaNavItems } from "../data/reposteria-products";
import { weddingNavItems } from "../data/wedding-products";
import { musicaNavItems } from "../data/musica-products";
import { fotografiaNavItems } from "../data/fotografia-products";
import { empresasNavItems } from "../data/empresas-products";
import { espaciosNavItems } from "../data/espacios-products";
import { audioIluminacionNavGroups } from "../data/audio-iluminacion-products";

const WHATSAPP_NUMBER = "5215540080373";

// ─── Nav data ────────────────────────────────────────────────────────────────

const ciudades = [
  { name: 'Ciudad de México (CDMX)', href: '/ciudad-de-mexico', featured: true },
  { name: 'Estado de México', href: '/estado-de-mexico', featured: true },
  { name: 'Aguascalientes', href: '/aguascalientes' },
  { name: 'Cancún / Riviera Maya', href: '/cancun' },
  { name: 'Cuernavaca', href: '/cuernavaca' },
  { name: 'Guadalajara', href: '/guadalajara' },
  { name: 'León', href: '/leon' },
  { name: 'Los Cabos', href: '/los-cabos' },
  { name: 'Mérida', href: '/merida' },
  { name: 'Monterrey', href: '/monterrey' },
  { name: 'Morelia', href: '/morelia' },
  { name: 'Oaxaca', href: '/oaxaca' },
  { name: 'Pachuca', href: '/pachuca' },
  { name: 'Puebla', href: '/puebla' },
  { name: 'Puerto Vallarta', href: '/puerto-vallarta' },
  { name: 'Querétaro', href: '/queretaro' },
  { name: 'San Luis Potosí', href: '/san-luis-potosi' },
  { name: 'San Miguel de Allende', href: '/san-miguel-allende' },
  { name: 'Tijuana', href: '/tijuana' },
  { name: 'Toluca / Metepec', href: '/toluca' },
  { name: 'Torreón', href: '/torreon' },
  { name: 'Veracruz', href: '/veracruz' },
];


const cateringGroups = [
  {
    heading: 'Banquetes',
    href: '/banquetes-catering#banquetes',
    items: [
      { name: 'Banquete Formal', href: '/banquetes' },
      { name: 'Banquete Kosher', href: '/banquete-kosher' },
      { name: 'Banquete Mexicano', href: '/banquete-mexicano' },
      { name: 'Banquete Navideño', href: '/banquete-navideno' },
    ],
  },
  {
    heading: 'Catering',
    href: '/banquetes-catering#catering',
    items: [
      { name: 'Pozole y Tostadas', href: '/pozole-tostadas' },
      { name: 'Paella', href: '/paella' },
      { name: 'Comida Corrida', href: '/comida-corrida' },
      { name: 'Coffee Break', href: '/coffee-break' },
      { name: 'Bocadillos', href: '/bocadillos' },
      { name: 'Canapés Premium', href: '/canapes-premium' },
      { name: 'Desayuno Social', href: '/desayuno-social' },
    ],
  },
  {
    heading: 'Barras de Alimentos',
    href: '/banquetes-catering#alimentos',
    items: [
      { name: 'Barra de Crepas', href: '/barra-crepas' },
      { name: 'Barra de Sushi y Poke Bowl', href: '/barra-sushi' },
      { name: 'Barra de Mariscos', href: '/barra-mariscos' },
      { name: 'Barra de Paninis', href: '/barra-paninis' },
      { name: 'Barra de Pastas', href: '/barra-pastas' },
      { name: 'Barra de Pizzas', href: '/barra-pizzas' },
      { name: 'Barra Americana', href: '/barra-americana' },
      { name: 'Barra Yucateca', href: '/barra-yucateca' },
    ],
  },
  {
    heading: 'Estaciones',
    href: '/banquetes-catering#estaciones',
    items: [
      { name: 'Parrillada Argentina', href: '/parrillada-argentina' },
      { name: 'Parrillada Tradicional', href: '/parrillada-tradicional' },
      { name: 'Taquiza de Guisados', href: '/taquiza-guisados' },
      { name: 'Puestos de Antojitos', href: '/puestos-antojitos' },
      { name: 'Puestos de Quesadillas', href: '/puestos-quesadillas' },
      { name: 'Carrito de Snacks', href: '/carrito-snacks' },
    ],
  },
];

const bebidasItems = [
  { name: 'Barra de Bebidas', href: '/barra-bebidas' },
  { name: 'Barra de Mocteles', href: '/barra-mocteles' },
  { name: 'Cocteles y Mixología', href: '/cocteles-mixologia' },
  { name: 'Barra de Café Premium', href: '/barra-cafe-premium' },
  { name: 'Paletas y Helados', href: '/paletas-helados' },
];

const mesasItems = [
  { name: 'Mesa de Dulces', href: '/mesa-dulces' },
  { name: 'Mesa de Postres', href: '/mesa-postres' },
  { name: 'Mesa de Quesos', href: '/mesa-quesos' },
  { name: 'Cupcakes Gourmet', href: '/cupcakes-gourmet' },
  { name: 'Carrito de Snacks', href: '/carrito-snacks' },
];

const sillasNavItems = [
  { name: 'Silla Tiffany', href: '/sillas/tiffany' },
  { name: 'Silla Smith', href: '/sillas/smith' },
  { name: 'Silla Camila', href: '/sillas/camila' },
  { name: 'Silla Basket', href: '/sillas/basket' },
  { name: 'Silla Antonella', href: '/sillas/antonella' },
  { name: 'Silla Cabos', href: '/sillas/cabos' },
  { name: 'Silla Caroline', href: '/sillas/caroline' },
  { name: 'Silla María', href: '/sillas/maria' },
  { name: 'Silla Tolix', href: '/sillas/tolix' },
  { name: 'Silla Avant Garde', href: '/sillas/avant-garde' },
  { name: 'Silla Crossback', href: '/sillas/crossback' },
  { name: 'Silla Wishbone', href: '/sillas/wishbone' },
  { name: 'Silla Louis XV', href: '/sillas/louis-xv' },
  { name: 'Silla Mariantonieta', href: '/sillas/mariantonieta' },
  { name: 'Sillón de Novios', href: '/sillas/sillon-novios' },
  { name: 'Silla Ghost', href: '/sillas/ghost' },
  { name: 'Silla Gamma', href: '/sillas/gamma' },
  { name: 'Silla Tiffany Infantil', href: '/sillas/tiffany-infantil' },
];

const mesasNavItems = [
  { name: 'Mesa Redonda', href: '/mesas/redonda' },
  { name: 'Mesa Cuadrada', href: '/mesas/cuadrada' },
  { name: 'Tablón', href: '/mesas/tablon' },
  { name: 'Mesa Serpentina', href: '/mesas/serpentina' },
  { name: 'Mesa de Picnic', href: '/mesas/picnic' },
  { name: 'Tablón Infantil', href: '/mesas/tablon-infantil' },
];

const serviciosItems = [
  { name: 'Alimentos para Empresas', href: '/alimentos-empresas' },
  { name: 'Audio, Iluminación y Video', href: '/audio-iluminacion-video' },
  { name: 'Espacios para Eventos', href: '/espacios-eventos' },
  { name: 'Florería y Decoración', href: '/floreria' },
  { name: 'Fotografía y Video', href: '/fotografia' },
  { name: 'Inflables', href: '/inflables' },
  { name: 'Música', href: '/musica' },
  { name: 'Repostería', href: '/reposteria' },
  { name: 'Shows', href: '/shows' },
  { name: 'Wedding Planner', href: '/wedding-planner' },
];

const eventoItems = [
  { name: 'Baby Shower', href: '/baby-shower' },
  { name: 'Bodas', href: '/bodas' },
  { name: 'Cenas', href: '/cenas' },
  { name: 'Comidas', href: '/comidas' },
  { name: 'Corporativos', href: '/corporativos' },
  { name: 'Cumpleaños', href: '/cumpleanos' },
  { name: 'Desayunos', href: '/desayunos' },
  { name: 'Graduaciones', href: '/graduaciones' },
  { name: 'Lanzamientos', href: '/lanzamientos' },
  { name: 'Primera Comunión', href: '/primera-comunion' },
  { name: 'XV Años', href: '/xv-anos' },
];

// ─── Sort helper ─────────────────────────────────────────────────────────────
const byName = (a, b) =>
  a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
const sortItems = (arr) => [...arr].sort(byName);

// ─── Shared styles ────────────────────────────────────────────────────────────
const ddLink = "block px-4 py-1.5 text-sm font-bold font-serif text-gray-700 hover:text-[#162040] hover:bg-[#f5efe8] transition-colors rounded";
const ddHeading = "px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 font-serif";

// ─── City badge (own component so it always reads fresh context) ──────────────
function CityBadge() {
  const { city, setCity } = useCity();
  if (!city) return null;
  return (
    <button
      key={city.slug}
      onClick={() => setCity(null)}
      className="flex items-center gap-1 bg-white/15 hover:bg-white/25 text-white text-xs font-bold font-serif px-2.5 py-1 rounded-lg transition-colors"
      title="Cambiar ciudad"
    >
      📍 {city.short}
      <X className="w-2.5 h-2.5 opacity-60 ml-0.5" />
    </button>
  );
}

// ─── City-aware nav link (appends city.short to item names when city is set) ──

function NavItemLink({ name, href, className }) {
  const { city } = useCity();
  return <Link href={href} className={className ?? ddLink}>{city ? `${name} ${city.short}` : name}</Link>;
}

// ─── Text-only dropdown panels ────────────────────────────────────────────────

function SimpleDropdown({ items, align = "left", width = "w-52", overviewHref }) {
  const pos = align === 'right' ? 'right-0' : 'left-0';
  return (
    <div className={`absolute ${pos} mt-2 ${width} bg-white rounded-lg shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
      {overviewHref && (
        <>
          <Link href={overviewHref} className="block px-4 py-1.5 text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040] hover:bg-[#f5efe8] transition-colors rounded">
            Ver todos los servicios →
          </Link>
          <div className="border-t border-gray-100 my-1" />
        </>
      )}
      {sortItems(items).map(item => (
        <NavItemLink key={item.href} href={item.href} name={item.name} />
      ))}
    </div>
  );
}

function NestedDropdown({ directItems, flyoutLabel, flyoutItems, align = 'left' }) {
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const pos = align === 'right' ? 'right-0' : 'left-0';
  return (
    <div className={`absolute ${pos} top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
      {directItems.map(item => (
        <NavItemLink key={item.href} href={item.href} name={item.name} />
      ))}
      <div className="border-t border-gray-100 my-1" />
      <div
        className="relative"
        onMouseEnter={() => setFlyoutOpen(true)}
        onMouseLeave={() => setFlyoutOpen(false)}
      >
        <button className="w-full text-left flex items-center justify-between px-4 py-1.5 text-sm font-serif text-[#162040] font-bold hover:bg-[#f5efe8] transition-colors rounded">
          {flyoutLabel}
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-70" />
        </button>
        {flyoutOpen && (
          <div className="absolute left-full top-0 ml-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
            {flyoutItems.map(item => (
              <NavItemLink key={item.href} href={item.href} name={item.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FlyoutDropdown({ groups, align = "left", overviewHref }) {
  const [hovered, setHovered] = useState(groups[0]?.heading ?? '');
  const pos = align === 'right' ? 'right-0' : 'left-0';
  const active = groups.find(g => g.heading === hovered) ?? groups[0];

  return (
    <div className={`absolute ${pos} top-full mt-1 flex bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
      <div className="w-44 border-r border-gray-100 py-2">
        {overviewHref && (
          <>
            <Link href={overviewHref} className="block px-4 py-1.5 text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040] hover:bg-[#f5efe8] transition-colors rounded">
              Ver todos →
            </Link>
            <div className="border-t border-gray-100 my-1" />
          </>
        )}
        {groups.map(g =>
          g.href ? (
            <Link
              key={g.heading}
              href={g.href}
              onMouseEnter={() => setHovered(g.heading)}
              className={`w-full flex items-center justify-between px-4 py-2 text-sm font-serif font-bold transition-colors ${hovered === g.heading ? 'bg-[#f5efe8] text-[#162040]' : 'text-gray-700 hover:text-[#162040] hover:bg-gray-50'}`}
            >
              {g.heading}
              <ChevronRight className="w-3.5 h-3.5 ml-1 flex-shrink-0 opacity-60" />
            </Link>
          ) : (
            <button
              key={g.heading}
              onMouseEnter={() => setHovered(g.heading)}
              className={`w-full text-left flex items-center justify-between px-4 py-2 text-sm font-serif font-bold transition-colors ${hovered === g.heading ? 'bg-[#f5efe8] text-[#162040]' : 'text-gray-700 hover:text-[#162040] hover:bg-gray-50'}`}
            >
              {g.heading}
              <ChevronRight className="w-3.5 h-3.5 ml-1 flex-shrink-0 opacity-60" />
            </button>
          )
        )}
      </div>
      <div className="w-52 py-2">
        {sortItems(active?.items ?? []).map(item => (
          <NavItemLink key={item.href} href={item.href} name={item.name} />
        ))}
      </div>
    </div>
  );
}

function MobiliarioDropdown() {
  const { city } = useCity();
  const lbl = (n) => city ? `${n} ${city.short}` : n;
  return (
    // L2 panel — abre al hacer hover en "Mobiliario" (navbar)
    <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">

      {/* ── L2 item: "Mesas y Sillas ›" — abre L3 panel a la derecha ── */}
      <div className="relative group/ms-menu">
        <Link href="/mesas-sillas" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
          {lbl('Mesas y Sillas')}
          <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
        </Link>

        {/* L3 panel — aparece al hover de "Mesas y Sillas" */}
        <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[60] opacity-0 invisible group-hover/ms-menu:opacity-100 group-hover/ms-menu:visible transition-all duration-150">

          {/* ── L3 item: "Sillas ›" — abre L4 con lista de sillas ── */}
          <div className="relative group/sillas-menu">
            <Link href="/mesas-sillas" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Sillas')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            {/* L4 Sillas */}
            <div className="absolute left-full top-0 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/sillas-menu:opacity-100 group-hover/sillas-menu:visible transition-all duration-150 max-h-[75vh] overflow-y-auto">
              <Link href="/mesas-sillas" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver todas las sillas</Link>
              <div className="border-t border-gray-100 my-1" />
              {sortItems(sillasNavItems).map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* ── L3 item: "Mesas ›" — abre L4 con lista de mesas ── */}
          <div className="relative group/mesas-menu">
            <Link href="/mesas-sillas" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Mesas')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            {/* L4 Mesas */}
            <div className="absolute left-full top-0 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/mesas-menu:opacity-100 group-hover/mesas-menu:visible transition-all duration-150">
              {sortItems(mesasNavItems).map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* ── L3 item: Combinaciones (link directo) ── */}
          <div className="border-t border-gray-100 my-1" />
          <Link href="/combinaciones-mesas-sillas" className={`${ddLink} font-bold text-[#162040]`}>{lbl('Combinaciones de Mesas y Sillas')}</Link>
        </div>
      </div>

      <div className="border-t border-gray-100 my-1" />

      {/* ── Salas y Periqueras ›  flyout ── */}
      <div className="relative group/sp-menu">
        <Link href="/salas-periqueras" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
          {lbl('Salas y Periqueras')}
          <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
        </Link>

        {/* L3 panel */}
        <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[60] opacity-0 invisible group-hover/sp-menu:opacity-100 group-hover/sp-menu:visible transition-all duration-150">

          {/* ── Salas ›  subitem ── */}
          <div className="relative group/salas-flyout">
            <Link href="/salas-periqueras" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Salas')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/salas-flyout:opacity-100 group-hover/salas-flyout:visible transition-all duration-150 max-h-[75vh] overflow-y-auto">
              <Link href="/salas-periqueras" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver todas las salas</Link>
              <div className="border-t border-gray-100 my-1" />
              {salasNavItems.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* ── Periqueras ›  subitem ── */}
          <div className="relative group/periqueras-flyout">
            <Link href="/salas-periqueras" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Periqueras')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/periqueras-flyout:opacity-100 group-hover/periqueras-flyout:visible transition-all duration-150 max-h-[75vh] overflow-y-auto">
              <Link href="/salas-periqueras" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver todas las periqueras</Link>
              <div className="border-t border-gray-100 my-1" />
              {periquerasNavItems.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Pistas y Tarimas ›  flyout ── */}
      <div className="relative group/pistas-menu">
        <Link href="/pistas-tarimas" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
          {lbl('Pistas y Tarimas')}
          <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
        </Link>

        {/* L3 panel */}
        <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[60] opacity-0 invisible group-hover/pistas-menu:opacity-100 group-hover/pistas-menu:visible transition-all duration-150">

          {/* Tarimas Básicas › */}
          <div className="relative group/tarimas-flyout">
            <Link href="/pistas-tarimas" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Tarimas Básicas')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/tarimas-flyout:opacity-100 group-hover/tarimas-flyout:visible transition-all duration-150">
              <Link href="/pistas-tarimas" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver catálogo</Link>
              <div className="border-t border-gray-100 my-1" />
              {pistasTarimasNavItems.tarimas.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* Pistas de Baile › */}
          <div className="relative group/baile-flyout">
            <Link href="/pistas-tarimas" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Pistas de Baile')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/baile-flyout:opacity-100 group-hover/baile-flyout:visible transition-all duration-150 max-h-[75vh] overflow-y-auto">
              <Link href="/pistas-tarimas" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver catálogo</Link>
              <div className="border-t border-gray-100 my-1" />
              {pistasTarimasNavItems.pistas.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* Escenarios › */}
          <div className="relative group/escenarios-flyout">
            <Link href="/pistas-tarimas" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Escenarios y Estrados')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/escenarios-flyout:opacity-100 group-hover/escenarios-flyout:visible transition-all duration-150">
              <Link href="/pistas-tarimas" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver catálogo</Link>
              <div className="border-t border-gray-100 my-1" />
              {pistasTarimasNavItems.escenarios.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* Sets Completos › */}
          <div className="relative group/sets-flyout">
            <Link href="/pistas-tarimas" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Sets Completos')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/sets-flyout:opacity-100 group-hover/sets-flyout:visible transition-all duration-150">
              <Link href="/pistas-tarimas" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver catálogo</Link>
              <div className="border-t border-gray-100 my-1" />
              {pistasTarimasNavItems.sets.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

        </div>
      </div>
      {/* ── Vajillas y Estilo ›  flyout ── */}
      <div className="relative group/vajillas-menu">
        <Link href="/vajillas" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
          {lbl('Vajillas y Estilo')}
          <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
        </Link>

        {/* L3 panel */}
        <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[60] opacity-0 invisible group-hover/vajillas-menu:opacity-100 group-hover/vajillas-menu:visible transition-all duration-150">

          {/* Lozas › */}
          <div className="relative group/lozas-flyout">
            <Link href="/vajillas#lozas" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Lozas')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/lozas-flyout:opacity-100 group-hover/lozas-flyout:visible transition-all duration-150 max-h-[75vh] overflow-y-auto">
              <Link href="/vajillas" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver todas las lozas</Link>
              <div className="border-t border-gray-100 my-1" />
              {vajillasNavItems.lozas.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* Cerámicas › */}
          <div className="relative group/ceramica-flyout">
            <Link href="/vajillas#ceramica" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Cerámicas')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/ceramica-flyout:opacity-100 group-hover/ceramica-flyout:visible transition-all duration-150 max-h-[75vh] overflow-y-auto">
              <Link href="/vajillas" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver todas las cerámicas</Link>
              <div className="border-t border-gray-100 my-1" />
              {vajillasNavItems.ceramica.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* Línea Mauve › */}
          <div className="relative group/mauve-flyout">
            <Link href="/vajillas#mauve" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Línea Mauve')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/mauve-flyout:opacity-100 group-hover/mauve-flyout:visible transition-all duration-150 max-h-[75vh] overflow-y-auto">
              <Link href="/vajillas" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver línea Mauve</Link>
              <div className="border-t border-gray-100 my-1" />
              {vajillasNavItems.mauve.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* Colecciones Rústicas › */}
          <div className="relative group/rustica-flyout">
            <Link href="/vajillas#rustica" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Colecciones Rústicas')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/rustica-flyout:opacity-100 group-hover/rustica-flyout:visible transition-all duration-150 max-h-[75vh] overflow-y-auto">
              <Link href="/vajillas" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver colecciones rústicas</Link>
              <div className="border-t border-gray-100 my-1" />
              {vajillasNavItems.rustica.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* Colecciones Especiales › */}
          <div className="relative group/especial-flyout">
            <Link href="/vajillas#especial" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Colecciones Especiales')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/especial-flyout:opacity-100 group-hover/especial-flyout:visible transition-all duration-150">
              <Link href="/vajillas" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver colecciones especiales</Link>
              <div className="border-t border-gray-100 my-1" />
              {vajillasNavItems.especial.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* Platos Base › */}
          <div className="relative group/platos-flyout">
            <Link href="/vajillas#platos-base" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Platos Base')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/platos-flyout:opacity-100 group-hover/platos-flyout:visible transition-all duration-150">
              <Link href="/vajillas" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver platos base</Link>
              <div className="border-t border-gray-100 my-1" />
              {vajillasNavItems.platos.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 my-1" />

          {/* Cubiertos (link directo) */}
          {vajillasNavItems.cubiertos.map(item => (
            <NavItemLink key={item.href} href={item.href} name={item.name} className={`${ddLink} font-bold text-[#162040]`} />
          ))}

          {/* Cristalería › */}
          <div className="relative group/cristal-flyout">
            <Link href="/vajillas#cristaleria" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Cristalería')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/cristal-flyout:opacity-100 group-hover/cristal-flyout:visible transition-all duration-150">
              <Link href="/vajillas" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver cristalería</Link>
              <div className="border-t border-gray-100 my-1" />
              {vajillasNavItems.cristaleria.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

        </div>
      </div>
      {/* ── Entelados para Techo ›  flyout ── */}
      <div className="relative group/entelados-menu">
        <Link href="/entelados" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
          {lbl('Entelados para Techo')}
          <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
        </Link>
        <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[60] opacity-0 invisible group-hover/entelados-menu:opacity-100 group-hover/entelados-menu:visible transition-all duration-150">
          <Link href="/entelados" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver todos los estilos</Link>
          <div className="border-t border-gray-100 my-1" />
          {enteladosNavItems.map(item => (
            <NavItemLink key={item.href} href={item.href} name={item.name} />
          ))}
        </div>
      </div>

      {/* ── Colgantes Premium ›  flyout ── */}
      <div className="relative group/colgantes-menu">
        <Link href="/colgantes" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
          {lbl('Colgantes Premium')}
          <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
        </Link>

        {/* L3 panel */}
        <div className="absolute left-full top-0 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[60] opacity-0 invisible group-hover/colgantes-menu:opacity-100 group-hover/colgantes-menu:visible transition-all duration-150">

          {/* Florales › */}
          <div className="relative group/col-floral-flyout">
            <Link href="/colgantes#floral" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Colgantes Florales')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/col-floral-flyout:opacity-100 group-hover/col-floral-flyout:visible transition-all duration-150 max-h-[75vh] overflow-y-auto">
              <Link href="/colgantes" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver todos los florales</Link>
              <div className="border-t border-gray-100 my-1" />
              {colgantesNavItems.floral.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* Follaje y Pampas › */}
          <div className="relative group/col-follaje-flyout">
            <Link href="/colgantes#follaje" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Follaje y Pampas')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/col-follaje-flyout:opacity-100 group-hover/col-follaje-flyout:visible transition-all duration-150 max-h-[75vh] overflow-y-auto">
              <Link href="/colgantes" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver follaje y pampas</Link>
              <div className="border-t border-gray-100 my-1" />
              {colgantesNavItems.follaje.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* Luminosos y Disco › */}
          <div className="relative group/col-luminoso-flyout">
            <Link href="/colgantes#luminoso" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Luminosos y Disco')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/col-luminoso-flyout:opacity-100 group-hover/col-luminoso-flyout:visible transition-all duration-150 max-h-[75vh] overflow-y-auto">
              <Link href="/colgantes" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver luminosos y disco</Link>
              <div className="border-t border-gray-100 my-1" />
              {colgantesNavItems.luminoso.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          {/* Estructuras Especiales › */}
          <div className="relative group/col-estructura-flyout">
            <Link href="/colgantes#estructura" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
              {lbl('Estructuras Especiales')}
              <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
            </Link>
            <div className="absolute left-full top-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70] opacity-0 invisible group-hover/col-estructura-flyout:opacity-100 group-hover/col-estructura-flyout:visible transition-all duration-150">
              <Link href="/colgantes" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver estructuras especiales</Link>
              <div className="border-t border-gray-100 my-1" />
              {colgantesNavItems.estructura.map(item => (
                <NavItemLink key={item.href} href={item.href} name={item.name} />
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 my-1" />
          <Link href="/colgantes" className={`${ddLink} text-[#162040]/60`}>Ver catálogo completo</Link>

        </div>
      </div>

      <div className="border-t border-gray-100 my-1" />

      {/* ── Carpas para Eventos › flyout ── */}
      <div className="relative group/carpas-menu">
        <Link href="/carpas" className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
          {lbl('Carpas para Eventos')}
          <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
        </Link>
        <div className="absolute left-full top-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[60] opacity-0 invisible group-hover/carpas-menu:opacity-100 group-hover/carpas-menu:visible transition-all duration-150 max-h-[75vh] overflow-y-auto">
          <Link href="/carpas" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver todas las carpas</Link>
          <div className="border-t border-gray-100 my-1" />
          {carpasNavItems.map(item => (
            <NavItemLink key={item.href} href={item.href} name={item.name} />
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Smart flyout: measures viewport space and flips direction automatically ───
function SmartFlyout({
  href, label, children, panelWidth = "w-56", zLevel = "z-[60]",
}) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState({});
  const timer = useRef();

  const compute = () => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const spaceBelow = vh - r.top - 8;
    const spaceAbove = r.bottom - 8;
    if (spaceBelow >= spaceAbove || spaceBelow >= 280) {
      setStyle({ top: 0, maxHeight: `${Math.max(spaceBelow, 160)}px`, overflowY: 'auto' });
    } else {
      setStyle({ bottom: 0, maxHeight: `${Math.max(spaceAbove, 160)}px`, overflowY: 'auto' });
    }
  };

  const show = () => { clearTimeout(timer.current); compute(); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 120); };

  return (
    <div ref={ref} className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <Link href={href} className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
        {label}<ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
      </Link>
      {open && (
        <div
          className={`absolute left-full ml-1 ${panelWidth} bg-white rounded-xl shadow-xl border border-gray-100 py-2 ${zLevel}`}
          style={style}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Inline groups flyout: all items shown flat with scroll arrow ─────────────
function InlineGroupsFlyout({
  href, label, groups, panelWidth = 'w-64',
}) {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState({});
  const [canScrollDown, setCanScrollDown] = useState(false);
  const timer = useRef();

  const compute = () => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const spaceBelow = vh - r.top - 8;
    const spaceAbove = r.bottom - 8;
    if (spaceBelow >= spaceAbove || spaceBelow >= 280) {
      setStyle({ top: 0, maxHeight: `${Math.max(spaceBelow, 160)}px` });
    } else {
      setStyle({ bottom: 0, maxHeight: `${Math.max(spaceAbove, 160)}px` });
    }
  };

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
  };

  const show = () => {
    clearTimeout(timer.current);
    compute();
    setOpen(true);
    setTimeout(checkScroll, 60);
  };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 120); };

  const scrollDown = (e) => {
    e.stopPropagation();
    scrollRef.current?.scrollBy({ top: 100, behavior: 'smooth' });
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <Link href={href} className={`${ddLink} flex items-center justify-between pr-3 font-bold text-[#162040]`}>
        {label}<ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-2" />
      </Link>
      {open && (
        <div
          className={`absolute left-full ml-1 ${panelWidth} bg-white rounded-xl shadow-xl border border-gray-100 z-[60] flex flex-col`}
          style={style}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <div ref={scrollRef} className="overflow-y-auto py-2 flex-1" onScroll={checkScroll}>
            <Link href={href} className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver catálogo completo</Link>
            {groups.map(group => (
              <div key={group.heading}>
                <div className="border-t border-gray-100 my-1" />
                <Link href={group.href} className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-[#162040]/50 hover:text-[#162040]`}>{group.heading}</Link>
                {group.items.map(item => <NavItemLink key={item.href} href={item.href} name={item.name} />)}
              </div>
            ))}
          </div>
          {canScrollDown && (
            <button
              onMouseDown={scrollDown}
              className="w-full flex items-center justify-center py-1.5 border-t border-gray-100 text-gray-400 hover:text-[#162040] hover:bg-gray-50 rounded-b-xl transition-colors flex-shrink-0"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Servicios dropdown ────────────────────────────────────────────────────────
function ServiciosDropdown() {
  const { city } = useCity();
  const lbl = (n) => city ? `${n} ${city.short}` : n;
  return (
    <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
      {serviciosItems.filter(i => ![
        '/floreria','/shows','/reposteria','/wedding-planner','/musica',
        '/fotografia','/alimentos-empresas','/espacios-eventos','/audio-iluminacion-video',
      ].includes(i.href)).map(item => (
        <NavItemLink key={item.href} href={item.href} name={item.name} />
      ))}
      <div className="border-t border-gray-100 my-1" />

      <SmartFlyout href="/audio-iluminacion-video" label={lbl('Audio, Iluminación y Video')} panelWidth="w-60">
        <Link href="/audio-iluminacion-video" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver catálogo completo</Link>
        {audioIluminacionNavGroups.map(group => (
          <div key={group.heading}>
            <div className="border-t border-gray-100 my-1" />
            <Link href={group.href} className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-[#162040]/50 hover:text-[#162040]`}>{group.heading}</Link>
            {group.items.map(item => <NavItemLink key={item.href} href={item.href} name={item.name} />)}
          </div>
        ))}
      </SmartFlyout>

      <SmartFlyout href="/espacios-eventos" label={lbl('Espacios para Eventos')}>
        <Link href="/espacios-eventos" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver catálogo completo</Link>
        <div className="border-t border-gray-100 my-1" />
        {sortItems(espaciosNavItems).map(item => <NavItemLink key={item.href} href={item.href} name={item.name} />)}
      </SmartFlyout>

      <SmartFlyout href="/reposteria" label={lbl('Repostería')}>
        <Link href="/reposteria" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver catálogo completo</Link>
        <div className="border-t border-gray-100 my-1" />
        {sortItems(reposteriaNavItems).map(item => <NavItemLink key={item.href} href={item.href} name={item.name} />)}
      </SmartFlyout>

      <SmartFlyout href="/wedding-planner" label={lbl('Wedding Planner')}>
        <Link href="/wedding-planner" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver catálogo completo</Link>
        <div className="border-t border-gray-100 my-1" />
        {sortItems(weddingNavItems).map(item => <NavItemLink key={item.href} href={item.href} name={item.name} />)}
      </SmartFlyout>

      <SmartFlyout href="/musica" label={lbl('Música')}>
        <Link href="/musica" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver catálogo completo</Link>
        <div className="border-t border-gray-100 my-1" />
        {sortItems(musicaNavItems).map(item => <NavItemLink key={item.href} href={item.href} name={item.name} />)}
      </SmartFlyout>

      <SmartFlyout href="/fotografia" label={lbl('Fotografía y Video')}>
        <Link href="/fotografia" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver catálogo completo</Link>
        <div className="border-t border-gray-100 my-1" />
        {sortItems(fotografiaNavItems).map(item => <NavItemLink key={item.href} href={item.href} name={item.name} />)}
      </SmartFlyout>

      <SmartFlyout href="/alimentos-empresas" label={lbl('Alimentos para Empresas')}>
        <Link href="/alimentos-empresas" className={`${ddLink} text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600`}>Ver catálogo completo</Link>
        <div className="border-t border-gray-100 my-1" />
        {sortItems(empresasNavItems).map(item => <NavItemLink key={item.href} href={item.href} name={item.name} />)}
      </SmartFlyout>

      <div className="border-t border-gray-100 my-1" />

      <InlineGroupsFlyout
        href="/shows"
        label={lbl('Shows')}
        groups={[
          { heading: 'Percusión',       href: '/shows#percusion',  items: showsNavItems.percusion  },
          { heading: 'Show y Danza',    href: '/shows#danza',      items: showsNavItems.danza      },
          { heading: 'Tecnología y Luz',href: '/shows#tecnologia', items: showsNavItems.tecnologia },
          { heading: 'Circo',           href: '/shows#circo',      items: showsNavItems.circo      },
        ]}
      />

      <div className="border-t border-gray-100 my-1" />

      <InlineGroupsFlyout
        href="/floreria"
        label={lbl('Florería y Decoración')}
        groups={[
          { heading: 'Floral',      href: '/floreria#floral',     items: floreriaNavItems.floral     },
          { heading: 'Globos',      href: '/floreria#globos',     items: floreriaNavItems.globos     },
          { heading: 'Decoración',  href: '/floreria#decoracion', items: floreriaNavItems.decoracion },
        ]}
      />
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState(null);
  const [location, setLocation] = useLocation();
  const { city, setCity } = useCity();

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setMobileSubExpanded(null);
  }, [location]);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">

      {/* ── Top bar (dark navy) ── */}
      <div className="bg-[#162040] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo + city badge */}
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center" data-testid="link-logo">
                <img src="/images/logo-white-transparent.png" alt="Bodasesor" className="h-12" style={{ filter: 'brightness(0) invert(1)' }} />
              </Link>
              <CityBadge />
            </div>

            {/* Desktop: search + actions */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <form
                  className="relative"
                  onSubmit={e => {
                    e.preventDefault();
                    const q = (e.currentTarget.elements.namedItem('q') ).value.trim();
                    if (q) window.location.href = `/buscar?q=${encodeURIComponent(q)}`;
                  }}
                >
                  <input
                    name="q"
                    type="text"
                    placeholder="Buscar servicios..."
                    className="w-64 px-4 py-2 pr-10 rounded-lg border-2 border-white bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#f5efe8] transition-colors font-serif"
                    data-testid="input-search"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#162040] hover:text-[#1a2a52]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  </button>
                </form>
              </div>

              <a href="tel:5215540080373" className="flex items-center space-x-2 hover:text-[#f5efe8] transition-colors" data-testid="link-llamar">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span className="font-serif">Llamar</span>
              </a>

              <a
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
                target="_blank" rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-green-600 px-4 py-2 rounded-lg font-bold transition-colors font-serif flex items-center gap-2"
                data-testid="link-whatsapp-top"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button className="text-white hover:text-white/80" onClick={() => setMobileOpen(!mobileOpen)} data-testid="button-mobile-menu">
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category nav row (white) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">

          {/* Desktop nav items */}
          <div className="hidden md:flex items-center space-x-1">

            {/* Ciudad */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-[#162040] font-serif text-sm font-bold transition-colors flex items-center px-3 py-2" data-testid="nav-ciudad">
                Ciudad<ChevronDown className="w-3.5 h-3.5 ml-1" />
              </button>
              <div className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-80 overflow-y-auto">
                {[ciudades[0], ciudades[1], ...sortItems(ciudades.slice(2))].map(c => (
                  <button
                    key={c.href}
                    onClick={() => {
                      const slug = c.href.slice(1);
                      const cityObj = CITY_MAP[slug];
                      if (cityObj) setCity({ ...cityObj });
                    }}
                    className={`w-full text-left block px-4 py-1.5 text-sm font-bold font-serif transition-colors rounded hover:bg-[#f5efe8] ${c.featured ? 'text-[#162040]' : 'text-gray-700 hover:text-[#162040]'}`}
                  >
                    {city?.slug === c.href.slice(1) ? `✓ ${c.name}` : c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Banquete & Catering */}
            <div className="relative group">
              <Link href="/banquetes-catering" className="text-gray-700 hover:text-[#162040] font-serif text-sm font-bold transition-colors flex items-center px-3 py-2" data-testid="nav-catering">
                Banquete &amp; Catering<ChevronDown className="w-3.5 h-3.5 ml-1" />
              </Link>
              <FlyoutDropdown groups={cateringGroups} overviewHref="/banquetes-catering" />
            </div>

            {/* Barras de Bebidas */}
            <div className="relative group">
              <Link href="/barras-de-bebidas" className="text-gray-700 hover:text-[#162040] font-serif text-sm font-bold transition-colors flex items-center px-3 py-2" data-testid="nav-bebidas">
                Barras de Bebidas<ChevronDown className="w-3.5 h-3.5 ml-1" />
              </Link>
              <SimpleDropdown items={bebidasItems} overviewHref="/barras-de-bebidas" />
            </div>

            {/* Mesas Personalizadas */}
            <div className="relative group">
              <Link href="/mesas-personalizadas" className="text-gray-700 hover:text-[#162040] font-serif text-sm font-bold transition-colors flex items-center px-3 py-2" data-testid="nav-mesas">
                Mesas Personalizadas<ChevronDown className="w-3.5 h-3.5 ml-1" />
              </Link>
              <SimpleDropdown items={mesasItems} overviewHref="/mesas-personalizadas" />
            </div>

            {/* Mobiliario */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-[#162040] font-serif text-sm font-bold transition-colors flex items-center px-3 py-2" data-testid="nav-mobiliario">
                Mobiliario y Decoración<ChevronDown className="w-3.5 h-3.5 ml-1" />
              </button>
              <MobiliarioDropdown />
            </div>

            {/* Servicios */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-[#162040] font-serif text-sm font-bold transition-colors flex items-center px-3 py-2" data-testid="nav-servicios">
                Servicios<ChevronDown className="w-3.5 h-3.5 ml-1" />
              </button>
              <ServiciosDropdown />
            </div>

            {/* Tipo de Evento */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-[#162040] font-serif text-sm font-bold transition-colors flex items-center px-3 py-2" data-testid="nav-tipo-evento">
                Tipo de Evento<ChevronDown className="w-3.5 h-3.5 ml-1" />
              </button>
              <SimpleDropdown items={eventoItems} align="right" width="w-52" />
            </div>

            {/* Galería */}
            <Link href="/galeria" className="text-gray-700 hover:text-[#162040] font-serif text-sm font-bold transition-colors px-3 py-2">
              Galería
            </Link>

          </div>

          {/* Mobile hamburger (on white row) */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-[#162040]" onClick={() => setMobileOpen(!mobileOpen)}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 max-h-[80vh] overflow-y-auto shadow-xl">
          <div className="px-4 pt-3 pb-2">
            {/* Search */}
            <form className="relative mb-3" onSubmit={e => {
              e.preventDefault();
              const q = (e.currentTarget.elements.namedItem('q') ).value.trim();
              if (q) window.location.href = `/buscar?q=${encodeURIComponent(q)}`;
            }}>
              <input name="q" type="text" placeholder="Buscar servicios..." className="w-full px-4 py-2.5 pr-10 rounded-lg text-sm bg-gray-100 border-0 outline-none font-serif" />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </button>
            </form>

            <MobileSection title="Ciudad" id="ciudad" expanded={mobileExpanded} setExpanded={setMobileExpanded}>
              {[ciudades[0], ciudades[1], ...sortItems(ciudades.slice(2))].map(c => (
                <button
                  key={c.href}
                  onClick={() => {
                    const slug = c.href.slice(1);
                    const cityObj = CITY_MAP[slug];
                    if (cityObj) setCity({ ...cityObj });
                    setMobileOpen(false);
                  }}
                  className={`w-full text-left block py-2 text-sm font-bold font-serif ${c.featured ? 'text-[#162040]' : 'text-gray-600'} ${city?.slug === c.href.slice(1) ? 'text-[#162040]' : ''}`}
                >
                  {city?.slug === c.href.slice(1) ? `✓ ${c.name}` : c.name}
                </button>
              ))}
              {city && (
                <button
                  onClick={() => { setCity(null); setMobileOpen(false); }}
                  className="block py-2 text-xs text-red-500 font-serif hover:text-red-700"
                >
                  ✕ Quitar ciudad seleccionada
                </button>
              )}
            </MobileSection>

            <MobileSection title="Banquete & Catering" id="catering" expanded={mobileExpanded} setExpanded={setMobileExpanded}>
              <Link href="/banquetes-catering" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todos los servicios →</Link>
              <div className="border-t border-gray-100 my-1" />
              {cateringGroups.map(group => (
                <MobileSubSection key={group.heading} title={group.heading} id={group.heading} expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                  {group.items.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
                </MobileSubSection>
              ))}
            </MobileSection>

            <MobileSection title="Barras de Bebidas" id="bebidas" expanded={mobileExpanded} setExpanded={setMobileExpanded}>
              <Link href="/barras-de-bebidas" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todos los servicios →</Link>
              <div className="border-t border-gray-100 my-1" />
              {bebidasItems.map(i => <Link key={i.href} href={i.href} className="block py-2 text-sm text-gray-600 font-serif hover:text-[#162040]">{i.name}</Link>)}
            </MobileSection>

            <MobileSection title="Mesas Personalizadas" id="mesas" expanded={mobileExpanded} setExpanded={setMobileExpanded}>
              <Link href="/mesas-personalizadas" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todos los servicios →</Link>
              <div className="border-t border-gray-100 my-1" />
              {mesasItems.map(i => <Link key={i.href} href={i.href} className="block py-2 text-sm text-gray-600 font-serif hover:text-[#162040]">{i.name}</Link>)}
            </MobileSection>

            <MobileSection title="Mobiliario y Decoración" id="mobiliario" expanded={mobileExpanded} setExpanded={setMobileExpanded}>
              <Link href="/mesas-sillas" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Mesas y Sillas</Link>
              <MobileSubSection title="Sillas" id="mob-sillas" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {sortItems(sillasNavItems).map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Mesas" id="mob-mesas-tipos" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {sortItems(mesasNavItems).map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <Link href="/salas-periqueras" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Salas y Periqueras</Link>
              <MobileSubSection title="Salas" id="mob-salas" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {salasNavItems.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Periqueras" id="mob-periqueras" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {periquerasNavItems.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <Link href="/pistas-tarimas" className="block py-2 text-sm text-gray-600 font-serif hover:text-[#162040]">Pistas y Tarimas</Link>
              <Link href="/vajillas" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Vajillas y Estilo</Link>
              <MobileSubSection title="Lozas" id="mob-lozas" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {vajillasNavItems.lozas.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Cerámicas" id="mob-ceramica" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {vajillasNavItems.ceramica.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Línea Mauve" id="mob-mauve" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {vajillasNavItems.mauve.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Colecciones Rústicas" id="mob-rustica" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {vajillasNavItems.rustica.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Colecciones Especiales" id="mob-especial" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {vajillasNavItems.especial.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Platos Base" id="mob-platos" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {vajillasNavItems.platos.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Cubiertos y Cristalería" id="mob-cristal" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {[...vajillasNavItems.cubiertos, ...vajillasNavItems.cristaleria].map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <Link href="/colgantes" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Colgantes Premium</Link>
              <MobileSubSection title="Colgantes Florales" id="mob-col-floral" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {colgantesNavItems.floral.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Follaje y Pampas" id="mob-col-follaje" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {colgantesNavItems.follaje.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Luminosos y Disco" id="mob-col-luminoso" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {colgantesNavItems.luminoso.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Estructuras Especiales" id="mob-col-estructura" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {colgantesNavItems.estructura.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <Link href="/entelados" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Entelados para Techo</Link>
              {enteladosNavItems.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              <Link href="/carpas" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Carpas para Eventos</Link>
              {carpasNavItems.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
            </MobileSection>

            <MobileSection title="Servicios" id="servicios" expanded={mobileExpanded} setExpanded={setMobileExpanded}>
              {serviciosItems.filter(i => !['/floreria','/shows','/reposteria','/wedding-planner','/musica','/fotografia','/alimentos-empresas','/espacios-eventos','/audio-iluminacion-video'].includes(i.href)).map(i => (
                <Link key={i.href} href={i.href} className="block py-2 text-sm text-gray-600 font-serif hover:text-[#162040]">{i.name}</Link>
              ))}
              <Link href="/audio-iluminacion-video" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Audio, Iluminación y Video</Link>
              {audioIluminacionNavGroups.map(group => (
                <MobileSubSection key={group.heading} title={group.heading} id={`mob-audio-${group.heading.toLowerCase()}`} expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                  {group.items.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
                </MobileSubSection>
              ))}
              <Link href="/espacios-eventos" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Espacios</Link>
              <MobileSubSection title="Tipos de venue" id="mob-esp" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {sortItems(espaciosNavItems).map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <Link href="/reposteria" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Repostería</Link>
              <MobileSubSection title="Especialidades" id="mob-repo" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {sortItems(reposteriaNavItems).map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <Link href="/wedding-planner" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Wedding Planner</Link>
              <MobileSubSection title="Servicios" id="mob-wed" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {sortItems(weddingNavItems).map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <Link href="/musica" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Música</Link>
              <MobileSubSection title="Opciones musicales" id="mob-mus" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {sortItems(musicaNavItems).map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <Link href="/fotografia" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Fotografía y Video</Link>
              <MobileSubSection title="Servicios foto/video" id="mob-foto" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {sortItems(fotografiaNavItems).map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <Link href="/alimentos-empresas" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Alimentos para Empresas</Link>
              <MobileSubSection title="Servicios empresariales" id="mob-emp" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {sortItems(empresasNavItems).map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <Link href="/shows" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Shows</Link>
              <MobileSubSection title="Percusión" id="mob-shows-perc" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {showsNavItems.percusion.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Show y Danza" id="mob-shows-danza" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {showsNavItems.danza.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Tecnología y Luz" id="mob-shows-tec" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {showsNavItems.tecnologia.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Circo" id="mob-shows-circo" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {showsNavItems.circo.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <Link href="/floreria" className="block py-1.5 text-xs font-bold text-[#162040] font-serif">Ver todo: Florería y Decoración</Link>
              <MobileSubSection title="Floral" id="mob-svc-floral" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {floreriaNavItems.floral.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Globos" id="mob-svc-globos" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {floreriaNavItems.globos.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
              <MobileSubSection title="Decoración" id="mob-svc-deco" expanded={mobileSubExpanded} setExpanded={setMobileSubExpanded}>
                {floreriaNavItems.decoracion.map(i => <Link key={i.href} href={i.href} className="block py-1.5 text-xs text-gray-500 font-serif hover:text-[#162040]">{i.name}</Link>)}
              </MobileSubSection>
            </MobileSection>

            <MobileSection title="Tipo de Evento" id="tipo-evento" expanded={mobileExpanded} setExpanded={setMobileExpanded}>
              {eventoItems.map(i => <Link key={i.href} href={i.href} className="block py-2 text-sm text-gray-600 font-serif hover:text-[#162040]">{i.name}</Link>)}
            </MobileSection>

            <Link href="/galeria" className="block py-3 text-sm font-bold text-gray-800 border-b border-gray-100 font-serif">Galería</Link>

            <div className="mt-4 flex flex-col gap-3 pb-4">
              <a href="tel:5215540080373" className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 text-[#162040] font-serif font-bold text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                Llamar
              </a>
              <a
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#25D366] text-white font-serif font-bold text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
}

// ─── Mobile accordion helpers ─────────────────────────────────────────────────
function MobileSection({ title, id, expanded, setExpanded, children }) {
  const open = expanded === id;
  return (
    <div>
      <button
        className="w-full flex items-center justify-between py-3 text-left font-bold text-gray-800 hover:text-[#162040] border-b border-gray-100 font-serif"
        onClick={() => setExpanded(open ? null : id)}
      >
        <span className="text-sm">{title}</span>
        <ChevronDown size={15} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pl-4 border-l-2 border-[#162040]/20 my-2">{children}</div>}
    </div>
  );
}

function MobileSubSection({ title, id, expanded, setExpanded, children }) {
  const open = expanded === id;
  return (
    <div>
      <button
        className="w-full flex items-center justify-between py-2 text-left text-sm font-medium text-gray-500 hover:text-[#162040] font-serif"
        onClick={() => setExpanded(open ? null : id)}
      >
        {title}
        <ChevronDown size={13} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pl-4 border-l border-gray-200 mb-2">{children}</div>}
    </div>
  );
}
