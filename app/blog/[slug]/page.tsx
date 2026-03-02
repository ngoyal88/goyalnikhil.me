'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import { blogPosts } from '@/lib/data'
import { fadeUpVariants } from '@/lib/animations'
import { notFound } from 'next/navigation'

function renderWithBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold text-foreground">{part}</strong> : part
  )
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : params.slug?.[0]
  const post = slug ? blogPosts.find((p) => p.slug === slug) : undefined

  if (!post) {
    notFound()
  }

  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <article className="min-h-screen pt-32 px-4 md:px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="space-y-8"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {/* Back Button */}
            <motion.div variants={fadeUpVariants}>
              <Link
                href="/blog"
                className="text-accent hover:underline text-sm font-mono inline-flex items-center gap-2 mb-8"
              >
                <span>←</span> back to writing
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div variants={fadeUpVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-mono">{post.date}</span>
                <span>·</span>
                <span className="font-mono">{post.readingTime}</span>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed"
              variants={fadeUpVariants}
            >
              {(() => {
                const segments: { type: 'text' | 'code'; content: string; lang?: string }[] = []
                const codeBlockRe = /^```(\w*)\n([\s\S]*?)\n```$/gm
                let lastEnd = 0
                let m
                while ((m = codeBlockRe.exec(post.content)) !== null) {
                  if (m.index > lastEnd) {
                    segments.push({ type: 'text', content: post.content.slice(lastEnd, m.index) })
                  }
                  segments.push({ type: 'code', content: m[2], lang: m[1] || undefined })
                  lastEnd = m.index + m[0].length
                }
                if (lastEnd < post.content.length) {
                  segments.push({ type: 'text', content: post.content.slice(lastEnd) })
                }
                if (segments.length === 0) {
                  segments.push({ type: 'text', content: post.content })
                }
                let key = 0
                return segments.flatMap((seg) => {
                  if (seg.type === 'code') {
                    return [
                      <pre
                        key={key++}
                        className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-sm font-mono"
                      >
                        <code>{seg.content}</code>
                      </pre>,
                    ]
                  }
                  return seg.content.split(/\n\n+/).map((paragraph) => {
                    const idx = key++
                    if (paragraph.startsWith('1.') || paragraph.startsWith('-')) {
                      const items = paragraph.split('\n').filter((l) => l.trim())
                      return (
                        <ul key={idx} className="list-disc list-inside space-y-2 ml-4">
                          {items.map((item, i) => (
                            <li key={i}>{renderWithBold(item.replace(/^[\d.-]\s*/, ''))}</li>
                          ))}
                        </ul>
                      )
                    }
                    return (
                      <p key={idx} className="text-base">
                        {renderWithBold(paragraph)}
                      </p>
                    )
                  })
                })
              })()}
            </motion.div>

            {/* Footer */}
            <motion.div
              className="pt-8 border-t border-border text-sm text-muted-foreground"
              variants={fadeUpVariants}
            >
              <p>thanks for reading. feel free to reach out!</p>
            </motion.div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
