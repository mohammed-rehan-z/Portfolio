"use client"

import type { Variants } from "framer-motion"
import React, { useState } from "react"
import Image from "next/image"
import {
  History,
  Rocket,
  ShieldCheck,
  Users,
  Copy,
  Check,
  Zap,
  CheckCircle,
  Eye,
  MapPin,
  Cpu,
  Layers,
  Terminal,
  FileCode,
  Sparkles,
} from "lucide-react"
import { MetricCard } from "@/components/untitled-ui/MetricCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, useReducedMotion } from "framer-motion"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
  }),
}

type TabKey = "profile" | "architecture" | "principles"

export function AboutBentoSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("profile")
  const [codeCopied, setCodeCopied] = useState(false)
  const reduce = useReducedMotion()

  const snippets = {
    profile: `const engineer: Profile = {
  name: "Mohammed Rehan Z",
  focus: "AI/ML, Generative AI & Web Engineering",
  stack: ["Python", "TypeScript", "TensorFlow", "React", "Next.js", "SQL"],
  education: "B.Tech AI & ML @ HKBK College of Engineering",
  awards: ["1st Prize NVIDIA Jetson Nano AI Challenge"],
  status: "Open to Internships & High-Impact Roles"
};`,
    architecture: `// LocalResearcher WASM Engine Architecture
const pipeline = {
  parser: "Client-side PDF extraction via WebAssembly",
  vectorizer: "Transformer embeddings directly in browser memory",
  indexer: "IndexedDB persistent vector database",
  retrieval: "Cosine similarity cosineTopK(query, k=5)",
  guarantee: "100% Client-Side Privacy • Zero Server Ingestion"
};`,
    principles: `# Core Engineering Manifesto
1. Determinism over Hallucination: Mathematical grounding before LLM synthesis.
2. Latency & Privacy by Design: Execute models at the edge / browser when viable.
3. Clean Architecture: Strict type safety, resilient APIs, and accessible UI.
4. Relentless Curiosity: Bridging research papers into production solutions.`
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(snippets[activeTab])
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2000)
  }

  return (
    <section id="about" className="w-full py-24 sm:py-32 bg-[#05080e] relative overflow-hidden">
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 bg-cyber-grid bg-radial-mask pointer-events-none opacity-20 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="flex flex-col gap-2 mb-12"
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0}
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00f0ff] uppercase tracking-wider font-semibold">
            <Terminal className="h-3.5 w-3.5" />
            <span>01 // ARCHITECTURAL MINDSET & CRAFT</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f6fc] tracking-tight">
            Engineering Systems with Mathematical Grounding
          </h2>
          <p className="text-sm sm:text-base text-[#8b949e] max-w-2xl">
            Bridging cutting-edge Artificial Intelligence with high-performance web architecture to build deterministic, user-centric software.
          </p>
        </motion.div>

        {/* 12-col Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column (7 cols): Developer Profile & Interactive Code Snippet */}
          <motion.div
            className="lg:col-span-7 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(22,27,34,0.65)] p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between"
            variants={fadeUp}
            initial={reduce ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0.1}
          >
            <div>
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-[rgba(255,255,255,0.06)]">
                <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-[rgba(0,240,255,0.4)] shadow-[0_0_15px_rgba(0,240,255,0.2)] shrink-0">
                  <Image
                    src="/images/mohammed_portrait_original.jpg"
                    alt="Mohammed Rehan Z profile close-up"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#f0f6fc]">
                      Mohammed Rehan Z
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
                      AI & Web Engineer
                    </span>
                  </div>
                  <p className="text-sm text-[#8b949e] mt-0.5">
                    Undergraduate @ HKBK College of Engineering, Bengaluru
                  </p>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-[#00f0ff] mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>Based in Bengaluru, India • IST (UTC+5:30)</span>
                  </div>
                </div>
              </div>

              {/* Bio Narrative */}
              <p className="text-[#8b949e] text-sm sm:text-base leading-relaxed my-5">
                I specialize in developing end-to-end intelligent systems: from designing zero-hallucination RAG frameworks and training sequential deep learning models to shipping fast, responsive, and accessible web experiences for clients and institutions.
              </p>

              {/* IDE Code Snippet Window with Tab Switcher */}
              <div className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#090d16] p-4 shadow-inner transition-all duration-200 hover:border-[rgba(0,240,255,0.25)]">
                {/* Tab Switcher */}
                <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-[rgba(255,255,255,0.06)] gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveTab("profile")}
                      className={`px-2.5 py-1 rounded-md font-mono text-xs transition-all ${
                        activeTab === "profile"
                          ? "bg-[rgba(0,240,255,0.15)] text-[#00f0ff] border border-[#00f0ff]/30 font-semibold"
                          : "text-[#8b949e] hover:text-[#f0f6fc]"
                      }`}
                    >
                      engineer_profile.ts
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("architecture")}
                      className={`px-2.5 py-1 rounded-md font-mono text-xs transition-all ${
                        activeTab === "architecture"
                          ? "bg-[rgba(99,102,241,0.15)] text-[#c0c1ff] border border-[#6366f1]/30 font-semibold"
                          : "text-[#8b949e] hover:text-[#f0f6fc]"
                      }`}
                    >
                      architecture.json
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("principles")}
                      className={`px-2.5 py-1 rounded-md font-mono text-xs transition-all ${
                        activeTab === "principles"
                          ? "bg-[rgba(168,85,247,0.15)] text-[#a855f7] border border-[#a855f7]/30 font-semibold"
                          : "text-[#8b949e] hover:text-[#f0f6fc]"
                      }`}
                    >
                      manifesto.md
                    </button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 font-mono text-xs text-[#8b949e] hover:text-[#00f0ff] transition-colors h-7 px-2.5"
                    title="Copy snippet"
                  >
                    {codeCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#22c55e]" />
                        <span className="text-[#22c55e]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>

                {/* Preformatted Code Content */}
                <pre className="font-mono text-xs leading-relaxed text-[#dfe2ef] overflow-x-auto p-1 max-h-56 scrollbar-thin">
                  <code>{snippets[activeTab]}</code>
                </pre>
              </div>
            </div>

            {/* Philosophy Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)]">
              <Badge variant="subtle-cyan" className="flex items-center gap-1.5 py-1 px-2.5">
                <Zap className="h-3.5 w-3.5 text-[#00f0ff]" />
                <span>Deterministic AI</span>
              </Badge>
              <Badge variant="subtle-indigo" className="flex items-center gap-1.5 py-1 px-2.5">
                <CheckCircle className="h-3.5 w-3.5 text-[#6366f1]" />
                <span>Edge & WASM Inference</span>
              </Badge>
              <Badge variant="subtle-purple" className="flex items-center gap-1.5 py-1 px-2.5">
                <Eye className="h-3.5 w-3.5 text-[#8b5cf6]" />
                <span>Accessible & Resilient UI</span>
              </Badge>
            </div>
          </motion.div>

          {/* Right Column (5 cols): 4 Metric Cards with visual variation */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Education CGPA",
                value: 7,
                suffix: ".3",
                description: "Pursuing B.Tech in Artificial Intelligence and Machine Learning at HKBK College.",
                icon: History,
                iconColor: "text-[#00f0ff]",
                trend: "2023 – Present",
                delay: 0.1,
              },
              {
                label: "Key Projects",
                value: 10,
                suffix: "+",
                description: "Shipped RAG platforms, predictive models, real-time computer vision, and client web apps.",
                icon: Rocket,
                iconColor: "text-[#6366f1]",
                trend: "AI & Full-Stack",
                delay: 0.15,
              },
              {
                label: "1st Prize",
                value: 1,
                suffix: "st",
                description: "Won 1st prize at NVIDIA Jetson Nano AI Challenge for edge computer vision solution.",
                icon: ShieldCheck,
                iconColor: "text-[#22c55e]",
                trend: "Hackathon Winner",
                delay: 0.2,
              },
              {
                label: "Certifications",
                value: 6,
                suffix: "+",
                description: "Certified by Anthropic, Microsoft, Google, and IBM in Generative AI and Cloud Computing.",
                icon: Users,
                iconColor: "text-[#8b5cf6]",
                trend: "Continuous Learning",
                delay: 0.25,
              },
            ].map((card) => (
              <motion.div
                key={card.label}
                variants={fadeUp}
                initial={reduce ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={card.delay}
                className="h-full"
              >
                <MetricCard
                  label={card.label}
                  value={card.value}
                  suffix={card.suffix}
                  description={card.description}
                  icon={card.icon}
                  iconColor={card.iconColor}
                  trend={card.trend}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3 Core Architecture Pillars Strip */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(22,27,34,0.45)] backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2 text-[#00f0ff] font-mono text-xs font-semibold">
              <Cpu className="h-4 w-4" />
              <span>GENERATIVE AI & RAG</span>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Designing vector embeddings, contextual chunks, and client-side inference pipelines that eliminate hallucination and protect user privacy.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(22,27,34,0.45)] backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2 text-[#6366f1] font-mono text-xs font-semibold">
              <Eye className="h-4 w-4" />
              <span>COMPUTER VISION & SENSING</span>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Real-time object detection, facial landmark tracking, and Eye Aspect Ratio (EAR) algorithms for attentiveness and assistive interfaces.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(22,27,34,0.45)] backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2 text-[#22c55e] font-mono text-xs font-semibold">
              <Layers className="h-4 w-4" />
              <span>FULL-STACK WEB PLATFORMS</span>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Translating business requirements into production-ready React and Next.js applications with accessible layouts and reliable state machines.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
