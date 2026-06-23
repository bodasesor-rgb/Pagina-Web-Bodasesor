import { useEffect, useMemo } from 'react'
import { useLocation } from 'wouter'
import CityLink from '../components/CityLink'
const Link = CityLink
import SearchBar from '../components/SearchBar'
import { searchProductsAll } from '../data/search-index'

function getQueryParam(search: string) {
  return new URLSearchParams(search.startsWith('?') ? search : `?${search}`).get('q')?.trim() || ''
}

export default function SearchPage() {
  const [location] = useLocation()
  const query = useMemo(() => {
    const idx = location.indexOf('?')
    return idx >= 0 ? getQueryParam(location.slice(idx)) : ''
  }, [location])

  const results = useMemo(() => (query ? searchProductsAll(query) : []), [query])

  useEffect(() => {
    document.title = query
      ? `Buscar: ${query} | Bodasesor Eventos`
      : 'Buscar servicios | Bodasesor Eventos'
  }, [query])

  return (
    <div className="min-h-screen bg-[#f5efe8]/30">
      <div className="bg-[#162040] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">Buscar servicios</h1>
          <SearchBar
            defaultQuery={query}
            autoFocus
            wrapperClassName="max-w-xl"
            inputClassName="w-full px-4 py-3 pr-10 rounded-xl border-0 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f5efe8] font-serif"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {!query ? (
          <p className="text-gray-600 font-serif text-center">Escribe al menos 2 letras para buscar banquetes, mobiliario, shows y más.</p>
        ) : results.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 font-serif mb-4">No encontramos resultados para &ldquo;{query}&rdquo;.</p>
            <Link href="/banquetes-catering" className="text-[#162040] underline font-serif">Ver catálogo completo</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 font-serif mb-6">
              {results.length} resultado{results.length !== 1 ? 's' : ''} para &ldquo;{query}&rdquo;
            </p>
            <ul className="space-y-2">
              {results.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block bg-white rounded-xl px-5 py-4 border border-[#162040]/10 hover:border-[#162040]/25 hover:shadow-md transition-all"
                  >
                    <span className="font-serif font-bold text-[#162040]">{item.name}</span>
                    {item.category && (
                      <span className="block text-xs text-gray-400 font-serif mt-1">{item.category}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
