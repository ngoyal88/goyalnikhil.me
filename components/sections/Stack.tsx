'use client'

import { motion } from 'framer-motion'
import { useSiteData } from '@/components/SiteDataProvider'
import { fadeUpVariants } from '@/lib/animations'
import { BlurInText } from '@/components/animated'

export default function Stack() {
  const { data } = useSiteData()
  const stack = data.stack
  const categories = [
    { title: 'languages', items: stack.languages },
    { title: 'backend', items: stack.backend },
    { title: 'frontend', items: stack.frontend },
    { title: 'ai/ml', items: stack.aiml },
    { title: 'cloud & devops', items: stack.cloud },
    { title: 'databases', items: stack.databases },
  ]

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
          <BlurInText text="stack" as="h2" className="text-3xl font-bold" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, categoryIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIdx * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-wide mb-4">
                {category.title}
              </p>

              <div className="flex flex-wrap gap-2">
                {category.items.map((item, itemIdx) => (
                  <motion.div
                    key={item}
                    className="px-3 py-1.5 bg-secondary/50 border border-border rounded-full text-sm text-foreground hover:border-accent hover:bg-secondary transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently Exploring */}
        <motion.div
          className="mt-12 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-wide mb-4">
            currently exploring
          </p>

          <div className="flex flex-wrap gap-2">
            {stack.exploring.map((item) => (
              <div
                key={item}
                className="px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-sm text-accent"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
