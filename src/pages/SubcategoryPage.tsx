import { useRoute } from "wouter";
import CityLink from "../components/CityLink";
const Link = CityLink;
import { ChevronRight, MessageCircle, Star } from "lucide-react";
import GalleryCarouselSection from "../components/GalleryCarousel";
import { findSubsectionBySlug, findSectionBySlug } from "../data/navigation";
import NotFound from "./not-found";

const WHATSAPP_NUMBER = "5215540080373";

const sectionImages: Record<string, string[]> = {
  mobiliario: [
    '/images/salas/sala-luxor-negro.jpg',
    '/images/salas/sala-chesterfield-negro.jpg',
    '/images/salas/sala-ariel-nude.jpg',
    '/images/salas/sala-camila.jpg',
    '/images/salas/sala-lounge-blanco.jpg',
    '/images/salas/sala-chic-beige.jpg',
    '/images/salas/sala-luxor-verde.jpg',
    '/images/salas/sala-luxor-rosa.jpg',
    '/images/salas/sala-vintage-capitoneada-rosa.jpg',
    '/images/salas/sala-boho.jpg',
    '/images/salas/sala-001.jpg',
    '/images/salas/sala-000.jpg',
    '/images/salas/periquera-gamma.jpg',
    '/images/salas/periquera-capitone-negro.jpg',
    '/images/salas/periquera-marmol.jpg',
    '/images/salas/periquera-industrial.jpg',
    '/images/salas/periquera-rustica.jpg',
    '/images/salas/mesa-centro-cuadrada.jpg',
    '/images/salas/mesa-centro-redonda.jpg',
    '/images/salas/mesa-centro-rectangular.jpg',
  ],
  catering: ['/images/banquete-hero.png', '/images/banquete-mexicano-hero.png', '/images/banquete-navideno-hero.png', '/images/banquete-kosher-hero.png'],
  bodas: ['/images/galeria-1.png', '/images/galeria-2.png', '/images/galeria-3.png', '/images/galeria-4.png'],
  espacios: ['/images/galeria-4.png', '/images/galeria-5.png', '/images/galeria-6.png', '/images/galeria-7.png'],
  shows: ['/images/galeria-7.png', '/images/galeria-1.png', '/images/galeria-3.png'],
  fotografia: ['/images/galeria-2.png', '/images/galeria-3.png', '/images/galeria-5.png'],
  musica: ['/images/galeria-4.png', '/images/galeria-5.png', '/images/galeria-6.png'],
  decoracion: [
    '/images/colgantes/col-01-lamparas-algodon-wisterias.jpg',
    '/images/colgantes/col-02-cascadas-flor-natural.jpg',
    '/images/colgantes/col-03-tiras-follaje-focos-vintage.jpg',
    '/images/colgantes/col-04-tubos-carton-dorado.jpg',
    '/images/colgantes/col-05-disco-balls-burbuvelas.jpg',
    '/images/colgantes/col-06-disco-balls-flor-artificial.jpg',
    '/images/colgantes/col-07-plafon-follaje-flor.jpg',
    '/images/colgantes/col-08-follajes-secos-algodon.jpg',
    '/images/colgantes/col-09-pampas-tipo-s.jpg',
    '/images/colgantes/col-10-estructura-pastel-invertido.jpg',
    '/images/colgantes/col-11-burbuvelas-candelabros-cristal.jpg',
    '/images/colgantes/col-12-cascada-wisterias-orquidea.jpg',
    '/images/colgantes/col-13-mezcla-pampas-bola-disco.jpg',
    '/images/colgantes/col-14-bolas-disco-esferas-doradas.jpg',
    '/images/colgantes/col-15-burbuvelas-cherry-blossom.jpg',
    '/images/colgantes/col-16-figuras-herreria-led.jpg',
  ],
  postres: ['/images/galeria-6.png', '/images/galeria-7.png', '/images/galeria-1.png'],
  'barra-libre': ['/images/galeria-1.png', '/images/galeria-2.png', '/images/galeria-3.png'],
  'mas-servicios': ['/images/galeria-3.png', '/images/galeria-4.png', '/images/galeria-5.png'],
};

