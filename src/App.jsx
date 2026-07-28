import { Switch, Route, Router as WouterRouter } from "wouter"
import { useEffect, useLayoutEffect, lazy, Suspense, useState } from "react"
import { useLocation } from "wouter"
import { CityProvider, CityUrlSync } from './context/CityContext'
import GlobalSEO from './components/GlobalSEO'
import GoogleAnalytics from './components/GoogleAnalytics'
import { ErrorBoundary } from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import { parseCityFromPath, stripCityFromSlug } from './utils/city-url'
import { hideStaticLcpShell, hideStaticHeroOnly, isHomePath } from './utils/static-lcp-shell'
import { useCityAwareLocation } from './utils/city-router'
import { resolveBasePath } from './utils/page-routes'
import { prefetchProducts } from './data/products-loader'

const Footer = lazy(() => import('./components/Footer'))
const WhatsAppFab = lazy(() => import('./components/WhatsAppFab'))

import Home from './pages/Home.tsx'

const GaleriaPage = lazy(() => import('./pages/GaleriaPage.tsx'))
const CatalogosPage = lazy(() => import('./pages/CatalogosPage.tsx'))
const CatalogoDetailPage = lazy(() => import('./pages/CatalogoDetailPage.tsx'))
const BanquetesCateringPage = lazy(() => import('./pages/BanquetesCateringPage.tsx'))
const BarrasBebidasPage = lazy(() => import('./pages/BarrasBebidasPage.tsx'))
const MesasPersonalizadasPage = lazy(() => import('./pages/MesasPersonalizadasPage.tsx'))
const WeddingPage = lazy(() => import('./pages/WeddingPage.tsx'))
const WeddingDetailPage = lazy(() => import('./pages/WeddingDetailPage.tsx'))
const SalasPeriquerasPage = lazy(() => import('./pages/SalasPeriquerasPage.tsx'))
const SalaDetailPage = lazy(() => import('./pages/SalaDetailPage.tsx'))
const PeriqueraDetailPage = lazy(() => import('./pages/PeriqueraDetailPage.tsx'))
const PistasTarimasPage = lazy(() => import('./pages/PistasTarimasPage.tsx'))
const PistaTarimaDetailPage = lazy(() => import('./pages/PistaTarimaDetailPage.tsx'))
const CatalogoPistasTarimasPage = lazy(() => import('./pages/CatalogoPistasTarimasPage.tsx'))
const VajillasPage = lazy(() => import('./pages/VajillasPage.tsx'))
const VajillaDetailPage = lazy(() => import('./pages/VajillaDetailPage.tsx'))
const CatalogoVajillasPage = lazy(() => import('./pages/CatalogoVajillasPage.tsx'))
const ColgantesPage = lazy(() => import('./pages/ColgantesPage.tsx'))
const BarrasMobiliarioPage = lazy(() => import('./pages/BarrasMobiliarioPage.tsx'))
const ColganteDetailPage = lazy(() => import('./pages/ColganteDetailPage.tsx'))
const CatalogoColgantesPage = lazy(() => import('./pages/CatalogoColgantesPage.tsx'))
const EnteladosPage = lazy(() => import('./pages/EnteladosPage.tsx'))
const EnteladoDetailPage = lazy(() => import('./pages/EnteladoDetailPage.tsx'))
const FloreriaPage = lazy(() => import('./pages/FloreriaPage.tsx'))
const FloreriaDetailPage = lazy(() => import('./pages/FloreriaDetailPage.tsx'))
const ShowsPage = lazy(() => import('./pages/ShowsPage.tsx'))
const ShowsDetailPage = lazy(() => import('./pages/ShowsDetailPage.tsx'))
const CarpasPage = lazy(() => import('./pages/CarpasPage.tsx'))
const CarpaDetailPage = lazy(() => import('./pages/CarpaDetailPage.tsx'))
const AudioIluminacionPage = lazy(() => import('./pages/AudioIluminacionPage.tsx'))
const AudioIluminacionDetailPage = lazy(() => import('./pages/AudioIluminacionDetailPage.tsx'))
const RepoPage = lazy(() => import('./pages/RepoPage.tsx'))
const RepoDetailPage = lazy(() => import('./pages/RepoDetailPage.tsx'))
const MusicaPage = lazy(() => import('./pages/MusicaPage.tsx'))
const MusicaDetailPage = lazy(() => import('./pages/MusicaDetailPage.tsx'))
const FotografiaPage = lazy(() => import('./pages/FotografiaPage.tsx'))
const FotografiaDetailPage = lazy(() => import('./pages/FotografiaDetailPage.tsx'))
const EmpresasPage = lazy(() => import('./pages/EmpresasPage.tsx'))
const EmpresasDetailPage = lazy(() => import('./pages/EmpresasDetailPage.tsx'))
const EspaciosPage = lazy(() => import('./pages/EspaciosPage.tsx'))
const EspaciosDetailPage = lazy(() => import('./pages/EspaciosDetailPage.tsx'))
const CombinacionesPage = lazy(() => import('./pages/CombinacionesPage.tsx'))
const CombinacionDetailPage = lazy(() => import('./pages/CombinacionDetailPage.tsx'))
const QuienesSomosPage = lazy(() => import('./pages/QuienesSomosPage.tsx'))
const LegalPage = lazy(() => import('./pages/LegalPage.tsx'))
const BlogPage = lazy(() => import('./pages/BlogPage.tsx'))
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage.tsx'))
const ServicePage = lazy(() => import('./pages/ServicePage.tsx'))
const BanqueteMenuDetailPage = lazy(() => import('./pages/BanqueteMenuDetailPage.tsx'))
const SearchPage = lazy(() => import('./pages/SearchPage.tsx'))
const NotFound = lazy(() => import('./pages/not-found.tsx'))
const LegacyShopifyRedirect = lazy(() => import('./components/LegacyShopifyRedirect.jsx'))
const EventosLegacyRedirect = lazy(() => import('./components/EventosLegacyRedirect.jsx'))

