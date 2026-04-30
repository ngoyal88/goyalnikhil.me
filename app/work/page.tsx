'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import { useSiteData } from '@/components/SiteDataProvider'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'

export default function WorkPage() {
  const { data } = useSiteData()
  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <section className="min-h-screen pt-32 px-4 md:px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-12"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Header */}
            <motion.div variants={fadeUpVariants}>
              <Link
                href="/"
                className="text-accent hover:underline text-sm font-mono inline-flex items-center gap-2 mb-6"
              >
                <span>←</span> back
              </Link>

              <h1 className="text-4xl font-bold">all work</h1>
              <p className="text-muted-foreground mt-2">
                selected projects and experiments
              </p>
            </motion.div>

            {/* Projects List */}
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {data.projects.map((project, idx) => {
                const content = (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">{project.name}</h2>
                      <span className="text-muted-foreground font-mono text-sm">
                        {project.year}
                      </span>
                    </div>

                    <p className="text-base text-muted-foreground">
                      {project.description}
                    </p>

                    <p className="text-sm text-foreground pt-2">
                      {project.preview}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-secondary/50 border border-border text-xs rounded text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.blogSlug && (
                        <span className="px-2 py-1 bg-accent/10 border border-accent/30 text-xs rounded text-accent">
                          read blog →
                        </span>
                      )}
                    </div>
                  </div>
                )
                return (
                  <motion.div
                    key={project.id}
                    className="border-l-2 border-border hover:border-accent transition-colors pl-6"
                    variants={fadeUpVariants}
                  >
                    {project.blogSlug ? (
                      <Link href={`/blog/${project.blogSlug}`} className="block hover:opacity-90 transition-opacity">
                        {content}
                      </Link>
                    ) : (
                      content
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
