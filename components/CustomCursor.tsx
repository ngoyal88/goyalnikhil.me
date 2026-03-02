'use client'

import React, { useEffect, useRef, useState } from 'react'

const LERP = 0.12
const DOT_SIZE = 6
const RING_SIZE = 32
const RING_HOVER_SIZE = 48
const ORBIT_RING_SIZE = 16
const ORBIT_RADIUS = 20
const ORBIT_DURATION = 2
const TEXT_LINE_WIDTH = 2
const TEXT_LINE_HEIGHT = 18
const CLICK_SCALE = 0.7

function lerpVal(current: number, target: number, t: number): number {
  return current + (target - current) * t
}

function isHoverTarget(el: Element | null): boolean {
  if (!el) return false
  return !!(
    (el as HTMLElement).closest?.('a') ||
    (el as HTMLElement).closest?.('button') ||
    (el as HTMLElement).closest?.('[role="button"]') ||
    (el as HTMLElement).closest?.('.cursor-hover')
  )
}

function isTextTarget(el: Element | null): boolean {
  if (!el) return false
  const tag = (el as HTMLElement).tagName?.toLowerCase()
  return ['p', 'h1', 'h2', 'h3', 'span', 'li'].includes(tag)
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  const [isHover, setIsHover] = useState(false)
  const [isText, setIsText] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) {
      return
    }
    setMounted(true)
    document.documentElement.setAttribute('data-custom-cursor', 'true')

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      const el = document.elementFromPoint(e.clientX, e.clientY)
      setIsHover(isHoverTarget(el))
      setIsText(isTextTarget(el))
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)
    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget || !document.body.contains(e.relatedTarget as Node)) {
        setIsVisible(false)
      }
    }
    const handleMouseOver = () => setIsVisible(true)

    function tick() {
      const mouse = mouseRef.current
      const pos = ringPosRef.current
      ringPosRef.current = {
        x: lerpVal(pos.x, mouse.x, LERP),
        y: lerpVal(pos.y, mouse.y, LERP),
      }
      const { x, y } = ringPosRef.current
      if (ringRef.current) {
        ringRef.current.style.left = `${x}px`
        ringRef.current.style.top = `${y}px`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseover', handleMouseOver)
    setIsVisible(true)

    return () => {
      document.documentElement.removeAttribute('data-custom-cursor')
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  if (!mounted) return null

  const dotScale = isClicked ? CLICK_SCALE : 1
  const ringScale = isClicked ? CLICK_SCALE : 1
  const dotSize = isHover ? 0 : DOT_SIZE
  const dotIsLine = isText && !isHover
  const ringSize = isHover ? RING_HOVER_SIZE : RING_SIZE
  const ringOpacity = isText && !isHover ? 0 : isHover ? 1 : 0.6
  const ringBorder = isHover ? '1.5px solid #5c5cff' : '1px solid rgba(92, 92, 255, 0.6)'
  const ringFill = isHover ? 'rgba(92, 92, 255, 0.08)' : 'transparent'

  return (
    <>
      {/* Dot — instant follow */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: dotIsLine ? TEXT_LINE_WIDTH : dotSize,
          height: dotIsLine ? TEXT_LINE_HEIGHT : dotSize,
          borderRadius: dotIsLine ? 1 : 50,
          backgroundColor: '#f0ede8',
          transform: `translate(-50%, -50%) scale(${dotScale})`,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: `width 200ms ease, height 200ms ease, borderRadius 200ms ease, opacity 200ms ease, transform ${isClicked ? '80ms ease' : '150ms ease'}`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Ring — lerped follow */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: ringBorder,
          backgroundColor: ringFill,
          transform: `translate(-50%, -50%) scale(${ringScale})`,
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: `width 200ms ease, height 200ms ease, opacity 200ms ease, border 200ms ease, background 200ms ease, transform ${isClicked ? '80ms ease' : '150ms ease'}`,
          opacity: isVisible ? ringOpacity : 0,
        }}
      >
        {/* Orbit ring — only when hover */}
        {isHover && (
          <div
            className="custom-cursor-orbit-wrapper"
            aria-hidden
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 0,
              height: 0,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          >
            <div
              className="custom-cursor-orbit-ring"
              aria-hidden
              style={{
                position: 'absolute',
                left: ORBIT_RADIUS,
                top: '50%',
                width: ORBIT_RING_SIZE,
                height: ORBIT_RING_SIZE,
                marginLeft: -ORBIT_RING_SIZE / 2,
                marginTop: -ORBIT_RING_SIZE / 2,
                borderRadius: '50%',
                border: '1px solid rgba(92, 92, 255, 0.3)',
                backgroundColor: 'transparent',
                pointerEvents: 'none',
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}
