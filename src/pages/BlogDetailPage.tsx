import CityLink from "../components/CityLink";
const Link = CityLink;
import { useEffect } from "react";
import { getBlogPostBySlug, blogPosts } from "../data/blog-data";

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

interface Props { slug: string }

export default function BlogDetailPage({ slug }: Props) {
  const post = getBlogPostBySlug(slug);
  const related = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) document.title = `${post.title} | Bodasesor Blog`;
  }, [slug, post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5efe8] text-[#162040] gap-6">
        <h1 className="text-4xl font-serif font-bold">Artículo no encontrado</h1>
        <Link href="/blog" className="text-[#162040] underline font-serif">← Volver al blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero imagen ── */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).src = '/images/galeria-1.png'; }}
        />
        <div className="absolute inset-0 bg-[#162040]/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full font-serif mb-4 ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-700'}`}>
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-serif max-w-4xl leading-tight">
            {post.title}
          </h1>
          <p className="text-[#f5efe8] font-serif mt-3">{post.readTime} de lectura</p>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="bg-[#f5efe8] py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm font-serif text-gray-600">
          <Link href="/" className="hover:text-[#162040] hover:underline">Inicio</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-[#162040] hover:underline">Blog</Link>
          <span>›</span>
          <span className="text-[#162040] font-bold truncate">{post.title}</span>
        </div>
      </div>

      {/* ── Cuerpo del artículo ── */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xl text-gray-600 font-serif leading-relaxed mb-10 border-l-4 border-[#162040] pl-6 italic">
          {post.excerpt}
        </p>
        <div className="space-y-6">
          {post.body.map((paragraph, i) => (
            <p key={i} className="text-gray-700 font-serif text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>

        {/* CTA inline */}
        <div className="mt-16 bg-[#f5efe8] rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold text-[#162040] font-serif mb-3">
            ¿Quieres cotizar este servicio para tu evento?
          </h2>
          <p className="text-gray-600 font-serif mb-6">
            Contáctanos por WhatsApp y recibe una propuesta personalizada en menos de 2 horas.
          </p>
          <a
            href={WA_URL}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Cotizar por WhatsApp
          </a>
        </div>
      </article>

      {/* ── Artículos relacionados ── */}
      <section className="bg-[#f5efe8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#162040] font-serif mb-10 text-center">También te puede interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {related.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`}>
                <article className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#162040]">
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { (e.target as HTMLImageElement).src = '/images/galeria-1.png'; }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full font-serif ${CATEGORY_COLORS[p.category] ?? 'bg-gray-100 text-gray-700'}`}>
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-[#162040] font-serif group-hover:underline leading-snug mb-1">{p.title}</h3>
                    <p className="text-xs text-gray-500 font-serif">{p.readTime} de lectura</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/blog" className="inline-block border-2 border-[#162040] text-[#162040] hover:bg-[#162040] hover:text-white px-8 py-3 rounded-xl font-bold font-serif transition-all duration-300">
              Ver todos los artículos
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
