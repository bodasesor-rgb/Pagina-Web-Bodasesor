import CityLink from "../components/CityLink";
const Link = CityLink;
import { blogPosts } from "../data/blog-data";
import { useEffect } from "react";

const WHATSAPP_NUMBER = "5215540080373";
const WA_URL = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20un%20evento`;

const CATEGORY_COLORS: Record<string, string> = {
  'Bodas':        'bg-rose-100 text-rose-700',
  'XV Años':      'bg-purple-100 text-purple-700',
  'Decoración':   'bg-green-100 text-green-700',
  'Corporativos': 'bg-blue-100 text-blue-700',
  'Música':       'bg-yellow-100 text-yellow-700',
  'Baby Shower':  'bg-pink-100 text-pink-700',
  'Espacios':     'bg-orange-100 text-orange-700',
  'Fotografía':   'bg-indigo-100 text-indigo-700',
  'Repostería':   'bg-amber-100 text-amber-700',
  'Carpas':       'bg-teal-100 text-teal-700',
};

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Blog de Eventos y Bodas | Bodasesor';
  }, []);

  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="bg-[#162040] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#f5efe8] text-sm font-serif tracking-widest mb-4 uppercase">Guías y consejos</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6">
            Blog de Eventos y Bodas
          </h1>
          <p className="text-xl text-[#f5efe8] max-w-3xl mx-auto font-serif">
            Consejos, tendencias y guías para que tu evento sea perfecto.
            Todo lo que necesitas saber antes de contratar.
          </p>
        </div>
      </section>

      {featured ? (
        <>
      {/* ── Featured post ── */}
      <section className="py-16 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/blog/${featured.slug}`}>
            <div className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#162040]">
              <div className="relative h-72 md:h-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => { (e.target as HTMLImageElement).src = '/images/galeria-1.png'; }}
                />
                <div className="absolute inset-0 bg-[#162040]/20 group-hover:bg-[#162040]/10 transition-colors duration-300" />
              </div>
              <div className="bg-white p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full font-serif ${CATEGORY_COLORS[featured.category] ?? 'bg-gray-100 text-gray-700'}`}>
                    {featured.category}
                  </span>
                  <span className="text-gray-600 text-sm font-serif">{featured.readTime} de lectura</span>
                </div>
                <h2 className="text-3xl font-bold text-[#162040] font-serif mb-4 group-hover:underline">
                  {featured.title}
                </h2>
                <p className="text-gray-600 font-serif text-lg leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-[#162040] font-bold font-serif">
                  Leer artículo completo
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Grid de artículos ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#162040] font-serif mb-12 text-center">Todos los artículos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group bg-white border-2 border-[#f5efe8] rounded-2xl overflow-hidden hover:shadow-2xl hover:border-[#162040] transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { (e.target as HTMLImageElement).src = '/images/galeria-1.png'; }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full font-serif ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-700'}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="text-gray-600 text-sm font-serif">{post.readTime} de lectura</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#162040] font-serif mb-3 group-hover:underline leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 font-serif text-sm leading-relaxed flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[#162040] font-bold font-serif text-sm">
                      Leer más
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
        </>
      ) : (
      <section className="py-20 px-4 bg-[#f5efe8]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-serif text-[#162040] text-lg mb-4">Próximamente publicaremos guías y consejos para tu evento.</p>
          <p className="font-serif text-gray-600 text-sm">Mientras tanto, contáctanos para cotizar cualquier servicio.</p>
        </div>
      </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-[#162040] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
            ¿Listo para planear tu evento?
          </h2>
          <p className="text-[#f5efe8] font-serif text-lg mb-8">
            Cotiza sin compromiso. Respuesta en menos de 2 horas.
          </p>
          <a
            href={WA_URL}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#0d6849] hover:bg-[#0a5740] text-white px-10 py-4 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105 shadow-xl"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Cotizar por WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}
