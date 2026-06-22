import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { whatsappLink } from '../data/site'

const NAV_LINKS = [
  {
    label: 'Servicios',
    children: [
      { label: 'Banquetes & Catering', to: '/banquetes-catering' },
      { label: 'Barras de Bebidas', to: '/barras-de-bebidas' },
      { label: 'Wedding Planner', to: '/wedding-planner' },
      { label: 'Audio & Iluminación', to: '/audio-iluminacion-video' },
      { label: 'Mobiliario', to: '/salas-periqueras' },
      { label: 'Fotografía & Video', to: '/fotografia' },
    ],
  },
  {
    label: 'Eventos',
    children: [
      { label: 'Bodas', to: '/bodas' },
      { label: 'Corporativos', to: '/corporativos' },
      { label: 'XV Años', to: '/xv-anos' },
      { label: 'Baby Shower', to: '/baby-shower' },
      { label: 'Cumpleaños', to: '/cumpleanos' },
      { label: 'Primera Comunión', to: '/primera-comunion' },
    ],
  },
  { label: 'Galería', to: '/galeria' },
  { label: 'Quiénes Somos', to: '/quienes-somos' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setOpenDropdown(null)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className={`font-serif text-2xl font-semibold tracking-wide ${scrolled ? 'text-gray-900' : 'text-white'}`}>
          <span className="text-primary">B</span>odasesor
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <button
                  className={`flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors ${
                    scrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-accent'
                  }`}
                >
                  {link.label}
                  <svg className="w-3 h-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1">
                  {link.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-secondary hover:text-primary transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  scrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-accent'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            Cotizar
          </a>
        </nav>

        {/* Burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-2 ${scrolled ? 'text-gray-800' : 'text-white'}`}
          aria-label="Menú"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className="w-full flex items-center justify-between px-6 py-3 text-sm font-semibold text-gray-800 uppercase tracking-wide"
                >
                  {link.label}
                  <svg className={`w-4 h-4 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === link.label && (
                  <div className="bg-gray-50 px-6 py-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block py-2 text-sm text-gray-600 hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="block px-6 py-3 text-sm font-semibold text-gray-800 uppercase tracking-wide hover:text-primary"
              >
                {link.label}
              </Link>
            )
          )}
          <div className="px-6 py-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-primary text-white font-semibold py-3 rounded-full text-sm"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
