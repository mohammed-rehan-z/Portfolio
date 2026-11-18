"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  ExternalLink,
  Activity,
  Package,
  Check,
  Copy,
  Terminal,
  Radar,
  Eye,
  ScanFace,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
} from "lucide-react"
import { GithubIcon } from "@/components/ui/icons"
import { Badge } from "@/components/ui/badge"
import { SpotlightCard } from "@/components/react-bits/SpotlightCard"
import { motion, useReducedMotion } from "framer-motion"

// ── Interactive Telemetry Preview: Fishing Detection AIS Radar ──
function AISTelemetryPreview() {
  return (
    <div className="relative w-full h-full min-h-[300px] bg-[#070b12] rounded-xl overflow-hidden p-5 flex flex-col justify-between border border-[rgba(99,102,241,0.2)] font-mono select-none">
      {/* Radar grid background */}
      <div className="absolute inset-0 bg-cyber-grid bg-radial-mask opacity-30" />
      
      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2 text-xs text-[#6366f1] font-semibold">
          <Radar className="h-4 w-4 animate-spin text-[#6366f1]" style={{ animationDuration: "6s" }} />
          <span>AIS_VESSEL_RADAR // TELEMETRY_STREAM</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] bg-[#6366f1]/20 text-[#c0c1ff] border border-[#6366f1]/40">
          MLP-LSTM ACTIVE
        </span>
      </div>

      {/* Radar Center HUD */}
      <div className="relative z-10 flex flex-col items-center justify-center py-6">
        <div className="relative w-40 h-40 rounded-full border border-[#6366f1]/30 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]">
          <div className="absolute w-28 h-28 rounded-full border border-dashed border-[#00f0ff]/20 animate-pulse" />
          <div className="absolute w-16 h-16 rounded-full border border-[#6366f1]/40" />
          {/* Target Nodes */}
          <div className="absolute top-8 right-10 flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] animate-ping" />
            <span className="text-[9px] text-[#ef4444] font-bold">VESSEL_749 [ILLEGAL]</span>
          </div>
          <div className="absolute bottom-9 left-8 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <span className="text-[9px] text-[#22c55e]">VESSEL_102</span>
          </div>
          {/* Radar Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6366f1] to-transparent opacity-40" />
          <div className="h-full w-px bg-gradient-to-b from-transparent via-[#6366f1] to-transparent opacity-40" />
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-[rgba(255,255,255,0.08)] text-[11px]">
        <div>
          <span className="text-[#8b949e] block text-[9px]">SAMPLE FREQ</span>
          <span className="text-[#f0f6fc] font-semibold">10 Hz Telemetry</span>
        </div>
        <div>
          <span className="text-[#8b949e] block text-[9px]">MODEL ARCH</span>
          <span className="text-[#00f0ff] font-semibold">Sequential LSTM</span>
        </div>
        <div>
          <span className="text-[#8b949e] block text-[9px]">ANOMALY CONFIDENCE</span>
          <span className="text-[#22c55e] font-semibold">96.8% Accuracy</span>
        </div>
      </div>
    </div>
  )
}

// ── Interactive Telemetry Preview: AI Vision Assistant HUD ──
function VisionAssistantPreview() {
  return (
    <div className="relative w-full h-full min-h-[300px] bg-[#070b12] rounded-xl overflow-hidden p-5 flex flex-col justify-between border border-[rgba(34,197,94,0.2)] font-mono select-none">
      <div className="absolute inset-0 bg-cyber-grid bg-radial-mask opacity-25" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2 text-xs text-[#22c55e] font-semibold">
          <Eye className="h-4 w-4 text-[#22c55e]" />
          <span>ASSISTIVE_VISION_FEED // REALTIME_DETECTION</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] bg-[#22c55e]/20 text-[#86efac] border border-[#22c55e]/40">
          60 FPS INFERENCE
        </span>
      </div>

      {/* Object Bounding Boxes Simulation */}
      <div className="relative z-10 flex-1 my-4 flex items-center justify-center">
        <div className="relative w-full max-w-[280px] h-32 border border-dashed border-[#22c55e]/40 rounded-lg p-2.5 bg-[rgba(34,197,94,0.03)] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] text-[#22c55e]">
            <span className="bg-[#22c55e]/20 px-1.5 py-0.5 rounded border border-[#22c55e]/30 font-semibold">
              CROSSWALK • 98.4%
            </span>
            <span className="text-[#8b949e]">DIST: 2.1m</span>
          </div>

          <div className="self-end border border-[#00f0ff]/50 rounded px-2 py-1 bg-[rgba(0,240,255,0.06)] text-[10px]">
            <span className="text-[#00f0ff] font-semibold">OBSTACLE [PEDESTRIAN: 96.1%]</span>
          </div>

          <div className="text-[10px] text-[#86efac] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping" />
            <span>AUDIO_FEEDBACK: &quot;Crosswalk clear, safe to cross&quot;</span>
          </div>
        </div>
      </div>

      {/* Bottom telemetry */}
      <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-[rgba(255,255,255,0.08)] text-[11px]">
        <div>
          <span className="text-[#8b949e] block text-[9px]">VISION BACKEND</span>
          <span className="text-[#f0f6fc] font-semibold">OpenCV + YOLO</span>
        </div>
        <div>
          <span className="text-[#8b949e] block text-[9px]">SPEECH SYNTHESIS</span>
          <span className="text-[#22c55e] font-semibold">Real-Time TTS</span>
        </div>
        <div>
          <span className="text-[#8b949e] block text-[9px]">LATENCY</span>
          <span className="text-[#00f0ff] font-semibold">&lt; 35ms Edge</span>
        </div>
      </div>
    </div>
  )
}

// ── Interactive Telemetry Preview: Smart Attendance EAR HUD ──
function SmartAttendancePreview() {
  return (
    <div className="relative w-full h-full min-h-[300px] bg-[#070b12] rounded-xl overflow-hidden p-5 flex flex-col justify-between border border-[rgba(139,92,246,0.2)] font-mono select-none">
      <div className="absolute inset-0 bg-cyber-grid bg-radial-mask opacity-25" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2 text-xs text-[#8b5cf6] font-semibold">
          <ScanFace className="h-4 w-4 text-[#8b5cf6]" />
          <span>BIOMETRIC_EAR_MONITOR // ATTENTION_STREAM</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] bg-[#8b5cf6]/20 text-[#d8b4fe] border border-[#8b5cf6]/40">
          68-LANDMARKS
        </span>
      </div>

      {/* Facial Landmark & EAR Stream Simulation */}
      <div className="relative z-10 flex-1 my-4 flex items-center justify-center">
        <div className="w-full max-w-[280px] p-3 rounded-lg border border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.04)]">
          <div className="flex items-center justify-between text-[11px] mb-2">
            <span className="text-[#d8b4fe] font-semibold">EAR RATIO: 0.32</span>
            <span className="text-[#22c55e] px-1.5 py-0.5 rounded bg-[#22c55e]/15 border border-[#22c55e]/30 text-[9px] font-bold">
              ATTENTIVE
            </span>
          </div>

          {/* Simulated EAR Graph */}
          <div className="h-10 w-full flex items-end gap-1 mb-2 bg-[#05080e] p-1 rounded border border-white/5">
            {[40, 45, 60, 58, 62, 55, 30, 25, 50, 65, 70, 68, 62, 59, 64].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-[#8b5cf6] to-[#00f0ff] rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#8b949e]">
            <span>LIVENESS: VERIFIED 3D</span>
            <span className="text-[#00f0ff]">ATTENDEE #428 RECORDED</span>
          </div>
        </div>
      </div>

      {/* Bottom telemetry */}
      <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-[rgba(255,255,255,0.08)] text-[11px]">
        <div>
          <span className="text-[#8b949e] block text-[9px]">FEATURE DETECTOR</span>
          <span className="text-[#f0f6fc] font-semibold">Dlib 68-Point</span>
        </div>
        <div>
          <span className="text-[#8b949e] block text-[9px]">SPOOF RESISTANCE</span>
          <span className="text-[#22c55e] font-semibold">Multi-Angle Blink</span>
        </div>
        <div>
          <span className="text-[#8b949e] block text-[9px]">DATA PERSISTENCE</span>
          <span className="text-[#8b5cf6] font-semibold">Automated SQLite</span>
        </div>
      </div>
    </div>
  )
}

interface ProjectItem {
  number: string
  title: string
  subtitle: string
  description: string
  image?: string
  customPreview?: React.ReactNode
  category: "all" | "gen-ai" | "cv" | "ml"
  badge: string
  badgeColor: string
  metrics: string
  tags: string[]
  liveUrl: string
  repoUrl: string
  npmUrl?: string
  npmCommand?: string
}

export function ProjectsSection() {
  const reduce = useReducedMotion()
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd)
    setCopiedCmd(cmd)
    setTimeout(() => setCopiedCmd(null), 2000)
  }

  const projects: ProjectItem[] = [
    {
      number: "01",
      title: "LocalResearcher",
      subtitle: "Deterministic Academic Intelligence Platform",
      category: "gen-ai",
      description:
        "An open-source, deterministic academic intelligence platform designed for deep literature synthesis and zero-hallucination extraction. Parses peer-reviewed PDFs client-side via WebAssembly, embeds document chunks into a local vector database using Transformer models, and strictly injects mathematically relevant contexts into the LLM payload without server document ingestion.",
      image: "/images/projects/localresearcher.png",
      badge: "Academic Intelligence",
      badgeColor: "bg-[#00f0ff]",
      metrics: "Client-Side WASM • Zero-Hallucination RAG • Local Vector DB",
      tags: ["Next.js", "Transformers.js", "WebAssembly", "Vector DB", "Tailwind CSS", "IndexedDB"],
      liveUrl: "https://localresearcher.vercel.app/",
      repoUrl: "https://github.com/mohammed-rehan-z/LOCALRESEARCHER",
      npmUrl: "https://www.npmjs.com/package/localresearcher",
      npmCommand: "npm install localresearcher@latest",
    },
    {
      number: "02",
      title: "Fishing Detection",
      subtitle: "MLP-LSTM Telemetry Analysis",
      category: "ml",
      description:
        "Machine learning telemetry system identifying illegal fishing activities from marine vessel movement trajectories. Implemented trajectory coordinate preprocessing, sequential LSTM layers, and dense classifier nodes to detect anomalous trawling patterns from high-volume AIS data streams.",
      customPreview: <AISTelemetryPreview />,
      badge: "Deep Learning & Telemetry",
      badgeColor: "bg-[#6366f1]",
      metrics: "MLP-LSTM • Trajectory Preprocessing • 96.8% Precision",
      tags: ["TensorFlow", "Keras", "MLP", "LSTM", "Pandas", "Scikit-Learn"],
      liveUrl: "",
      repoUrl: "https://github.com/mohammed-rehan-z",
    },
    {
      number: "03",
      title: "AI Vision Assistant",
      subtitle: "Assistive Guidance for the Visually Impaired",
      category: "cv",
      description:
        "Assistive edge computer vision system helping visually impaired individuals safely navigate dynamic urban environments. Combines real-time OpenCV object classification, optical spatial depth estimation, and immediate low-latency synthetic speech generation.",
      customPreview: <VisionAssistantPreview />,
      badge: "Computer Vision & Sensing",
      badgeColor: "bg-[#22c55e]",
      metrics: "Real-time Edge Vision • Speech Synthesis • < 35ms Latency",
      tags: ["OpenCV", "Deep Learning", "Speech Tech", "Python", "Spatial NLP"],
      liveUrl: "",
      repoUrl: "https://github.com/mohammed-rehan-z",
    },
    {
      number: "04",
      title: "Smart Attendance",
      subtitle: "Real-Time EAR Attentiveness Tracking",
      category: "cv",
      description:
        "Automated facial biometric attendance tracking system utilizing 68 facial landmark detection and Eye Aspect Ratio (EAR) algorithms. Monitors real-time attentiveness, eliminates classroom roll-call overhead, and incorporates anti-spoofing verification.",
      customPreview: <SmartAttendancePreview />,
      badge: "Biometrics & Facial Landmarks",
      badgeColor: "bg-[#8b5cf6]",
      metrics: "68 Landmark Points • EAR Calculation • Automated Logging",
      tags: ["Python", "OpenCV", "dlib", "Biometrics", "SQLite"],
      liveUrl: "",
      repoUrl: "https://github.com/mohammed-rehan-z",
    },
  ]

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <section id="projects" className="w-full py-24 sm:py-32 bg-[#05080e] relative overflow-hidden">
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 bg-cyber-grid bg-radial-mask pointer-events-none opacity-25 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00f0ff] uppercase tracking-wider font-semibold mb-2">
              <Terminal className="h-3.5 w-3.5" />
              <span>03 // FLAGSHIP ENGINEERING PLATFORMS</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f6fc] tracking-tight">
              Featured Systems & Case Studies
            </h2>
            <p className="text-sm sm:text-base text-[#8b949e] mt-2 max-w-xl">
              Engineered with obsessive attention to deterministic accuracy, edge computation, and user experience.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Works" },
              { id: "gen-ai", label: "Generative AI" },
              { id: "cv", label: "Computer Vision" },
              { id: "ml", label: "Machine Learning" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 shadow-[0_0_12px_rgba(0,240,255,0.15)] font-semibold"
                    : "bg-[rgba(22,27,34,0.6)] text-[#8b949e] border border-[rgba(255,255,255,0.06)] hover:text-[#f0f6fc] hover:border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Cards List */}
        <div className="space-y-12">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 1
            return (
              <motion.div
                key={project.number}
                initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: [0.25, 1, 0.5, 1],
                }}
              >
                <SpotlightCard
                  spotlightColor="rgba(0, 240, 255, 0.12)"
                  className="group border border-[rgba(255,255,255,0.08)] bg-[rgba(22,27,34,0.7)] hover:border-[#00f0ff]/35 transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center h-full">
                    {/* Visual Media Column (7 cols) */}
                    <div
                      className={`lg:col-span-7 relative overflow-hidden bg-[#090d16] p-2 sm:p-4 flex items-center justify-center ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      {project.image ? (
                        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-inner">
                          <Image
                            src={project.image}
                            alt={`${project.title} Interface Mockup`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16]/70 via-transparent to-transparent pointer-events-none" />
                        </div>
                      ) : (
                        <div className="w-full h-full min-h-[300px]">
                          {project.customPreview}
                        </div>
                      )}
                    </div>

                    {/* Content Column (5 cols) */}
                    <div
                      className={`lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div>
                        {/* Eyebrow & Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="font-mono text-xs text-[#00f0ff] font-semibold tracking-wider">
                            PROJECT // {project.number}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[rgba(22,27,34,0.9)] border border-[rgba(255,255,255,0.08)] text-[11px] font-mono text-[#f0f6fc]">
                            <span className={`h-1.5 w-1.5 rounded-full ${project.badgeColor} animate-pulse`} />
                            {project.badge}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#f0f6fc] group-hover:text-[#00f0ff] transition-colors">
                          {project.title}
                        </h3>
                        <p className="font-mono text-xs text-[#8b949e] font-medium mt-1 mb-2">
                          {project.subtitle}
                        </p>

                        {/* Metrics pill */}
                        <div className="inline-flex items-center gap-1.5 text-xs text-[#c0c1ff] font-mono mb-3 px-2 py-1 rounded-md bg-[rgba(255,255,255,0.03)] border border-white/5">
                          <Activity className="h-3.5 w-3.5 text-[#00f0ff] shrink-0" />
                          <span className="truncate">{project.metrics}</span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-[#8b949e] leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="font-mono px-2 py-0.5 text-[11px] text-[#dfe2ef]">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* NPM install banner if available */}
                        {project.npmCommand && (
                          <div className="mt-4 p-2.5 rounded-xl bg-[#090d16] border border-[#00f0ff]/25 shadow-[0_0_20px_-5px_rgba(0,240,255,0.15)] flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 font-mono text-xs text-[#f0f6fc] min-w-0">
                              <span className="text-[#00f0ff] font-bold select-none">$</span>
                              <span className="truncate text-[#e6edf3] font-medium">{project.npmCommand}</span>
                              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#cb3837]/20 text-[#ff7b72] border border-[#cb3837]/40">
                                v1.5.0
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy(project.npmCommand!)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[#161b22] hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] border border-[rgba(255,255,255,0.08)] transition-all shrink-0 cursor-pointer"
                              title="Copy command"
                            >
                              {copiedCmd === project.npmCommand ? (
                                <>
                                  <Check className="h-3.5 w-3.5 text-[#00f0ff]" />
                                  <span className="text-[#00f0ff]">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-[#050505] bg-[#00f0ff] hover:bg-[#38bdf8] shadow-[0_0_20px_-5px_rgba(0,240,255,0.4)] transition-all group/link"
                          >
                            <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                            <span>Live Platform</span>
                          </a>
                        )}

                        {project.npmUrl && (
                          <a
                            href={project.npmUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-[#f0f6fc] bg-[#cb3837]/15 hover:bg-[#cb3837]/25 border border-[#cb3837]/40 hover:border-[#cb3837] shadow-[0_0_15px_-4px_rgba(203,56,55,0.3)] transition-all group/npm"
                          >
                            <Package className="h-3.5 w-3.5 text-[#ff7b72] transition-transform group-hover/npm:scale-110" />
                            <span>NPM Registry</span>
                          </a>
                        )}

                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-[#8b949e] hover:text-[#f0f6fc] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.18)] bg-[rgba(22,27,34,0.6)] transition-all"
                        >
                          <GithubIcon className="h-3.5 w-3.5" />
                          <span>Source Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
