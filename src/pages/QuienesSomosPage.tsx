import CityLink from "../components/CityLink";
const Link = CityLink;
import { useEffect } from "react";
import { Trophy, Handshake, Sparkles, Lightbulb, Mail, Phone, Camera } from "lucide-react";

const WA = "https://api.whatsapp.com/send/?phone=5215540080373&text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20un%20evento";

const pillars = [
  {
    Icon: Trophy,
    title: "Experiencia comprobada",
    desc: "Más de una década organizando eventos de todos los tamaños, con un equipo profesional y apasionado.",
  },
  {
    Icon: Handshake,
    title: "Servicio personalizado",
    desc: "Cada evento es único. Trabajamos contigo para entender tu visión y llevarla a la realidad.",
  },
  {
    Icon: Sparkles,
    title: "Calidad en cada detalle",
    desc: "Nos aliamos con los mejores proveedores para garantizar catering, decoración y logística de primer nivel.",
  },
  {
    Icon: Lightbulb,
    title: "Creatividad e innovación",
    desc: "Diseñamos experiencias originales que sorprenden a tus invitados y superan tus expectativas.",
  },
];

export default function QuienesSomosPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Quiénes somos | Bodasesor Eventos";
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="bg-[#162040] py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#f5efe8] text-sm font-serif tracking-widest mb-4 uppercase">Quiénes somos</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-8 leading-tight">
            Creamos eventos que se convierten en recuerdos
          </h1>
          <p className="text-xl text-[#f5efe8] font-serif max-w-3xl mx-auto leading-relaxed">
            Somos Bodasesor Eventos, una empresa especializada en la organización y producción de celebraciones sociales en la Ciudad de México. Con más de diez años de experiencia, acompañamos a nuestros clientes en cada etapa de su evento: desde la primera idea hasta el último detalle.
          </p>
        </div>
      </section>

      {/* ── Cifras clave ── */}
      <section className="bg-[#f5efe8] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-6xl font-bold text-[#162040] font-serif mb-3">+10</div>
              <div className="text-lg text-gray-700 font-serif">años de experiencia</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-[#162040] font-serif mb-3">100%</div>
              <div className="text-lg text-gray-700 font-serif">atención personalizada</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#162040] font-serif mb-3 leading-tight">Bodas, XV años &amp; Corporativos</div>
              <div className="text-lg text-gray-700 font-serif">eventos de todos los tamaños</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pilares ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#162040] font-serif text-center mb-16">
            Por qué elegir Bodasesor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {pillars.map((p) => (
              <div key={p.title} className="flex gap-6 bg-[#f5efe8] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#162040]/8 flex items-center justify-center text-[#162040]">
                  <p.Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#162040] font-serif mb-3">{p.title}</h3>
                  <p className="text-gray-700 font-serif leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Frase de marca ── */}
      <section className="bg-[#162040] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-4xl font-serif text-white italic leading-relaxed">
            "No solo organizamos eventos — creamos los momentos que tus invitados recordarán para siempre."
          </blockquote>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-[#f5efe8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#162040] font-serif mb-6">
            ¿Listo para comenzar a planear tu evento?
          </h2>
          <p className="text-xl text-gray-700 font-serif mb-10">
            Contáctanos y recibe una cotización sin compromiso.
          </p>
          <a
            href={WA}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-green-600 text-white px-10 py-5 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105 shadow-xl"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Cotiza tu evento
          </a>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center text-gray-600 font-serif items-center">
            <span className="inline-flex items-center gap-2"><Mail className="w-4 h-4" /> bodasesor@gmail.com</span>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-2"><Phone className="w-4 h-4" /> 55 4008 0373</span>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-2"><Camera className="w-4 h-4" /> @bodasesormx</span>
          </div>
        </div>
      </section>

      <div className="text-center py-8 bg-white">
        <Link href="/" className="text-[#162040] underline font-serif">← Volver al inicio</Link>
      </div>

    </div>
  );
}
