'use client'

import { motion } from 'framer-motion'

interface BlurInTextProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

/** Text that blurs in letter-by-letter on view. React Bits–style. */
export function BlurInText({
  text,
  className = '',
  delay = 0,
  as: Tag = 'span',
}: BlurInTextProps) {
  const letters = text.split('')

  return (
    <Tag className={`inline-flex flex-wrap ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </Tag>
  )
}
