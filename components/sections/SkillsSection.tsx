"use client"

import React, { useState } from "react"
import { Search, Terminal, Sparkles, Filter, CheckCircle2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SpotlightCard } from "@/components/react-bits/SpotlightCard"
import { Badge } from "@/components/ui/badge"
import { motion, useReducedMotion } from "framer-motion"

interface SkillItem {
  name: string
  category: "ai-ml" | "gen-ai" | "web-dev" | "tools"
  role: string
  context: string
  color: string
  accentBg: string
  spotlight: string
}

const skillsList: SkillItem[] = [
  // AI/ML
  {
    name: "TensorFlow",
    category: "ai-ml",
    role: "Deep Learning",
    context: "Sequential MLP-LSTM",
    color: "text-[#ff6f00]",
    accentBg: "bg-[rgba(255,111,0,0.08)]",
    spotlight: "rgba(255, 111, 0, 0.15)",
  },
  {
    name: "Scikit-Learn",
    category: "ai-ml",
    role: "Predictive Models",
    context: "ShadowFox ML Internship",
    color: "text-[#00f0ff]",
    accentBg: "bg-[rgba(0,240,255,0.08)]",
    spotlight: "rgba(0, 240, 255, 0.15)",
  },
  {
    name: "Computer Vision",
    category: "ai-ml",
    role: "Image Processing",
    context: "NVIDIA Jetson 1st Prize",
    color: "text-[#6366f1]",
    accentBg: "bg-[rgba(99,102,241,0.08)]",
    spotlight: "rgba(99, 102, 241, 0.15)",
  },
  {
    name: "NLP",
    category: "ai-ml",
    role: "Text Analytics",
    context: "Literature Summarization",
    color: "text-[#8b5cf6]",
    accentBg: "bg-[rgba(139,92,246,0.08)]",
    spotlight: "rgba(139, 92, 246, 0.15)",
  },
  {
    name: "OpenCV",
    category: "ai-ml",
    role: "Real-time Vision",
    context: "EAR & Landmark Tracking",
    color: "text-[#22c55e]",
    accentBg: "bg-[rgba(34,197,94,0.08)]",
    spotlight: "rgba(34, 197, 94, 0.15)",
  },

  // Gen AI
  {
    name: "RAG Systems",
    category: "gen-ai",
    role: "Contextual AI",
    context: "LocalResearcher Architecture",
    color: "text-[#00f0ff]",
    accentBg: "bg-[rgba(0,240,255,0.08)]",
    spotlight: "rgba(0, 240, 255, 0.18)",
  },
  {
    name: "LLMs",
    category: "gen-ai",
    role: "Generative Models",
    context: "Zero-Hallucination Pipeline",
    color: "text-[#a855f7]",
    accentBg: "bg-[rgba(168,85,247,0.08)]",
    spotlight: "rgba(168, 85, 247, 0.18)",
  },
  {
    name: "Vector Search",
    category: "gen-ai",
    role: "Semantic Retrieval",
    context: "Client-side WASM Vectors",
    color: "text-[#6366f1]",
    accentBg: "bg-[rgba(99,102,241,0.08)]",
    spotlight: "rgba(99, 102, 241, 0.15)",
  },
  {
    name: "Prompt Eng",
    category: "gen-ai",
    role: "Model Tuning",
    context: "Payload Constraint Design",
    color: "text-[#f0f6fc]",
    accentBg: "bg-[rgba(240,246,252,0.05)]",
    spotlight: "rgba(240, 246, 252, 0.12)",
  },

  // Web Dev
  {
    name: "Python",
    category: "web-dev",
    role: "Backend & ML",
    context: "FastAPI, Automation, ETL",
    color: "text-[#fbbf24]",
    accentBg: "bg-[rgba(251,191,36,0.08)]",
    spotlight: "rgba(251, 191, 36, 0.15)",
  },
  {
    name: "React",
    category: "web-dev",
    role: "Frontend UI",
    context: "Production Client Web Apps",
    color: "text-[#00f0ff]",
    accentBg: "bg-[rgba(0,240,255,0.08)]",
    spotlight: "rgba(0, 240, 255, 0.15)",
  },
  {
    name: "TypeScript",
    category: "web-dev",
    role: "Type Safety",
    context: "End-to-End Type Rigor",
    color: "text-[#6366f1]",
    accentBg: "bg-[rgba(99,102,241,0.08)]",
    spotlight: "rgba(99, 102, 241, 0.15)",
  },
  {
    name: "Next.js",
    category: "web-dev",
    role: "Full-Stack Framework",
    context: "RSC, Turbopack, App Router",
    color: "text-[#f0f6fc]",
    accentBg: "bg-[rgba(240,246,252,0.05)]",
    spotlight: "rgba(0, 240, 255, 0.12)",
  },
  {
    name: "REST APIs",
    category: "web-dev",
    role: "System Integration",
    context: "Secure Endpoints & Webhooks",
    color: "text-[#22c55e]",
    accentBg: "bg-[rgba(34,197,94,0.08)]",
    spotlight: "rgba(34, 197, 94, 0.15)",
  },
  {
    name: "Tailwind CSS",
    category: "web-dev",
    role: "Responsive Design",
    context: "Design Systems & Micro-motion",
    color: "text-[#38bdf8]",
    accentBg: "bg-[rgba(56,189,248,0.08)]",
    spotlight: "rgba(56, 189, 248, 0.15)",
  },

  // Tools & DB
  {
    name: "SQL",
    category: "tools",
    role: "Relational DB",
    context: "Structured Data Schemas",
    color: "text-[#00f0ff]",
    accentBg: "bg-[rgba(0,240,255,0.08)]",
    spotlight: "rgba(0, 240, 255, 0.15)",
  },
  {
    name: "Pandas",
    category: "tools",
    role: "Data Analytics",
    context: "Feature Extraction & Cleaning",
    color: "text-[#6366f1]",
    accentBg: "bg-[rgba(99,102,241,0.08)]",
    spotlight: "rgba(99, 102, 241, 0.15)",
  },
  {
    name: "NumPy",
    category: "tools",
    role: "Scientific Computing",
    context: "Matrix Math & Embeddings",
    color: "text-[#00f0ff]",
    accentBg: "bg-[rgba(0,240,255,0.08)]",
    spotlight: "rgba(0, 240, 255, 0.15)",
  },
  {
    name: "Git / GitHub",
    category: "tools",
    role: "Version Control",
    context: "Trunk-based Dev & Actions",
    color: "text-[#ef4444]",
    accentBg: "bg-[rgba(239,68,68,0.08)]",
    spotlight: "rgba(239, 68, 68, 0.15)",
  },
  {
    name: "Linux / WSL",
    category: "tools",
    role: "Development Env",
    context: "Bash Scripting & Shell Tooling",
    color: "text-[#f0f6fc]",
    accentBg: "bg-[rgba(240,246,252,0.05)]",
    spotlight: "rgba(240, 246, 252, 0.12)",
  },
]

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const reduce = useReducedMotion()

  const filteredSkills = skillsList.filter((s) => {
    const matchesCategory = activeFilter === "all" || s.category === activeFilter
    const matchesSearch =
      searchQuery.trim() === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.context.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="skills" className="w-full py-24 sm:py-32 bg-[#090d16] relative overflow-hidden">
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 bg-cyber-grid bg-radial-mask pointer-events-none opacity-20 z-0" />

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
              <span>02 // PRODUCTION TECH STACK</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f6fc] tracking-tight">
              Battle-Tested Tooling & Frameworks
            </h2>
            <p className="text-[#8b949e] text-sm sm:text-base mt-2 max-w-xl">
              From deep learning modeling to client-side WebAssembly and modern React interfaces.
            </p>
          </div>

          {/* Quick telemetry badge */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full bg-[rgba(22,27,34,0.8)] border border-[rgba(255,255,255,0.08)] text-[#c0c1ff]">
              <Sparkles className="h-3.5 w-3.5 text-[#00f0ff]" />
              <span>20 Technologies • 4 Focus Areas</span>
            </span>
          </div>
        </motion.div>

        {/* Filter Controls Row: Category Tabs + Live Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          <Tabs
            defaultValue="all"
            value={activeFilter}
            onValueChange={setActiveFilter}
            className="w-full md:w-auto"
          >
            <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full md:w-auto h-auto gap-1.5 p-1 bg-[rgba(22,27,34,0.7)] border border-[rgba(255,255,255,0.08)] rounded-xl">
              <TabsTrigger value="all" className="text-xs px-3 py-1.5">All Stack</TabsTrigger>
              <TabsTrigger value="ai-ml" className="text-xs px-3 py-1.5">AI & ML</TabsTrigger>
              <TabsTrigger value="gen-ai" className="text-xs px-3 py-1.5">Gen AI</TabsTrigger>
              <TabsTrigger value="web-dev" className="text-xs px-3 py-1.5">Web Dev</TabsTrigger>
              <TabsTrigger value="tools" className="text-xs px-3 py-1.5">Tools & DB</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8b949e]" />
            <input
              type="text"
              placeholder="Filter by keyword (e.g. Python, RAG)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[rgba(22,27,34,0.7)] border border-[rgba(255,255,255,0.08)] font-mono text-xs text-[#f0f6fc] placeholder-[#8b949e] focus:border-[#00f0ff]/50 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#8b949e] hover:text-[#f0f6fc] px-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
              >
                <SpotlightCard
                  spotlightColor={skill.spotlight}
                  className="group relative flex flex-col justify-between p-4 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(22,27,34,0.6)] hover:border-[rgba(0,240,255,0.35)] transition-all duration-300 h-full backdrop-blur-md shadow-lg"
                >
                  <div>
                    {/* Header: Skill Name & Category Chip */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-['Space_Grotesk'] text-base font-semibold text-[#f0f6fc] group-hover:text-[#00f0ff] transition-colors">
                        {skill.name}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${skill.accentBg} ${skill.color} border border-current opacity-70`} />
                    </div>

                    {/* Role description */}
                    <p className={`font-mono text-xs ${skill.color} mb-3 font-medium`}>
                      {skill.role}
                    </p>
                  </div>

                  {/* Contextual Usage Footer */}
                  <div className="pt-2.5 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                    <span className="font-mono text-[10.5px] text-[#8b949e] truncate" title={skill.context}>
                      {skill.context}
                    </span>
                    <CheckCircle2 className="h-3 w-3 text-[#00f0ff]/40 group-hover:text-[#00f0ff] transition-colors shrink-0 ml-1" />
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(22,27,34,0.4)]">
            <Filter className="h-8 w-8 text-[#8b949e] mx-auto mb-3 opacity-60" />
            <h4 className="font-['Space_Grotesk'] text-lg font-semibold text-[#f0f6fc]">No matching technologies found</h4>
            <p className="text-xs text-[#8b949e] mt-1 mb-4">Try clearing your search query or switching categories.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("")
                setActiveFilter("all")
              }}
              className="px-4 py-2 rounded-xl text-xs font-mono font-medium bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30 hover:bg-[#00f0ff]/25 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
