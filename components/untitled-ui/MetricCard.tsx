"use client"

import React, { useEffect, useState, useRef } from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  label: string
  value: number
  suffix?: string
  description: string
  icon: LucideIcon
  iconColor?: string
  trend?: string
  className?: string
}

export function MetricCard({
  label,
  value,
  suffix = "+",
  description,
  icon: Icon,
  iconColor = "text-[#00f0ff]",
  trend,
  className = "",
}: MetricCardProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const duration = 1200
          const stepTime = 20
          const steps = duration / stepTime
          const increment = value / steps

          const timer = setInterval(() => {
            start += increment
            if (start >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, stepTime)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(22,27,34,0.65)] p-5 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(0,240,255,0.3)] hover:bg-[rgba(22,27,34,0.85)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(15,19,28,0.7)] transition-transform duration-300 group-hover:scale-110",
            iconColor
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className="rounded-full border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.1)] px-2.5 py-0.5 text-[11px] font-medium text-[#4ade80]">
            {trend}
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-[#f0f6fc]">
          {count}
          <span className={iconColor}>{suffix}</span>
        </div>
        <div className="mt-1 font-['Space_Grotesk'] text-sm font-semibold text-[#f0f6fc]">
          {label}
        </div>
        <p className="mt-1 text-xs text-[#8b949e] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
