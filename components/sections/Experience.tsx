'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useSiteData } from '@/components/SiteDataProvider'
import { fadeUpVariants, expandHeight } from '@/lib/animations'
import { BlurInText } from '@/components/animated'

export default function Experience() {
  const { data } = useSiteData()
  const [expandedId, setExpandedId] = useState<number | null>(null)

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
          <BlurInText text="experience" as="h2" className="text-3xl font-bold" />
        </motion.div>

        <div className="space-y-4">
          {data.experience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              className="border-l-2 border-border hover:border-accent transition-colors"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                className="w-full text-left p-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.role}</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono whitespace-nowrap ml-4">
                    {exp.period}
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {expandedId === exp.id && (
                  <motion.div
                    variants={expandHeight}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-sm text-muted-foreground space-y-3 border-t border-border/50">
                      <p>{exp.description}</p>
                      <ul className="list-disc list-inside space-y-2">
                        {exp.points.map((point, idx) => (
                          <li key={idx} className="text-xs">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
