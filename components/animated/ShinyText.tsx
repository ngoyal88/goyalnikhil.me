'use client'

interface ShinyTextProps {
  children: React.ReactNode
  className?: string
}

/** Metallic shine sweep across text. React Bits–style. */
export function ShinyText({ children, className = '' }: ShinyTextProps) {
  return (
    <span className={`animate-shine-text ${className}`}>
      {children}
    </span>
  )
}
