import { useRoute } from "wouter";
import CityLink from "../components/CityLink";
const Link = CityLink;
import { ChevronRight, MessageCircle } from "lucide-react";
import GalleryCarouselSection from "../components/GalleryCarousel";
import { findSectionBySlug } from "../data/navigation";
import NotFound from "./not-found";

const WHATSAPP_NUMBER = "5215540080373";

const sectionDescriptions: Record<string, string> = {
  mobiliario: 'Encuentra sillas, mesas, carpas, salas y todo el mobiliario que necesitas para hacer de tu evento un espacio elegante y cómodo en CDMX.',
  catering: 'Descubre nuestros servicios de catering y banquetes para bodas, eventos corporativos, 15 años y todo tipo de celebraciones en Ciudad de México.',
  bodas: 'Todo lo que necesitas para organizar la boda de tus sueños: coordinación, catering, decoración, fotografía y más en CDMX.',
  espacios: 'Haciendas, hoteles, restaurantes y salones de eventos en Ciudad de México. Encuentra el espacio perfecto para tu celebración.',
  shows: 'Shows, entretenimiento y espectáculos para hacer tu evento único e inolvidable en CDMX.',
  fotografia: 'Fotógrafos profesionales, cabinas de fotos, cámara 360 y videografía para capturar cada momento especial de tu evento.',
  musica: 'DJs, bandas, mariachis, grupos versátiles y todo tipo de música para amenizar tu evento en Ciudad de México.',
  decoracion: 'Decoración floral, arreglos, centros de mesa, flores y diseño para transformar tu espacio en algo mágico.',
  postres: 'Pasteles, cupcakes, mesas de dulces y postres artesanales para endulzar tu celebración en CDMX.',
  'barra-libre': 'Barras libres, bartenders y coctelería para que tus invitados disfruten de los mejores tragos en tu evento.',
  'mas-servicios': 'Joyería, cristalería, servicios empresariales y más opciones para complementar tu evento perfectamente.',
};

const categoryHeroBg: Record<string, string> = {
  mobiliario: '/images/salas/sala-luxor-negro.jpg',
  catering: '/images/banquete-hero.png',
  bodas: '/images/galeria-1.png',
  espacios: '/images/galeria-4.png',
  shows: '/images/galeria-7.png',
  fotografia: '/images/galeria-2.png',
  musica: '/images/galeria-5.png',
  decoracion: '/images/colgantes/col-01-lamparas-algodon-wisterias.jpg',
  postres: '/images/galeria-6.png',
  'barra-libre': '/images/galeria-3.png',
  'mas-servicios': '/images/galeria-1.png',
};

const subsectionImages: Record<string, string> = {
  sillas: '/images/salas/sala-001.jpg',
  mesas: '/images/salas/mesa-centro-cuadrada.jpg',
  'mesas-y-sillas': '/images/salas/sala-camila.jpg',
  salas: '/images/salas/sala-chesterfield-negro.jpg',
  periqueras: '/images/salas/periquera-gamma.jpg',
  'tarimas-y-pistas': '/images/galeria-7.png',
  carpas: '/images/galeria-5.png',
  'general-mobiliario': '/images/salas/sala-ariel-nude.jpg',
  'catering-servicios': '/images/banquete-hero.png',
  'banquetes-servicios': '/images/banquete-mexicano-hero.png',
  'bodas-servicios': '/images/galeria-1.png',
  'wedding-planner': '/images/galeria-2.png',
  haciendas: '/images/galeria-4.png',
  hoteles: '/images/galeria-5.png',
  restaurantes: '/images/galeria-6.png',
  'salones-y-jardines': '/images/galeria-7.png',
  'shows-entretenimiento': '/images/galeria-3.png',
  inflables: '/images/galeria-6.png',
  'fotografia-y-video': '/images/galeria-2.png',
  'musica-y-dj': '/images/galeria-5.png',
  'decoracion-eventos': '/images/colgantes/col-01-lamparas-algodon-wisterias.jpg',
  flores: '/images/colgantes/col-02-cascadas-flor-natural.jpg',
  reposteria: '/images/galeria-6.png',
  'barra-libre-servicios': '/images/galeria-3.png',
  joyeria: '/images/galeria-1.png',
  cristaleria: '/images/galeria-4.png',
  'servicios-empresariales': '/images/galeria-7.png',
};

export default function CategoryPage() {
  const [, params] = useRoute("/categoria/:section");
  const sectionSlug = params?.section ?? "";

  const section = findSectionBySlug(sectionSlug);
  if (!section) return <NotFound />;

  const heroBg = categoryHeroBg[sectionSlug] || '/images/galeria-1.png';
  const description = sectionDescriptions[sectionSlug] || `Explora todos los servicios de ${section.name} disponibles en Ciudad de México.`;
  const totalProducts = section.subsections.reduce((a, s) => a + s.products.length, 0);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Inicio</Link>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium">{section.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div
        className="relative h-56 md:h-72 flex items-center"
        style={{ backgroundImage: `url('${heroBg}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-primary/65" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <div className="gold-divider w-12 mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2" data-testid="category-title">
            {section.icon} {section.name}
          </h1>
          <p className="text-white/80 text-sm max-w-xl">{description}</p>
          <p className="text-white/60 text-xs mt-2">{totalProducts} servicios disponibles · Ciudad de México</p>
        </div>
      </div>

      {/* Subcategories grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="mb-8">
          <div className="gold-divider w-12 mb-4" />
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Categorías de {section.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.subsections.map((sub) => {
            const img = subsectionImages[sub.slug] || '/images/galeria-1.png';
            return (
              <Link
                key={sub.slug}
                href={`/categoria/${section.slug}/${sub.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-border shadow-md card-lift"
                data-testid={`card-subsection-${sub.slug}`}
              >
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={img}
                    alt={sub.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/galeria-1.png'; }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {sub.name}
                    </h3>
                    <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-0.5 flex-shrink-0" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    {sub.products.length} {sub.products.length === 1 ? 'servicio' : 'servicios'} disponibles
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {sub.products.slice(0, 4).map((p) => (
                      <span key={p.handle} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                        {p.name.length > 22 ? p.name.slice(0, 22) + '…' : p.name}
                      </span>
                    ))}
                    {sub.products.length > 4 && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                        +{sub.products.length - 4} más
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* All products quick links */}
        <div className="mt-14">
          <div className="gold-divider w-12 mb-5" />
          <h3 className="font-serif text-xl font-bold text-foreground mb-5">
            Todos los Servicios de {section.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {section.subsections.flatMap(sub =>
              sub.products.map(product => (
                <Link
                  key={product.handle}
                  href={`/products/${product.handle}`}
                  className="px-3 py-1.5 bg-white border border-border rounded-full text-sm text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all shadow-sm"
                >
                  {product.name}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      <GalleryCarouselSection />

      {/* CTA */}
      <div className="bg-primary py-12 text-center mt-8">
        <h3 className="font-serif text-2xl text-white font-bold mb-3">¿Buscas {section.name} para tu evento?</h3>
        <p className="text-white/75 mb-6 text-sm">Contáctanos y te asesoramos sin costo para encontrar el servicio perfecto.</p>
        <a
          href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(`Hola, quiero información sobre ${section.name} para mi evento`)}`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="btn-cta-category"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ebe57] transition-colors shadow-xl"
        >
          <MessageCircle size={18} />
          Cotizar {section.name}
        </a>
      </div>
    </div>
  );
}
