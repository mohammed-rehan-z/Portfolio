"use client"

import React from "react"
import { Terminal, ArrowUp } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="w-full bg-[#05080e] border-t border-[rgba(255,255,255,0.06)] py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
              className="font-mono text-base font-bold text-[#00f0ff] flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Back to top"
            >
              <Terminal className="h-4 w-4 text-[#00f0ff]" />
              <span>&lt;Mohammed Rehan.Z /&gt;</span>
            </a>
            <p className="text-xs text-[#8b949e] max-w-sm">
              Artificial Intelligence & Machine Learning undergraduate crafting intelligent systems and responsive web platforms.
            </p>
          </div>

          {/* Operational Status & Tech Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(22,27,34,0.8)] border border-[rgba(255,255,255,0.08)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]" />
              </span>
              <span className="font-mono text-[11px] text-[#00f0ff] uppercase tracking-wider font-semibold">
                Operational & Open for Roles
              </span>
            </div>

            <span className="inline-flex items-center font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-[rgba(22,27,34,0.6)] border border-[rgba(255,255,255,0.06)] text-[#8b949e]">
              Next.js 16 • Tailwind CSS • Framer Motion
            </span>
          </div>

          {/* Copyright & Scroll to Top */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#8b949e]">
              © {new Date().getFullYear()} Mohammed Rehan Z
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[rgba(22,27,34,0.8)] border border-[rgba(255,255,255,0.08)] text-[#8b949e] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 transition-all cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
