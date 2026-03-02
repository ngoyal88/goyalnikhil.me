'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'
import { ShinyText } from '@/components/animated'
import BinaryTag from '@/components/BinaryTag'

export default function Hero() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const istTime = now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      setTime(istTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { label: 'leetcode solved', value: '700+' },
    { label: 'contest rating', value: '1759' },
    { label: 'cgpa', value: '8.8' },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 md:px-6">
      <motion.div
        className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Left Content */}
        <div className="space-y-8">
          {/* Metadata */}
          <motion.p
            className="text-sm text-muted-foreground font-mono"
            variants={fadeUpVariants}
          >
            / computer science · thapar · 2026 /
          </motion.p>

          {/* Main Heading */}
          <motion.div variants={fadeUpVariants}>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              nikhil<br />goyal.
            </h1>
          </motion.div>

          {/* Subtitle - Shine sweep */}
          <motion.p
            className="text-xl italic font-light"
            variants={fadeUpVariants}
          >
            <ShinyText className="text-xl italic font-light">builds systems that think.</ShinyText>
          </motion.p>

          {/* Bio */}
          <motion.p
            className="text-base text-muted-foreground leading-relaxed"
            variants={fadeUpVariants}
          >
            ai engineer & software developer — building rag pipelines, voice agents, and low-latency systems. b.e. computer science @ thapar (2026). passionate about ml, competitive programming, and shipping production ai.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 pt-4"
            variants={fadeUpVariants}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="border-l border-border pl-4">
                <p className="text-2xl font-mono font-bold text-accent">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Content — binary tag + location & time */}
        <motion.div
          className="flex flex-col gap-6"
          variants={fadeUpVariants}
        >
          {/* BinaryTag — desktop only */}
          <div className="hidden md:block w-full">
            <BinaryTag />
          </div>

          {/* Location & Time */}
          <div className="space-y-4">
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <span className="font-mono">📍</span> patiala, india
              </p>
              <p className="text-muted-foreground">
                <span className="font-mono">🕐</span> {time} ist
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
              <span className="animate-bounce">↓</span>
              <span>scroll to explore</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
