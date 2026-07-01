import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { img } from "../data/site"

const gallerySlides = [
  [101,102,103],[104,105,106],[107,108,109],[110,111,112],[113,114,115],
  [116,117,118],[119,120,121],[122,123,124],[125,126,127],[128,129,130],
].map(group => group.map(n => img(`/images/instagram/ig${n}.jpg`)))

function Carousel() {
  const [slide, setSlide] = useState(0)
  const prev = () => setSlide(s => (s - 1 + gallerySlides.length) % gallerySlides.length)
  const next = () => setSlide(s => (s + 1) % gallerySlides.length)
  return (
    <div className="relative">
      <button type="button" onClick={prev} aria-label="Ver fotos anteriores"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#162040] hover:bg-[#1a2a52] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 -ml-4 md:-ml-6">
        <ChevronLeft className="w-6 h-6" aria-hidden="true" />
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 md:px-12">
        {gallerySlides[slide].map((src, i) => (
          <div key={src}
            className="relative h-80 overflow-hidden rounded-2xl group cursor-pointer border-4 border-white hover:border-[#162040] transition-all duration-300">
            <img
              src={src}
              alt={`Evento real Bodasesor ${slide * 3 + i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={e => { e.target.src = img('/images/instagram/ig101.jpg') }}
            />
            <div className="absolute inset-0 bg-[#162040]/0 group-hover:bg-[#162040]/30 transition-all duration-300 flex items-center justify-center">
              <svg className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={next} aria-label="Ver fotos siguientes"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#162040] hover:bg-[#1a2a52] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 -mr-4 md:-mr-6">
        <ChevronRight className="w-6 h-6" aria-hidden="true" />
      </button>
      <div className="flex justify-center gap-1 mt-8" role="tablist" aria-label="Grupos de fotos de la galería">
        {gallerySlides.map((_, i) => (
          <button type="button" key={i} role="tab" aria-label={`Grupo de fotos ${i + 1} de ${gallerySlides.length}`} aria-selected={i === slide} onClick={() => setSlide(i)}
            className="inline-flex min-w-11 min-h-11 items-center justify-center">
            <span aria-hidden="true" className={`block h-3 rounded-full transition-all duration-300 ${i === slide ? 'w-8 bg-[#162040]' : 'w-3 bg-gray-400 hover:bg-[#162040]'}`} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function GalleryCarouselSection() {
  return (
    <section className="py-20 bg-[#f5efe8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">Momentos que creamos</h2>
          <p className="text-gray-600 mt-3 font-serif">Descubre la magia que hacemos en cada celebración</p>
        </div>
        <Carousel />
      </div>
    </section>
  )
}
