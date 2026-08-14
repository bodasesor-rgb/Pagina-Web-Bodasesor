import { useEffect, useState, lazy, Suspense } from "react";
import CityLink from "../components/CityLink";
const Link = CityLink;
import { useCity } from "../context/CityContext";
import { getCityHubContent } from "../data/city-hub-content";
import GalleryCarouselSection from "../components/GalleryCarousel";
import ProductGalleryCarousel from "../components/ProductGalleryCarousel";
import { HERO_IMAGES } from "../data/product-galleries";
import OptimizedImage from "../components/OptimizedImage";
import SeoRelatedLinks from "../components/SeoRelatedLinks";
import Breadcrumbs from "../components/Breadcrumbs";
import HighlightKeywords from "../components/HighlightKeywords";
import { getProductBySlugAsync } from "../data/products-loader";
import { buildNationalServiceCopy } from "../utils/national-service-copy";
import { toSpanishTitleCase, buildHighlightKeywords } from "../utils/spanish-title-case";
import { applyPageSeo, upsertJsonLd, absoluteUrl } from "../utils/seo-head";
import { stripCityFromSlug } from "../utils/city-url";
import { buildFaqPageJsonLd, buildServiceCityJsonLd, defaultServiceFaqs } from "../utils/seo-meta";
const EventTypePage = lazy(() => import("./EventTypePage"));
import {
  Utensils, UtensilsCrossed, Wine, Beer, Coffee, Mic, Music, Headphones, Volume2,
  Camera, Truck, Car, Package, Building2, Landmark, Castle, Factory, Flame,
  Snowflake, Cloud, Droplets, Calendar, Clock, Timer, DollarSign, Phone, Mail,
  MessageCircle, Shield, Heart, Star, Trophy, Crown, Gift, Sparkles, Zap, Wrench,
  Leaf, Flower2, Sprout, ChefHat, Salad, Fish, Apple, Wheat, IceCream, Candy,
  Pizza, Cake, ClipboardList, FileText, Ruler, Image, Palette, Map, Rocket,
  UserCheck, Sofa, Theater, GraduationCap, Lightbulb, ShoppingCart, Handshake,
  Dumbbell, Laptop, CheckCircle2, Music2, Layers, Brush, Globe, Stethoscope,
  BarChart3, RefreshCw, Ban, Armchair, Tent, Egg, Milk, Ribbon, Users,
  MapPin, PartyPopper,
  type LucideIcon,
} from "lucide-react";

