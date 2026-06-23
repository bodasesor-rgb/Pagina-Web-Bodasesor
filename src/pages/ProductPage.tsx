import { useRoute, Link } from "wouter";
import { ChevronRight, Phone, MessageCircle, Star, ArrowLeft } from "lucide-react";
import GalleryCarouselSection from "../components/GalleryCarousel";
import { findProductByHandle, getRelatedProducts, navigation } from "../data/navigation";
import NotFound from "./not-found";

const WHATSAPP_NUMBER = "5215540080373";
const PHONE_DISPLAY = "55 4008 0373";

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
  ],
  catering: ['/images/banquete-hero.png', '/images/banquete-mexicano-hero.png', '/images/banquete-navideno-hero.png', '/images/banquete-kosher-hero.png'],
  bodas: ['/images/galeria-1.png', '/images/galeria-2.png', '/images/galeria-3.png'],
  espacios: ['/images/galeria-4.png', '/images/galeria-5.png', '/images/galeria-6.png'],
  shows: ['/images/galeria-7.png', '/images/galeria-1.png'],
  fotografia: ['/images/galeria-2.png', '/images/galeria-3.png'],
  musica: ['/images/galeria-4.png', '/images/galeria-5.png'],
  decoracion: ['/images/colgantes/col-01-lamparas-algodon-wisterias.jpg', '/images/colgantes/col-02-cascadas-flor-natural.jpg', '/images/colgantes/col-03-tiras-follaje-focos-vintage.jpg', '/images/colgantes/col-04-tubos-carton-dorado.jpg'],
  postres: ['/images/galeria-6.png', '/images/galeria-7.png'],
  'barra-libre': ['/images/galeria-1.png', '/images/galeria-2.png'],
  'mas-servicios': ['/images/galeria-3.png', '/images/galeria-4.png'],
};

function getImageForProduct(sectionSlug: string, handle: string): string {
  const handleImageMap: Record<string, string> = {
    'banquete-mexicano': '/images/banquete-mexicano-hero.png',
    'banquete-navideno': '/images/banquete-navideno-hero.png',
    'decoracion-aerea-para-eventos-cdmx': '/images/colgantes/col-01-lamparas-algodon-wisterias.jpg',
  };
  if (handleImageMap[handle]) return handleImageMap[handle];
  const images = sectionImages[sectionSlug] || ['/images/galeria-1.png'];
  const hashCode = handle.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return images[hashCode % images.length];
}

function getCategoryImages(sectionSlug: string): string[] {
  return sectionImages[sectionSlug] || ['/images/galeria-1.png', '/images/galeria-2.png'];
}

export default function ProductPage() {
  const [, params] = useRoute("/products/:handle");
  const handle = params?.handle ?? "";

  const product = findProductByHandle(handle);
  if (!product) return <NotFound />;

  const related = getRelatedProducts(handle, 6);
  const mainImage = getImageForProduct(product.sectionSlug, handle);
  const extraImages = getCategoryImages(product.sectionSlug).slice(0, 4);

  const whatsappMsg = `Hola, me interesa cotizar: ${product.name}. ¿Podría darme más información?`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href={`/categoria/${product.sectionSlug}`} className="hover:text-primary transition-colors">
              {product.section}
            </Link>
            <ChevronRight size={14} />
            <Link href={`/categoria/${product.sectionSlug}/${product.subsectionSlug}`} className="hover:text-primary transition-colors">
              {product.subsection}
            </Link>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Images */}
          <div>
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-muted mb-3">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="product-main-image"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/galeria-1.png'; }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {extraImages.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-square bg-muted shadow-sm">
                  <img
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-24">
            <div className="mb-2">
              <Link
                href={`/categoria/${product.sectionSlug}/${product.subsectionSlug}`}
                className="inline-flex items-center gap-1 text-xs text-primary font-semibold uppercase tracking-wider hover:underline"
              >
                <ArrowLeft size={12} />
                {product.subsection}
              </Link>
            </div>
            <h1
              className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight"
              data-testid="product-title"
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="hsl(var(--accent))" color="hsl(var(--accent))" />)}
              <span className="text-sm text-muted-foreground ml-1">Calificado por nuestros clientes</span>
            </div>

            <div className="h-px bg-border my-5" />

            <div className="prose prose-sm text-muted-foreground mb-6">
              <p>
                Ofrecemos <strong className="text-foreground">{product.name}</strong> en Ciudad de México y área metropolitana.
                Nuestro servicio incluye atención personalizada, equipo de calidad y proveedores verificados para garantizar
                que tu evento sea un éxito total.
              </p>
              <p>
                Contamos con amplia disponibilidad y adaptamos el servicio a las necesidades específicas de tu evento,
                ya sea boda, cumpleaños, evento corporativo, 15 años o cualquier celebración especial.
              </p>
            </div>

            {/* Highlights */}
            <ul className="space-y-2 mb-7">
              {[
                'Entrega puntual garantizada en CDMX',
                'Atención personalizada 24/7',
                'Proveedores verificados y con experiencia',
                'Precios competitivos y transparentes',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="btn-whatsapp-product"
                className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ebe57] transition-colors shadow-lg text-sm"
              >
                <MessageCircle size={18} />
                Cotizar por WhatsApp
              </a>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                data-testid="btn-phone-product"
                className="flex items-center justify-center gap-2 py-4 px-5 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors text-sm"
              >
                <Phone size={16} />
                {PHONE_DISPLAY}
              </a>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Respuesta en menos de 2 horas · Sin costo de cotización
            </p>

            <div className="mt-6 p-4 bg-muted rounded-xl flex items-center gap-3">
              <img src="/images/sello-garantia.png" alt="Garantía" className="h-12 w-auto" />
              <div>
                <p className="text-sm font-semibold text-foreground">Garantía Bodasesor</p>
                <p className="text-xs text-muted-foreground">Calidad verificada en todos nuestros proveedores.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20" data-testid="section-related">
            <div className="mb-6">
              <div className="gold-divider w-12 mb-3" />
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Servicios Relacionados
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {related.map((p) => (
                <Link
                  key={p.handle}
                  href={`/products/${p.handle}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:border-primary/30 hover:shadow-md transition-all card-lift"
                  data-testid={`card-related-${p.handle}`}
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={getImageForProduct(p.sectionSlug, p.handle)}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/images/galeria-1.png'; }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-foreground leading-tight line-clamp-2">{p.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <GalleryCarouselSection />

      {/* CTA banner */}
      <div className="bg-primary mt-16 py-12 text-center">
        <h3 className="font-serif text-2xl text-white font-bold mb-3">¿Quieres cotizar {product.name}?</h3>
        <p className="text-white/75 mb-6 text-sm">Contáctanos ahora y recibe una propuesta personalizada sin compromiso.</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ebe57] transition-colors shadow-xl"
        >
          <MessageCircle size={18} />
          Cotizar ahora
        </a>
      </div>
    </div>
  );
}
