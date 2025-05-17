
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

type ZoomProps = {
  children: React.ReactNode
  initialScale?: number
  minScale?: number
  maxScale?: number
}

export function Zoom({
  children,
  initialScale = 1,
  minScale = 0.5,
  maxScale = 3,
}: ZoomProps) {
  const [scale, setScale] = useState(initialScale)
  const [panning, setPanning] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()

    const container = containerRef.current
    if (!container) return

    // Calculate pointer position relative to the element
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Determine the scale direction
    const delta = e.deltaY < 0 ? 1.1 : 0.9
    const newScale = Math.max(minScale, Math.min(maxScale, scale * delta))

    // Update position based on the pointer and scale difference
    const scaleRatio = newScale / scale
    const newX = x - (x - position.x) * scaleRatio
    const newY = y - (y - position.y) * scaleRatio

    setScale(newScale)
    setPosition({ x: newX, y: newY })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return // Only left mouse button

    const container = containerRef.current
    if (!container) return

    setPanning(true)
    const rect = container.getBoundingClientRect()
    setOrigin({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseUp = () => {
    setPanning(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!panning) return

    const newX = e.clientX - origin.x
    const newY = e.clientY - origin.y

    setPosition({ x: newX, y: newY })
  }

  useEffect(() => {
    if (panning) {
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'grabbing'
    } else {
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }

    return () => {
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
  }, [panning])

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden relative cursor-grab"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      <motion.div
        style={{
          scale,
          x: position.x,
          y: position.y,
        }}
        transition={{ type: 'tween', duration: 0 }}
        className="origin-top-left"
      >
        {children}
      </motion.div>
    </div>
  )
}
