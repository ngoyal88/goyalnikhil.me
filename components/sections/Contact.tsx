'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { toast } from 'sonner'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'
import { ShinyText, GradientText } from '@/components/animated'
import { socialLinks } from '@/lib/data'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const emailLink = socialLinks.find((l) => l.href.startsWith('mailto:'))
  const EMAIL = emailLink?.href.replace('mailto:', '') ?? ''

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(EMAIL)
    toast.success('Email copied to clipboard!')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.section
      id="contact"
      className="py-20 px-4 md:px-6 border-t border-border"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="space-y-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold"
            variants={fadeUpVariants}
          >
            <ShinyText className="text-4xl font-bold">let's talk</ShinyText>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl"
            variants={fadeUpVariants}
          >
            interested in collaborating or just want to chat? reach out — i'm always excited to connect with builders and thinkers.
          </motion.p>

          <motion.button
            onClick={handleEmailClick}
            className="inline-flex items-center gap-3 group"
            variants={fadeUpVariants}
            whileHover={{ x: 8 }}
          >
            <GradientText className="text-3xl font-mono font-bold group-hover:opacity-90">
              {EMAIL}
            </GradientText>
            <span className="text-xl text-accent">→</span>
          </motion.button>

          {/* Social Links */}
          <motion.div
            className="flex gap-6 pt-4"
            variants={fadeUpVariants}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                onClick={link.href.startsWith('mailto:') ? handleEmailClick : undefined}
                className="text-muted-foreground hover:text-accent transition-colors text-sm font-mono capitalize"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
