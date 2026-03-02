'use client'

import React, { useRef, useEffect } from 'react'

const CELL_W = 9
const CELL_H = 11
const FONT = "11px 'Courier New', monospace"
const FLICKER_MIN = 0.12
const FLICKER_MAX = 0.7
const WAVE_SPEED = 0.0006
const WAVE_AMP = 0.10
const INDIGO = { r: 92, g: 92, b: 255 }

const ALPHAS: Record<number, number> = {
  1: 0.28,
  2: 0.55,
  3: 0.80,
  4: 0.96,
}

const FLICKER_MULT: Record<number, number> = {
  1: 0.25,
  2: 0.38,
  3: 0.5,
  4: 0.68,
}

interface Cell {
  col: number
  row: number
  isInside: boolean
  edgeDistance: number
  char: string
  flickerTimer: number
  flickerInterval: number
  waveOffset: number
  densityOffset: number
}

/*
 * Builds a boolean mask by drawing </> as three thick geometric strokes.
 * Each stroke is ~22% of height thick so edge-distance zones 1-4 are all populated.
 */
function buildMask(width: number, height: number): boolean[] {
  const offscreen = document.createElement('canvas')
  offscreen.width = width
  offscreen.height = height
  const ctx = offscreen.getContext('2d')
  if (!ctx) return []

  ctx.strokeStyle = 'white'
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineWidth = Math.max(height * 0.22, 16)

  // Divide canvas into three equal columns with a small gutter
  const gutter = width * 0.04
  const colW = (width - gutter * 4) / 3
  const pad = height * 0.10

  // Column x-starts
  const x0 = gutter               // < column start
  const x1 = x0 + colW + gutter   // / column start
  const x2 = x1 + colW + gutter   // > column start

  const top = pad
  const mid = height / 2
  const bot = height - pad

  // < — left-pointing chevron
  ctx.beginPath()
  ctx.moveTo(x0 + colW * 0.85, top)
  ctx.lineTo(x0 + colW * 0.05, mid)
  ctx.lineTo(x0 + colW * 0.85, bot)
  ctx.stroke()

  // / — forward slash
  ctx.beginPath()
  ctx.moveTo(x1 + colW * 0.2, bot)
  ctx.lineTo(x1 + colW * 0.8, top)
  ctx.stroke()

  // > — right-pointing chevron
  ctx.beginPath()
  ctx.moveTo(x2 + colW * 0.15, top)
  ctx.lineTo(x2 + colW * 0.95, mid)
  ctx.lineTo(x2 + colW * 0.15, bot)
  ctx.stroke()

  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data
  const mask: boolean[] = []
  for (let i = 0; i < data.length; i += 4) {
    mask.push(data[i] > 128)
  }
  return mask
}

function buildCells(
  width: number,
  height: number
): { cells: Cell[]; cols: number; rows: number } {
  const cols = Math.floor(width / CELL_W)
  const rows = Math.floor(height / CELL_H)
  const mask = buildMask(width, height)

  const cells: Cell[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const px = Math.min(Math.floor(col * CELL_W + CELL_W / 2), width - 1)
      const py = Math.min(Math.floor(row * CELL_H + CELL_H / 2), height - 1)
      const isInside = mask[py * width + px] ?? false
      cells.push({
        col,
        row,
        isInside,
        edgeDistance: 0,
        char: Math.random() > 0.5 ? '1' : '0',
        flickerTimer: Math.random() * (FLICKER_MIN + Math.random() * (FLICKER_MAX - FLICKER_MIN)),
        flickerInterval: FLICKER_MIN + Math.random() * (FLICKER_MAX - FLICKER_MIN),
        waveOffset: Math.random() * Math.PI * 2,
        densityOffset: -0.15 + Math.random() * 0.3,
      })
    }
  }

  // BFS edge-distance (3 passes, same as BinaryFace)
  const edgeDist = new Array(rows).fill(null).map(() => new Array(cols).fill(0))
  cells.forEach((c) => { if (c.isInside) edgeDist[c.row][c.col] = 999 })

  for (let pass = 0; pass < 3; pass++) {
    const prev = edgeDist.map((r) => [...r])
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (prev[row][col] === 0) continue
        let minN = 999
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue
            const nr = row + dr
            const nc = col + dc
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
              minN = Math.min(minN, prev[nr][nc])
            } else {
              minN = 0
            }
          }
        }
        edgeDist[row][col] = Math.min(prev[row][col], 1 + minN)
      }
    }
  }

  cells.forEach((c) => {
    if (!c.isInside) return
    const raw = edgeDist[c.row][c.col]
    c.edgeDistance = raw >= 999 ? 4 : Math.max(1, Math.min(4, Math.round(raw)))
    c.flickerInterval *= FLICKER_MULT[c.edgeDistance] ?? 1
  })

  return { cells, cols, rows }
}

export default function BinaryTag() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cellsRef = useRef<Cell[]>([])
  const rafRef = useRef<number>(0)
  const lastTsRef = useRef<number>(0)
  const widthRef = useRef(0)
  const heightRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      const w = container!.offsetWidth || 420
      // Use explicit pixel height from the container's inline style so we
      // always get the real value regardless of parent flex sizing.
      const h = container!.offsetHeight || 180
      widthRef.current = w
      heightRef.current = h
      canvas!.width = w
      canvas!.height = h
      const { cells } = buildCells(w, h)
      cellsRef.current = cells
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    function animate(ts: number) {
      const w = widthRef.current
      const h = heightRef.current
      const cells = cellsRef.current
      const now = ts / 1000
      const dt = lastTsRef.current ? now - lastTsRef.current : 1 / 60
      lastTsRef.current = now

      for (const cell of cells) {
        if (!cell.isInside) continue
        cell.flickerTimer += dt
        if (cell.flickerTimer >= cell.flickerInterval) {
          cell.char = Math.random() > 0.5 ? '1' : '0'
          cell.flickerTimer = 0
          cell.flickerInterval =
            (FLICKER_MIN + Math.random() * (FLICKER_MAX - FLICKER_MIN)) *
            (FLICKER_MULT[cell.edgeDistance] ?? 1)
        }
      }

      ctx!.clearRect(0, 0, w, h)
      ctx!.font = FONT
      ctx!.textBaseline = 'top'

      for (const cell of cells) {
        if (!cell.isInside) continue
        const baseAlpha = ALPHAS[cell.edgeDistance] ?? 0.92
        const wave = Math.sin(ts * WAVE_SPEED + cell.waveOffset) * WAVE_AMP
        let a = Math.max(0.05, Math.min(1, baseAlpha + wave + cell.densityOffset))
        ctx!.fillStyle = `rgba(${INDIGO.r},${INDIGO.g},${INDIGO.b},${a})`
        ctx!.fillText(cell.char, cell.col * CELL_W, cell.row * CELL_H)
      }

      // Subtle top/bottom edge fade — does NOT affect left/right so <> tips stay visible
      const fadeH = h * 0.18
      const topFade = ctx!.createLinearGradient(0, 0, 0, fadeH)
      topFade.addColorStop(0, 'rgba(8,8,8,0.72)')
      topFade.addColorStop(1, 'rgba(8,8,8,0)')
      ctx!.fillStyle = topFade
      ctx!.fillRect(0, 0, w, fadeH)

      const botFade = ctx!.createLinearGradient(0, h - fadeH, 0, h)
      botFade.addColorStop(0, 'rgba(8,8,8,0)')
      botFade.addColorStop(1, 'rgba(8,8,8,0.72)')
      ctx!.fillStyle = botFade
      ctx!.fillRect(0, h - fadeH, w, fadeH)

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '180px' }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}
