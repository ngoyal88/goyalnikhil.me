'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'

const uses = {
  hardware: [
    { item: 'MacBook Pro 14"', year: '2023' },
    { item: 'mechanical keyboard', year: '2022' },
    { item: 'external monitor', year: '2023' },
    { item: 'bluetooth headphones', year: '2022' },
  ],
  software: [
    { item: 'VS Code', purpose: 'primary editor' },
    { item: 'iTerm2', purpose: 'terminal' },
    { item: 'Cursor', purpose: 'ai-assisted coding' },
    { item: 'Github Desktop', purpose: 'version control' },
  ],
  tools: [
    { item: 'Claude', purpose: 'writing & thinking' },
    { item: 'ChatGPT', purpose: 'research & ideation' },
    { item: 'Linear', purpose: 'project management' },
    { item: 'Figma', purpose: 'design' },
  ],
}

export default function UsesPage() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <section className="min-h-screen pt-32 px-4 md:px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-16"
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

              <h1 className="text-4xl font-bold">uses</h1>
              <p className="text-muted-foreground mt-2">
                tools, hardware, and software i use daily
              </p>
            </motion.div>

            {/* Sections */}
            {Object.entries(uses).map(([category, items]) => (
              <motion.div
                key={category}
                className="space-y-6"
                variants={fadeUpVariants}
              >
                <h2 className="text-2xl font-bold capitalize">{category}</h2>

                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-secondary/20 rounded border border-border hover:border-accent transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-foreground">{item.item}</span>
                      <span className="text-muted-foreground text-sm font-mono">
                        {item.year || item.purpose}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
