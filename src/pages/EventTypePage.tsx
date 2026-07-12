import { useState, useEffect } from "react";
import { Lightbox } from "../components/Lightbox";
import CityLink from "../components/CityLink";
const Link = CityLink;
import {
  Phone, CheckCircle2, ArrowRight, ExternalLink,
  Utensils, Wine, Cake, Flower2, Camera, Music, Armchair, Crown,
  Theater, ChefHat, Flame, Package, Fish, Coffee, Droplets, Candy,
  Wheat, Building2, Salad, PartyPopper, GraduationCap, Heart, Gift,
  IceCream, Landmark, Star, Shield, MessageCircle, Layers, Mic,
  Sofa, Baby, Handshake, BarChart3, Laptop, Ribbon,
  type LucideIcon,
} from "lucide-react";
import GalleryCarouselSection from "../components/GalleryCarousel";
import OptimizedImage from "../components/OptimizedImage";
import type { ProductData } from "../data/products";
import { buildSeoTitle } from "../utils/seo-title";

const ICON_MAP: Record<string, LucideIcon> = {
  '🍽️': Utensils, '🥂': Wine, '🍹': Wine, '🍸': Wine, '🧃': Droplets,
  '🍰': Cake, '🎂': Cake, '🧁': Cake, '🍭': Candy, '🧀': Layers,
  '💐': Flower2, '📸': Camera, '🎵': Music, '🎭': Theater,
  '🪑': Armchair, '👰': Crown, '🎪': PartyPopper, '🎉': PartyPopper, '🎊': PartyPopper, '🎈': PartyPopper,
  '🥘': ChefHat, '🌮': Utensils, '🥩': Flame, '🫙': Package, '🍣': Fish,
  '☕': Coffee, '🥐': Wheat, '🥪': Salad, '🍲': ChefHat, '🍦': IceCream,
  '🏛️': Landmark, '🏢': Building2, '🏠': Building2,
  '🥗': Salad, '🎓': GraduationCap, '🎁': Gift, '👶': Baby, '🎤': Mic,
  '🛒': Gift, '💡': Star, '📊': BarChart3, '💼': Laptop, '🤝': Handshake,
  '🎀': Ribbon, '💃': Music, '🎠': PartyPopper, '🎡': PartyPopper,
  '💒': Heart, '🌸': Flower2, '🍜': ChefHat, '🍾': Wine,
};
function ServiceIcon({ emoji, className }: { emoji: string; className?: string }) {
  const Icon = ICON_MAP[emoji];
  if (Icon) return <Icon className={className} />;
  return <Utensils className={className} />;
}

const WHATSAPP_NUMBER = "5215540080373";
const WA_MSG = (title: string) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Hola%2C%20me%20interesa%20cotizar%20para%20mi%20evento%3A%20${encodeURIComponent(title)}`;

// ─── Gallery images per event type ───────────────────────────────────────────
const EVENT_GALLERY: Record<string, number[]> = {
  'bodas':            [5,10,15,20,25,30,35,40,45,50],
  'xv-anos':          [55,60,65,70,75,80,85,90,95,100],
  'corporativos':     [105,112,115,120,125,130,135,140,145,150],
  'cumpleanos':       [155,160,165,170,175,180,185,188,192,196],
  'baby-shower':      [1,3,4,6,7,8,9,11,12,13],
  'graduaciones':     [14,16,17,18,19,21,22,23,24,26],
  'cenas':            [27,28,29,31,32,33,34,38,39,41],
  'comidas':          [42,43,44,46,47,48,49,51,52,53],
  'desayunos':        [54,56,57,58,61,62,63,64,66,67],
  'lanzamientos':     [68,69,71,72,73,74,76,77,78,79],
  'primera-comunion': [81,82,83,84,86,87,88,89,91,92],
};
const DEFAULT_GALLERY = [5,10,15,20,25,30,35,40,45,50];

function EventGalleryCarousel({ slug }: { slug: string }) {
  const imgs = EVENT_GALLERY[slug] ?? DEFAULT_GALLERY;
  const imagePaths = imgs.map(n => `/images/instagram/ig${n}.jpg`);
  const [active, setActive] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % imgs.length), 3500);
    return () => clearInterval(t);
  }, [imgs.length]);

  return (
    <>
      <div
        className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 cursor-zoom-in group"
        style={{ aspectRatio: '4/3' }}
        onClick={() => setLightboxIdx(active)}
      >
        <img
          key={imagePaths[active]}
          src={imagePaths[active]}
          alt="Evento realizado por Bodasesor"
          width={800}
          height={600}
          className="w-full h-full object-contain bg-[#f5efe8]"
          onError={e => { (e.target as HTMLImageElement).src = '/images/galeria/g1.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#162040]/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center pointer-events-none">
          <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <button
          onClick={e => { e.stopPropagation(); setActive(i => (i - 1 + imgs.length) % imgs.length); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#162040] p-2 rounded-full shadow transition-all duration-200 hover:scale-110"
          aria-label="Anterior"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          onClick={e => { e.stopPropagation(); setActive(i => (i + 1) % imgs.length); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#162040] p-2 rounded-full shadow transition-all duration-200 hover:scale-110"
          aria-label="Siguiente"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
          </svg>
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
          {imgs.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-200 ${i === active ? 'bg-white w-5 h-2' : 'bg-white/50 w-2 h-2'}`}
            />
          ))}
        </div>
      </div>
      {lightboxIdx !== null && (
        <Lightbox
          images={imagePaths}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => ((i ?? 0) - 1 + imagePaths.length) % imagePaths.length)}
          onNext={() => setLightboxIdx(i => ((i ?? 0) + 1) % imagePaths.length)}
        />
      )}
    </>
  );
}

const WaSvg = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

interface ServiceCard {
  icon: string;
  title: string;
  desc: string;
  href: string;
}

interface ServiceGroup {
  category: string;
  categoryIcon: string;
  accent: string;
  services: ServiceCard[];
}

