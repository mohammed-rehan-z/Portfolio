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
  dotColor = "bg-blue-500",
  ping = true,
  badgeText,
  label,
  className = "",
}: BadgeGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#0d1424] px-3.5 py-1.5 shadow-sm backdrop-blur-md transition-all hover:border-blue-500/40",
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

      <span className="font-mono text-[11px] font-semibold tracking-wider text-blue-300 uppercase">
        {badgeText}
      </span>

      {label && (
        <>
          <span className="h-3 w-px bg-white/[0.15]" />
          <span className="text-xs text-slate-300 font-mono">{label}</span>
        </>
      )}
    </div>
  )
}
