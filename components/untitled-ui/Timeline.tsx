"use client"

import React from "react"
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react"

interface TimelineItem {
  period: string
  role: string
  company: string
  location: string
  description: string
  highlights: string[]
  skills: string[]
  current?: boolean
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative border-l border-[rgba(255,255,255,0.1)] ml-4 md:ml-6 space-y-12">
      {items.map((item, index) => (
        <div key={index} className="relative pl-8 md:pl-10 group">
          {/* Node marker */}
          <div className="absolute -left-[17px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] bg-[#090d16] group-hover:border-[#00f0ff] transition-colors">
            {item.current ? (
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00f0ff] opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00f0ff]" />
              </span>
            ) : (
              <div className="h-2 w-2 rounded-full bg-[#6366f1] group-hover:bg-[#00f0ff] transition-colors" />
            )}
          </div>

          {/* Content Card */}
          <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(22,27,34,0.65)] p-6 backdrop-blur-xl transition-all duration-200 hover:border-[rgba(0,240,255,0.3)] hover:bg-[rgba(22,27,34,0.85)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-['Space_Grotesk'] text-lg font-bold text-[#f0f6fc]">
                  {item.role}
                </span>
                <span className="text-[#00f0ff] font-semibold">@ {item.company}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(15,19,28,0.7)] px-3 py-1 text-xs font-mono text-[#8b949e]">
                <Calendar className="h-3.5 w-3.5 text-[#00f0ff]" />
                {item.period}
              </div>
            </div>

            <p className="text-xs text-[#00f0ff] font-mono mb-3">{item.location}</p>

            <p className="text-sm text-[#8b949e] leading-relaxed mb-4">
              {item.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2 mb-4">
              {item.highlights.map((highlight, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2 text-xs text-[#dfe2ef]">
                  <CheckCircle2 className="h-4 w-4 text-[#22c55e] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[rgba(255,255,255,0.06)]">
              {item.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="rounded bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] px-2.5 py-0.5 text-[11px] font-mono text-[#c0c1ff]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