function PageLoader() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center font-serif text-gray-700">
      Cargando…
    </div>
  )
}

const BANQUET_PARENT_SLUGS = ['banquetes', 'banquete-kosher', 'banquete-mexicano', 'banquete-navideno']

/** Catalog pages reachable with optional /{city} segment */
const STANDALONE_PAGES = {
  '/banquetes-catering': BanquetesCateringPage,
  '/barras-de-bebidas': BarrasBebidasPage,
  '/mesas-personalizadas': MesasPersonalizadasPage,
  '/combinaciones-mesas-sillas': CombinacionesPage,
  '/vajillas': VajillasPage,
  '/colgantes': ColgantesPage,
  '/barras': BarrasMobiliarioPage,
  '/entelados': EnteladosPage,
  '/floreria': FloreriaPage,
  '/shows': ShowsPage,
  '/pistas-tarimas': PistasTarimasPage,
  '/salas-periqueras': SalasPeriquerasPage,
  '/reposteria': RepoPage,
  '/wedding-planner': WeddingPage,
  '/musica': MusicaPage,
  '/fotografia': FotografiaPage,
  '/alimentos-empresas': EmpresasPage,
  '/espacios-eventos': EspaciosPage,
  '/carpas': CarpasPage,
  '/audio-iluminacion-video': AudioIluminacionPage,
  '/galeria': GaleriaPage,
  '/catalogos': CatalogosPage,
  '/quienes-somos': QuienesSomosPage,
  '/blog': BlogPage,
  '/buscar': SearchPage,
}

function RenderDetailPage({ catalog, slug }) {
  switch (catalog) {
    case 'pistas-tarimas': return <PistaTarimaDetailPage slug={slug} />
    case 'vajillas': return <VajillaDetailPage slug={slug} />
    case 'colgantes': return <ColganteDetailPage slug={slug} />
    case 'barras': return <ServicePage params={{ slug: 'barras', barraSlug: slug }} />
    case 'entelados': return <EnteladoDetailPage slug={slug} />
    case 'floreria': return <FloreriaDetailPage slug={slug} />
    case 'shows': return <ShowsDetailPage slug={slug} />
    case 'reposteria': return <RepoDetailPage slug={slug} />
    case 'wedding-planner': return <WeddingDetailPage slug={slug} />
    case 'musica': return <MusicaDetailPage slug={slug} />
    case 'fotografia': return <FotografiaDetailPage slug={slug} />
    case 'alimentos-empresas': return <EmpresasDetailPage slug={slug} />
    case 'espacios-eventos': return <EspaciosDetailPage slug={slug} />
    case 'carpas': return <CarpaDetailPage slug={slug} />
    case 'audio-iluminacion-video': return <AudioIluminacionDetailPage slug={slug} />
    case 'combinaciones': return <CombinacionDetailPage slug={slug} />
    default: return <ServicePage params={{ slug }} />
  }
}

function RenderResolvedRoute({ basePath }) {
  const resolved = resolveBasePath(basePath)

  if (resolved.kind === 'home') return <Home />

  if (resolved.kind === 'standalone') {
    const Page = STANDALONE_PAGES[resolved.path]
    if (Page) return <Page />
  }

  if (resolved.kind === 'detail') {
    return <RenderDetailPage catalog={resolved.catalog} slug={resolved.slug} />
  }

  if (resolved.kind === 'catalogo') {
    return <CatalogoDetailPage slug={resolved.slug} />
  }

  if (resolved.kind === 'banquete-menu') {
    return (
      <BanqueteMenuDetailPage
        parentSlug={resolved.parentSlug}
        menuSlug={resolved.menuSlug}
      />
    )
  }

  return <ServicePage params={{ slug: resolved.slug }} />
}

