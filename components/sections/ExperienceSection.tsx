"use client"

import React, { useState } from "react"
import { Timeline } from "@/components/untitled-ui/Timeline"
import { motion, useReducedMotion } from "framer-motion"
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Calendar,
  MapPin,
  Terminal,
  Briefcase,
  ExternalLink,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const careerHistory = [
  {
    period: "2025 — Present",
    role: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Remote",
    description:
      "Designing and developing high-performance, responsive web applications for clients, translating design specs into production-grade React and TypeScript code.",
    highlights: [
      "Built custom web interfaces with modern React, TypeScript, and responsive Tailwind layouts.",
      "Optimized Core Web Vitals, asset loading pipelines, and cross-device accessibility.",
      "Collaborated directly with founders and business owners to ship MVPs on schedule.",
    ],
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "REST APIs"],
    current: true,
  },
  {
    period: "Oct 2025",
    role: "AI / ML Intern",
    company: "ShadowFox Virtual",
    location: "Remote",
    description:
      "Engineered and evaluated machine learning classification pipelines and predictive modeling architectures using Python scientific stacks.",
    highlights: [
      "Trained and evaluated Logistic Regression, Decision Tree, and Random Forest models using Scikit-learn.",
      "Conducted exploratory data analysis (EDA), missing-value imputation, and feature engineering with Pandas and NumPy.",
      "Performed cross-validation, grid search hyperparameter tuning, and ROC-AUC curve evaluation.",
    ],
    skills: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Model Tuning"],
    current: false,
  },
  {
    period: "Sep 2025 — Oct 2025",
    role: "Front-End Development Intern",
    company: "Edunet Foundation (IBM SkillBuild)",
    location: "Virtual",
    description:
      "Built modern responsive web interfaces and mastered front-end layout architectures, accessibility patterns, and version control.",
    highlights: [
      "Engineered adaptive web components using modern HTML5, CSS3, and JavaScript.",
      "Implemented responsive fluid layouts utilizing CSS Grid and Flexbox mechanics.",
      "Followed standard Git/GitHub trunk-based workflows for collaboration and code reviews.",
    ],
    skills: ["JavaScript", "HTML5", "CSS3", "CSS Grid", "Git/GitHub"],
    current: false,
  },
  {
    period: "2023 — Present",
    role: "Web Developer / Technical Operations Lead",
    company: "HKBK Group of Institutions",
    location: "Bengaluru, India",
    description:
      "Led web engineering and technical infrastructure for major institutional hackathons and national-level collegiate events.",
    highlights: [
      "Engineered the official portal and real-time registration pipeline for a 36-hour national hackathon.",
      "Handled high-concurrency traffic spikes during team registrations seamlessly.",
      "Coordinated 30+ volunteers across server deployment, attendee logistics, and technical support.",
    ],
    skills: ["Web Platforms", "Event Architecture", "Team Leadership", "React"],
    current: false,
  },
]

