'use client'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  from?: string
  to?: string
  animate?: boolean
}

/** Animated gradient text using portfolio accent. React Bits–style. */
export function GradientText({
  children,
  className = '',
  from = '#5c5cff',
  to = '#a78bfa',
  animate = true,
}: GradientTextProps) {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-r ${animate ? 'animate-gradient-text' : ''} ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${from}, ${to}, ${from})`,
      }}
    >
      {children}
    </span>
  )
}
