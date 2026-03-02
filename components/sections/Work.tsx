'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { projects } from '@/lib/data'
import { fadeUpVariants } from '@/lib/animations'
import { BlurInText, GradientText } from '@/components/animated'

export default function Work() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <motion.section
      className="py-20 px-4 md:px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-12"
          variants={fadeUpVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <BlurInText text="work" as="h2" className="text-3xl font-bold" />
        </motion.div>

        <div className="space-y-6">
          {projects.slice(0, 4).map((project, idx) => {
            const Wrapper = project.blogSlug ? Link : 'div'
            const wrapperProps = project.blogSlug
              ? { href: `/blog/${project.blogSlug}` }
              : {}
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Wrapper
                  {...wrapperProps}
                  className="relative block rounded-lg border border-border bg-secondary/5 p-4 transition-all duration-300 hover:border-accent/50 hover:bg-secondary/20 hover:shadow-[0_0_24px_rgba(92,92,255,0.12)]"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex-1">
                      <p className="text-foreground font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                    </div>

                    <div className="flex items-center gap-4 ml-4">
                      <span className="text-muted-foreground text-sm font-mono">{project.year}</span>
                      {project.blogSlug ? (
                        <span className="text-accent text-sm group-hover:translate-x-1 transition-transform">→</span>
                      ) : null}
                    </div>
                  </div>

                  {/* Hover Preview */}
                  {hoveredId === project.id && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-64 bg-secondary/50 backdrop-blur border border-border rounded p-4 text-sm text-muted-foreground z-10"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {project.preview}
                    </motion.div>
                  )}
                </Wrapper>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/work"
            className="text-sm font-mono inline-flex items-center gap-2 hover:opacity-90"
          >
            <GradientText className="text-sm font-mono">view all work</GradientText>
            <span className="text-accent">→</span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
