"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface BadgeGroupProps {
  dotColor?: string
  ping?: boolean
  badgeText: string
  label?: string
  className?: string
}

export function BadgeGroup({
  dotColor = "bg-[#00f0ff]",
  ping = true,
  badgeText,
  label,
  className = "",
}: BadgeGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(22,27,34,0.7)] px-3 py-1 shadow-sm backdrop-blur-md transition-all hover:border-[rgba(0,240,255,0.3)]",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        {ping && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              dotColor
            )}
          />
        )}
        <span
          className={cn("relative inline-flex h-2 w-2 rounded-full", dotColor)}
        />
      </span>

      <span className="font-mono text-[11px] font-semibold tracking-wider text-[#00f0ff] uppercase">
        {badgeText}
      </span>

      {label && (
        <>
          <span className="h-3 w-px bg-[rgba(255,255,255,0.15)]" />
          <span className="text-xs text-[#8b949e]">{label}</span>
        </>
      )}
    </div>
  )
}
