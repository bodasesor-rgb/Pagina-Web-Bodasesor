import { Switch, Route, Router as WouterRouter } from "wouter"
import { useEffect } from "react"
import { useLocation } from "wouter"
import { CityProvider, CityUrlSync } from './context/CityContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import GlobalSEO from './components/GlobalSEO'
import { ErrorBoundary } from './components/ErrorBoundary'
import { parseCityFromPath, stripCityFromSlug } from './utils/city-url'

// Original pages
import Home from './pages/Home.tsx'
import GaleriaPage from './pages/GaleriaPage.tsx'
import BanquetesCateringPage from './pages/BanquetesCateringPage.tsx'
import BarrasBebidasPage from './pages/BarrasBebidasPage.tsx'
import MesasPersonalizadasPage from './pages/MesasPersonalizadasPage.tsx'
import WeddingPage from './pages/WeddingPage.tsx'
import WeddingDetailPage from './pages/WeddingDetailPage.tsx'
import SalasPeriquerasPage from './pages/SalasPeriquerasPage.tsx'
import SalaDetailPage from './pages/SalaDetailPage.tsx'
import PeriqueraDetailPage from './pages/PeriqueraDetailPage.tsx'
import PistasTarimasPage from './pages/PistasTarimasPage.tsx'
import PistaTarimaDetailPage from './pages/PistaTarimaDetailPage.tsx'
import CatalogoPistasTarimasPage from './pages/CatalogoPistasTarimasPage.tsx'
import VajillasPage from './pages/VajillasPage.tsx'
import VajillaDetailPage from './pages/VajillaDetailPage.tsx'
import CatalogoVajillasPage from './pages/CatalogoVajillasPage.tsx'
import ColgantesPage from './pages/ColgantesPage.tsx'
import ColganteDetailPage from './pages/ColganteDetailPage.tsx'
import CatalogoColgantesPage from './pages/CatalogoColgantesPage.tsx'
import EnteladosPage from './pages/EnteladosPage.tsx'
import EnteladoDetailPage from './pages/EnteladoDetailPage.tsx'
import FloreriaPage from './pages/FloreriaPage.tsx'
import FloreriaDetailPage from './pages/FloreriaDetailPage.tsx'
import ShowsPage from './pages/ShowsPage.tsx'
import ShowsDetailPage from './pages/ShowsDetailPage.tsx'
import CarpasPage from './pages/CarpasPage.tsx'
import CarpaDetailPage from './pages/CarpaDetailPage.tsx'
import AudioIluminacionPage from './pages/AudioIluminacionPage.tsx'
import AudioIluminacionDetailPage from './pages/AudioIluminacionDetailPage.tsx'
import RepoPage from './pages/RepoPage.tsx'
import RepoDetailPage from './pages/RepoDetailPage.tsx'
import MusicaPage from './pages/MusicaPage.tsx'
import MusicaDetailPage from './pages/MusicaDetailPage.tsx'
import FotografiaPage from './pages/FotografiaPage.tsx'
import FotografiaDetailPage from './pages/FotografiaDetailPage.tsx'
import EmpresasPage from './pages/EmpresasPage.tsx'
import EmpresasDetailPage from './pages/EmpresasDetailPage.tsx'
import EspaciosPage from './pages/EspaciosPage.tsx'
import EspaciosDetailPage from './pages/EspaciosDetailPage.tsx'
import CombinacionesPage from './pages/CombinacionesPage.tsx'
import CombinacionDetailPage from './pages/CombinacionDetailPage.tsx'
import QuienesSomosPage from './pages/QuienesSomosPage.tsx'
import BlogPage from './pages/BlogPage.tsx'
import BlogDetailPage from './pages/BlogDetailPage.tsx'
import ServicePage from './pages/ServicePage.tsx'
import BanqueteMenuDetailPage from './pages/BanqueteMenuDetailPage.tsx'
import SearchPage from './pages/SearchPage.tsx'
import NotFound from './pages/not-found.tsx'

const BANQUET_PARENT_SLUGS = ['banquetes', 'banquete-kosher', 'banquete-mexicano', 'banquete-navideno']

/** Catalog pages reachable via /{page}-en-{city} URLs */
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
      <Navbar />
      <main>
        <ErrorBoundary resetKey={location}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/galeria" component={GaleriaPage} />

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
        </ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}

export default function App() {
  const base = import.meta.env.VITE_BASE_PATH
    ? import.meta.env.VITE_BASE_PATH.replace(/\/$/, '')
    : ''
  return (
    <CityProvider>
      <WouterRouter base={base}>
        <Router />
      </WouterRouter>
    </CityProvider>
  )
}
