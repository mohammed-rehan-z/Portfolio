"use client"

import React, { useState } from "react"
import confetti from "canvas-confetti"
import {
  Copy,
  Check,
  Mail,
  Send,
  Sparkles,
  Clock,
  MapPin,
  FileText,
  ExternalLink,
} from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Magnet } from "@/components/react-bits/Magnet"
import { BadgeGroup } from "@/components/untitled-ui/BadgeGroup"
import { motion, useReducedMotion } from "framer-motion"

const inquiryTopics = [
  { id: "internship", label: "🤝 Internship / Job Opportunity", subject: "Opportunity: Engineering Role at " },
  { id: "freelance", label: "🚀 Web Development Project", subject: "Project Inquiry: Web Engineering" },
  { id: "ai-consult", label: "🧠 AI / ML Collaboration", subject: "Collaboration: AI & Machine Learning" },
  { id: "coffee", label: "☕ Tech Chat / General", subject: "Hello Mohammed: Let's Connect" },
]

export function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState(inquiryTopics[0])
  const reduce = useReducedMotion()

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mohammedrehanz517@gmail.com")
    setCopied(true)

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#00f0ff", "#6366f1", "#8b5cf6"],
      })
    } catch {
      // ignore
    }

    setTimeout(() => setCopied(false), 2500)
  }

  const mailtoLink = `mailto:mohammedrehanz517@gmail.com?subject=${encodeURIComponent(
    selectedTopic.subject
  )}&body=${encodeURIComponent(
    "Hi Mohammed,\n\nI came across your portfolio and wanted to discuss..."
  )}`

  return (
    <section id="contact" className="w-full py-28 sm:py-36 bg-[#05080e] relative overflow-hidden">
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 bg-cyber-grid bg-radial-mask pointer-events-none opacity-25 z-0" />

      {/* Radiant Background Blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#6366f1]/15 via-[#00f0ff]/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[300px] bg-[#8b5cf6]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card */}
        <motion.div
          className="relative rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(22,27,34,0.7)] p-8 sm:p-14 lg:p-16 backdrop-blur-2xl shadow-2xl flex flex-col items-center text-center"
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Eyebrow Badge */}
          <BadgeGroup
            badgeText="Availability"
            label="Open to Internships & High-Impact Opportunities"
            dotColor="bg-[#00f0ff]"
            ping={true}
            className="mb-6"
          />

          {/* Heading */}
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl lg:text-6xl font-bold text-[#f0f6fc] tracking-tight max-w-3xl leading-[1.15]">
            Let&apos;s build something{" "}
            <span className="text-gradient-cyan italic">
              together.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-5 text-[#8b949e] text-base sm:text-lg max-w-2xl leading-relaxed">
            Whether you are scouting for an AI/ML intern, need a responsive client web application, or want to discuss machine learning architectures—my inbox is open.
          </p>

          {/* Topic Selector Chips */}
          <div className="mt-8 mb-4 flex flex-wrap items-center justify-center gap-2 max-w-2xl">
            {inquiryTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                  selectedTopic.id === topic.id
                    ? "bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_12px_rgba(0,240,255,0.2)] font-semibold"
                    : "bg-[rgba(22,27,34,0.6)] text-[#8b949e] border border-[rgba(255,255,255,0.06)] hover:text-[#f0f6fc]"
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* Email Box & Action Row */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl">
            {/* Copy Email Box */}
            <div className="flex-1 w-full flex items-center justify-between p-2 pl-4 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#0d1117] shadow-inner">
              <span className="font-mono text-xs sm:text-sm text-[#00f0ff] truncate select-all">
                mohammedrehanz517@gmail.com
              </span>
              <Button
                variant="subtle"
                size="sm"
                onClick={handleCopyEmail}
                className="gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(22,27,34,0.9)] text-xs font-mono text-[#f0f6fc] hover:bg-[#00f0ff] hover:text-[#090d16] transition-all duration-200 cursor-pointer"
                title="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#22c55e]" />
                    <span className="text-[#22c55e] font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>

            {/* Direct Mailto Button */}
            <Magnet distance={10}>
              <Button
                asChild
                variant="default"
                size="default"
                className="h-11 px-5 shadow-[0_0_20px_-3px_rgba(0,240,255,0.4)] text-xs font-semibold w-full sm:w-auto"
              >
                <a href={mailtoLink} className="flex items-center gap-2">
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Email</span>
                </a>
              </Button>
            </Magnet>
          </div>

          {/* SLA & Timezone Telemetry */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#8b949e]">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#00f0ff]" />
              <span>Response Time: &lt; 24 Hours</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#22c55e]" />
              <span>Bengaluru, India (IST • UTC+5:30)</span>
            </span>
          </div>

          {/* Social Profiles & Resume */}
          <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center justify-center gap-3 w-full">
            <a
              href="https://github.com/mohammed-rehan-z"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(22,27,34,0.6)] text-xs text-[#8b949e] hover:text-[#f0f6fc] hover:border-[#00f0ff]/30 transition-all"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/mohammed-rehan-z/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(22,27,34,0.6)] text-xs text-[#8b949e] hover:text-[#f0f6fc] hover:border-[#00f0ff]/30 transition-all"
            >
              <LinkedinIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="/Mohammed_Rehan_Z-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(22,27,34,0.6)] text-xs text-[#8b949e] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 transition-all"
            >
              <FileText className="h-4 w-4" />
              <span>Resume PDF</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