const educationAndHonors = [
  {
    type: "Degree",
    title: "Bachelor of Technology — Artificial Intelligence & Machine Learning",
    institution: "HKBK College of Engineering",
    period: "2023 — Present",
    location: "Bengaluru, India",
    grade: "CGPA: 7.3 / 10.0",
    description:
      "Undergraduate curriculum emphasizing deep learning, neural network architectures, probabilistic algorithms, data structures, and computer vision systems.",
    highlights: [
      "Core Coursework: Machine Learning, Deep Neural Networks, Natural Language Processing, Computer Vision, Operating Systems, Database Management Systems.",
      "Active participant in collegiate hackathons, AI workshops, and developer meetups.",
    ],
    tags: ["Deep Learning", "Algorithms", "Computer Vision", "NLP", "DBMS"],
  },
  {
    type: "Award",
    title: "1st Prize Winner — NVIDIA Jetson Nano AI Challenge",
    institution: "NVIDIA Developer Program Workshop",
    period: "2024",
    location: "Bengaluru, India",
    grade: "First Place Honor",
    description:
      "Developed an edge-based computer vision solution optimized for the NVIDIA Jetson Nano embedded platform with hardware acceleration.",
    highlights: [
      "Optimized inference pipelines for edge embedded constraints using OpenCV and TensorRT.",
      "Demonstrated real-time object classification and low-latency spatial tracking.",
    ],
    tags: ["NVIDIA Jetson", "Edge AI", "Computer Vision", "TensorRT"],
  },
  {
    type: "Certification",
    title: "Industry AI & Cloud Certifications",
    institution: "Anthropic, Microsoft, Google & IBM",
    period: "2024 — 2025",
    location: "Online Verified",
    grade: "6+ Certifications",
    description:
      "Completed rigorous coursework covering modern Generative AI, prompt design, cloud infrastructure, and predictive machine learning.",
    highlights: [
      "Anthropic: Prompt Engineering & LLM Alignment",
      "IBM SkillBuild & Edunet: Front-End Web Development & Python Data Science",
      "Microsoft & Google: Foundational Cloud Computing & Machine Learning Concepts",
    ],
    tags: ["Generative AI", "Cloud Systems", "Prompt Engineering", "Data Science"],
  },
]

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience")
  const reduce = useReducedMotion()

  return (
    <section id="experience" className="w-full py-24 sm:py-32 bg-[#090d16] relative overflow-hidden">
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
              <span>04 // CAREER TRAJECTORY & ACADEMICS</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f6fc] tracking-tight">
              Experience & Academic Track
            </h2>
            <p className="text-sm sm:text-base text-[#8b949e] mt-2 max-w-xl">
              Professional internships, client web engineering, and institutional technical leadership across AI/ML and frontend systems.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[rgba(22,27,34,0.7)] border border-[rgba(255,255,255,0.08)]">
            <button
              type="button"
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-medium transition-all cursor-pointer ${
                activeTab === "experience"
                  ? "bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30 shadow-[0_0_12px_rgba(0,240,255,0.15)] font-semibold"
                  : "text-[#8b949e] hover:text-[#f0f6fc]"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>Work & Internships</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-medium transition-all cursor-pointer ${
                activeTab === "education"
                  ? "bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30 shadow-[0_0_12px_rgba(0,240,255,0.15)] font-semibold"
                  : "text-[#8b949e] hover:text-[#f0f6fc]"
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Education & Honors</span>
            </button>
          </div>
        </motion.div>

        {/* Tab 1: Work Experience Timeline */}
        {activeTab === "experience" && (
          <motion.div
            className="max-w-4xl"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          >
            <Timeline items={careerHistory} />
          </motion.div>
        )}

        {/* Tab 2: Education & Honors */}
        {activeTab === "education" && (
          <motion.div
            className="max-w-4xl space-y-6"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          >
            {educationAndHonors.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(22,27,34,0.65)] p-6 sm:p-8 backdrop-blur-xl shadow-xl hover:border-[#00f0ff]/30 transition-all duration-300"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-['Space_Grotesk'] text-xl font-bold text-[#f0f6fc]">
                      {item.title}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(15,19,28,0.7)] px-3 py-1 text-xs font-mono text-[#8b949e]">
                    <Calendar className="h-3.5 w-3.5 text-[#00f0ff]" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#00f0ff] mb-4">
                  <span className="font-semibold">{item.institution}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-[#8b949e]">{item.location}</span>
                  <span className="text-white/20">•</span>
                  <span className="px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20 font-semibold">
                    {item.grade}
                  </span>
                </div>

                <p className="text-sm text-[#8b949e] leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="space-y-2 mb-4">
                  {item.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-[#dfe2ef]">
                      <CheckCircle2 className="h-4 w-4 text-[#22c55e] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="font-mono text-[11px] px-2.5 py-0.5 text-[#c0c1ff] border-[#6366f1]/30 bg-[#6366f1]/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