function getProductImage(sectionSlug: string, handle: string): string {
  const images = sectionImages[sectionSlug] || ['/images/galeria-1.png'];
  const hashCode = handle.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return images[hashCode % images.length];
}

export default function SubcategoryPage() {
  const [, params] = useRoute("/categoria/:section/:subsection");
  const sectionSlug = params?.section ?? "";
  const subsectionSlug = params?.subsection ?? "";

  const section = findSectionBySlug(sectionSlug);
  const sub = findSubsectionBySlug(sectionSlug, subsectionSlug);

  if (!section || !sub) return <NotFound />;

  const images = sectionImages[sectionSlug] || ['/images/galeria-1.png'];
  const heroBg = images[0];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-primary">Inicio</Link>
            <ChevronRight size={14} />
            <Link href={`/categoria/${section.slug}`} className="hover:text-primary">{section.name}</Link>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium">{sub.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div
        className="relative h-48 md:h-60 flex items-center"
        style={{ backgroundImage: `url('${heroBg}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-primary/65" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <div className="gold-divider w-10 mb-3" />
          <div className="text-xs text-white/60 mb-1 uppercase tracking-widest">{section.name}</div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold" data-testid="subcategory-title">
            {sub.name}
          </h1>
          <p className="text-white/70 text-sm mt-1">
            {sub.products.length} {sub.products.length === 1 ? 'servicio' : 'servicios'} disponibles en CDMX
          </p>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="gold-divider w-12 mb-3" />
            <h2 className="font-serif text-2xl font-bold text-foreground">
              {sub.name} en Ciudad de México
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Proveedores y servicios verificados · {sub.products.length} opciones disponibles
            </p>
          </div>
          <a
            href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(`Hola, quiero cotizar: ${sub.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0d6849] text-white text-sm font-semibold rounded-xl hover:bg-[#1ebe57] transition-colors shadow-md"
          >
            <MessageCircle size={16} />
            Cotizar ahora
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {sub.products.map((product) => {
            const img = getProductImage(sectionSlug, product.handle);
            return (
              <Link
                key={product.handle}
                href={`/products/${product.handle}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-border shadow-sm card-lift"
                data-testid={`card-product-${product.handle}`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/galeria-1.png'; }}
                  />
                </div>
                <div className="p-4">
                  <h3
                    className="font-semibold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2"
                    data-testid={`title-product-${product.handle}`}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-0.5 mb-3">
                    {[1,2,3,4,5].map(i => <Star key={i} size={11} fill="hsl(var(--accent))" color="hsl(var(--accent))" />)}
                    <span className="text-xs text-muted-foreground ml-1">5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Ciudad de México</span>
                    <span className="text-xs text-primary font-semibold group-hover:underline flex items-center gap-0.5">
                      Ver más <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Other subsections */}
        {section.subsections.filter(s => s.slug !== sub.slug).length > 0 && (
          <div className="mt-16">
            <div className="gold-divider w-12 mb-4" />
            <h3 className="font-serif text-xl font-bold text-foreground mb-5">
              Más en {section.name}
            </h3>
            <div className="flex flex-wrap gap-3">
              {section.subsections
                .filter(s => s.slug !== sub.slug)
                .map(otherSub => (
                  <Link
                    key={otherSub.slug}
                    href={`/categoria/${section.slug}/${otherSub.slug}`}
                    className="px-4 py-2 bg-white border border-border rounded-full text-sm text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all shadow-sm"
                  >
                    {otherSub.name} ({otherSub.products.length})
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>

      <GalleryCarouselSection />

      {/* CTA */}
      <div className="bg-primary py-12 text-center mt-8">
        <h3 className="font-serif text-2xl text-white font-bold mb-3">
          ¿Necesitas {sub.name} para tu evento?
        </h3>
        <p className="text-white/75 mb-6 text-sm">
          Cotiza ahora y recibe una propuesta personalizada sin compromiso.
        </p>
        <a
          href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(`Hola, quiero cotizar ${sub.name} para mi evento`)}`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="btn-cta-subcategory"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0d6849] text-white font-bold rounded-xl hover:bg-[#1ebe57] transition-colors shadow-xl"
        >
          <MessageCircle size={18} />
          Cotizar por WhatsApp
        </a>
      </div>
    </div>
  );
}
