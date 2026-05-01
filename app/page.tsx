import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Scope from '@/components/Scope'
import Government from '@/components/Government'
import Solutions from '@/components/Solutions'
import Partners from '@/components/Partners'
import Clients from '@/components/Clients'
import History from '@/components/History'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Scope />
        <Government />
        <Solutions />
        <Partners />
        <Clients />
        <History />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