function TwoSegmentCatchAll({ parent, child }) {
  const { basePath } = parseCityFromPath(`/${parent}/${child}`)
  return <RenderResolvedRoute basePath={basePath} />
}

function CatchAllRoute({ slug }) {
  const { basePath } = parseCityFromPath(`/${slug}`)
  return <RenderResolvedRoute basePath={basePath} />
}

function StaticLcpCleanup() {
  const [location] = useLocation()
  useLayoutEffect(() => {
    // Tear down fixed LCP shell as soon as React paints — avoids double nav / stacked hero.
    if (isHomePath(location)) {
      hideStaticLcpShell()
      document.getElementById('static-nav-shell')?.remove()
      document.getElementById('static-hero-copy')?.remove()
      document.getElementById('lcp-hero-wrap')?.remove()
    } else {
      hideStaticHeroOnly()
      hideStaticLcpShell()
      document.getElementById('static-nav-shell')?.remove()
    }
  }, [location])
  useEffect(() => {
    // Warm product catalog after first paint so detail pages don't flash "Cargando…"
    const warm = () => prefetchProducts()
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(warm, { timeout: 2000 })
      return () => window.cancelIdleCallback(id)
    }
    const t = setTimeout(warm, 800)
    return () => clearTimeout(t)
  }, [])
  return null
}

function ScrollToTop() {
  const [location] = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location])
  return null
}

function DeferredBelowFold() {
  const [showFab, setShowFab] = useState(false)
  useEffect(() => {
    const reveal = () => setShowFab(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(reveal, { timeout: 2500 })
      return () => window.cancelIdleCallback(id)
    }
    const t = setTimeout(reveal, 1500)
    return () => clearTimeout(t)
  }, [])
  return (
    <Suspense fallback={null}>
      {/* Footer (Lo Más Buscado / Catálogos) must load with the page — not after idle */}
      <Footer />
      {showFab ? <WhatsAppFab /> : null}
    </Suspense>
  )
}