const EVENT_SERVICES: Record<string, ServiceGroup[]> = {
  bodas: [
    {
      category: "Banquete & Catering",
      categoryIcon: "🍽️",
      accent: "bg-amber-50 border-amber-200",
      services: [
        { icon: "🥂", title: "Banquete Formal para Eventos", desc: "Cena completa con servicio de meseros, vajilla fina y presentación impecable para tu gran día.", href: "/banquetes" },
        { icon: "🥘", title: "Paella Valenciana", desc: "Paella auténtica preparada en el lugar por chefs especializados. El toque diferente para tu boda.", href: "/paella" },
        { icon: "🌮", title: "Taquiza de Guisados", desc: "La segunda cena más popular en bodas mexicanas. Tortillas a mano y guisados caseros al momento.", href: "/taquiza-guisados" },
        { icon: "🥩", title: "Parrillada Argentina", desc: "Cortes premium a las brasas servidos en tu evento. Espectáculo gastronómico incluido.", href: "/parrillada-argentina" },
        { icon: "🫙", title: "Canapés Premium", desc: "Bocados de alto nivel para la recepción y cocktail. Primera impresión de lujo.", href: "/canapes-premium" },
        { icon: "🍣", title: "Barra de Sushi", desc: "Sushi fresco preparado frente a tus invitados. Rollos, nigiri y más para sorprender.", href: "/barra-sushi" },
      ],
    },
    {
      category: "Barras de Bebidas",
      categoryIcon: "🍹",
      accent: "bg-blue-50 border-blue-200",
      services: [
        { icon: "🍹", title: "Barra de Bebidas", desc: "Barra completa con coctelería clásica, refrescos, aguas frescas y todo lo necesario.", href: "/barra-bebidas" },
        { icon: "🍸", title: "Cócteles y Mixología", desc: "Bartenders profesionales con cócteles de autor personalizados para tu boda.", href: "/cocteles-mixologia" },
        { icon: "☕", title: "Barra de Café Premium", desc: "Baristas con café de especialidad italiano para el cierre perfecto de la velada.", href: "/barra-cafe-premium" },
        { icon: "🧃", title: "Barra de Mocteles", desc: "Mocteles artesanales sin alcohol para todos los invitados. Elegantes y deliciosos.", href: "/barra-mocteles" },
      ],
    },
    {
      category: "Mesas Personalizadas",
      categoryIcon: "🍰",
      accent: "bg-rose-50 border-rose-200",
      services: [
        { icon: "🍭", title: "Mesa de Dulces", desc: "Mesa temática con dulces artesanales, chocolates y macarons en los colores de la boda.", href: "/mesa-dulces" },
        { icon: "🍰", title: "Mesa de Postres", desc: "Pasteles de autor, mousse, tartaletas y postres finos presentados en estructura elegante.", href: "/mesa-postres" },
        { icon: "🧀", title: "Mesa de Quesos", desc: "Selección de quesos europeos, embutidos, frutos secos y complementos gourmet.", href: "/mesa-quesos" },
        { icon: "🧁", title: "Cupcakes Gourmet", desc: "Cupcakes de autor decorados a mano con la temática y colores de tu boda.", href: "/cupcakes-gourmet" },
      ],
    },
    {
      category: "Decoración & Flores",
      categoryIcon: "💐",
      accent: "bg-green-50 border-green-200",
      services: [
        { icon: "💐", title: "Florería y Decoración", desc: "Ramos, arco floral, centros de mesa y decoración completa del venue con flores naturales.", href: "/floreria-decoracion" },
        { icon: "🏛️", title: "Espacios para Eventos", desc: "Salones, haciendas, jardines y venues premium con disponibilidad y precios competitivos.", href: "/espacios-eventos" },
      ],
    },
    {
      category: "Fotografía & Video",
      categoryIcon: "📸",
      accent: "bg-purple-50 border-purple-200",
      services: [
        { icon: "📸", title: "Fotografía y Video", desc: "Cobertura cinematográfica del día completo: ceremonia, cocktail, cena y fiesta. Álbum incluido.", href: "/fotografia-video" },
      ],
    },
    {
      category: "Música & Entretenimiento",
      categoryIcon: "🎵",
      accent: "bg-indigo-50 border-indigo-200",
      services: [
        { icon: "🎵", title: "Música y DJ", desc: "DJ profesional con equipo de sonido de grado profesional. Desde el vals hasta el cierre de fiesta.", href: "/musica" },
        { icon: "🎭", title: "Shows y Entretenimiento", desc: "Cámara 360, photobooth, shows en vivo y artistas para hacer la noche inolvidable.", href: "/shows" },
      ],
    },
    {
      category: "Coordinación Integral",
      categoryIcon: "👰",
      accent: "bg-[#f5efe8] border-[#162040]/20",
      services: [
        { icon: "👰", title: "Wedding Planner", desc: "Coordinación completa o solo el día del evento. El aliado que necesitas para no perder ningún detalle.", href: "/wedding-planner" },
      ],
    },
    {
      category: "Mobiliario",
      categoryIcon: "🪑",
      accent: "bg-stone-50 border-stone-200",
      services: [
        { icon: "🪑", title: "Silla Tiffany", desc: "La silla más elegante para bodas. Disponible en blanco, dorado, plata y transparente.", href: "/silla-tiffany" },
        { icon: "🪑", title: "Silla Crossback", desc: "Estilo rústico-chic en madera maciza. Perfecta para bodas al aire libre y haciendas.", href: "/mesas-sillas" },
        { icon: "🪑", title: "Silla Louis XV", desc: "Elegancia clásica francesa. La opción regia para bodas de gran escala.", href: "/mesas-sillas" },
        { icon: "🪑", title: "Silla Avant Garde", desc: "Diseño contemporáneo y sofisticado para bodas modernas.", href: "/mesas-sillas" },
      ],
    },
  ],

  "xv-anos": [
    {
      category: "Banquete & Catering",
      categoryIcon: "🍽️",
      accent: "bg-amber-50 border-amber-200",
      services: [
        { icon: "🥂", title: "Banquete Formal para Eventos", desc: "Cena completa con meseros, vajilla decorativa y presentación de gala para la quinceañera.", href: "/banquetes" },
        { icon: "🌮", title: "Taquiza de Guisados", desc: "La segunda cena que todos esperan. Tortillas a mano y guisados caseros en cazuelas.", href: "/taquiza-guisados" },
        { icon: "🥩", title: "Parrillada Argentina", desc: "Cortes de carne a las brasas preparados en el lugar. Espectáculo y sabor en uno.", href: "/parrillada-argentina" },
        { icon: "🍲", title: "Pozole y Tostadas", desc: "El sabor más tradicional de México para la segunda cena o el cierre de la fiesta.", href: "/pozole-tostadas" },
      ],
    },
    {
      category: "Barras de Bebidas",
      categoryIcon: "🍹",
      accent: "bg-blue-50 border-blue-200",
      services: [
        { icon: "🍹", title: "Barra de Bebidas", desc: "Barra completa con cócteles, refrescos, aguas frescas y barra sin alcohol para los jóvenes.", href: "/barra-bebidas" },
        { icon: "🧃", title: "Barra de Mocteles", desc: "Mocteles elegantes sin alcohol. Perfectos para quinceañeras con invitados de todas las edades.", href: "/barra-mocteles" },
        { icon: "☕", title: "Barra de Café Premium", desc: "Baristas profesionales con café de especialidad para el cierre de la noche.", href: "/barra-cafe-premium" },
        { icon: "🍦", title: "Paletas y Helados", desc: "Carrito de paletas artesanales y helados gourmet. El detalle que todos recuerdan.", href: "/paletas-helados" },
      ],
    },
    {
      category: "Mesas Personalizadas",
      categoryIcon: "🍰",
      accent: "bg-rose-50 border-rose-200",
      services: [
        { icon: "🍭", title: "Mesa de Dulces", desc: "Mesa diseñada en los colores de la quinceañera con dulces artesanales y macarons.", href: "/mesa-dulces" },
        { icon: "🍰", title: "Mesa de Postres", desc: "Pastel de pisos, tartaletas, macarons y postres finos presentados en estructura elegante.", href: "/mesa-postres" },
        { icon: "🧁", title: "Cupcakes Gourmet", desc: "Cupcakes de autor en los colores del evento. Detalle y sabor en cada pieza.", href: "/cupcakes-gourmet" },
        { icon: "🎂", title: "Repostería", desc: "Pastel de quinceañera personalizado con los sabores y decoración elegidos por la festejada.", href: "/reposteria" },
      ],
    },
    {
      category: "Decoración & Flores",
      categoryIcon: "💐",
      accent: "bg-green-50 border-green-200",
      services: [
        { icon: "💐", title: "Florería y Decoración", desc: "Arreglo completo del salón: mesa de honor, centros de mesa, arco floral y entrada.", href: "/floreria-decoracion" },
        { icon: "🏛️", title: "Espacios para Eventos", desc: "Salones y jardines para quinceañeras de todos los tamaños, en toda la república.", href: "/espacios-eventos" },
      ],
    },
    {
      category: "Fotografía & Video",
      categoryIcon: "📸",
      accent: "bg-purple-50 border-purple-200",
      services: [
        { icon: "📸", title: "Fotografía y Video", desc: "Cobertura del día completo: misa, llegada, vals, baile sorpresa y fiesta. Álbum incluido.", href: "/fotografia-video" },
      ],
    },
    {
      category: "Música & Entretenimiento",
      categoryIcon: "🎵",
      accent: "bg-indigo-50 border-indigo-200",
      services: [
        { icon: "🎵", title: "Música y DJ", desc: "DJ con repertorio para el vals, baile sorpresa y la fiesta completa. Toda la noche.", href: "/musica" },
        { icon: "🎭", title: "Shows y Entretenimiento", desc: "Cámara 360, photobooth, shows en vivo y artistas especiales para la quinceañera.", href: "/shows" },
        { icon: "🎪", title: "Inflables", desc: "Inflables y juegos para los invitados más jóvenes. Diversión garantizada para toda la familia.", href: "/inflables" },
      ],
    },
    {
      category: "Mobiliario",
      categoryIcon: "🪑",
      accent: "bg-stone-50 border-stone-200",
      services: [
        { icon: "🪑", title: "Silla Tiffany", desc: "Clásica y elegante. La opción más popular para quinceañeras en México.", href: "/sillas/silla-tiffany" },
        { icon: "🪑", title: "Silla Versalles", desc: "Opulencia y glamour. Para quinceañeras que quieren sentirse princesas.", href: "/sillas/silla-versalles" },
        { icon: "🪑", title: "Silla Ghost", desc: "Diseño transparente y moderno. Ideal para quinceañeras temáticas y contemporáneas.", href: "/sillas/silla-ghost" },
      ],
    },
  ],

  corporativos: [
    {
      category: "Catering Corporativo",
      categoryIcon: "🍽️",
      accent: "bg-amber-50 border-amber-200",
      services: [
        { icon: "☕", title: "Coffee Break Ejecutivo", desc: "Pausa con café de especialidad, bocadillos gourmet y surtido completo para juntas y seminarios.", href: "/coffee-break" },
        { icon: "🫙", title: "Canapés Premium", desc: "Bocados de alto nivel para cócteles corporativos, lanzamientos y recepciones de empresa.", href: "/canapes-premium" },
        { icon: "🥐", title: "Desayuno Social", desc: "Desayunos ejecutivos completos para reuniones matutinas, presentaciones y team meetings.", href: "/desayuno-social" },
        { icon: "🍽️", title: "Comida Corrida", desc: "Servicio de comida diaria para comedores industriales, campus y sedes corporativas.", href: "/comida-corrida" },
        { icon: "🏢", title: "Alimentos para Empresas", desc: "Solución integral de alimentación para empresas y comedores industriales en toda la república.", href: "/alimentos-empresas" },
        { icon: "🥪", title: "Bocadillos", desc: "Bocadillos frescos y variados para coffee breaks, reuniones y eventos de empresa.", href: "/bocadillos" },
      ],
    },
    {
      category: "Barras de Bebidas",
      categoryIcon: "🍹",
      accent: "bg-blue-50 border-blue-200",
      services: [
        { icon: "☕", title: "Barra de Café Premium", desc: "Baristas profesionales con café de especialidad. La pausa ejecutiva que tu equipo merece.", href: "/barra-cafe-premium" },
        { icon: "🍹", title: "Barra de Bebidas", desc: "Barra completa para cenas de gala, premiaciones y eventos corporativos de fin de año.", href: "/barra-bebidas" },
        { icon: "🍸", title: "Cócteles y Mixología", desc: "Bartenders de autor para lanzamientos, inauguraciones y eventos de marca premium.", href: "/cocteles-mixologia" },
        { icon: "🧃", title: "Barra de Mocteles", desc: "Mocteles artesanales para eventos donde se requiere opción sin alcohol.", href: "/barra-mocteles" },
      ],
    },
    {
      category: "Decoración & Branding",
      categoryIcon: "💐",
      accent: "bg-green-50 border-green-200",
      services: [
        { icon: "💐", title: "Florería y Decoración", desc: "Decoración con identidad corporativa, señalética de marca y ambientación ejecutiva.", href: "/floreria-decoracion" },
        { icon: "🏛️", title: "Espacios para Eventos", desc: "Centros de convenciones, salones ejecutivos y venues premium para cualquier escala.", href: "/espacios-eventos" },
      ],
    },
    {
      category: "Fotografía & Video",
      categoryIcon: "📸",
      accent: "bg-purple-50 border-purple-200",
      services: [
        { icon: "📸", title: "Fotografía y Video", desc: "Cobertura profesional para comunicación interna, redes sociales y material institucional.", href: "/fotografia-video" },
      ],
    },
    {
      category: "Música & Entretenimiento",
      categoryIcon: "🎵",
      accent: "bg-indigo-50 border-indigo-200",
      services: [
        { icon: "🎵", title: "Música y DJ", desc: "Música de fondo para cenas de gala, posadas empresariales y eventos de integración.", href: "/musica" },
        { icon: "🎭", title: "Shows y Entretenimiento", desc: "Shows, conferencias motivacionales y entretenimiento para team building y premiaciones.", href: "/shows" },
      ],
    },
    {
      category: "Mobiliario Ejecutivo",
      categoryIcon: "🪑",
      accent: "bg-stone-50 border-stone-200",
      services: [
        { icon: "🪑", title: "Silla Tolix", desc: "Silla industrial y moderna para eventos corporativos con estilo contemporáneo.", href: "/sillas/silla-tolix" },
        { icon: "🪑", title: "Silla Avant Garde", desc: "Diseño ejecutivo y sofisticado para juntas, presentaciones y cenas de gala.", href: "/mesas-sillas" },
        { icon: "🪑", title: "Silla Gamma", desc: "Ergonómica y elegante. Ideal para conferencias y eventos de larga duración.", href: "/sillas/silla-gamma" },
      ],
    },
  ],

  "baby-shower": [
    {
      category: "Catering & Bocados",
      categoryIcon: "🍽️",
      accent: "bg-amber-50 border-amber-200",
      services: [
        { icon: "🥪", title: "Bocadillos", desc: "Bocadillos frescos y variados: sándwiches mini, brochetas, quiches y más para la tarde.", href: "/bocadillos" },
        { icon: "🫙", title: "Canapés Premium", desc: "Bocados elegantes de alto nivel para un baby shower sofisticado y memorable.", href: "/canapes-premium" },
        { icon: "🥐", title: "Desayuno Social", desc: "Brunch o desayuno completo para baby showers en formato matutino.", href: "/desayuno-social" },
      ],
    },
    {
      category: "Barras de Bebidas",
      categoryIcon: "🍹",
      accent: "bg-blue-50 border-blue-200",
      services: [
        { icon: "🧃", title: "Barra de Mocteles", desc: "Mocteles artesanales sin alcohol. Perfectos para mamá y todas las invitadas.", href: "/barra-mocteles" },
        { icon: "☕", title: "Barra de Café Premium", desc: "Café de especialidad con barista para el brunch del baby shower.", href: "/barra-cafe-premium" },
        { icon: "🍦", title: "Paletas y Helados", desc: "Carrito artesanal con paletas y helados temáticos en los colores del bebé.", href: "/paletas-helados" },
      ],
    },
    {
      category: "Mesas Personalizadas",
      categoryIcon: "🍰",
      accent: "bg-rose-50 border-rose-200",
      services: [
        { icon: "🍭", title: "Mesa de Dulces", desc: "Mesa temática diseñada con los colores del bebé: niño, niña o neutro.", href: "/mesa-dulces" },
        { icon: "🍰", title: "Mesa de Postres", desc: "Postres finos y pastel de baby shower presentados en estructura elegante.", href: "/mesa-postres" },
        { icon: "🧁", title: "Cupcakes Gourmet", desc: "Cupcakes decorados con la temática del baby shower. El detalle más fotografiado.", href: "/cupcakes-gourmet" },
        { icon: "🛒", title: "Carrito de Snacks", desc: "Carrito elegante con snacks y botanas para los invitados durante el evento.", href: "/carrito-snacks" },
      ],
    },
    {
      category: "Decoración & Flores",
      categoryIcon: "💐",
      accent: "bg-green-50 border-green-200",
      services: [
        { icon: "💐", title: "Florería y Decoración", desc: "Globos, flores, letreros y centros de mesa en la temática elegida para mamá.", href: "/floreria-decoracion" },
        { icon: "🏛️", title: "Espacios para Eventos", desc: "Salones y jardines íntimos para baby showers de todos los tamaños.", href: "/espacios-eventos" },
      ],
    },
    {
      category: "Fotografía",
      categoryIcon: "📸",
      accent: "bg-purple-50 border-purple-200",
      services: [
        { icon: "📸", title: "Fotografía y Video", desc: "Sesión de fotos con props, cobertura del evento y galería digital para compartir.", href: "/fotografia-video" },
      ],
    },
  ],

  cumpleanos: [
    {
      category: "Catering para la Fiesta",
      categoryIcon: "🍽️",
      accent: "bg-amber-50 border-amber-200",
      services: [
        { icon: "🥂", title: "Banquete Formal para Eventos", desc: "Cena completa con servicio de meseros para cumpleaños adultos y celebraciones elegantes.", href: "/banquetes" },
        { icon: "🌮", title: "Taquiza de Guisados", desc: "La segunda cena más popular. Tortillas a mano y guisados caseros para todas las edades.", href: "/taquiza-guisados" },
        { icon: "🥩", title: "Parrillada Argentina", desc: "Cortes premium a las brasas. Espectáculo gastronómico para cumpleaños de adultos.", href: "/parrillada-argentina" },
        { icon: "🍲", title: "Pozole y Tostadas", desc: "El clásico sabor mexicano para la segunda cena o el cierre de la fiesta.", href: "/pozole-tostadas" },
        { icon: "🍕", title: "Barra de Pizzas", desc: "Pizzas artesanales preparadas al momento. Los niños y jóvenes las adorarán.", href: "/barra-pizzas" },
      ],
    },
    {
      category: "Barras de Bebidas",
      categoryIcon: "🍹",
      accent: "bg-blue-50 border-blue-200",
      services: [
        { icon: "🍹", title: "Barra de Bebidas", desc: "Barra completa con cócteles, refrescos y aguas frescas para cumpleaños de adultos.", href: "/barra-bebidas" },
        { icon: "🧃", title: "Barra de Mocteles", desc: "Mocteles artesanales sin alcohol para todas las edades y todos los invitados.", href: "/barra-mocteles" },
        { icon: "☕", title: "Barra de Café Premium", desc: "Baristas con café de especialidad para el cierre de la celebración.", href: "/barra-cafe-premium" },
        { icon: "🍦", title: "Paletas y Helados", desc: "Carrito artesanal con paletas y helados gourmet. El detalle que todos recuerdan.", href: "/paletas-helados" },
      ],
    },
    {
      category: "Mesas Personalizadas",
      categoryIcon: "🍰",
      accent: "bg-rose-50 border-rose-200",
      services: [
        { icon: "🍭", title: "Mesa de Dulces", desc: "Mesa temática con dulces artesanales, chocolates y macarons en los colores del evento.", href: "/mesa-dulces" },
        { icon: "🍰", title: "Mesa de Postres", desc: "Pasteles, mousses, tartaletas y postres finos presentados en estructura elegante.", href: "/mesa-postres" },
        { icon: "🧁", title: "Cupcakes Gourmet", desc: "Cupcakes de autor en los colores y temática del cumpleaños. Sabor y diseño.", href: "/cupcakes-gourmet" },
        { icon: "🛒", title: "Carrito de Snacks", desc: "Palomitas, papas, nachos y snacks gourmet para la fiesta. Elegante y divertido.", href: "/carrito-snacks" },
      ],
    },
    {
      category: "Decoración & Flores",
      categoryIcon: "💐",
      accent: "bg-green-50 border-green-200",
      services: [
        { icon: "💐", title: "Florería y Decoración", desc: "Globos, flores, letreros y centros de mesa coordinados con la temática del festejado.", href: "/floreria-decoracion" },
        { icon: "🏛️", title: "Espacios para Eventos", desc: "Salones, jardines y terrazas para fiestas de cumpleaños de todos los tamaños.", href: "/espacios-eventos" },
      ],
    },
    {
      category: "Fotografía & Video",
      categoryIcon: "📸",
      accent: "bg-purple-50 border-purple-200",
      services: [
        { icon: "📸", title: "Fotografía y Video", desc: "Cobertura del evento, sesión de fotos y galería digital. Recuerdos para siempre.", href: "/fotografia-video" },
      ],
    },
    {
      category: "Música & Entretenimiento",
      categoryIcon: "🎵",
      accent: "bg-indigo-50 border-indigo-200",
      services: [
        { icon: "🎵", title: "Música y DJ", desc: "DJ con repertorio adaptado a la edad del festejado. Toda la noche de fiesta.", href: "/musica" },
        { icon: "🎭", title: "Shows y Entretenimiento", desc: "Cámara 360, photobooth, magos, payasos y shows para todas las edades.", href: "/shows" },
        { icon: "🎪", title: "Inflables", desc: "Castillos inflables y juegos para fiestas infantiles. Diversión para los pequeños.", href: "/inflables" },
      ],
    },
  ],

  graduaciones: [
    {
      category: "Catering para la Celebración",
      categoryIcon: "🍽️",
      accent: "bg-amber-50 border-amber-200",
      services: [
        { icon: "🥂", title: "Banquete Formal para Eventos", desc: "Cena de gala para graduaciones universitarias. Protocolo y elegancia impecables.", href: "/banquetes" },
        { icon: "🫙", title: "Canapés Premium", desc: "Cóctel post-ceremonia con canapés de alto nivel y brindis especial.", href: "/canapes-premium" },
        { icon: "🌮", title: "Taquiza de Guisados", desc: "La segunda cena de la noche. La fiesta no termina con los tacos.", href: "/taquiza-guisados" },
        { icon: "🥩", title: "Parrillada Argentina", desc: "Parrillada premium para la fiesta de graduación. Espectáculo y sabor.", href: "/parrillada-argentina" },
        { icon: "🍲", title: "Pozole y Tostadas", desc: "El clásico sabor mexicano para la segunda cena de la noche.", href: "/pozole-tostadas" },
      ],
    },
    {
      category: "Barras de Bebidas",
      categoryIcon: "🍹",
      accent: "bg-blue-50 border-blue-200",
      services: [
        { icon: "🍹", title: "Barra de Bebidas", desc: "Barra libre completa para la fiesta de graduación. Todo lo que los egresados merecen.", href: "/barra-bebidas" },
        { icon: "🍸", title: "Cócteles y Mixología", desc: "Cócteles de autor y mixología artesanal para festejar el logro con estilo.", href: "/cocteles-mixologia" },
        { icon: "☕", title: "Barra de Café Premium", desc: "Café de especialidad con barista para el cóctel post-ceremonia.", href: "/barra-cafe-premium" },
      ],
    },
    {
      category: "Mesas & Postres",
      categoryIcon: "🍰",
      accent: "bg-rose-50 border-rose-200",
      services: [
        { icon: "🍭", title: "Mesa de Dulces", desc: "Mesa temática con los colores de la institución o la temática elegida.", href: "/mesa-dulces" },
        { icon: "🧁", title: "Cupcakes Gourmet", desc: "Cupcakes personalizados con el nombre del egresado o la generación.", href: "/cupcakes-gourmet" },
      ],
    },
    {
      category: "Decoración & Flores",
      categoryIcon: "💐",
      accent: "bg-green-50 border-green-200",
      services: [
        { icon: "💐", title: "Florería y Decoración", desc: "Decoración institucional con los colores de la universidad o preparatoria.", href: "/floreria-decoracion" },
        { icon: "🏛️", title: "Espacios para Eventos", desc: "Salones y venues para ceremonias de entrega de diplomas y fiestas de graduación.", href: "/espacios-eventos" },
      ],
    },
    {
      category: "Fotografía & Video",
      categoryIcon: "📸",
      accent: "bg-purple-50 border-purple-200",
      services: [
        { icon: "📸", title: "Fotografía y Video", desc: "Cobertura de la ceremonia y la fiesta. Galería compartida para toda la generación.", href: "/fotografia-video" },
      ],
    },
    {
      category: "Música & Entretenimiento",
      categoryIcon: "🎵",
      accent: "bg-indigo-50 border-indigo-200",
      services: [
        { icon: "🎵", title: "Música y DJ", desc: "DJ con el repertorio de la generación. La noche que todos esperaron.", href: "/musica" },
        { icon: "🎭", title: "Shows y Entretenimiento", desc: "Cámara 360, photobooth y shows para hacer la noche de graduación épica.", href: "/shows" },
      ],
    },
  ],

  "primera-comunion": [
    {
      category: "Catering & Recepción",
      categoryIcon: "🍽️",
      accent: "bg-amber-50 border-amber-200",
      services: [
        { icon: "🥂", title: "Banquete Formal para Eventos", desc: "Cena o almuerzo familiar con servicio de meseros. Presentación impecable para el día sagrado.", href: "/banquetes" },
        { icon: "🥩", title: "Parrillada Argentina", desc: "Almuerzo festivo con parrillada a las brasas. Reunión familiar en torno a la comida.", href: "/parrillada-argentina" },
        { icon: "🫙", title: "Canapés Premium", desc: "Bocados elegantes para el cóctel post-misa. Primera impresión perfecta.", href: "/canapes-premium" },
      ],
    },
    {
      category: "Barras de Bebidas",
      categoryIcon: "🍹",
      accent: "bg-blue-50 border-blue-200",
      services: [
        { icon: "🧃", title: "Barra de Mocteles", desc: "Mocteles artesanales sin alcohol. Perfectos para toda la familia, incluidos los niños.", href: "/barra-mocteles" },
        { icon: "🍹", title: "Barra de Bebidas", desc: "Barra completa con opciones para adultos y menores. Todo incluido.", href: "/barra-bebidas" },
        { icon: "☕", title: "Barra de Café Premium", desc: "Café de especialidad con barista para los adultos durante la recepción.", href: "/barra-cafe-premium" },
        { icon: "🍦", title: "Paletas y Helados", desc: "Carrito artesanal con paletas y helados. Los niños no pueden resistirlo.", href: "/paletas-helados" },
      ],
    },
    {
      category: "Mesas Personalizadas",
      categoryIcon: "🍰",
      accent: "bg-rose-50 border-rose-200",
      services: [
        { icon: "🍭", title: "Mesa de Dulces", desc: "Mesa temática en blanco y dorado o los colores elegidos. Elegante y especial.", href: "/mesa-dulces" },
        { icon: "🍰", title: "Mesa de Postres", desc: "Pastel de Primera Comunión y postres finos presentados en estructura decorativa.", href: "/mesa-postres" },
        { icon: "🧁", title: "Cupcakes Gourmet", desc: "Cupcakes decorados con motivos religiosos o temáticos del evento.", href: "/cupcakes-gourmet" },
      ],
    },
    {
      category: "Decoración & Flores",
      categoryIcon: "💐",
      accent: "bg-green-50 border-green-200",
      services: [
        { icon: "💐", title: "Florería y Decoración", desc: "Decoración en blanco y dorado con flores naturales. Elegancia y solemnidad.", href: "/floreria-decoracion" },
        { icon: "🏛️", title: "Espacios para Eventos", desc: "Jardines y salones para recepciones de Primera Comunión de todos los tamaños.", href: "/espacios-eventos" },
      ],
    },
    {
      category: "Fotografía",
      categoryIcon: "📸",
      accent: "bg-purple-50 border-purple-200",
      services: [
        { icon: "📸", title: "Fotografía y Video", desc: "Cobertura de la misa, la recepción y los momentos familiares. Recuerdos eternos.", href: "/fotografia-video" },
      ],
    },
    {
      category: "Entretenimiento",
      categoryIcon: "🎪",
      accent: "bg-indigo-50 border-indigo-200",
      services: [
        { icon: "🎪", title: "Inflables", desc: "Castillos inflables y juegos para los niños. La fiesta familiar perfecta.", href: "/inflables" },
        { icon: "🎭", title: "Shows y Entretenimiento", desc: "Magos, payasos y animadores para entretener a los pequeños durante el evento.", href: "/shows" },
      ],
    },
  ],

  cenas: [
    {
      category: "Catering para la Cena",
      categoryIcon: "🍽️",
      accent: "bg-amber-50 border-amber-200",
      services: [
        { icon: "🥂", title: "Banquete Formal para Eventos", desc: "Cena completa con protocolo de banquete: aperitivo, sopa, ensalada, plato fuerte y postre.", href: "/banquetes" },
        { icon: "🥘", title: "Paella Valenciana", desc: "Paella auténtica preparada frente a los invitados. El plato estrella de cualquier cena.", href: "/paella" },
        { icon: "🫙", title: "Canapés Premium", desc: "Aperitivo de alto nivel para iniciar la cena con la primera impresión perfecta.", href: "/canapes-premium" },
        { icon: "🍣", title: "Barra de Sushi", desc: "Rolls y nigiri preparados al momento. Sofisticación y frescura para cenas especiales.", href: "/barra-sushi" },
        { icon: "🥩", title: "Parrillada Argentina", desc: "Cortes premium a las brasas para cenas informales y elegantes con sabor espectacular.", href: "/parrillada-argentina" },
      ],
    },
    {
      category: "Barras de Bebidas",
      categoryIcon: "🍹",
      accent: "bg-blue-50 border-blue-200",
      services: [
        { icon: "🍹", title: "Barra de Bebidas", desc: "Barra completa con cócteles, vinos, destilados y bebidas sin alcohol para la cena.", href: "/barra-bebidas" },
        { icon: "🍸", title: "Cócteles y Mixología", desc: "Bartenders de autor con cócteles diseñados especialmente para la ocasión.", href: "/cocteles-mixologia" },
        { icon: "☕", title: "Barra de Café Premium", desc: "El cierre perfecto de la cena con café de especialidad y postres.", href: "/barra-cafe-premium" },
      ],
    },
    {
      category: "Mesas & Postres",
      categoryIcon: "🍰",
      accent: "bg-rose-50 border-rose-200",
      services: [
        { icon: "🧀", title: "Mesa de Quesos", desc: "Tabla de quesos europeos, embutidos y complementos gourmet. El maridaje perfecto.", href: "/mesa-quesos" },
        { icon: "🍰", title: "Mesa de Postres", desc: "Postres finos presentados en estructura elegante para el cierre dulce de la cena.", href: "/mesa-postres" },
      ],
    },
    {
      category: "Decoración & Espacio",
      categoryIcon: "💐",
      accent: "bg-green-50 border-green-200",
      services: [
        { icon: "💐", title: "Florería y Decoración", desc: "Centros de mesa florales, velas y ambientación para cenas íntimas y elegantes.", href: "/floreria-decoracion" },
        { icon: "🏛️", title: "Espacios para Eventos", desc: "Salones y venues con la atmósfera ideal para cenas de gala y cenas privadas.", href: "/espacios-eventos" },
      ],
    },
    {
      category: "Fotografía & Música",
      categoryIcon: "📸",
      accent: "bg-purple-50 border-purple-200",
      services: [
        { icon: "📸", title: "Fotografía y Video", desc: "Cobertura fotográfica de la cena para recuerdos y comunicación del evento.", href: "/fotografia-video" },
        { icon: "🎵", title: "Música y DJ", desc: "Música de fondo en vivo o DJ para la cena. Ambiente y entretenimiento en uno.", href: "/musica" },
      ],
    },
  ],

  comidas: [
    {
      category: "Catering para la Comida",
      categoryIcon: "🍽️",
      accent: "bg-amber-50 border-amber-200",
      services: [
        { icon: "🍽️", title: "Comida Corrida", desc: "Servicio de comida del mediodía: sopa, guisado, frijoles, postre y agua. Servicio diario o por evento.", href: "/comida-corrida" },
        { icon: "🥂", title: "Banquete Formal para Eventos", desc: "Almuerzo de gala con protocolo completo para comidas de negocios y celebraciones.", href: "/banquetes" },
        { icon: "🌮", title: "Taquiza de Guisados", desc: "La comida más popular en México. Taquitos de guisado al momento en cazuelas de barro.", href: "/taquiza-guisados" },
        { icon: "🥘", title: "Paella Valenciana", desc: "Paella auténtica preparada en el lugar. El plato estrella para comidas especiales.", href: "/paella" },
        { icon: "🍲", title: "Pozole y Tostadas", desc: "El pozole más auténtico: rojo, blanco o verde con todos los toppings tradicionales.", href: "/pozole-tostadas" },
        { icon: "🥩", title: "Parrillada Argentina", desc: "Parrillada familiar con cortes premium. El festín de mediodia que todos esperan.", href: "/parrillada-argentina" },
      ],
    },
    {
      category: "Barras de Bebidas",
      categoryIcon: "🍹",
      accent: "bg-blue-50 border-blue-200",
      services: [
        { icon: "🍹", title: "Barra de Bebidas", desc: "Aguas frescas, refrescos y cócteles para acompañar la comida.", href: "/barra-bebidas" },
        { icon: "☕", title: "Barra de Café Premium", desc: "Café de especialidad para el cierre de la comida. El digestivo perfecto.", href: "/barra-cafe-premium" },
      ],
    },
    {
      category: "Postres & Dulces",
      categoryIcon: "🍰",
      accent: "bg-rose-50 border-rose-200",
      services: [
        { icon: "🍰", title: "Mesa de Postres", desc: "Postres del mediodía: pays, gelatinas, flanes y dulces tradicionales.", href: "/mesa-postres" },
      ],
    },
    {
      category: "Espacio & Decoración",
      categoryIcon: "🏛️",
      accent: "bg-green-50 border-green-200",
      services: [
        { icon: "🏛️", title: "Espacios para Eventos", desc: "Jardines, salones y terrazas para comidas familiares y empresariales.", href: "/espacios-eventos" },
        { icon: "💐", title: "Florería y Decoración", desc: "Decoración de mesa para comidas de gala y celebraciones especiales del mediodía.", href: "/floreria-decoracion" },
      ],
    },
  ],

  desayunos: [
    {
      category: "Catering para el Desayuno",
      categoryIcon: "🍽️",
      accent: "bg-amber-50 border-amber-200",
      services: [
        { icon: "🥐", title: "Desayuno Social", desc: "Desayuno completo para eventos: huevos, pan, fruta, jugo y café. Perfecto para todas las ocasiones.", href: "/desayuno-social" },
        { icon: "☕", title: "Coffee Break Ejecutivo", desc: "Pausa matutina con café de especialidad, pan dulce y bocadillos gourmet.", href: "/coffee-break" },
        { icon: "🥪", title: "Bocadillos", desc: "Bocadillos frescos y ligeros ideales para desayunos ejecutivos y reuniones matutinas.", href: "/bocadillos" },
      ],
    },
    {
      category: "Barras de Bebidas",
      categoryIcon: "🍹",
      accent: "bg-blue-50 border-blue-200",
      services: [
        { icon: "☕", title: "Barra de Café Premium", desc: "Baristas profesionales con café de especialidad, americano, espresso, cappuccino y más.", href: "/barra-cafe-premium" },
        { icon: "🧃", title: "Barra de Mocteles", desc: "Jugos naturales, smoothies y bebidas refrescantes sin alcohol para el desayuno.", href: "/barra-mocteles" },
      ],
    },
    {
      category: "Postres & Dulces",
      categoryIcon: "🍰",
      accent: "bg-rose-50 border-rose-200",
      services: [
        { icon: "🍰", title: "Mesa de Postres", desc: "Repostería fina, pays y postres del desayuno para completar la experiencia.", href: "/mesa-postres" },
        { icon: "🧁", title: "Cupcakes Gourmet", desc: "Cupcakes artesanales de sabores de desayuno: limón, canela, moka y vainilla.", href: "/cupcakes-gourmet" },
      ],
    },
    {
      category: "Espacio",
      categoryIcon: "🏛️",
      accent: "bg-green-50 border-green-200",
      services: [
        { icon: "🏛️", title: "Espacios para Eventos", desc: "Salones y terrazas con vista para desayunos y brunchs de empresa o familia.", href: "/espacios-eventos" },
        { icon: "💐", title: "Florería y Decoración", desc: "Ambientación fresca y luminosa para desayunos especiales y brunchs de celebración.", href: "/floreria-decoracion" },
      ],
    },
  ],

  lanzamientos: [
    {
      category: "Catering del Evento",
      categoryIcon: "🍽️",
      accent: "bg-amber-50 border-amber-200",
      services: [
        { icon: "🫙", title: "Canapés Premium", desc: "Bocados de alto nivel para el cocktail de lanzamiento. Primera impresión de lujo.", href: "/canapes-premium" },
        { icon: "🥪", title: "Bocadillos", desc: "Bocadillos frescos y variados para recepciones de lanzamiento de producto.", href: "/bocadillos" },
        { icon: "🍣", title: "Barra de Sushi", desc: "Sushi premium preparado frente a los invitados. El toque sofisticado del evento.", href: "/barra-sushi" },
      ],
    },
    {
      category: "Barras de Bebidas",
      categoryIcon: "🍹",
      accent: "bg-blue-50 border-blue-200",
      services: [
        { icon: "🍹", title: "Barra de Bebidas", desc: "Barra completa para el cocktail del lanzamiento. Todo lo que tus invitados esperan.", href: "/barra-bebidas" },
        { icon: "🍸", title: "Cócteles y Mixología", desc: "Cócteles de autor diseñados con los colores o concepto de tu marca.", href: "/cocteles-mixologia" },
        { icon: "☕", title: "Barra de Café Premium", desc: "Café de especialidad para lanzamientos matutinos o vespertinos.", href: "/barra-cafe-premium" },
      ],
    },
    {
      category: "Decoración & Branding",
      categoryIcon: "💐",
      accent: "bg-green-50 border-green-200",
      services: [
        { icon: "💐", title: "Florería y Decoración", desc: "Decoración con identidad visual de marca: colores corporativos, señalética y ambientación.", href: "/floreria-decoracion" },
        { icon: "🏛️", title: "Espacios para Eventos", desc: "Venues premium, showrooms y espacios de diseño para lanzamientos de alto impacto.", href: "/espacios-eventos" },
      ],
    },
    {
      category: "Fotografía & Video",
      categoryIcon: "📸",
      accent: "bg-purple-50 border-purple-200",
      services: [
        { icon: "📸", title: "Fotografía y Video", desc: "Cobertura profesional del lanzamiento para redes sociales, comunicados y archivo.", href: "/fotografia-video" },
      ],
    },
    {
      category: "Música & Shows",
      categoryIcon: "🎵",
      accent: "bg-indigo-50 border-indigo-200",
      services: [
        { icon: "🎵", title: "Música y DJ", desc: "Música de ambiente o DJ para el cocktail y la fiesta posterior al lanzamiento.", href: "/musica" },
        { icon: "🎭", title: "Shows y Entretenimiento", desc: "Artistas, shows en vivo y entretenimiento para dar el cierre perfecto al lanzamiento.", href: "/shows" },
      ],
    },
  ],
};