const WHATSAPP_NUMBER = "5215540080373";
const WA_MSG = (title: string) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Hola%2C%20me%20interesa%20cotizar%3A%20${encodeURIComponent(title)}`;

function ServicioNoEncontrado() {
  useEffect(() => {
    const prev = document.querySelector('meta[name="robots"]')?.getAttribute('content')
    let el = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', 'robots')
      document.head.appendChild(el)
    }
    el.setAttribute('content', 'noindex, follow')
    applyPageSeo({
      title: 'Servicio no encontrado',
      description: 'La página de servicio que buscas aún no está disponible. Cotiza con Bodasesor por WhatsApp.',
      path: '/',
      h1: 'Servicio no encontrado',
    })
    return () => {
      if (el && prev) el.setAttribute('content', prev)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5efe8] text-[#162040]">
      <h1 className="text-4xl font-serif font-bold mb-4">Servicio no encontrado</h1>
      <p className="text-lg mb-8 text-gray-600">Aún estamos preparando esta página.</p>
      <a
        href={WA_MSG('información de servicios')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#0d6849] text-white px-6 py-3 rounded-xl font-bold font-serif hover:bg-[#0a5740] transition-colors"
      >
        <WaSvg /> Cotizar por WhatsApp
      </a>
      <Link href="/" className="mt-4 text-[#162040] underline font-serif">
        ← Volver al inicio
      </Link>
    </div>
  )
}

// ── WhatsApp SVG icon ────────────────────────────────────────────────────────
const WaSvg = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// ── Emoji → Lucide icon mapping ──────────────────────────────────────────────
const EMOJI_MAP: Record<string, LucideIcon> = {
  // Food & drink
  '🍽️': Utensils, '🥗': Salad, '🍝': UtensilsCrossed, '🌮': Utensils,
  '🌭': UtensilsCrossed, '🍔': UtensilsCrossed, '🍕': Pizza, '🍣': Fish, '🍦': IceCream,
  '🍫': Candy, '🍭': Candy, '🍰': Cake, '🎂': Cake, '🍲': UtensilsCrossed,
  '🍷': Wine, '🍸': Wine, '🍹': Wine, '🍾': Wine, '🥂': Wine,
  '🥃': Wine, '🍺': Beer, '🍻': Beer, '☕': Coffee, '🥐': Utensils,
  '🥖': Utensils, '🥘': UtensilsCrossed, '🥙': Utensils,
  '🥚': Egg, '🥛': Milk, '🥜': Leaf, '🥞': Layers, '🍄': Leaf,
  '🍅': Apple, '🍊': Apple, '🍋': Apple, '🍎': Apple, '🍓': Apple,
  '🍞': Utensils, '🍟': Utensils, '🍖': Utensils, '🍗': Utensils,
  '🍚': Utensils, '🍯': Droplets, '🍿': Layers, '🦃': Utensils,
  '🦐': Fish, '🐟': Fish, '🐷': Utensils, '🧀': Utensils,
  '🌽': Wheat, '🌾': Wheat, '🥑': Leaf, '🥒': Leaf,
  // Drinks
  '💦': Droplets, '❄️': Snowflake, '🌫️': Cloud,
  // Events & entertainment
  '🎤': Mic, '🎵': Music, '🎶': Music2, '🎧': Headphones, '🔊': Volume2,
  '🎭': Theater, '🎪': Tent, '🎬': Camera, '📸': Camera, '📷': Camera,
  '🎨': Palette, '👩‍🎨': Brush, '🖼️': Image,
  // Party & celebrations
  '🎊': PartyPopper, '🎈': PartyPopper, '🎀': Ribbon, '🎁': Gift,
  '🎄': Sprout, '🏆': Trophy, '👑': Crown, '💫': Sparkles, '✨': Sparkles,
  '⭐': Star, '🌟': Star,
  // Business & services
  '💰': DollarSign, '📋': ClipboardList, '📝': FileText, '📊': BarChart3,
  '💡': Lightbulb, '🔧': Wrench, '⚙️': Wrench, '📅': Calendar,
  '⏱️': Timer, '⏰': Clock, '🔄': RefreshCw, '🚀': Rocket,
  '💻': Laptop, '📦': Package, '🛒': ShoppingCart, '📞': Phone,
  '💬': MessageCircle, '💌': Mail, '🤝': Handshake, '🛡️': Shield,
  '⚡': Zap, '💪': Dumbbell, '🌐': Globe, '📏': Ruler, '📐': Ruler,
  '🎓': GraduationCap, '👨‍⚕️': Stethoscope,
  // Spaces & places
  '🏛️': Landmark, '🏢': Building2, '🏭': Factory, '🏰': Castle,
  '🏗️': Building2, '🏺': Layers, '🗺️': Map, '📍': MapPin,
  '🛋️': Sofa, '🪑': Armchair,
  // People
  '👰': Heart, '🤵': UserCheck, '👨‍🍳': ChefHat, '💆': Heart,
  '👥': Users,
  // Nature & decor
  '🌱': Sprout, '🌿': Leaf, '🌸': Flower2, '🌹': Flower2, '💐': Flower2,
  '🌶️': Flame, '🔥': Flame,
  // Travel
  '🚚': Truck, '🚗': Car, '🚁': Rocket, '🚫': Ban,
  // Misc
  '✅': CheckCircle2, '✝️': Star, '✡️': Star, '🎛️': Wrench,
  '🥄': Utensils, '🌍': Globe, '💎': Sparkles,
};

function IconFromEmoji({ emoji, className = "w-6 h-6" }: { emoji: string; className?: string }) {
  const Icon = EMOJI_MAP[emoji] ?? Star;
  return <Icon className={className} />;
}

// ── Catálogo completo de mobiliario ───────────────────────────────────────────
const SILLAS_CATALOG: { name: string; img: string | null; href: string }[] = [
  { name: 'Silla Tiffany', img: '/images/mesas/silla-tiffany.jpg', href: '/sillas/tiffany' },
  { name: 'Silla Ghost', img: '/images/mesas/silla-ghost.jpg', href: '/sillas/ghost' },
  { name: 'Silla Smith', img: '/images/mesas/silla-smith.jpg', href: '/sillas/smith' },
  { name: 'Silla Camila', img: '/images/mesas/silla-camila.jpg', href: '/sillas/camila' },
  { name: 'Silla Basket', img: '/images/mesas/silla-basket.jpg', href: '/sillas/basket' },
  { name: 'Silla Antonella', img: '/images/mesas/silla-antonella.jpg', href: '/sillas/antonella' },
  { name: 'Silla Crossback', img: '/images/mesas/silla-crossback.jpg', href: '/sillas/crossback' },
  { name: 'Silla Wishbone', img: '/images/mesas/silla-wishbone.jpg', href: '/sillas/wishbone' },
  { name: 'Silla Louis XV', img: '/images/mesas/silla-louis-xv.jpg', href: '/sillas/louis-xv' },
  { name: 'Silla Mariantonieta', img: '/images/mesas/silla-mariantonieta.jpg', href: '/sillas/mariantonieta' },
  { name: 'Silla Avant Garde', img: '/images/mesas/silla-avant-garde.jpg', href: '/sillas/avant-garde' },
  { name: 'Silla Tolix', img: '/images/mesas/silla-tolix.jpg', href: '/sillas/tolix' },
  { name: 'Sillón de Novios', img: '/images/mesas/sillon-novios.jpg', href: '/sillas/sillon-novios' },
  { name: 'Silla Tiffany Infantil', img: '/images/mesas/silla-tiffany-infantil.jpg', href: '/sillas/tiffany-infantil' },
  { name: 'Silla Cabos', img: null, href: '/sillas/cabos' },
  { name: 'Silla Caroline', img: null, href: '/sillas/caroline' },
  { name: 'Silla María', img: null, href: '/sillas/maria' },
  { name: 'Silla Gamma', img: null, href: '/sillas/gamma' },
];

const MESAS_CATALOG = [
  { name: 'Mesa Redonda', img: '/images/mesas/mesa-redonda-caoba.jpg', href: '/mesas/redonda' },
  { name: 'Mesa Cuadrada', img: '/images/mesas/mesa-cuadrada-marmol-blanca.jpg', href: '/mesas/cuadrada' },
  { name: 'Tablón', img: '/images/mesas/tablon-caoba-natural.jpg', href: '/mesas/tablon' },
  { name: 'Mesa Serpentina', img: '/images/mesas/mesa-serpentina.jpg', href: '/mesas/serpentina' },
  { name: 'Mesa de Picnic', img: '/images/mesas/mesa-picnic.jpg', href: '/mesas/picnic' },
  { name: 'Tablón Infantil', img: '/images/mesas/tablon-infantil.jpg', href: '/mesas/tablon-infantil' },
];

const COMBINACIONES_CATALOG = [
  { label: 'Mesa Redonda + Silla Tiffany', img: '/images/mesas/conj-redonda-mantel-tiffany.jpg' },
  { label: 'Mesa Redonda + Silla Luis XV', img: '/images/mesas/conj-redonda-mantel-luis-xv.jpg' },
  { label: 'Mesa Redonda + Crossback Caoba', img: '/images/mesas/conj-redonda-mantel-crossback-caoba.jpg' },
  { label: 'Mesa Redonda + Crossback Natural', img: '/images/mesas/conj-redonda-mantel-crossback-natural.jpg' },
  { label: 'Mesa Redonda + Antonella Blanca', img: '/images/mesas/conj-redonda-mantel-antonella-blanca.jpg' },
  { label: 'Mesa Redonda + Avant Garde', img: '/images/mesas/conj-redonda-mantel-avant-garden.jpg' },
  { label: 'Mesa Redonda Crossback (sin mantel)', img: '/images/mesas/conj-redonda-crossback-caoba.jpg' },
  { label: 'Mesa Mármol Blanca + Camila', img: '/images/mesas/conj-marmol-blanca-camila.jpg' },
  { label: 'Mesa Mármol Negra + Camila', img: '/images/mesas/conj-marmol-negra-camila.jpg' },
  { label: 'Mesa Black Shine + Camila', img: '/images/mesas/conj-black-shine-camila.jpg' },
  { label: 'Mesa Mármol + Antonella Blanca', img: '/images/mesas/conj-marmol-antonella-blanca.jpg' },
  { label: 'Mesa Mármol + Antonella Negra', img: '/images/mesas/conj-marmol-antonella-negra.jpg' },
  { label: 'Mesa Cuadrada + Avant Garde', img: '/images/mesas/conj-cuad-avant-garden.jpg' },
  { label: 'Tablón + Avant Garde', img: '/images/mesas/conj-rect-avant-garden.jpg' },
  { label: 'Tablón + Crossback Caoba', img: '/images/mesas/conj-rect-crossback-caoba.jpg' },
  { label: 'Tablón + Mariantonieta Caoba', img: '/images/mesas/conj-rect-mariantonieta-caoba.jpg' },
  { label: 'Mesa Espejo + Luis XV', img: '/images/mesas/conj-espejo-luis-xv.jpg' },
];

function MesasSillasCatalog({ waUrl }: { waUrl: string }) {
  return (
    <>
      {/* Catálogo de Sillas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040] mb-3">Catálogo de Sillas</h2>
          <p className="text-gray-600 font-serif mb-10">Todas las sillas disponibles — haz clic en cualquiera para ver detalles</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {SILLAS_CATALOG.map(s => (
              <Link key={s.href} href={s.href} className="group block bg-[#f5efe8] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.03] border border-[#162040]/5">
                <div className="aspect-[3/4] product-media bg-white flex items-center justify-center p-3">
                  {s.img ? (
                    <OptimizedImage src={s.img} alt={s.name} width={300} height={400} className="h-full w-full object-contain" />
                  ) : (
                    <Armchair className="w-10 h-10 text-[#162040]/30" />
                  )}
                </div>
                <div className="px-2 py-2.5 text-center">
                  <p className="font-serif font-semibold text-[#162040] text-xs leading-tight">{s.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo de Mesas */}
      <section className="py-16 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040] mb-3">Catálogo de Mesas</h2>
          <p className="text-gray-600 font-serif mb-10">Todos los tipos de mesas disponibles — haz clic para ver variedades y detalles</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {MESAS_CATALOG.map(m => (
              <Link key={m.href} href={m.href} className="group block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.03] border border-[#162040]/5">
                <div className="aspect-square product-media bg-[#f5efe8] flex items-center justify-center p-4">
                  <OptimizedImage src={m.img} alt={m.name} width={300} height={300} className="h-full w-full object-contain" />
                </div>
                <div className="px-2 py-2.5 text-center">
                  <p className="font-serif font-semibold text-[#162040] text-xs leading-tight">{m.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo de Combinaciones */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040] mb-3">Catálogo de Combinaciones</h2>
          <p className="text-gray-600 font-serif mb-10">Mesas y sillas en las combinaciones más elegantes del catálogo — cotiza la que más te guste</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {COMBINACIONES_CATALOG.map((c, i) => (
              <div key={i} className="group bg-[#f5efe8] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-[#162040]/5">
                <div className="aspect-[4/3] overflow-hidden bg-white">
                  <img
                    src={c.img}
                    alt={c.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="font-serif font-semibold text-[#162040] text-sm leading-snug mb-3">{c.label}</p>
                  <a
                    href={waUrl}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#0d6849] font-serif font-bold hover:underline"
                  >
                    <WaSvg /> Cotizar esta combinación
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

interface ServicePageProps {
  params: { slug: string; chairSlug?: string; mesaSlug?: string; barraSlug?: string };
}

export default function ServicePage({ params }: ServicePageProps) {
  const rawSlug = params.chairSlug
    ? `silla-${params.chairSlug}`
    : params.mesaSlug
    ? `mesa-${params.mesaSlug}`
    : params.barraSlug
    ? `barra-${params.barraSlug}`
    : params.slug;

  const slug = stripCityFromSlug(rawSlug);
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    (async () => {
      const loadOnce = async () =>
        (await getProductBySlugAsync(rawSlug)) ?? (await getProductBySlugAsync(slug));
      try {
        let p = await loadOnce();
        if (!p) {
          // One soft retry — products chunk can fail on flaky mobile networks
          await new Promise((r) => setTimeout(r, 250));
          p = await loadOnce();
        }
        if (cancelled) return;
        setProduct(p);
      } catch (err) {
        console.error('Failed to load product', rawSlug, err);
        try {
          await new Promise((r) => setTimeout(r, 400));
          const p = await loadOnce();
          if (!cancelled) setProduct(p);
        } catch (err2) {
          console.error('Retry failed for product', rawSlug, err2);
          if (!cancelled) setProduct(null);
        }
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, [rawSlug, slug]);

  const { city } = useCity();
  const cityCopy = city ? getCityHubContent(slug, city.slug) : null;
  const pageCopy = cityCopy || (product ? buildNationalServiceCopy(product) : null);

  useEffect(() => {
    if (!product) return;
    const titleSource = pageCopy?.seoTitle || product.seoTitle || product.title;
    const descSource =
      pageCopy?.seoDescription ||
      (city && product.seoDescription
        ? `${product.seoDescription} Disponible en ${city.name}. Cotiza con Bodasesor por WhatsApp.`
        : product.seoDescription) ||
      `${product.title} para bodas y eventos en México. Cotiza con Bodasesor por WhatsApp.`;
    applyPageSeo({
      title: titleSource,
      description: descSource,
      path: city ? `/${slug}/${city.slug}` : `/${slug}`,
      h1: pageCopy?.h1 || `${product.title}${city ? ` en ${city.name}` : ''}`,
      cityName: city?.name || '',
      image: HERO_IMAGES[slug] || product.img || product.image,
    });
  }, [product, city, pageCopy, slug]);

  useEffect(() => {
    if (!product) return;
    const faqs =
      pageCopy?.faqs?.length >= 2
        ? pageCopy.faqs
        : Array.isArray(product.faqs) && product.faqs.length >= 2
          ? product.faqs
          : defaultServiceFaqs(product.title);
    upsertJsonLd('bodasesor-faq-jsonld', buildFaqPageJsonLd(faqs));

    if (pageCopy) {
      upsertJsonLd(
        'bodasesor-service-city-jsonld',
        buildServiceCityJsonLd({
          name: pageCopy.h1 || `${product.title}${city ? ` en ${city.name}` : ' en México'}`,
          description: pageCopy.seoDescription || product.seoDescription,
          url: city
            ? absoluteUrl(`/${slug}/${city.slug}`)
            : absoluteUrl(`/${slug}`),
          cityName: city?.name || 'México',
          zones: pageCopy.zones || [],
        }),
      );
    } else {
      upsertJsonLd('bodasesor-service-city-jsonld', null);
    }

    return () => {
      upsertJsonLd('bodasesor-faq-jsonld', null);
      upsertJsonLd('bodasesor-service-city-jsonld', null);
    };
  }, [product, pageCopy, city, slug]);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-white" aria-busy="true" aria-live="polite">
        <section className="bg-[#162040] min-h-[280px] md:min-h-[320px] flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 py-10">
            <div className="h-4 w-40 bg-white/20 rounded mb-5" />
            <div className="h-10 w-2/3 max-w-xl bg-white/25 rounded mb-4" />
            <div className="h-5 w-1/2 max-w-md bg-white/15 rounded" />
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="h-4 w-full max-w-2xl bg-[#f5efe8] rounded mb-3" />
          <div className="h-4 w-5/6 max-w-xl bg-[#f5efe8] rounded mb-3" />
          <div className="h-4 w-2/3 max-w-lg bg-[#f5efe8] rounded" />
          <p className="mt-8 font-serif text-gray-500">Cargando servicio…</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return <ServicioNoEncontrado />;
  }

  if (product.category === 'eventos') {
    return (
      <Suspense fallback={
        <div className="min-h-[50vh] flex items-center justify-center font-serif text-gray-600">
          Cargando…
        </div>
      }>
        <EventTypePage product={product} />
      </Suspense>
    );
  }

  const waUrl = WA_MSG(product.title);
  const hasCatalogImage =
    HERO_IMAGES[slug]?.startsWith('/images/mesas/') ||
    HERO_IMAGES[slug]?.startsWith('/images/barras/') ||
    false;

  const displayH1 = pageCopy?.h1
    ? toSpanishTitleCase(pageCopy.h1)
    : city
      ? toSpanishTitleCase(`${product.title} para Bodas y Eventos en ${city.name}`)
      : toSpanishTitleCase(`${product.title} para Bodas y Eventos en México`);
  const displayHeadline = toSpanishTitleCase(pageCopy?.headline || product.headline || '');
  const displaySectionTitle = pageCopy?.sectionTitle
    ? toSpanishTitleCase(pageCopy.sectionTitle)
    : city
      ? toSpanishTitleCase(`${product.title} para Bodas y Eventos en ${city.name}`)
      : toSpanishTitleCase(`${product.title} para Bodas y Eventos en México`);
  const kw = buildHighlightKeywords({
    primaryKeyword: pageCopy?.primaryKeyword || '',
    zones: pageCopy?.zones || [],
    cityName: city?.name || 'México',
    cityShort: city?.short || '',
    extra: ['Banquetes', 'Catering', 'Bodas', 'Eventos', 'Mobiliario', 'Wedding Planner', 'México'],
  });

  const heroAlt = city
    ? `${product.title} para eventos en ${city.name}`
    : `${product.title} para eventos y banquetes`;
  const crumbItems = [
    { name: 'Inicio', href: '/' },
    { name: product.categoryLabel || 'Servicios', href: product.categoryHref || '/' },
    {
      name: city
        ? `${product.title} en ${city.short || city.name}`
        : product.title,
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── 1. HERO BANNER ── */}
      {hasCatalogImage ? (
        /* Mobiliario individual: imagen nítida a la derecha sobre fondo beige */
        <section className="overflow-hidden bg-[#162040]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-3 px-4 sm:px-6 lg:px-12 py-10 md:py-16 flex flex-col justify-center min-h-[260px]">
                <Breadcrumbs items={crumbItems} variant="dark" className="mb-5" />
                <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4 text-white">
                  {displayH1}
                </h1>
                <p className="text-lg md:text-xl text-white/80 font-serif mb-4 leading-relaxed max-w-xl">
                  <HighlightKeywords text={displayHeadline} keywords={kw} className="font-bold text-white" />
                </p>
                {pageCopy?.zones?.length ? (
                  <p className="text-white/65 font-serif text-sm mb-8">
                    {city ? `Cobertura en ${city.name}:` : "Cobertura nacional:"}{" "}
                    <HighlightKeywords
                      text={pageCopy.zones.join(" · ")}
                      keywords={kw}
                      className="font-bold text-white"
                    />
                  </p>
                ) : city ? (
                  <p className="text-white/65 font-serif text-sm mb-8">
                    Servicio disponible en{" "}
                    <strong className="font-bold text-white">{city.name}</strong> y área metropolitana
                  </p>
                ) : (
                  <p className="text-white/65 font-serif text-sm mb-8">
                    Servicio a nivel nacional · CDMX · Estado de México · Guadalajara · Monterrey · León y más
                  </p>
                )}
                <div className="flex flex-wrap gap-4">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-6 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <WaSvg /> Cotizar por WhatsApp
                  </a>
                  <a href="tel:5215540080373"
                     className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold font-serif transition-all duration-300 hover:scale-105">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    Llamar ahora
                  </a>
                </div>
              </div>
              <div className="lg:col-span-2 flex items-center justify-center bg-[#f5efe8] min-h-[260px] py-8 px-8">
                <OptimizedImage
                  src={HERO_IMAGES[slug]!}
                  alt={heroAlt}
                  width={400}
                  height={288}
                  priority
                  className="max-h-72 w-full object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Hero estándar con imagen de fondo */
        <section className="relative overflow-hidden bg-[#162040]" style={{ minHeight: '280px' }}>
          <OptimizedImage
            src={HERO_IMAGES[slug] ?? '/images/galeria/g3.jpg'}
            alt={heroAlt}
            width={1200}
            height={675}
            priority
            className="absolute inset-0 w-full h-full object-contain opacity-60"
          />
          <div className="absolute inset-0 bg-[#162040]/55" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-14">
            <Breadcrumbs items={crumbItems} variant="dark" className="mb-5" />
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-serif font-bold leading-tight mb-4 text-white">
              {displayH1}
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-serif mb-4 leading-relaxed max-w-2xl">
              <HighlightKeywords text={displayHeadline} keywords={kw} className="font-bold text-white" />
            </p>
            {pageCopy?.zones?.length ? (
              <p className="text-white/65 font-serif text-sm mb-8">
                {city ? `Cobertura en ${city.name}:` : "Cobertura nacional:"}{" "}
                <HighlightKeywords
                  text={pageCopy.zones.join(" · ")}
                  keywords={kw}
                  className="font-bold text-white"
                />
              </p>
            ) : city ? (
              <p className="text-white/65 font-serif text-sm mb-8">
                Servicio disponible en{" "}
                <strong className="font-bold text-white">{city.name}</strong> y área metropolitana
              </p>
            ) : (
              <p className="text-white/65 font-serif text-sm mb-8">
                Servicio a nivel nacional · CDMX · Estado de México · Guadalajara · Monterrey · León y más
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-6 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <WaSvg /> Cotizar por WhatsApp
              </a>
              <a href="tel:5215540080373"
                 className="flex items-center gap-2 bg-[#162040] hover:bg-[#0f1830] border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold font-serif transition-all duration-300 hover:scale-105">
                <Phone className="w-5 h-5 flex-shrink-0" />
                Llamar ahora
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── 2. OTROS SERVICIOS EN ESTA CATEGORÍA ── */}
      {product.related.length > 0 && (
        <section className="bg-[#162040] py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-white/60 font-serif mr-2 shrink-0">
                {product.categoryLabel}:
              </span>
              {product.related.map(r => (
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
                {displaySectionTitle}
              </h2>
              <div className="space-y-4">
                {(pageCopy?.description?.length ? pageCopy.description : product.description).map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed font-serif text-lg">
                    <HighlightKeywords text={para} keywords={kw} />
                  </p>
                ))}
                {pageCopy?.localBullets?.length ? (
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 font-serif text-lg">
                    {pageCopy.localBullets.map((b) => (
                      <li key={b}>
                        <HighlightKeywords text={b} keywords={kw} />
                      </li>
                    ))}
                  </ul>
                ) : city ? (
                  <p className="text-gray-600 leading-relaxed font-serif text-lg">
                    Servicio disponible en <strong className="font-bold text-[#162040]">{city.name}</strong> y área
                    metropolitana. Cotiza sin compromiso.
                  </p>
                ) : null}
              </div>
              <div className="mt-8 p-4 bg-[#f5efe8]/60 rounded-xl border border-[#162040]/10">
                <p className="text-sm text-gray-600 font-serif italic">
                  <HighlightKeywords
                    text={
                      pageCopy?.seoDescription ||
                      (city
                        ? `${product.seoDescription} Disponible en ${city.name}.`
                        : product.seoDescription)
                    }
                    keywords={kw}
                  />
                </p>
              </div>
            </div>
            <div className="lg:sticky lg:top-24">
              <ProductGalleryCarousel slug={slug} title={product.title} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3b. BANNER CTA HORIZONTAL ── */}
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

      {/* ── 4. QUÉ INCLUYE ── */}
      {product.included && product.included.length > 0 && (
      <section className="py-16 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
              ¿Qué incluye nuestro servicio?
            </h2>
            <p className="text-gray-600 mt-3 font-serif">Todo lo que necesitas para un evento impecable, en un solo paquete</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.included.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#162040]/5">
                <div className="w-10 h-10 rounded-xl bg-[#162040]/8 flex items-center justify-center mb-3 text-[#162040]">
                  <IconFromEmoji emoji={item.icon} className="w-5 h-5" />
                </div>
                {item.title ? (
                  <>
                    <h3 className="font-serif font-bold text-[#162040] text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-serif">{item.desc ?? item.text ?? ''}</p>
                  </>
                ) : (
                  <p className="text-[#162040] text-sm leading-relaxed font-serif">{item.text}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── 5. VARIEDADES ── */}
      {product.varieties && product.varieties.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
                {(() => {
                  const isBanquetParent = [
                    "banquetes",
                    "banquete-kosher",
                    "banquete-mexicano",
                    "banquete-navideno",
                  ].includes(slug);
                  if (city && isBanquetParent) {
                    return toSpanishTitleCase(`Menús por tiempos en ${city.name}`);
                  }
                  if (city) {
                    return toSpanishTitleCase(`Opciones y variedades en ${city.name}`);
                  }
                  return isBanquetParent ? "Menús por tiempos" : "Variedades y opciones";
                })()}
              </h2>
              <p className="text-gray-600 mt-3 font-serif">
                {(() => {
                  const isBanquetParent = [
                    "banquetes",
                    "banquete-kosher",
                    "banquete-mexicano",
                    "banquete-navideno",
                  ].includes(slug);
                  if (city && isBanquetParent) {
                    return `Elige el formato ideal para tu evento en ${city.name}: 4, 3 o 2 tiempos, o buffet`;
                  }
                  if (city) {
                    return `Elige la opción que mejor se adapte a tu evento en ${city.name}`;
                  }
                  return isBanquetParent
                    ? "Elige 4, 3 o 2 tiempos, o buffet según el estilo de tu celebración"
                    : "Elige la que mejor se adapte a tu evento y tus invitados";
                })()}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.varieties.map((v, i) => {
                const menuHubSlug = v.href?.replace(/^\//, "") || "";
                const menuCityCopy =
                  city && menuHubSlug ? getCityHubContent(menuHubSlug, city.slug) : null;
                const cardTitle = menuCityCopy?.h1
                  ? toSpanishTitleCase(menuCityCopy.h1)
                  : city
                    ? `${v.name} en ${city.name}`
                    : v.name;
                const cardDesc = menuCityCopy?.headline || menuCityCopy?.description?.[0] || v.desc;
                const card = (
                  <>
                    <div className="flex-shrink-0 w-8 h-8 bg-[#162040] text-white rounded-full flex items-center justify-center text-sm font-bold font-serif mt-0.5">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-[#162040] text-lg mb-1">{cardTitle}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-serif">
                        {menuCityCopy ? (
                          <HighlightKeywords text={cardDesc} keywords={kw} />
                        ) : (
                          cardDesc
                        )}
                      </p>
                      {v.href && (
                        <span className="inline-block mt-2 text-[#162040] text-sm font-serif font-semibold underline underline-offset-2">
                          Ver menú completo →
                        </span>
                      )}
                    </div>
                  </>
                );
                return v.href ? (
                  <Link key={i} href={v.href}
                    className="flex gap-4 p-5 bg-[#f5efe8]/50 rounded-2xl border border-[#162040]/10 hover:border-[#162040]/30 hover:shadow-md transition-all">
                    {card}
                  </Link>
                ) : (
                  <div key={i} className="flex gap-4 p-5 bg-[#f5efe8]/50 rounded-2xl border border-[#162040]/10 hover:border-[#162040]/30 transition-colors">
                    {card}
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <a
                href={waUrl}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 py-3 rounded-xl font-bold font-serif transition-colors"
              >
                <WaSvg /> Consultar disponibilidad
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. EJEMPLO DE MENÚ ── */}
      {product.menuExample && product.menuExample.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
                {toSpanishTitleCase('Ejemplo de menú')}
              </h2>
              <p className="text-gray-600 mt-3 font-serif">
                Propuesta referencial
                {city ? (
                  <>
                    {' '}
                    para eventos en <strong className="font-bold text-[#162040]">{city.name}</strong>
                  </>
                ) : null}
                {' '}
                — adaptamos el menú a tus gustos y preferencias
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.menuExample.map((item, i) => {
                const [label, ...rest] = item.split(": ");
                const content = rest.join(": ");
                return (
                  <div key={i} className="flex gap-4 p-4 bg-[#f5efe8]/60 rounded-xl border border-[#162040]/10 hover:bg-[#f5efe8] transition-colors">
                    <div className="flex-shrink-0 w-7 h-7 bg-[#162040] text-white rounded-full flex items-center justify-center text-xs font-bold font-serif mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      {content ? (
                        <>
                          <span className="text-gray-700 text-xs font-bold uppercase tracking-wide font-serif">{label}</span>
                          <p className="text-[#162040] font-serif mt-0.5">{content}</p>
                        </>
                      ) : (
                        <p className="text-[#162040] font-serif">{label}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 text-center">
              <p className="text-gray-600 text-sm font-serif mb-4">¿Quieres un menú diferente? Diseñamos el tuyo desde cero.</p>
              <a
                href={waUrl}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 py-3 rounded-xl font-bold font-serif transition-colors"
              >
                <WaSvg /> Personalizar mi menú
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── 7. NIVELES DE SERVICIO ── */}
      {product.serviceTiers && product.serviceTiers.length > 0 && (
        <section className="py-16 bg-[#f5efe8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
                Niveles de Servicio Incluidos
              </h2>
              <p className="text-gray-600 mt-3 font-serif">Elige el nivel que mejor se adapte a tu evento</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {product.serviceTiers.map((tier, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl p-6 border transition-shadow ${
                    tier.popular
                      ? 'bg-white text-[#162040] border-[#162040] shadow-2xl scale-[1.02]'
                      : 'bg-white text-[#162040] border-[#162040]/15 shadow-sm hover:shadow-md'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[#162040] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full font-serif whitespace-nowrap">
                        Más Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-serif font-bold mb-5 text-center text-[#162040]">
                    {tier.name}
                  </h3>
                  <ul className="space-y-3">
                    {tier.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#162040]" />
                        <span className="text-sm font-serif leading-snug text-gray-600">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <a
                      href={waUrl}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold font-serif text-sm transition-colors bg-[#0d6849] hover:bg-[#0a5740] text-white"
                    >
                      <WaSvg /> Cotizar nivel {tier.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. POR QUÉ ELEGIRNOS ── */}
      {product.whyUs && product.whyUs.length > 0 && (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
              ¿Por qué elegir Bodasesor?
            </h2>
            <p className="text-gray-600 mt-3 font-serif">Más de 1,000 eventos nos respaldan</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.whyUs.map((item, i) => (
              <div key={i} className="group text-center p-6 rounded-2xl border border-[#162040]/10 bg-white hover:border-[#162040] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-[#162040]/8 group-hover:bg-[#162040] flex items-center justify-center mx-auto mb-4 text-[#162040] group-hover:text-white transition-colors duration-300">
                  <IconFromEmoji emoji={item.icon} className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-[#162040] text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed font-serif">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <div className="grid grid-cols-3 gap-4 max-w-xl">
              {[
                { num: '1,000+', label: 'Eventos realizados' },
                { num: '10,000+', label: 'Personas atendidas' },
                { num: '4.6/5', label: 'Calificación promedio' },
              ].map((s, i) => (
                <div key={i} className="text-center p-4 bg-[#f5efe8] rounded-2xl">
                  <p className="text-2xl font-serif font-bold text-[#162040]">{s.num}</p>
                  <p className="text-xs text-gray-600 font-serif mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <img
              src="/images/sello-garantia-transparent.webp"
              alt="Garantía de Felicidad Bodasesor"
              className="h-24 w-auto drop-shadow-lg"
              width={120}
              height={90}
              loading="lazy"
              decoding="async"
              onError={e => { (e.target as HTMLImageElement).src = '/images/sello-garantia.webp'; }}
            />
          </div>
        </div>
      </section>
      )}

      {/* ── 8. SERVICIOS INTEGRALES ── */}
      {product.integralServices && product.integralServices.length > 0 && (
      <section className="py-16 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
              Servicios integrales
            </h2>
            <p className="text-gray-600 mt-3 font-serif">Combina {product.title} con estos servicios para un evento completo</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {product.integralServices.map(s => (
              <Link
                key={s.href}
                href={s.href}
                className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-[#162040]/10 hover:border-[#162040] hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#162040]/8 flex items-center justify-center text-[#162040] group-hover:bg-[#162040] group-hover:text-white transition-colors">
                  <IconFromEmoji emoji={s.icon} className="w-5 h-5" />
                </div>
                <span className="text-xs font-serif font-semibold text-[#162040] text-center leading-tight">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── FAQ (visible + FAQPage schema) ── */}
      {(() => {
        const faqs =
          pageCopy?.faqs?.length >= 2
            ? pageCopy.faqs
            : Array.isArray(product.faqs) && product.faqs.length >= 2
              ? product.faqs
              : defaultServiceFaqs(product.title);
        return (
          <section className="py-14 bg-white border-t border-[#162040]/10" aria-labelledby="faq-heading">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 id="faq-heading" className="text-2xl md:text-3xl font-serif font-bold text-[#162040] mb-2">
                Preguntas frecuentes
              </h2>
              <p className="text-gray-600 font-serif text-sm mb-8">
                Respuestas claras sobre {product.title}
                {city ? ` en ${city.name}` : ''}.
              </p>
              <div className="space-y-4">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-xl border border-[#162040]/10 bg-[#faf7f2] px-5 py-4"
                  >
                    <summary className="cursor-pointer font-serif font-bold text-[#162040] list-none flex items-start justify-between gap-3">
                      <span>{f.q}</span>
                      <span className="text-[#162040]/50 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                    </summary>
                    <p className="mt-3 text-gray-700 font-serif text-sm leading-relaxed">
                      <HighlightKeywords text={f.a} keywords={kw} />
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      <SeoRelatedLinks
        basePath={product.categoryHref || `/${slug}`}
        title={product.title}
        related={product.related}
      />

      {/* ── 10. FINAL CTA ── */}
      <section className="py-16 bg-[#162040] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <PartyPopper className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            ¿Listo para organizar tu evento?
          </h2>
          <p className="text-white/70 text-lg font-serif mb-8 max-w-2xl mx-auto">
            Contáctanos ahora y recibe una cotización personalizada sin compromiso. Respondemos en menos de 1 hora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waUrl}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#162040] px-8 py-4 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105 text-lg"
            >
              <WaSvg /> Cotizar por WhatsApp
            </a>
            <a
              href="tel:5215540080373"
              className="flex items-center justify-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold font-serif hover:bg-white/10 transition-colors text-lg"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              55 4008 0373
            </a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center text-sm text-white/60 font-serif">
            <span className="flex items-center gap-1.5 justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" /> Sin costo de asesoría
            </span>
            <span className="flex items-center gap-1.5 justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" /> Cotización en 60 minutos
            </span>
            <span className="flex items-center gap-1.5 justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" /> +1,000 clientes satisfechos
            </span>
          </div>
        </div>
      </section>

      {/* SEO text — para motores de búsqueda */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <p className="text-xs text-gray-600 font-serif leading-relaxed">{product.seoDescription}</p>
      </div>

      {/* ── CATÁLOGO COMPLETO DE MESAS Y SILLAS ── */}
      {slug === 'mesas-sillas' && <MesasSillasCatalog waUrl={waUrl} />}

    </div>
  );
}
