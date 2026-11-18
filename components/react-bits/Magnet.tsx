"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface MagnetProps {
  children: React.ReactNode
  distance?: number
  className?: string
}

export function Magnet({
  children,
  distance = 30,
  className = "",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 250, damping: 15, mass: 0.1 })
  const springY = useSpring(y, { stiffness: 250, damping: 15, mass: 0.1 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    const dx = clientX - centerX
    const dy = clientY - centerY

    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < distance * 2) {
      x.set(dx * 0.25)
      y.set(dy * 0.25)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
