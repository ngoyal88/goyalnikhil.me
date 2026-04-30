'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSiteData } from '@/components/SiteDataProvider'
import { fadeUpVariants } from '@/lib/animations'
import { BlurInText, GradientText } from '@/components/animated'

export default function Writing() {
  const { data } = useSiteData()
  return (
    <motion.section
      className="py-20 px-4 md:px-6 border-t border-border"
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
          <BlurInText text="writing" as="h2" className="text-3xl font-bold" />
        </motion.div>

        <div className="space-y-6">
          {data.writing.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block p-4 rounded hover:bg-secondary/30 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                      {post.title}
                    </p>
                    <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-xs text-muted-foreground font-mono">{post.date}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/blog"
            className="text-sm font-mono inline-flex items-center gap-2 hover:opacity-90"
          >
            <GradientText className="text-sm font-mono">read all articles</GradientText>
            <span className="text-accent">→</span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