const EVENT_HERO_IMAGES: Record<string, string> = {
  bodas:             '/images/instagram/ig10.jpg',
  'xv-anos':         '/images/instagram/ig50.jpg',
  corporativos:      '/images/instagram/ig90.jpg',
  'baby-shower':     '/images/instagram/ig130.jpg',
  cumpleanos:        '/images/instagram/ig170.jpg',
  graduaciones:      '/images/instagram/ig20.jpg',
  'primera-comunion':'/images/instagram/ig70.jpg',
  cenas:             '/images/instagram/ig110.jpg',
  comidas:           '/images/instagram/ig150.jpg',
  desayunos:         '/images/instagram/ig35.jpg',
  lanzamientos:      '/images/instagram/ig75.jpg',
};

interface EventTypePageProps {
  product: ProductData;
}

export default function EventTypePage({ product }: EventTypePageProps) {
  const waUrl = WA_MSG(product.title);
  const groups = EVENT_SERVICES[product.slug] ?? [];
  const shortName = product.title.replace(/^Servicios para\s+/i, '');

  useEffect(() => {
    document.title = buildSeoTitle(product.seoTitle);
  }, [product.seoTitle]);

  return (
    <div className="min-h-screen bg-white">

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden bg-[#162040]" style={{ minHeight: '280px' }}>
        <OptimizedImage
          src={EVENT_HERO_IMAGES[product.slug] ?? '/images/galeria/g3.jpg'}
          alt=""
          aria-hidden="true"
          priority
          width={1200}
          height={675}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[#162040]/55" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-5 font-serif flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-white/90">Tipo de Evento</span>
            <span>/</span>
            <span className="text-white/80">{product.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-serif font-bold leading-tight mb-4 text-white">
            {product.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-serif mb-8 leading-relaxed max-w-2xl">
            {product.headline}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-6 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <WaSvg /> Cotizar por WhatsApp
            </a>
            <a
              href="tel:5215540080373"
              className="flex items-center gap-2 bg-[#162040] hover:bg-[#0f1830] border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold font-serif transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              Llamar ahora
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. OTROS TIPOS DE EVENTO ── */}
      {(product.related ?? []).length > 0 && (
        <section className="bg-[#162040] py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-white/60 font-serif mr-2 shrink-0">Tipo de Evento:</span>
              {(product.related ?? []).map(r => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="px-3 py-1.5 bg-white border border-white rounded-full text-sm font-serif text-[#162040] hover:bg-[#162040] hover:text-white transition-all duration-300 hover:scale-105"
                >
                  {r.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. DESCRIPCIÓN + GALERÍA ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#162040] mb-6">
                {product.headline}
              </h2>
              <div className="space-y-4">
                {(product.description ?? []).map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed font-serif text-lg">{para}</p>
                ))}
              </div>
            </div>
            <div className="lg:sticky lg:top-24">
              <EventGalleryCarousel slug={product.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3b. BANNER "LISTO PARA COTIZAR" ── */}
      <section className="bg-[#162040] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
                <WaSvg />
              </div>
              <div>
                <p className="font-bold font-serif text-white text-lg">¿Listo para cotizar?</p>
                <div className="flex flex-wrap gap-4 text-xs text-white/60 font-serif mt-1">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-white" /> Cotización sin compromiso</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-white" /> +1,000 eventos realizados</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-white" /> Garantía Bodasesor</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap justify-center md:justify-end">
              <a
                href={waUrl}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#162040] px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <WaSvg /> Cotizar por WhatsApp
              </a>
              <a
                href="tel:5215540080373"
                className="flex items-center gap-2 border-2 border-white/40 text-white px-7 py-3 rounded-xl font-semibold font-serif hover:bg-white hover:text-[#162040] hover:border-white transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                55 4008 0373
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SERVICIOS DISPONIBLES ── */}
      {groups.length > 0 && (
        <section className="py-16 bg-[#f5efe8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
                Servicios disponibles para {shortName}
              </h2>
              <p className="text-gray-600 mt-3 font-serif max-w-2xl mx-auto">
                Un solo proveedor para coordinar todos los servicios de tu evento. Sin estrés, sin intermediarios.
              </p>
            </div>

            <div className="space-y-14">
              {groups.map((group, gi) => (
                <div key={gi}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-[#162040] flex items-center justify-center flex-shrink-0">
                      <ServiceIcon emoji={group.categoryIcon} className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#162040]">{group.category}</h3>
                    <div className="flex-1 h-px bg-[#162040]/15 ml-2" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.services.map((svc, si) => (
                      <div
                        key={si}
                        className={`bg-white rounded-2xl border p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 flex flex-col ${group.accent}`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-9 h-9 rounded-xl bg-[#162040]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <ServiceIcon emoji={svc.icon} className="w-5 h-5 text-[#162040]" />
                          </div>
                          <h4 className="font-serif font-bold text-[#162040] leading-tight">{svc.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 font-serif leading-relaxed flex-1 mb-4">{svc.desc}</p>
                        <div className="flex gap-2 mt-auto">
                          <Link
                            href={svc.href}
                            className="flex items-center gap-1.5 flex-1 justify-center bg-[#162040]/10 text-[#162040] border border-[#162040]/20 text-xs font-bold font-serif py-2 rounded-lg hover:bg-[#162040] hover:text-white transition-all duration-300"
                          >
                            Ver detalles <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <a
                            href={WA_MSG(svc.title)}
                            target="_blank" rel="noopener noreferrer"
                            aria-label={`Cotizar ${svc.title} por WhatsApp`}
                            className="flex items-center gap-1 bg-[#0d6849] hover:bg-[#0a5740] text-white text-xs font-bold font-serif px-3 py-2 rounded-lg transition-all duration-300 hover:scale-110"
                          >
                            <WaSvg aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. POR QUÉ ELEGIRNOS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">¿Por qué elegir Bodasesor?</h2>
            <p className="text-gray-600 mt-3 font-serif">Más de 15 años coordinando eventos en toda la república mexicana</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: CheckCircle2, title: "Un solo contacto", desc: "Coordinamos todos los proveedores de tu evento. Tú solo hablas con nosotros." },
              { Icon: Star, title: "Más de 1,000 eventos", desc: "15 años de experiencia en bodas, XV años, corporativos y más en todo México." },
              { Icon: Shield, title: "Garantía de calidad", desc: "Todos nuestros proveedores son auditados y cumplen nuestros estándares." },
              { Icon: MessageCircle, title: "Respuesta en 1 hora", desc: "Cotización personalizada en menos de una hora. Rápido, fácil y sin compromiso." },
            ].map((item, i) => (
              <div key={i} className="bg-[#f5efe8] rounded-2xl p-6 text-center hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[#162040] flex items-center justify-center mx-auto mb-4">
                  <item.Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif font-bold text-[#162040] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 font-serif">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA FINAL ── */}
      <GalleryCarouselSection />

      <section className="py-16 bg-[#162040] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            ¿Listo para organizar tu {shortName}?
          </h2>
          <p className="text-[#f5efe8] font-serif text-lg mb-8">
            Escríbenos hoy y recibe una cotización personalizada sin compromiso en menos de una hora.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={waUrl}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#162040] px-8 py-4 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105"
            >
              <WaSvg /> Cotizar por WhatsApp
            </a>
            <a
              href="tel:5215540080373"
              className="flex items-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold font-serif text-lg hover:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5" />
              55 4008 0373
            </a>
          </div>
          <p className="mt-6 text-sm text-[#8a9bb5] font-serif flex items-center justify-center gap-2">
            <ExternalLink className="w-4 h-4" />
            También puedes explorar todos nuestros servicios desde el menú superior
          </p>
        </div>
      </section>
    </div>
  );
}
