import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

// Elke pagina in een eigen chunk: een bezoeker downloadt zo alleen de pagina die hij
// opent, in plaats van de hele site in één keer. Layout (navbar/footer) blijft gewoon
// direct geladen, dus die verandert nooit van uiterlijk of gedrag.
const Home = lazy(() => import('./pages/Home.jsx'))
const WieZijnWij = lazy(() => import('./pages/WieZijnWij.jsx'))
const VoorWie = lazy(() => import('./pages/VoorWie.jsx'))
const VoorParticulieren = lazy(() => import('./pages/VoorParticulieren.jsx'))
const VoorDealers = lazy(() => import('./pages/VoorDealers.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wie-zijn-wij" element={<WieZijnWij />} />
            <Route path="/voor-wie" element={<VoorWie />} />
            <Route path="/voor-particulieren" element={<VoorParticulieren />} />
            <Route path="/voor-dealers" element={<VoorDealers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  )
}

export default App
