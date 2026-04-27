import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import {
  resumeDriveDownloadLink,
  resumeDriveLink,
  resumeDrivePreviewLink,
} from '@/lib/data'

export default function ResumePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />

      <section className="pt-32 px-4 md:px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold">resume</h1>
            <p className="text-muted-foreground max-w-2xl">
              shareable resume endpoint with in-page preview. this URL is stable and can be used everywhere.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={resumeDriveDownloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-accent text-accent font-mono text-xs font-medium hover:bg-accent hover:text-background transition-colors"
            >
              download pdf
            </a>
            <a
              href={resumeDriveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-border text-muted-foreground font-mono text-xs font-medium hover:text-foreground transition-colors"
            >
              open in google drive
            </a>
            <Link
              href="/"
              className="px-4 py-2 rounded border border-border text-muted-foreground font-mono text-xs font-medium hover:text-foreground transition-colors"
            >
              back home
            </Link>
          </div>

          <div className="border border-border rounded overflow-hidden bg-card">
            <iframe
              title="Resume PDF Preview"
              src={resumeDrivePreviewLink}
              className="w-full h-[75vh]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
