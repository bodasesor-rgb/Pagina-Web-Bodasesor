import { Switch, Route, Router as WouterRouter } from "wouter"
import { useEffect, lazy, Suspense } from "react"
import { useLocation } from "wouter"
import { CityProvider, CityUrlSync } from './context/CityContext'
import GlobalSEO from './components/GlobalSEO'
import { ErrorBoundary } from './components/ErrorBoundary'
import { parseCityFromPath, stripCityFromSlug } from './utils/city-url'
import { useCityAwareLocation } from './utils/city-router'

const Navbar = lazy(() => import('./components/Navbar'))
const Footer = lazy(() => import('./components/Footer'))
const WhatsAppFab = lazy(() => import('./components/WhatsAppFab'))

import Home from './pages/Home.tsx'

const GaleriaPage = lazy(() => import('./pages/GaleriaPage.tsx'))
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
const BlogPage = lazy(() => import('./pages/BlogPage.tsx'))
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage.tsx'))
const ServicePage = lazy(() => import('./pages/ServicePage.tsx'))
const BanqueteMenuDetailPage = lazy(() => import('./pages/BanqueteMenuDetailPage.tsx'))
const SearchPage = lazy(() => import('./pages/SearchPage.tsx'))
const NotFound = lazy(() => import('./pages/not-found.tsx'))
const LegacyShopifyRedirect = lazy(() => import('./components/LegacyShopifyRedirect.jsx'))

function PageLoader() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center font-serif text-[#162040]/60">
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
  '/quienes-somos': QuienesSomosPage,
  '/blog': BlogPage,
  '/buscar': SearchPage,
}

function CatchAllRoute({ slug }) {
  const { basePath } = parseCityFromPath(`/${slug}`)

  if (basePath === '/') {
    return <Home />
  }

  const Standalone = STANDALONE_PAGES[basePath]
  if (Standalone) {
    return <Standalone />
  }

  return <ServicePage params={{ slug }} />
}

function ScrollToTop() {
  const [location] = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location])
  return null
}

function Router() {
  const [location] = useLocation()
  return (
    <>
      <CityUrlSync />
      <GlobalSEO />
      <ScrollToTop />
      <Suspense fallback={
        <div className="sticky top-0 z-50 shadow-lg" aria-hidden="true">
          <div className="h-16 bg-[#162040]" />
          <div className="h-12 bg-white" />
        </div>
      }>
        <Navbar />
      </Suspense>
      <main>
        <ErrorBoundary resetKey={location}>
        <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/galeria" component={GaleriaPage} />

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

          {/* Quiénes somos */}
          <Route path="/quienes-somos" component={QuienesSomosPage} />

          {/* Blog */}
          <Route path="/blog" component={BlogPage} />
          <Route path="/blog/:slug">
            {(params) => <BlogDetailPage slug={stripCityFromSlug(params.slug)} />}
          </Route>

          {/* Búsqueda */}
          <Route path="/buscar" component={SearchPage} />

          {/* Catch-all: city landing, city-suffixed catalog pages, and product slugs */}
          <Route path="/:slug">
            {(params) => <CatchAllRoute slug={params.slug} />}
          </Route>

          <Route component={NotFound} />
        </Switch>
        </Suspense>
        </ErrorBoundary>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <WhatsAppFab />
      </Suspense>
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
