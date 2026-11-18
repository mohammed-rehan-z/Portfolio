"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { AlertTriangle, RefreshCcw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#05080e] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10 max-w-md w-full"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        
        <h1 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-[#f0f6fc] mb-4">
          Something went wrong
        </h1>
        
        <p className="text-[#8b949e] mb-8 text-sm md:text-base">
          An unexpected error has occurred. We've been notified and are looking into it.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#f0f6fc] hover:bg-white text-[#050505] font-semibold transition-all group"
          >
            <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] text-[#f0f6fc] font-medium transition-all group"
          >
            <Home className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
