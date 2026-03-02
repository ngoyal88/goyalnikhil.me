'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-sm font-medium hover:text-accent transition-colors"
        >
          ng.
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/work"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            work
          </Link>
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            writing
          </Link>
          <Link
            href="/uses"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            uses
          </Link>
          <Link
            href="/now"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            now
          </Link>

          {/* Hire Me Button */}
          <motion.a
            href="/#contact"
            className="px-3 py-1.5 rounded border border-accent text-accent font-mono text-xs font-medium hover:bg-accent hover:text-background transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            hire
          </motion.a>
        </div>
      </div>
    </nav>
  )
}