function Router() {
  const [location] = useLocation()
  return (
    <>
      <CityUrlSync />
      <GlobalSEO />
      <GoogleAnalytics />
      <StaticLcpCleanup />
      <ScrollToTop />
      <Navbar />
      <main>
        <ErrorBoundary resetKey={location}>
        <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/galeria" component={GaleriaPage} />
          <Route path="/catalogos" component={CatalogosPage} />
          <Route path="/catalogos/:slug">
            {(params) => <CatalogoDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Nexus legacy SEO paths → canonical SPA routes.
              Pass FULL slug (e.g. bodas-cdmx) so city is preserved by resolveEventosSlug. */}
          <Route path="/eventos/:slug">
            {(params) => <EventosLegacyRedirect slug={params.slug} />}
          </Route>

          {/* Legacy Shopify URLs — client fallback if Netlify redirect misses */}
          <Route path="/products/:handle" component={LegacyShopifyRedirect} />
          <Route path="/collections/:handle" component={LegacyShopifyRedirect} />
          <Route path="/pages/:handle" component={LegacyShopifyRedirect} />
          <Route path="/blogs/:rest*" component={LegacyShopifyRedirect} />

          {/* Sillas */}
          <Route path="/sillas/:chairSlug">
            {(params) => <ServicePage params={{ slug: 'sillas', chairSlug: stripCityFromSlug(params.chairSlug) }} />}
          </Route>

          {/* Mesas */}
          <Route path="/mesas/:mesaSlug">
            {(params) => <ServicePage params={{ slug: 'mesas', mesaSlug: stripCityFromSlug(params.mesaSlug) }} />}
          </Route>

          {/* Barras de mobiliario (no confundir con barras de bebidas/alimentos) */}
          <Route path="/barras" component={BarrasMobiliarioPage} />
          <Route path="/barras/:barraSlug">
            {(params) => <ServicePage params={{ slug: 'barras', barraSlug: stripCityFromSlug(params.barraSlug) }} />}
          </Route>

          {/* Combinaciones */}
          <Route path="/combinaciones-mesas-sillas" component={CombinacionesPage} />
          <Route path="/combinaciones/:slug">
            {(params) => <CombinacionDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Vajillas */}
          <Route path="/vajillas" component={VajillasPage} />
          <Route path="/vajillas/:slug">
            {(params) => <VajillaDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>
          <Route path="/catalogo/vajillas" component={CatalogoVajillasPage} />

          {/* Colgantes */}
          <Route path="/colgantes" component={ColgantesPage} />
          <Route path="/colgantes/:slug">
            {(params) => <ColganteDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>
          <Route path="/catalogo/colgantes" component={CatalogoColgantesPage} />

          {/* Entelados */}
          <Route path="/entelados" component={EnteladosPage} />
          <Route path="/entelados/:slug">
            {(params) => <EnteladoDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Florería */}
          <Route path="/floreria" component={FloreriaPage} />
          <Route path="/floreria/:slug">
            {(params) => <FloreriaDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Banquetes & Catering */}
          <Route path="/banquetes-catering" component={BanquetesCateringPage} />
          {BANQUET_PARENT_SLUGS.map((parentSlug) => (
            <Route key={parentSlug} path={`/${parentSlug}/:menuSlug`}>
              {(params) => (
                <BanqueteMenuDetailPage
                  parentSlug={parentSlug}
                  menuSlug={stripCityFromSlug(params.menuSlug)}
                />
              )}
            </Route>
          ))}

          {/* Barras de Bebidas */}
          <Route path="/barras-de-bebidas" component={BarrasBebidasPage} />

          {/* Mesas Personalizadas */}
          <Route path="/mesas-personalizadas" component={MesasPersonalizadasPage} />

          {/* Shows */}
          <Route path="/shows" component={ShowsPage} />
          <Route path="/shows/:slug">
            {(params) => <ShowsDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Pistas y Tarimas */}
          <Route path="/catalogo/pistas-tarimas" component={CatalogoPistasTarimasPage} />
          <Route path="/pistas-tarimas" component={PistasTarimasPage} />
          <Route path="/pistas-tarimas/:slug">
            {(params) => <PistaTarimaDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Salas y Periqueras */}
          <Route path="/salas-periqueras" component={SalasPeriquerasPage} />
          <Route path="/salas/:salaSlug">
            {(params) => <SalaDetailPage salaSlug={stripCityFromSlug(params.salaSlug)} />}
          </Route>
          <Route path="/periqueras/:perSlug">
            {(params) => <PeriqueraDetailPage perSlug={stripCityFromSlug(params.perSlug)} />}
          </Route>

          {/* Repostería */}
          <Route path="/reposteria" component={RepoPage} />
          <Route path="/reposteria/:slug">
            {(params) => <RepoDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Wedding Planner */}
          <Route path="/wedding-planner" component={WeddingPage} />
          <Route path="/wedding-planner/:slug">
            {(params) => <WeddingDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Música */}
          <Route path="/musica" component={MusicaPage} />
          <Route path="/musica/:slug">
            {(params) => <MusicaDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Fotografía */}
          <Route path="/fotografia" component={FotografiaPage} />
          <Route path="/fotografia/:slug">
            {(params) => <FotografiaDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Alimentos para Empresas */}
          <Route path="/alimentos-empresas" component={EmpresasPage} />
          <Route path="/alimentos-empresas/:slug">
            {(params) => <EmpresasDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Espacios */}
          <Route path="/espacios-eventos" component={EspaciosPage} />
          <Route path="/espacios-eventos/:slug">
            {(params) => <EspaciosDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Carpas */}
          <Route path="/carpas" component={CarpasPage} />
          <Route path="/carpas/:slug">
            {(params) => <CarpaDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Audio, Iluminación y Video */}
          <Route path="/audio-iluminacion-video" component={AudioIluminacionPage} />
          <Route path="/audio-iluminacion-video/:slug">
            {(params) => <AudioIluminacionDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Quiénes somos + legal (E-E-A-T) */}
          <Route path="/quienes-somos" component={QuienesSomosPage} />
          <Route path="/aviso-de-privacidad">
            {() => <LegalPage kind="privacidad" />}
          </Route>
          <Route path="/terminos-y-condiciones">
            {() => <LegalPage kind="terminos" />}
          </Route>

          {/* Blog */}
          <Route path="/blog" component={BlogPage} />
          <Route path="/blog/:slug">
            {(params) => <BlogDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Búsqueda */}
          <Route path="/buscar" component={SearchPage} />

          {/* Legacy /city URLs when city suffix was not recognized (fallback) */}
          <Route path="/:parent/:child">
            {(params) => (
              <TwoSegmentCatchAll
                parent={stripCityFromSlug(params.parent)}
                child={stripCityFromSlug(params.child)}
              />
            )}
          </Route>

          {/* Catch-all: city landing, city-suffixed catalog pages, and product slugs */}
          <Route path="/:slug">
            {(params) => <CatchAllRoute slug={params.slug} />}
          </Route>

          <Route component={NotFound} />
        </Switch>
        </Suspense>
        </ErrorBoundary>
      </main>
      <DeferredBelowFold />
    </>
  )
}

export default function App() {
  const base = import.meta.env.VITE_BASE_PATH
    ? import.meta.env.VITE_BASE_PATH.replace(/\/$/, '')
    : ''
  return (
    <CityProvider>
      <WouterRouter base={base} hook={useCityAwareLocation}>
        <Router />
      </WouterRouter>
    </CityProvider>
  )
}
