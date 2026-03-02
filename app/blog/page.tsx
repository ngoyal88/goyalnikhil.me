'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import { writing } from '@/lib/data'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'

export default function BlogPage() {
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

              <h1 className="text-4xl font-bold">writing</h1>
              <p className="text-muted-foreground mt-2">
                thoughts on ai, systems, and building
              </p>
            </motion.div>

            {/* Articles List */}
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {writing.map((post, idx) => (
                <motion.div
                  key={post.id}
                  variants={fadeUpVariants}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-medium text-foreground group-hover:text-accent transition-colors">
                          {post.title}
                        </h2>
                        <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground font-mono">
                        {post.date}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>

                  {idx < writing.length - 1 && (
                    <div className="border-t border-border mt-6" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
