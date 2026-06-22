import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'

import Home from './pages/Home'
import BanquetesCatering from './pages/BanquetesCatering'
import BarrasBebidas from './pages/BarrasBebidas'
import WeddingPlanner from './pages/WeddingPlanner'
import QuienesSomos from './pages/QuienesSomos'
import Galeria from './pages/Galeria'
import EventPage from './pages/EventPage'
import AudioIluminacion from './pages/AudioIluminacion'
import SalasPeriqueras from './pages/SalasPeriqueras'
import Fotografia from './pages/Fotografia'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/banquetes-catering" element={<BanquetesCatering />} />
          <Route path="/barras-de-bebidas" element={<BarrasBebidas />} />
          <Route path="/wedding-planner" element={<WeddingPlanner />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/audio-iluminacion-video" element={<AudioIluminacion />} />
          <Route path="/salas-periqueras" element={<SalasPeriqueras />} />
          <Route path="/fotografia" element={<Fotografia />} />
          {/* Event type pages */}
          <Route path="/bodas" element={<EventPage />} />
          <Route path="/corporativos" element={<EventPage />} />
          <Route path="/xv-anos" element={<EventPage />} />
          <Route path="/baby-shower" element={<EventPage />} />
          <Route path="/cumpleanos" element={<EventPage />} />
          <Route path="/primera-comunion" element={<EventPage />} />
          <Route path="/cenas" element={<EventPage />} />
          <Route path="/graduaciones" element={<EventPage />} />
          {/* Catch-all for /slug pattern */}
          <Route path="/:slug" element={<EventPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
