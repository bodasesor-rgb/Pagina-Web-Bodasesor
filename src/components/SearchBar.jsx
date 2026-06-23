import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'wouter'
import { searchProducts } from '../data/search-index'

export default function SearchBar({
  inputClassName = '',
  wrapperClassName = '',
  onNavigate,
  autoFocus = false,
  defaultQuery = '',
}) {
  const [query, setQuery] = useState(defaultQuery)
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [, setLocation] = useLocation()
  const wrapperRef = useRef(null)
  const inputRef = useRef(null)

  const results = query.trim().length >= 2 ? searchProducts(query, 10) : []
  const showDropdown = open && query.trim().length >= 2

  useEffect(() => {
    function onClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
        setActiveIdx(-1)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    setQuery(defaultQuery)
  }, [defaultQuery])

  useEffect(() => {
    setActiveIdx(-1)
  }, [query])

  function navigate(href) {
    setLocation(href)
    setQuery('')
    setOpen(false)
    setActiveIdx(-1)
    onNavigate?.()
  }

  function goSearchPage(q) {
    const trimmed = q.trim()
    if (!trimmed) return
    setLocation(`/buscar?q=${encodeURIComponent(trimmed)}`)
    setQuery('')
    setOpen(false)
    onNavigate?.()
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (activeIdx >= 0 && results[activeIdx]) {
      navigate(results[activeIdx].href)
      return
    }
    goSearchPage(query)
  }

  function handleKeyDown(e) {
    if (!showDropdown || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => (i <= 0 ? results.length - 1 : i - 1))
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActiveIdx(-1)
    }
  }

  return (
    <div ref={wrapperRef} className={`relative ${wrapperClassName}`}>
      <form className="relative" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          name="q"
          type="search"
          autoComplete="off"
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar servicios..."
          className={inputClassName}
          data-testid="input-search"
          aria-label="Buscar servicios"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          role="combobox"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#162040] hover:text-[#1a2a52]"
          aria-label="Buscar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {showDropdown && (
        <div
          className="absolute left-0 right-0 top-full mt-1 z-[100] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
          role="listbox"
        >
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500 font-serif">No encontramos resultados para &ldquo;{query}&rdquo;</p>
          ) : (
            <>
              {results.map((item, i) => (
                <button
                  key={item.href}
                  type="button"
                  role="option"
                  aria-selected={i === activeIdx}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => navigate(item.href)}
                  className={`w-full text-left px-4 py-2.5 border-b border-gray-50 last:border-0 transition-colors ${
                    i === activeIdx ? 'bg-[#f5efe8]' : 'hover:bg-[#f5efe8]/60'
                  }`}
                >
                  <span className="block text-sm font-serif font-semibold text-[#162040]">{item.name}</span>
                  {item.category && (
                    <span className="block text-xs font-serif text-gray-400 mt-0.5">{item.category}</span>
                  )}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goSearchPage(query)}
                className="w-full text-left px-4 py-2 text-xs font-serif font-bold text-[#162040] bg-gray-50 hover:bg-[#f5efe8] transition-colors"
              >
                Ver todos los resultados para &ldquo;{query}&rdquo; →
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
