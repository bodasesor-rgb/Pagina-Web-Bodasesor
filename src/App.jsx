import { Switch, Route, Router as WouterRouter } from "wouter"
import { useEffect } from "react"
import { useLocation } from "wouter"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'

import Home from './pages/Home'
import BanquetesCatering from './pages/BanquetesCatering'
import BarrasBebidas from './pages/BarrasBebidas'
import WeddingPlanner from './pages/WeddingPlanner'
import QuienesSomos from './pages/QuienesSomos'
import Galeria from './pages/Galeria'
import AudioIluminacion from './pages/AudioIluminacion'
import SalasPeriqueras from './pages/SalasPeriqueras'
import Fotografia from './pages/Fotografia'
import EventPage from './pages/EventPage'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const [location] = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location])
  return null
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/banquetes-catering" component={BanquetesCatering} />
          <Route path="/barras-de-bebidas" component={BarrasBebidas} />
          <Route path="/wedding-planner" component={WeddingPlanner} />
          <Route path="/quienes-somos" component={QuienesSomos} />
          <Route path="/galeria" component={Galeria} />
          <Route path="/audio-iluminacion-video" component={AudioIluminacion} />
          <Route path="/salas-periqueras" component={SalasPeriqueras} />
          <Route path="/fotografia" component={Fotografia} />
          {/* Event type pages */}
          <Route path="/bodas">{() => <EventPage slug="bodas" />}</Route>
          <Route path="/corporativos">{() => <EventPage slug="corporativos" />}</Route>
          <Route path="/xv-anos">{() => <EventPage slug="xv-anos" />}</Route>
          <Route path="/baby-shower">{() => <EventPage slug="baby-shower" />}</Route>
          <Route path="/cumpleanos">{() => <EventPage slug="cumpleanos" />}</Route>
          <Route path="/primera-comunion">{() => <EventPage slug="primera-comunion" />}</Route>
          <Route path="/cenas">{() => <EventPage slug="cenas" />}</Route>
          <Route path="/graduaciones">{() => <EventPage slug="graduaciones" />}</Route>
          {/* Catch-all */}
          <Route path="/:slug">{(params) => <EventPage slug={params.slug} />}</Route>
          <Route component={NotFound} />
        </Switch>
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
    <WouterRouter base={base}>
      <Router />
    </WouterRouter>
  )
}
