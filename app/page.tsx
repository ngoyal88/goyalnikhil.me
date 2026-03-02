'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Currently from '@/components/sections/Currently'
import Work from '@/components/sections/Work'
import Experience from '@/components/sections/Experience'
import Achievements from '@/components/sections/Achievements'
import Stack from '@/components/sections/Stack'
import Writing from '@/components/sections/Writing'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Currently />
      <Work />
      <Experience />
      <Achievements />
      <Stack />
      <Writing />
      <Contact />
      <Footer />
    </main>
  )
}
