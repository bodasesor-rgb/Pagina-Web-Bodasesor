import { useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    document.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [onClose, onPrev, onNext])

  return (
    <div className="fixed inset-0 z-[9999] bg-black/92 flex items-center justify-center" onClick={onClose}>
      <div className="relative w-full max-w-4xl mx-4 flex flex-col items-center" onClick={e => e.stopPropagation()}>
        <img
          src={images[index]}
          alt={`Foto ${index + 1} de ${images.length}`}
          className="max-h-[82vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
        />
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors" aria-label="Cerrar">
          <X className="w-8 h-8" />
        </button>
        <button onClick={onPrev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 text-white p-3 rounded-full transition-all -ml-2 md:-ml-14" aria-label="Anterior">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={onNext} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 text-white p-3 rounded-full transition-all -mr-2 md:-mr-14" aria-label="Siguiente">
          <ChevronRight className="w-6 h-6" />
        </button>
        <p className="mt-4 text-white/60 text-sm font-serif">{index + 1} / {images.length}</p>
      </div>
    </div>
  )
}
