"use client"

import React, { useState } from "react"
import Image from "next/image"
import type { Variants } from "framer-motion"
import {
  FileText,
  Copy,
  Check,
  ShieldCheck,
  MapPin,
  Terminal,
  Award,
  Cpu,
  Sparkles,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Particles } from "@/components/react-bits/Particles"
import { DecryptedText } from "@/components/react-bits/DecryptedText"
import { TiltCard } from "@/components/react-bits/TiltCard"
import { Magnet } from "@/components/react-bits/Magnet"
import { TypingEffect } from "@/components/react-bits/TypingEffect"
import { BadgeGroup } from "@/components/untitled-ui/BadgeGroup"
import { motion, useReducedMotion } from "framer-motion"

const engineeringRoles = [
  "AI & Machine Learning Engineer",
  "Generative AI Specialist",
  "Computer Vision Enthusiast",
  "Full-Stack Web Developer",
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
  }),
}

export function HeroSection() {
  const [copied, setCopied] = useState(false)
  const reduce = useReducedMotion()

  const copyEmail = () => {
    navigator.clipboard.writeText("mohammedrehanz517@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative min-h-[100dvh] w-full pt-28 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 bg-cyber-grid bg-radial-mask pointer-events-none opacity-30 z-0" />

      {/* React Bits Interactive Particles Canvas */}
      <Particles
        particleCount={40}
        particleColor="rgba(0, 240, 255, 0.35)"
        connectionColor="rgba(99, 102, 241, 0.12)"
      />

      {/* Atmospheric Glow Radial Blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#6366f1]/15 via-[#00f0ff]/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[350px] bg-[#8b5cf6]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography, Role Switcher, CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow Badge */}
            <motion.div
              className="flex flex-wrap items-center gap-2.5 mb-5"
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              animate="visible"
              custom={0}
            >
              <BadgeGroup
                badgeText="Status"
                label="Open to High-Impact Opportunities"
                dotColor="bg-[#00f0ff]"
                ping={true}
              />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(22,27,34,0.7)] border border-[rgba(255,255,255,0.08)] font-mono text-xs text-[#8b949e]">
                <Terminal className="h-3.5 w-3.5 text-[#00f0ff]" />
                <span className="text-[#c0c1ff]">ai_ml_undergrad.init()</span>
              </div>
            </motion.div>

            {/* Headline - Guaranteed 2 lines max with responsive fluid tracking */}
            <motion.h1
              className="font-['Space_Grotesk'] text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f0f6fc] leading-[1.1] mb-4 max-w-4xl"
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              animate="visible"
              custom={0.1}
            >
              Hi, I&apos;m{" "}
              <span className="text-gradient-cyan inline-block">
                <DecryptedText
                  text="Mohammed Rehan Z"
                  speed={35}
                  maxIterations={15}
                  encryptedClassName="text-[#00f0ff]"
                />
              </span>
            </motion.h1>

            {/* Dynamic Role — Typewriter Effect */}
            <motion.div
              className="h-8 flex items-center mb-5"
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              animate="visible"
              custom={0.2}
            >
              <p className="font-['Space_Grotesk'] text-lg sm:text-xl font-medium flex items-center gap-2">
                <span className="text-[#8b949e] font-normal shrink-0">Role:</span>
                <TypingEffect
                  strings={engineeringRoles}
                  typeSpeed={50}
                  deleteSpeed={25}
                  pauseEnd={2000}
                  pauseStart={350}
                  className="text-[#00f0ff]"
                />
              </p>
            </motion.div>

            {/* Impact Bio */}
            <motion.p
              className="text-[#8b949e] text-base sm:text-lg leading-relaxed max-w-2xl mb-6"
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              animate="visible"
              custom={0.3}
            >
              Artificial Intelligence and Machine Learning undergraduate specializing in Generative AI, predictive modeling, computer vision, and building responsive web solutions.
            </motion.p>

            {/* Engineering Telemetry Strip */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full mb-8"
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              animate="visible"
              custom={0.35}
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[rgba(22,27,34,0.6)] border border-[rgba(255,255,255,0.06)] backdrop-blur-md">
                <Cpu className="h-4 w-4 text-[#00f0ff] shrink-0" />
                <div className="min-w-0">
                  <div className="font-mono text-[11px] font-semibold text-[#f0f6fc]">B.Tech AI & ML</div>
                  <div className="font-mono text-[10px] text-[#8b949e] truncate">HKBK College</div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[rgba(22,27,34,0.6)] border border-[rgba(255,255,255,0.06)] backdrop-blur-md">
                <Award className="h-4 w-4 text-[#22c55e] shrink-0" />
                <div className="min-w-0">
                  <div className="font-mono text-[11px] font-semibold text-[#f0f6fc]">1st Prize Winner</div>
                  <div className="font-mono text-[10px] text-[#8b949e] truncate">NVIDIA Jetson AI</div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[rgba(22,27,34,0.6)] border border-[rgba(255,255,255,0.06)] backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-[#a855f7] shrink-0" />
                <div className="min-w-0">
                  <div className="font-mono text-[11px] font-semibold text-[#f0f6fc]">WASM & Vector DB</div>
                  <div className="font-mono text-[10px] text-[#8b949e] truncate">Zero-Hallucination</div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[rgba(22,27,34,0.6)] border border-[rgba(255,255,255,0.06)] backdrop-blur-md">
                <MapPin className="h-4 w-4 text-[#fbbf24] shrink-0" />
                <div className="min-w-0">
                  <div className="font-mono text-[11px] font-semibold text-[#f0f6fc]">Bengaluru, IN</div>
                  <div className="font-mono text-[10px] text-[#8b949e] truncate">IST (UTC+5:30)</div>
                </div>
              </div>
            </motion.div>

            {/* Magnet Action CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-3 w-full"
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              animate="visible"
              custom={0.45}
            >
              <Magnet distance={10}>
                <Button
                  asChild
                  variant="default"
                  size="lg"
                  className="px-6 h-12 shadow-[0_0_25px_-5px_rgba(0,240,255,0.4)] text-sm font-semibold"
                >
                  <a href="/Mohammed_Rehan_Z-resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>View Resume (PDF)</span>
                  </a>
                </Button>
              </Magnet>

              <Magnet distance={10}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-[rgba(22,27,34,0.6)] border border-[rgba(255,255,255,0.12)] text-[#f0f6fc] hover:bg-[rgba(255,255,255,0.08)] hover:border-[#00f0ff]/40 px-6 h-12 backdrop-blur-sm hidden sm:inline-flex"
                >
                  <a href="#projects" className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-[#00f0ff]" />
                    <span>Explore Projects</span>
                  </a>
                </Button>
              </Magnet>

              {/* Quick Email Copy */}
              <Button
                variant="subtle"
                size="default"
                onClick={copyEmail}
                className="gap-2 px-4 py-3 h-12 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(22,27,34,0.7)] text-sm text-[#8b949e] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 hover:bg-[rgba(0,240,255,0.06)] active:scale-95 transition-all duration-200"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-[#22c55e]" />
                    <span className="text-[#22c55e] font-mono text-xs">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-[#8b949e]" />
                    <span className="font-mono text-xs">Copy Email</span>
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          {/* Right Column: 3D TiltCard Portrait (5 cols) */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            animate="visible"
            custom={0.25}
          >
            <TiltCard maxTilt={10} glareOpacity={0.25} className="w-full max-w-[420px]">
              {/* Outer Cyber Glow Border */}
              <div className="relative rounded-2xl border border-[rgba(0,240,255,0.3)] bg-[rgba(22,27,34,0.85)] p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.2)] backdrop-blur-2xl">
                {/* macOS Terminal Chrome Bar */}
                <div className="flex items-center justify-between px-3 py-2 mb-2 bg-[rgba(10,14,23,0.9)] rounded-xl border border-[rgba(255,255,255,0.06)]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                    <span className="font-mono text-[11px] text-[#8b949e] ml-2">
                      ai_engineer.ts
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#00f0ff] font-mono text-[10px] tracking-wider uppercase font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Portrait Image */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#0a0e17]">
                  <Image
                    src="/images/mohammed_portrait_original.jpg"
                    alt="Mohammed Rehan Z — AI/ML Engineer & Web Developer"
                    fill
                    priority
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  {/* Gradient Base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d16]/95 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[rgba(10,14,23,0.88)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] flex items-center justify-between shadow-lg">
                    <div>
                      <div className="font-['Space_Grotesk'] text-base font-semibold text-[#f0f6fc]">
                        Mohammed Rehan Z
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#00f0ff] font-mono">
                        <MapPin className="h-3 w-3" />
                        <span>Bengaluru, India • IST</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(22,27,34,0.9)] border border-[rgba(34,197,94,0.3)]">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
                      </span>
                      <span className="font-mono text-[10px] text-[#22c55e] uppercase tracking-wider font-semibold">
                        Online
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
