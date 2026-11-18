"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#05080e] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f0ff]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10"
      >
        <h1 className="font-['Space_Grotesk'] text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#f0f6fc] to-[#4b5563] tracking-tighter mb-4">
          404
        </h1>
        <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-semibold text-[#f0f6fc] mb-6">
          Page Not Found
        </h2>
        <p className="text-[#8b949e] max-w-md mx-auto mb-10 text-sm md:text-base">
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00f0ff] hover:bg-[#38bdf8] text-[#050505] font-semibold transition-all shadow-[0_0_20px_-5px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_-5px_rgba(0,240,255,0.6)] group"
          >
            <Home className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] text-[#f0f6fc] font-medium transition-all group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
