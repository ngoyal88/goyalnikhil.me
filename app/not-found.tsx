import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'

export default function NotFound() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <section className="pt-32 px-4 md:px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-muted-foreground">This page could not be found.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent hover:underline text-sm font-mono"
          >
            <span>←</span> back home
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
