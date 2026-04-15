import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import PromoteHeader from '@/components/ui/promote-header'
import { Footer7 } from '@/components/ui/footer-7'
import Home from '@/pages/Home'
import WhoWeAre from '@/pages/WhoWeAre'
import WhatWeOffer from '@/pages/WhatWeOffer'
import Contact from '@/pages/Contact'
import Gallery from '@/pages/Gallery'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PromoteHeader />
      <main id="main">{children}</main>
      <Footer7 />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/what-we-offer" element={<WhatWeOffer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  )
}
