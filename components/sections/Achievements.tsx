'use client'

import { motion } from 'framer-motion'
import { achievements } from '@/lib/data'
import { fadeUpVariants } from '@/lib/animations'
import { BlurInText } from '@/components/animated'

export default function Achievements() {
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
          <BlurInText text="achievements" as="h2" className="text-3xl font-bold" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.id}
              className="p-6 pl-5 bg-secondary/30 border border-border border-l-accent border-l-[3px] rounded hover:bg-secondary/50 transition-all group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
            >
              <div>
                <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                  {achievement.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
