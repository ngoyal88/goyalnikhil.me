'use client'

import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'

export default function Currently() {
  const currentlyUpdated = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <motion.section
      className="py-16 px-4 md:px-6 border-t border-border"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <hr className="border-border mb-8" />

        <motion.div
          className="flex items-center justify-between text-sm"
          variants={fadeUpVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <span className="pulse-dot w-2 h-2"></span>
            <p className="text-foreground">
              currently working on ai-powered knowledge systems and open source research.
            </p>
          </div>
          <p className="text-muted-foreground font-mono text-xs whitespace-nowrap ml-4">
            {currentlyUpdated}
          </p>
        </motion.div>

        <hr className="border-border mt-8" />
      </div>
    </motion.section>
  )
}
