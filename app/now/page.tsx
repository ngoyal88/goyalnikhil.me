'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'

const nowSections = [
  {
    title: 'working on',
    description:
      'building scalable ai systems and contributing to open source projects. currently focused on knowledge retrieval systems and langchain integrations.',
  },
  {
    title: 'reading',
    description:
      '"thinking fast and slow" by daniel kahneman. also deep diving into latest llm research papers from arxiv.',
  },
  {
    title: 'learning',
    description:
      'advanced rust for systems programming, distributed systems architecture, and latest developments in agentic ai frameworks.',
  },
  {
    title: 'thinking about',
    description:
      'the intersection of ai and human creativity. how we can build tools that augment rather than replace human intelligence.',
  },
]

export default function NowPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

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

              <h1 className="text-4xl font-bold">now</h1>
              <p className="text-muted-foreground mt-2">
                what i'm up to right now
              </p>
              <p className="text-xs text-muted-foreground font-mono mt-4">
                last updated {lastUpdated}
              </p>
            </motion.div>

            {/* Content Sections */}
            <motion.div className="space-y-8">
              {nowSections.map((section, idx) => (
                <motion.div
                  key={section.title}
                  className="space-y-2"
                  variants={fadeUpVariants}
                >
                  <h2 className="text-xl font-bold">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Inspired By */}
            <motion.div
              className="pt-8 border-t border-border text-sm text-muted-foreground"
              variants={fadeUpVariants}
            >
              <p>
                inspired by{' '}
                <a
                  href="https://nownownow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  nownownow.com
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
