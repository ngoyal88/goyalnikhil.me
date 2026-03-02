'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'
import { socialLinks } from '@/lib/data'

const navLinks = [
  { label: 'work', href: '/work' },
  { label: 'writing', href: '/blog' },
  { label: 'uses', href: '/uses' },
  { label: 'now', href: '/now' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <motion.footer
      className="border-t border-border bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6">

        {/* Top row — name/tagline + social links (hidden on home since Contact already shows them) */}
        <motion.div
          className="py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div className="space-y-1" variants={fadeUpVariants}>
            <p className="text-foreground font-mono font-bold text-base tracking-tight">
              nikhil goyal.
            </p>
            <p className="text-muted-foreground text-sm">
              ai engineer &amp; software developer
            </p>
          </motion.div>

          {!isHome && (
            <motion.div className="flex items-center gap-5" variants={fadeUpVariants}>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="text-muted-foreground hover:text-accent transition-colors text-sm font-mono capitalize"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </motion.div>

        <div className="border-t border-border" />

        {/* Bottom row — nav links + copyright */}
        <motion.div
          className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground font-mono"
          variants={fadeUpVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <nav className="flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span>© {year} nikhil goyal</span>
            <span className="text-border">·</span>
            <motion.span
              className="text-accent"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              ✦
            </motion.span>
            <span className="text-border">·</span>
            <span>patiala, india</span>
          </div>
        </motion.div>

      </div>
    </motion.footer>
  )
}
