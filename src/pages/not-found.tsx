import { Link } from "wouter";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-7xl font-serif font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-serif text-foreground mb-3">Página no encontrada</h2>
      <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
        La página que buscas no existe o fue movida. Explora nuestros servicios o regresa al inicio.
      </p>
      <Link href="/">
        <a
          data-testid="link-home-404"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-md"
        >
          <Home size={18} />
          Volver al inicio
        </a>
      </Link>
    </div>
  );
}
