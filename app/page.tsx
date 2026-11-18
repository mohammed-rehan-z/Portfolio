"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

interface ProjectItem {
  number: string;
  category: "wasm-genai" | "telemetry-ml" | "edge-cv";
  badge: string;
  badgeClass: string;
  title: string;
  titleItalic: string;
  description: string;
  image?: string;
  npmCommand?: string;
  tags: string[];
  highlight: string;
  highlightColor: string;
  liveUrl?: string;
  npmUrl?: string;
  repoUrl: string;
  architectureDetails: string[];
}

interface CompetencyCluster {
  clusterNumber: string;
  title: string;
  skills: { name: string; verified: boolean; tag: string }[];
}

export default function Home() {
  // Navigation & ScrollSpy
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Projects filter state & expanded architecture details
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  // Competencies search query
  const [competencySearch, setCompetencySearch] = useState<string>("");

  // Contact section inquiry builder
  const inquiryOptions = [
    {
      id: "role",
      label: "🤝 AI & Software Roles",
      subject: "Opportunity: AI Engineering & Software Role at [Company]",
      body: "Hi Mohammed,\n\nWe came across your portfolio and would like to speak regarding an engineering opportunity...",
    },
    {
      id: "freelance",
      label: "🚀 Full-Stack Web Architecture",
      subject: "Project Inquiry: Web Application Architecture",
      body: "Hi Mohammed,\n\nWe have a project requiring responsive web architecture and would like to discuss...",
    },
    {
      id: "ai-consult",
      label: "🧠 Edge AI & Computer Vision",
      subject: "Consultation: Edge Vision / WASM Pipeline",
      body: "Hi Mohammed,\n\nI would like to consult on an Edge AI / computer vision pipeline...",
    },
    {
      id: "general",
      label: "☕ Technical Discussion",
      subject: "Discussion: Technical Architecture & Collaboration",
      body: "Hi Mohammed,\n\nI came across your projects and would love to connect regarding technical collaboration and innovative product development...",
    },
  ];
  const [selectedInquiry, setSelectedInquiry] = useState(inquiryOptions[0]);

  // Smooth scroll handler with offset for fixed header
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === "overview" || targetId === "#" || targetId === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("overview");
    } else {
      const cleanId = targetId.replace("#", "");
      const el = document.getElementById(cleanId);
      if (el) {
        const navOffset = 85;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navOffset,
          behavior: "smooth",
        });
        setActiveSection(cleanId);
      }
    }
    setMobileMenuOpen(false);
  };

  // ScrollSpy listener with getBoundingClientRect for absolute accuracy
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Bottom of page detection
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 70
      ) {
        setActiveSection("contact");
        return;
      }

      // Top of page
      if (window.scrollY < 220) {
        setActiveSection("overview");
        return;
      }

      const sections = ["contact", "impact", "competencies", "case-studies", "about"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 190 && rect.bottom > 90) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Copy email with celebration
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mohammedrehanz517@gmail.com");
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#38bdf8", "#00f0ff", "#2563eb", "#ffffff"],
      });
    } catch {
      // ignore
    }
    triggerToast("Email copied to clipboard: mohammedrehanz517@gmail.com");
  };

  // Copy npm command
  const handleCopyNpm = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    triggerToast(`Copied command: ${cmd}`);
  };

  const toggleProjectDetails = (id: string) => {
    setExpandedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Projects data
  const projects: ProjectItem[] = [
    {
      number: "01",
      category: "wasm-genai",
      badge: "PUBLIC OPEN-SOURCE • IN-BROWSER WASM RAG",
      badgeClass: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      title: "LocalResearcher",
      titleItalic: "Deterministic Academic Intelligence Platform",
      description:
        "A public, zero-hallucination academic intelligence platform engineered for deterministic synthesis of peer-reviewed research papers. Completely air-gapped and runs directly in-browser via WebAssembly, performing local chunking and vector indexing inside IndexedDB without recurring LLM API compute charges.",
      image: "/images/projects/localresearcher.png",
      npmCommand: "npm install localresearcher@latest",
      tags: ["Next.js 14", "Transformers.js", "WebAssembly", "IndexedDB Cosine", "Tailwind CSS"],
      highlight: "100% Public & Air-Gapped",
      highlightColor: "text-success-emerald",
      liveUrl: "https://localresearcher.vercel.app/",
      npmUrl: "https://www.npmjs.com/package/localresearcher",
      repoUrl: "https://github.com/mohammed-rehan-z/LOCALRESEARCHER",
      architectureDetails: [
        "Public Open-Source: Full codebase and documentation available on GitHub and npm.",
        "Chunking: Client-side PDF stream tokenization via WebAssembly module (zero server transfer).",
        "Embeddings: In-memory ONNX Runtime Web transformer inference inside dedicated Web Worker.",
        "Persistence: IndexedDB vector storage with custom vector cosine similarity search algorithm.",
        "Privacy: Fully air-gapped architecture guarantees zero exfiltration of proprietary research.",
      ],
    },
    {
      number: "02",
      category: "telemetry-ml",
      badge: "MLP-LSTM • AIS TRAJECTORY PIPELINE",
      badgeClass: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      title: "Fishing Detection",
      titleItalic: "Sequential AIS Telemetry Pipeline",
      description:
        "Dual-architecture predictive telemetry model trained on spatio-temporal vessel coordinates. Accurately identifies illicit fishing operations and evasive navigation maneuvers across international maritime boundaries using deep MLP-LSTM sequence networks.",
      tags: ["TensorFlow", "Keras", "LSTM Sequence", "Pandas Vectorized", "AIS Geodata"],
      highlight: "Dual Telemetry Sequence Models",
      highlightColor: "text-sky-400",
      repoUrl: "https://github.com/mohammed-rehan-z",
      architectureDetails: [
        "Feature Engineering: Haversine distance, acceleration vectors, and turn-rate sliding windows.",
        "Architecture: 3-layer LSTM sequential model paired with dense multi-layer perceptron head.",
        "Data Throughput: Ingests 10 Hz high-volume AIS telemetry streams with vectorized Pandas batching.",
        "Outcome: 96.8% precision score on international EEZ boundary anomaly classification.",
      ],
    },
    {
      number: "03",
      category: "edge-cv",
      badge: "PYTHON 3 • OPENCV • 68-POINT FACIAL MESH",
      badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      title: "FaceScan Attendance",
      titleItalic: "Python Biometrics & Attentiveness Monitor",
      description:
        "A standalone Python-based biometric vision platform engineered for real-time facial landmark detection and Eye Aspect Ratio (EAR) heuristics. Performs live face scanning, passive attendee verification, and continuous attentiveness monitoring with automated timestamped SQLite logging.",
      tags: ["Python 3", "OpenCV", "dlib 68-Mesh", "EAR Analytics", "SQLite", "NumPy"],
      highlight: "Python Computer Vision Engine",
      highlightColor: "text-purple-400",
      repoUrl: "https://github.com/mohammed-rehan-z",
      architectureDetails: [
        "Python CV Core: Pure Python 3 pipeline utilizing multithreaded OpenCV frame capture operating at 30+ FPS.",
        "68-Point Facial Mesh: dlib shape predictor mapping facial contours, inter-ocular distance, and pupil coordinates.",
        "EAR Fatigue Algorithm: Real-time Euclidean distance ratio tracking blink frequency and fatigue degradation.",
        "Anti-Spoofing & Logging: 3D micro-movement liveness verification with automated SQLite attendance audit records.",
      ],
    },
  ];

  const filteredProjects =
    projectFilter === "all"
      ? projects
      : projects.filter((p) => p.category === projectFilter);

  // Competency Clusters (Focused & Curated)
  const competencyClusters: CompetencyCluster[] = [
    {
      clusterNumber: "Cluster 01",
      title: "AI & Machine Learning",
      skills: [
        { name: "PyTorch & TensorFlow", verified: true, tag: "Deep Learning" },
        { name: "Scikit-Learn & NumPy", verified: true, tag: "Predictive ML" },
        { name: "Transformers & ONNX Runtime", verified: true, tag: "GenAI & Embeddings" },
        { name: "OpenCV & Biometric Vision", verified: true, tag: "Computer Vision" },
      ],
    },
    {
      clusterNumber: "Cluster 02",
      title: "Backend & Data Pipelines",
      skills: [
        { name: "FastAPI & Python Microservices", verified: true, tag: "Async APIs" },
        { name: "PostgreSQL, SQLite & IndexedDB", verified: true, tag: "Databases" },
        { name: "Node.js Runtime Environments", verified: true, tag: "Server Runtimes" },
        { name: "Linux, Bash & Git CI/CD", verified: true, tag: "DevOps & Tooling" },
      ],
    },
    {
      clusterNumber: "Cluster 03",
      title: "Frontend & Web Architecture",
      skills: [
        { name: "Next.js App Router & React", verified: true, tag: "RSC Frontend" },
        { name: "TypeScript Strict Mode", verified: true, tag: "Type Safety" },
        { name: "Tailwind CSS & Responsive UI", verified: true, tag: "Design Systems" },
        { name: "Web Workers & WebAssembly", verified: true, tag: "Client Compute" },
      ],
    },
  ];

  return (
    <div className="bg-[#070b14] font-body-md text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-300 min-h-screen relative">
      {/* ── TOAST NOTIFICATION ── */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-slate-950 text-white font-mono text-xs shadow-2xl border border-slate-800 animate-fade-in"
        >
          <span className="material-symbols-outlined text-[17px] text-emerald-400" aria-hidden="true">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── HEADER NAVIGATION ── */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#070b14]/85 backdrop-blur-md border-b border-white/[0.08] transition-all shadow-sm">
        <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4 sm:gap-6">
          {/* Logo & Status Badge */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <a
              className="group flex items-center gap-3 transition-opacity hover:opacity-90 cursor-pointer"
              href="#"
              onClick={(e) => scrollToSection(e, "overview")}
              aria-label="Mohammed Rehan Z - Home"
            >
              <div className="w-9 h-9 rounded-md bg-[#0e1424] text-cyan-400 flex items-center justify-center font-mono text-[13px] font-semibold border border-white/[0.1] tracking-tight shadow-sm shrink-0">
                &lt;/&gt;
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-sm sm:text-base text-white tracking-tight group-hover:text-cyan-400 transition-colors font-bold whitespace-nowrap">
                  &lt;Mohammed Rehan.Z /&gt;
                </span>
                <span className="font-label-sm text-[11px] text-text-slate tracking-wide whitespace-nowrap hidden min-[380px]:inline">
                  AI Engineer &amp; Product Innovator · Bengaluru
                </span>
              </div>
            </a>

            {/* Desktop Status Badge (Ultra-wide) */}
            <div className="hidden 2xl:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <span className="w-2 h-2 rounded-full bg-success-emerald animate-pulse"></span>
              <span className="font-label-sm text-[11px] text-text-slate font-medium tracking-tight">
                Open for AI Engineering &amp; Innovative Projects
              </span>
            </div>
            {/* Tablet/Laptop Status Badge */}
            <div className="hidden lg:inline-flex 2xl:hidden items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <span className="w-2 h-2 rounded-full bg-success-emerald animate-pulse"></span>
              <span className="font-mono text-[10px] text-text-slate font-medium">Available</span>
            </div>
          </div>

          {/* Desktop Nav Links (Visible from lg upwards) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 font-mono text-xs">
            {[
              { id: "overview", label: "Home", href: "#" },
              { id: "about", label: "About", href: "#about" },
              { id: "case-studies", label: "Projects", href: "#case-studies" },
              { id: "competencies", label: "Frameworks", href: "#competencies" },
              { id: "impact", label: "Experience", href: "#impact" },
              { id: "contact", label: "Contact", href: "#contact" },
            ].map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`py-1.5 transition-all relative font-medium cursor-pointer ${
                    isActive
                      ? "text-white font-bold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-cyan-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors font-mono text-xs bg-[#0e1424] shrink-0"
              href="https://github.com/mohammed-rehan-z"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-3.5 h-3.5 text-slate-200" />
              <span>GitHub</span>
            </a>
            <a
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors font-mono text-xs bg-[#0e1424] shrink-0"
              href="https://www.linkedin.com/in/mohammed-rehan-z/"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-[#0077b5]" />
              <span>LinkedIn</span>
            </a>
            <a
              className="inline-flex items-center gap-2 h-9 px-3.5 rounded-md bg-white text-slate-950 hover:bg-slate-200 transition-all font-mono text-xs shrink-0 font-semibold shadow-sm"
              href="/Mohammed_Rehan_Z-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[17px]" aria-hidden="true">download</span>
              <span>Resume</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-950/15 text-slate-950 uppercase tracking-wider font-semibold">
                PDF
              </span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className="material-symbols-outlined text-[20px] block" aria-hidden="true">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full bg-[#090d16]/98 backdrop-blur-md border-b border-white/[0.08] shadow-2xl transition-all animate-fade-in">
            <div className="max-w-[1280px] mx-auto px-6 py-4 space-y-1 font-mono text-sm">
              {[
                { id: "overview", label: "Home", href: "#" },
                { id: "about", label: "About", href: "#about" },
                { id: "case-studies", label: "Projects", href: "#case-studies" },
                { id: "competencies", label: "Frameworks", href: "#competencies" },
                { id: "impact", label: "Experience", href: "#impact" },
                { id: "contact", label: "Contact", href: "#contact" },
              ].map((m) => {
                const isActive = activeSection === m.id;
                return (
                  <a
                    key={m.label}
                    href={m.href}
                    onClick={(e) => scrollToSection(e, m.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? "bg-white/[0.08] text-white font-bold"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span>{m.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-sky"></span>
                    )}
                  </a>
                );
              })}
              <div className="pt-3 mt-2 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/mohammed-rehan-z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/[0.08] text-xs text-slate-200 hover:bg-white/[0.06] transition-colors font-mono"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/mohammed-rehan-z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/[0.08] text-xs text-slate-200 hover:bg-white/[0.06] transition-colors font-mono"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#0077b5]" />
                  <span>LinkedIn</span>
                </a>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-success-emerald animate-pulse"></span>
                  <span>Available for AI &amp; Innovation</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="w-full pt-20 bg-[#070b14] min-h-screen">
        <div className="flex flex-col w-full">
          {/* HERO SECTION: ASYMMETRICAL SPLIT EDITORIAL */}
          <section className="w-full pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-white/[0.08] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-cyan-500/[0.04] blur-[130px] pointer-events-none rounded-full" />
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
                <div className="lg:col-span-7 flex flex-col items-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
                    <span className="w-2 h-2 rounded-full bg-success-emerald animate-pulse"></span>
                    <span className="font-mono text-[11px] text-text-slate font-medium">
                      APPLIED AI INNOVATION · REAL-WORLD PROJECTS
                    </span>
                  </div>

                  <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] text-white tracking-tight leading-[1.15] mb-6 font-normal">
                    Building impactful,{" "}
                    <em className="italic text-sky-400 font-display font-medium underline decoration-sky-400/30 decoration-1 underline-offset-8">
                      innovative AI projects
                    </em>{" "}
                    and real-world web solutions.
                  </h1>

                  <p className="font-body-lg text-body-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
                    B.Tech in Artificial Intelligence &amp; Machine Learning at HKBK College of Engineering. Building innovative AI products, open-source software, and full-stack web applications driven by practical problem-solving and modern machine learning.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mb-10">
                    <span className="px-3 py-1 rounded-md bg-[#0e1424] border border-white/[0.08] text-slate-300 font-label-md text-xs">
                      B.Tech AI &amp; ML
                    </span>
                    <span className="px-3 py-1 rounded-md bg-[#0e1424] border border-white/[0.08] text-slate-300 font-label-md text-xs">
                      Applied AI &amp; Innovation
                    </span>
                    <span className="px-3 py-1 rounded-md bg-[#0e1424] border border-white/[0.08] text-slate-300 font-label-md text-xs">
                      WASM &amp; Edge Inference
                    </span>
                    <span className="px-3 py-1 rounded-md bg-[#0e1424] border border-white/[0.08] text-slate-300 font-label-md text-xs">
                      Python • TypeScript • SQL
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3.5">
                    <a
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white text-slate-950 hover:bg-slate-200 transition-all font-label-md text-label-md font-semibold group cursor-pointer shadow-sm"
                      href="#case-studies"
                      onClick={(e) => scrollToSection(e, "case-studies")}
                    >
                      <span>Explore Featured Projects</span>
                      <span
                        className="material-symbols-outlined text-[17px] group-hover:translate-y-0.5 transition-transform"
                        aria-hidden="true"
                      >
                        arrow_downward
                      </span>
                    </a>
                    <a
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-md bg-[#0e1424] hover:bg-white/[0.06] border border-white/[0.08] text-white transition-all font-label-md text-label-md cursor-pointer"
                      href="/Mohammed_Rehan_Z-resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-accent-sky" aria-hidden="true">
                        download
                      </span>
                      <span>Download Resume</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.08] text-slate-300 uppercase font-semibold">
                        PDF
                      </span>
                    </a>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-md text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors font-label-md text-label-md font-medium cursor-pointer"
                      onClick={handleCopyEmail}
                    >
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                        content_copy
                      </span>
                      <span>Copy Email</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Genuine Portrait & Verified Credentials Showcase */}
                <div className="lg:col-span-5 w-full">
                  <div className="bg-[#0e1424] rounded-2xl border border-white/[0.08] p-5 lg:p-6 shadow-2xl space-y-5">
                    {/* Genuine High-Resolution Original Portrait */}
                    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-white/[0.08] shadow-inner">
                      <Image
                        src="/images/mohammed_portrait_original.jpg"
                        alt="Mohammed Rehan Z — AI Engineer & Product Innovator"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#070b14]/90 backdrop-blur-md border border-white/[0.1] shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-success-emerald animate-pulse" aria-hidden="true"></span>
                        <span className="font-mono text-[11px] text-white font-medium">Available for Roles</span>
                      </div>
                    </div>

                    {/* Profile Information & Real Metrics */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-headline-sm text-xl text-white font-bold tracking-tight">
                            Mohammed Rehan Z
                          </h3>
                          <p className="font-body-sm text-xs text-text-slate">
                            AI Engineer &amp; Product Innovator · Bengaluru, India
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.08]">
                          B.Tech AIML (2027)
                        </span>
                      </div>

                      {/* Verified Focus Areas */}
                      <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                          <span className="text-text-slate block text-[10px]">CORE SPECIALIZATION</span>
                          <span className="text-white font-semibold">WASM Edge &amp; CV</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                          <span className="text-text-slate block text-[10px]">FIRST PRIZE WINNER</span>
                          <span className="text-accent-sky font-semibold">TECHKUBIK Expo</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                          <span className="text-text-slate block text-[10px]">OPEN SOURCE NPM</span>
                          <span className="text-white font-semibold">localresearcher</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                          <span className="text-text-slate block text-[10px]">INSTITUTIONAL LEAD</span>
                          <span className="text-white font-semibold">36-Hr Hackathons</span>
                        </div>
                      </div>

                      {/* Direct Actions */}
                      <div className="pt-2 flex items-center gap-2.5">
                        <a
                          className="flex-1 flex items-center justify-center gap-2 h-10 rounded-md bg-white text-slate-950 hover:bg-slate-200 transition-all font-label-md text-xs font-semibold cursor-pointer shadow-sm"
                          href="#contact"
                          onClick={(e) => scrollToSection(e, "contact")}
                        >
                          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                            outgoing_mail
                          </span>
                          <span>Get in Touch / Discuss Projects</span>
                        </a>
                        <a
                          className="flex items-center justify-center h-10 px-3.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white transition-colors font-mono text-xs cursor-pointer"
                          href="https://github.com/mohammed-rehan-z"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub Profile"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                        <a
                          className="flex items-center justify-center h-10 px-3.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white transition-colors font-mono text-xs cursor-pointer"
                          href="https://www.linkedin.com/in/mohammed-rehan-z/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn Profile"
                        >
                          <LinkedinIcon className="w-4 h-4 text-[#0077b5]" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* HORIZONTAL METRIC RIBBON */}
          <section className="w-full py-8 bg-[#070b14] border-b border-white/[0.08]" id="about">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-5 rounded-lg border border-white/[0.08] bg-[#0e1424] flex flex-col justify-between hover:border-slate-700 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] text-text-slate uppercase tracking-wider">
                      Project Expo
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 font-mono text-[11px] font-semibold border border-sky-500/20">
                      1st Prize
                    </span>
                  </div>
                  <div>
                    <div className="font-stat-metric text-2xl lg:text-3xl text-white font-bold mb-1 tracking-tight">
                      1st Prize
                    </div>
                    <p className="font-body-sm text-xs text-text-slate leading-snug">
                      Won 1st prize at TECHKUBIK Project Expo for engineering excellence and practical project innovation.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-lg border border-white/[0.08] bg-[#0e1424] flex flex-col justify-between hover:border-slate-700 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] text-text-slate uppercase tracking-wider">
                      Shipped Projects
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-success-emerald font-mono text-[11px] font-semibold border border-emerald-100">
                      Deployed
                    </span>
                  </div>
                  <div>
                    <div className="font-stat-metric text-2xl lg:text-3xl text-white font-bold mb-1 tracking-tight">
                      10+ Projects
                    </div>
                    <p className="font-body-sm text-xs text-text-slate leading-snug">
                      Innovative web platforms, public open-source AI tools, and telemetry prediction models.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-lg border border-white/[0.08] bg-[#0e1424] flex flex-col justify-between hover:border-slate-700 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] text-text-slate uppercase tracking-wider">
                      Open Source Package
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-success-emerald font-mono text-[11px] font-semibold border border-emerald-100">
                      NPM Published
                    </span>
                  </div>
                  <div>
                    <div className="font-stat-metric text-2xl lg:text-3xl text-white font-bold mb-1 tracking-tight">
                      NPM Registry
                    </div>
                    <p className="font-body-sm text-xs text-text-slate leading-snug">
                      Published localresearcher package on NPM for privacy-first, client-side academic paper analysis.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-lg border border-white/[0.08] bg-[#0e1424] flex flex-col justify-between hover:border-slate-700 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] text-text-slate uppercase tracking-wider">
                      Credentials
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[11px] font-semibold border border-blue-100">
                      Verified
                    </span>
                  </div>
                  <div>
                    <div className="font-stat-metric text-2xl lg:text-3xl text-white font-bold mb-1 tracking-tight">
                      6+ Certs
                    </div>
                    <p className="font-body-sm text-xs text-text-slate leading-snug">
                      Anthropic Claude Generative AI, Microsoft Copilot Studio, Google Cloud ML &amp; IBM SkillBuild.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CONTINUOUS TECHNOLOGY STRIP */}
          <div className="w-full py-4 bg-[#090d16] border-b border-white/[0.08] overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
              <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-6 text-slate-400 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-sky"></span>
                  <span>TensorFlow &amp; Keras</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  <span>PyTorch</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span>Transformers.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-sky"></span>
                  <span>WebAssembly (WASM)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  <span>Scikit-Learn</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span>FastAPI &amp; REST</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-sky"></span>
                  <span>Next.js 14 &amp; React</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  <span>TypeScript Strict</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span>Local Vector DB (IndexedDB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-sky"></span>
                  <span>OpenCV</span>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURED PROJECTS & INNOVATIONS WITH FILTERING */}
          <section
            className="w-full py-20 lg:py-24 border-b border-white/[0.08] bg-[#070b14]"
            id="case-studies"
          >
            <div id="projects" className="scroll-mt-24" />
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] font-mono text-[11px] text-slate-300 mb-3 border border-white/[0.08]">
                    <span className="material-symbols-outlined text-[15px] text-accent-sky" aria-hidden="true">
                      layers
                    </span>
                    <span>Featured Projects &amp; Applied Innovations</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-white tracking-tight mb-2 font-normal">
                    Projects &amp; Innovation Portfolio
                  </h2>
                  <p className="font-body-md text-body-md text-text-slate leading-relaxed">
                    Innovative engineering projects built to solve tangible problems—ranging from in-browser generative AI and edge computer vision to predictive maritime analytics. Documented with live demos and open-source code.
                  </p>
                </div>
                <a
                  className="inline-flex items-center gap-1.5 font-label-md text-label-md text-white hover:text-sky-400 transition-colors group font-semibold"
                  href="https://github.com/mohammed-rehan-z"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>Explore All Repositories</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform" aria-hidden="true">
                    arrow_forward
                  </span>
                </a>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-8">
                {[
                  { id: "all", label: "All Projects (3)" },
                  { id: "wasm-genai", label: "WASM & GenAI" },
                  { id: "telemetry-ml", label: "Telemetry & LSTM" },
                  { id: "edge-cv", label: "Computer Vision & Biometrics" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setProjectFilter(f.id)}
                    className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors cursor-pointer ${
                      projectFilter === f.id
                        ? "bg-white text-slate-950 font-semibold"
                        : "bg-[#0e1424] hover:bg-white/[0.06] text-slate-300 border border-white/[0.08]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((project) => {
                  const isExpanded = !!expandedProjects[project.number];
                  return (
                    <article
                      key={project.number}
                      className="bg-[#0e1424] rounded-xl p-6 lg:p-7 border border-white/[0.08] flex flex-col justify-between hover:border-cyan-500/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-200"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold border ${project.badgeClass}`}
                          >
                            {project.badge}
                          </span>
                          <span className="font-mono text-xs text-text-slate">
                            PROJECT // {project.number}
                          </span>
                        </div>

                        <h3 className="font-headline-md text-2xl text-white tracking-tight mb-3 font-normal">
                          {project.title} —{" "}
                          <span className="italic font-display text-slate-300">{project.titleItalic}</span>
                        </h3>

                        {/* Visual screenshot preview if available */}
                        {/* Genuine Project Interface Screenshot */}
                        {project.image && (
                          <div className="mb-4 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0f1d] group shadow-inner">
                            <div className="flex items-center justify-between px-3.5 py-2 bg-[#0a0f1d] border-b border-white/[0.08]">
                              <span className="font-mono text-[11px] text-slate-300 font-medium">
                                localresearcher.vercel.app
                              </span>
                              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-success-emerald font-semibold border border-emerald-100">
                                PUBLIC PRODUCTION
                              </span>
                            </div>
                            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#090d16]">
                              <Image
                                src={project.image}
                                alt={`${project.title} Interface Preview`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                              />
                            </div>
                          </div>
                        )}

                        <p className="font-body-sm text-body-sm text-text-slate leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {/* Clean NPM Package Badge */}
                        {project.npmCommand && (
                          <div className="mb-5 p-2.5 rounded-lg bg-[#0a0f1d] border border-white/[0.08] flex items-center justify-between font-mono text-xs text-slate-200">
                            <div className="flex items-center gap-2 truncate">
                              <span className="px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 text-[10px] font-semibold border border-sky-500/20 shrink-0">
                                npm
                              </span>
                              <span className="text-slate-200 font-medium truncate">{project.npmCommand}</span>
                            </div>
                            <button
                              type="button"
                              aria-label="Copy npm install command"
                              className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-mono text-xs shrink-0 ml-2"
                              onClick={() => handleCopyNpm(project.npmCommand!)}
                              title="Copy install command"
                            >
                              <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                                content_copy
                              </span>
                              <span>Copy</span>
                            </button>
                          </div>
                        )}

                        {/* Tech tags */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded bg-white/[0.04] font-mono text-xs text-slate-300 border border-white/[0.06]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Expandable Architecture Details Toggle */}
                        <button
                          type="button"
                          onClick={() => toggleProjectDetails(project.number)}
                          className="mb-4 inline-flex items-center gap-1.5 font-mono text-xs text-slate-300 hover:text-white font-semibold cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px] text-accent-sky" aria-hidden="true">
                            {isExpanded ? "expand_less" : "expand_more"}
                          </span>
                          <span>
                            {isExpanded
                              ? "Hide Architecture Breakdown"
                              : "View Technical Architecture Breakdown"}
                          </span>
                        </button>

                        {/* Architecture Breakdown Drawer */}
                        {isExpanded && (
                          <div className="mb-5 p-3.5 rounded-lg bg-[#0a0f1d] border border-white/[0.08] space-y-2 font-mono text-[11px] text-slate-300 animate-fade-in">
                            <span className="font-semibold text-white block mb-1">
                              Engineering Architecture &amp; Data Pipeline:
                            </span>
                            {project.architectureDetails.map((detail, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-sky shrink-0 mt-1.5"></span>
                                <span className="leading-relaxed">{detail}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/[0.08]">
                        <span
                          className={`font-mono text-xs font-semibold flex items-center gap-1.5 ${project.highlightColor}`}
                        >
                          <span className="w-2 h-2 rounded-full bg-current"></span>
                          {project.highlight}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          {project.liveUrl && (
                            <a
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 font-mono text-xs border border-white/[0.08] transition-colors"
                              href={project.liveUrl}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                                open_in_new
                              </span>
                              <span>Live Demo</span>
                            </a>
                          )}
                          {project.npmUrl && (
                            <a
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 font-mono text-xs border border-white/[0.08] transition-colors"
                              href={project.npmUrl}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                                inventory_2
                              </span>
                              <span>NPM</span>
                            </a>
                          )}
                          <a
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white text-slate-950 hover:bg-slate-200 font-mono text-xs transition-colors font-semibold shadow-sm"
                            href={project.repoUrl}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <span>{project.repoUrl.includes('/LOCALRESEARCHER') ? 'Source Code' : 'GitHub Repository'}</span>
                            <span className="material-symbols-outlined text-[15px]" aria-hidden="true">code</span>
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* PRODUCTION COMPETENCIES WITH REALTIME SEARCH */}
          <section
            className="w-full py-20 lg:py-24 border-b border-white/[0.08] bg-[#070b14]"
            id="competencies"
          >
            <div id="skills" className="scroll-mt-24" />
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] font-mono text-[11px] text-slate-300 mb-3 border border-white/[0.08]">
                    <span className="material-symbols-outlined text-[15px] text-cyan-400" aria-hidden="true">
                      verified
                    </span>
                    <span>Validated Project Stack</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-white tracking-tight mb-2 font-normal">
                    Technical Competencies &amp; Frameworks
                  </h2>
                  <p className="font-body-md text-body-md text-text-slate leading-relaxed">
                    Core technical stack spanning deep learning models, backend APIs, and modern responsive frontends.
                  </p>
                </div>

                {/* Live Competency Filter */}
                <div className="w-full md:w-72 relative">
                  <input
                    type="text"
                    aria-label="Search technical competencies and frameworks"
                    placeholder="Search stack (e.g. PyTorch, WASM)..."
                    value={competencySearch}
                    onChange={(e) => setCompetencySearch(e.target.value)}
                    className="w-full pl-8 pr-8 py-2 rounded-md bg-[#0e1424] border border-white/[0.08] font-mono text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <span className="material-symbols-outlined text-[16px] text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" aria-hidden="true">
                    search
                  </span>
                  {competencySearch && (
                    <button
                      type="button"
                      aria-label="Clear search input"
                      onClick={() => setCompetencySearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 text-xs font-mono cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {competencyClusters.map((cluster) => {
                  const filteredSkills = cluster.skills.filter((s) =>
                    s.name.toLowerCase().includes(competencySearch.toLowerCase()) ||
                    s.tag.toLowerCase().includes(competencySearch.toLowerCase())
                  );

                  return (
                    <div
                      key={cluster.clusterNumber}
                      className="p-6 rounded-xl border border-white/[0.08] bg-[#0e1424] flex flex-col justify-between hover:border-slate-700 transition-colors"
                    >
                      <div>
                        <div className="mb-5 pb-3 border-b border-white/[0.08]">
                          <span className="font-mono text-[11px] text-text-slate uppercase tracking-wider block mb-1">
                            {cluster.clusterNumber}
                          </span>
                          <h3 className="font-headline-sm text-lg text-white tracking-tight font-semibold">
                            {cluster.title}
                          </h3>
                        </div>

                        {filteredSkills.length > 0 ? (
                          <div className="space-y-2.5 font-mono text-xs">
                            {filteredSkills.map((skill) => (
                              <div
                                key={skill.name}
                                className="flex items-center justify-between gap-2 py-1.5 px-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                              >
                                <span className="text-slate-200 font-medium truncate" title={skill.name}>
                                  {skill.name}
                                </span>
                                <span className="text-[10px] text-text-slate shrink-0 uppercase tracking-wider font-semibold">
                                  {skill.tag}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-6 text-center text-text-slate font-mono text-xs">
                            No matching skills in this cluster
                          </div>
                        )}
                      </div>

                      <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-text-slate text-xs font-mono">
                        <span>Focus</span>
                        <span className="text-accent-sky font-medium">Applied Projects &amp; Innovation</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* PROFESSIONAL EXPERIENCE & TRAJECTORY */}
          <section
            className="w-full py-20 lg:py-24 border-b border-white/[0.08] bg-[#070b14]"
            id="impact"
          >
            <div id="experience" className="scroll-mt-24" />
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] font-mono text-[11px] text-slate-300 mb-3 border border-white/[0.08]">
                    <span className="material-symbols-outlined text-[15px] text-accent-sky" aria-hidden="true">
                      timeline
                    </span>
                    <span>Experience &amp; Innovation Record</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-white tracking-tight mb-2 font-normal">
                    Professional Experience &amp; Institutional Record
                  </h2>
                  <p className="font-body-md text-body-md text-text-slate leading-relaxed">
                    Practical industry internships, research projects, and institutional leadership building web platforms and machine learning applications.
                  </p>
                </div>
                <a
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#0e1424] hover:bg-white/[0.06] border border-white/[0.08] text-white transition-all font-label-md text-label-md cursor-pointer"
                  href="/Mohammed_Rehan_Z-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[18px] text-accent-sky" aria-hidden="true">
                    download
                  </span>
                  <span>Download Resume</span>
                </a>
              </div>

              <div className="space-y-6">
                {/* Role 1 */}
                <div className="p-6 lg:p-7 rounded-xl border border-white/[0.08] bg-[#0e1424] hover:border-slate-700 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-3">
                      <span className="font-headline-sm text-lg text-white font-semibold block mb-1">
                        2025 — Present
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-success-emerald font-mono text-[11px] font-semibold border border-emerald-100 mb-2">
                        ACTIVE PRACTICE
                      </span>
                      <p className="font-body-sm text-xs text-text-slate">Self-Employed · Remote</p>
                    </div>
                    <div className="lg:col-span-9 space-y-3">
                      <div>
                        <h3 className="font-title-md text-title-md text-white font-semibold">
                          Independent Web Engineer &amp; Full-Stack Developer
                        </h3>
                        <p className="font-label-md text-xs font-mono text-slate-300">
                          Bespoke Client Solutions &amp; Web Applications
                        </p>
                      </div>
                      <p className="font-body-sm text-body-sm text-text-slate leading-relaxed">
                        Designed and developed high-performance, responsive websites for commercial businesses, translating client product specifications into fully functional, accessible, and user-centric web applications.
                      </p>
                      <div className="space-y-2 pt-1 font-body-sm text-body-sm text-text-slate">
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-sky shrink-0 mt-2"></span>
                          <span>
                            Architected customized, type-safe web interfaces utilizing React, TypeScript, and modern headless patterns.
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-sky shrink-0 mt-2"></span>
                          <span>
                            Enforced rigorous standards of mobile responsiveness, usability guidelines, and sub-second load times.
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-sky shrink-0 mt-2"></span>
                          <span>
                            Partnered directly with business stakeholders to define scope, sprint deliverables, and production deployments.
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.06]">
                          React
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.06]">
                          TypeScript
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.06]">
                          Next.js
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.06]">
                          Tailwind CSS
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.06]">
                          Performance Audits
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role 2 */}
                <div className="p-6 lg:p-7 rounded-xl border border-white/[0.08] bg-[#0e1424] hover:border-slate-700 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-3">
                      <span className="font-headline-sm text-lg text-white font-semibold block mb-1">
                        Oct 2025
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-200 font-mono text-[11px] font-semibold border border-white/[0.08] mb-2">
                        AI/ML INTERNSHIP
                      </span>
                      <p className="font-body-sm text-xs text-text-slate">ShadowFox Virtual · Remote</p>
                    </div>
                    <div className="lg:col-span-9 space-y-3">
                      <div>
                        <h3 className="font-title-md text-title-md text-white font-semibold">
                          AI / Machine Learning Engineering Intern
                        </h3>
                        <p className="font-label-md text-xs font-mono text-slate-300">
                          Predictive Modeling &amp; Telemetry Analytics
                        </p>
                      </div>
                      <p className="font-body-sm text-body-sm text-text-slate leading-relaxed">
                        Engineered and evaluated supervised machine learning models across classification and regression domains, focusing on algorithm performance metrics and model convergence optimization.
                      </p>
                      <div className="space-y-2 pt-1 font-body-sm text-body-sm text-text-slate">
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-sky shrink-0 mt-2"></span>
                          <span>
                            Trained Logistic Regression, Decision Tree, and Random Forest estimators using Scikit-Learn.
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-sky shrink-0 mt-2"></span>
                          <span>
                            Executed data cleaning, exploratory data analysis (EDA), and feature transformation with Pandas and NumPy.
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-sky shrink-0 mt-2"></span>
                          <span>
                            Applied hyperparameter tuning via cross-validation to maximize precision and recall benchmarks.
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.06]">
                          Python
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.06]">
                          Scikit-Learn
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.06]">
                          Pandas
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.06]">
                          NumPy
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.06]">
                          Model Validation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role 3 */}
                <div className="p-6 lg:p-7 rounded-xl border border-white/[0.08] bg-[#0e1424] hover:border-slate-700 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-3">
                      <span className="font-headline-sm text-lg text-white font-semibold block mb-1">
                        Sep 2025 — Oct 2025
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-200 font-mono text-[11px] font-semibold border border-white/[0.08] mb-2">
                        PRACTICUM
                      </span>
                      <p className="font-body-sm text-xs text-text-slate">
                        Edunet Foundation / IBM SkillBuild · Virtual
                      </p>
                    </div>
                    <div className="lg:col-span-9 space-y-3">
                      <div>
                        <h3 className="font-title-md text-title-md text-white font-semibold">
                          Front-End Development Intern
                        </h3>
                        <p className="font-label-md text-xs font-mono text-slate-300">
                          Standards-Compliant Responsive Engineering
                        </p>
                      </div>
                      <p className="font-body-sm text-body-sm text-text-slate leading-relaxed">
                        Built responsive web interfaces and mastered modern browser layout patterns, responsive layouts, and cross-browser accessibility criteria.
                      </p>
                      <div className="space-y-2 pt-1 font-body-sm text-body-sm text-text-slate">
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-sky shrink-0 mt-2"></span>
                          <span>
                            Developed modular, accessible UI interfaces using semantic HTML5, CSS3, and JavaScript.
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-sky shrink-0 mt-2"></span>
                          <span>
                            Implemented complex fluid layouts utilizing CSS Grid and Flexbox primitives.
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-sky shrink-0 mt-2"></span>
                          <span>
                            Followed standard GitHub team branch, merge, and pull request workflows for code quality.
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.06]">
                          HTML5 / CSS3
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.06]">
                          JavaScript
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.06]">
                          CSS Grid
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[11px] text-slate-300 border border-white/[0.06]">
                          Git Workflows
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* VERIFIED ACCOMPLISHMENTS & DEMONSTRATED IMPACT */}
          <section className="w-full py-20 lg:py-24 border-b border-white/[0.08] bg-[#070b14]">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
              <div className="max-w-2xl mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 font-mono text-[11px] text-sky-400 mb-3 border border-sky-500/20">
                  <span className="material-symbols-outlined text-[15px]" aria-hidden="true">verified</span>
                  <span>Quantified Proof of Competence</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-white tracking-tight mb-2 font-normal">
                  Demonstrated Impact &amp; Technical Milestones
                </h2>
                <p className="font-body-md text-body-md text-text-slate leading-relaxed">
                  Quantifiable evidence of algorithmic rigor, open-source adoption, competitive recognition, and academic discipline.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    num: "01",
                    title: "1st Prize Winner — TECHKUBIK Project Expo",
                    desc: "Won 1st prize at the prestigious TECHKUBIK Project Expo for outstanding technical architecture and innovative project execution.",
                    linkUrl: "https://lnkd.in/p/dvcj7V52",
                    linkLabel: "View Award on LinkedIn",
                  },
                  {
                    num: "02",
                    title: "LocalResearcher WebAssembly Deterministic Architecture",
                    desc: "Engineered and open-sourced LocalResearcher, achieving 100% in-browser deterministic RAG with client-side tokenization, local vector embeddings, and zero cloud API charges.",
                  },
                  {
                    num: "03",
                    title: "Shipped 10+ Innovative AI & Full-Stack Projects",
                    desc: "Engineered, documented, and shipped 10+ end-to-end creative projects spanning privacy-first RAG tools, sequential telemetry models, and commercial client web applications.",
                  },
                  {
                    num: "04",
                    title: "Multi-Vendor Industry Certification Suite",
                    desc: "Credentialed across Anthropic Claude Generative AI, Microsoft Copilot Business Architecture, Google Cloud Machine Learning, and IBM SkillBuild Front-End.",
                  },
                  {
                    num: "05",
                    title: "Web Developer & Technical Operations Lead",
                    desc: "Architected digital portal systems and directed technical infrastructure operations for major 36-hour national hackathons at HKBK Group of Institutions, managing network uptime and 30+ technical volunteers.",
                  },
                  {
                    num: "06",
                    title: "Python-Based FaceScan Biometrics & EAR Pipeline",
                    desc: "Engineered a standalone Python 3 computer vision system combining dlib 68-point facial mesh landmarking with real-time Eye Aspect Ratio (EAR) heuristics and SQLite persistence.",
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="p-6 rounded-xl border border-white/[0.08] bg-[#0e1424] flex items-start gap-4 hover:border-slate-700 transition-colors"
                  >
                    <span className="font-mono text-accent-sky font-bold text-lg shrink-0 mt-0.5">
                      {item.num}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-title-sm text-title-sm text-white font-semibold mb-1">
                        {item.title}
                      </h4>
                      <p className="font-body-sm text-body-sm text-text-slate leading-relaxed">
                        {item.desc}
                      </p>
                      {"linkUrl" in item && item.linkUrl && (
                        <a
                          href={item.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-xs text-sky-400 hover:text-sky-300 transition-colors font-medium"
                        >
                          <LinkedinIcon className="w-3.5 h-3.5 text-[#0077b5]" />
                          <span>{item.linkLabel || "View Award on LinkedIn"}</span>
                          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                            open_in_new
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FORMAL EDUCATION & CERTIFICATIONS SUMMARY */}
          <section className="w-full py-16 border-b border-white/[0.08] bg-[#070b14]">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 lg:p-7 rounded-xl border border-white/[0.08] bg-[#0e1424] flex flex-col justify-between hover:border-slate-700 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] text-text-slate uppercase tracking-wider">
                        Formal Degree
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-200 font-mono text-[11px] font-semibold border border-white/[0.08]">
                        2023 — 2027
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-lg text-white font-semibold mb-2">
                      Bachelor of Technology — Artificial Intelligence &amp; Machine Learning
                    </h3>
                    <p className="font-body-sm text-xs font-mono text-slate-400 mb-3">
                      HKBK College of Engineering · Bengaluru, India
                    </p>
                    <p className="font-body-sm text-body-sm text-text-slate leading-relaxed mb-4">
                      Comprehensive undergraduate program centered on mathematical modeling, deep learning architectures, probability theory, computer vision systems, and distributed web programming.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="font-mono text-xs text-text-slate">Cumulative Score</span>
                    <span className="font-title-sm text-title-sm text-white font-bold font-mono">
                      7.3 CGPA
                    </span>
                  </div>
                </div>

                <div className="p-6 lg:p-7 rounded-xl border border-white/[0.08] bg-[#0e1424] flex flex-col justify-between hover:border-slate-700 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] text-text-slate uppercase tracking-wider">
                        Professional Credentials
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[11px] font-semibold border border-emerald-500/20">
                        Verified
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-lg text-white font-semibold mb-4">
                      Industry Certifications &amp; Accreditations
                    </h3>
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200">
                          Anthropic — Claude Generative AI Engineering
                        </span>
                        <span className="text-text-slate">Specialist</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200">
                          Microsoft — Copilot Business Value &amp; AI Studio
                        </span>
                        <span className="text-text-slate">Certified</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200">
                          Google Cloud — Machine Learning Foundations
                        </span>
                        <span className="text-text-slate">Accredited</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200">
                          IBM SkillBuild — Front-End Web Architecture
                        </span>
                        <span className="text-text-slate">Verified</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-text-slate font-mono text-xs">
                    <span>Verification Scope</span>
                    <span className="text-accent-sky font-medium">All Credentials Active</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* HIGH-CONVERSION INQUIRIES & CONTACT SECTION */}
          <section className="w-full py-20 lg:py-24 bg-[#070b14]" id="contact">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
              <div className="max-w-3xl mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] font-mono text-[11px] text-slate-300 mb-3 border border-white/[0.08]">
                  <span className="material-symbols-outlined text-[15px] text-accent-sky" aria-hidden="true">
                    mail
                  </span>
                  <span>Engineering Roles, Internships &amp; Contracts</span>
                </div>
                <h2 className="font-headline-lg lg:font-display text-3xl lg:text-4xl text-white tracking-tight mb-3 font-normal">
                  Let&apos;s engineer something{" "}
                  <em className="italic text-accent-sky font-display font-medium">together.</em>
                </h2>
                <p className="font-body-lg text-body-lg text-text-slate leading-relaxed">
                  Whether you are launching an innovative AI project, building a modern web platform, or looking for a driven software engineering intern, let&apos;s connect to discuss goals and practical innovation.
                </p>

                {/* Interactive Inquiry Selector Chips */}
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-text-slate mr-1">Inquiry Purpose:</span>
                  {inquiryOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedInquiry(opt)}
                      className={`px-3 py-1.5 rounded-full font-mono text-xs transition-colors cursor-pointer ${
                        selectedInquiry.id === opt.id
                          ? "bg-white text-slate-950 font-semibold"
                          : "bg-[#0e1424] hover:bg-white/[0.06] text-slate-300 border border-white/[0.08]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                {/* Contact Card 1: Direct Email */}
                <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0e1424] flex flex-col justify-between hover:border-slate-700 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] text-text-slate uppercase tracking-wider">
                        Direct Contact
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-success-emerald font-mono text-[11px] font-semibold border border-emerald-100">
                        Quick Response
                      </span>
                    </div>
                    <h3 className="font-title-md text-title-md text-white font-semibold mb-1">
                      Email Inquiries
                    </h3>
                    <p className="font-body-sm text-xs text-text-slate mb-4">
                      Reach out directly for interviews, project collaborations, or technical innovation.
                    </p>
                    <div className="p-2.5 bg-[#0a0f1d] rounded-md border border-white/[0.08] flex items-center justify-between">
                      <span className="font-mono text-xs text-slate-200 truncate select-all">
                        mohammedrehanz517@gmail.com
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/[0.1] text-white font-mono text-[11px] border border-white/[0.08] transition-colors cursor-pointer shrink-0 ml-2"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <div className="pt-6">
                    <a
                      className="w-full flex items-center justify-center gap-2 h-10 rounded-md bg-white text-slate-950 hover:bg-slate-200 transition-all font-label-md text-sm font-semibold cursor-pointer shadow-sm"
                      href={`mailto:mohammedrehanz517@gmail.com?subject=${encodeURIComponent(
                        selectedInquiry.subject
                      )}&body=${encodeURIComponent(selectedInquiry.body)}`}
                    >
                      <span className="material-symbols-outlined text-[17px]" aria-hidden="true">outgoing_mail</span>
                      <span>Send Email Now</span>
                    </a>
                  </div>
                </div>

                {/* Contact Card 2: Professional Network */}
                <div className="p-6 rounded-xl border border-white/[0.08] bg-[#0e1424] flex flex-col justify-between hover:border-slate-700 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] text-text-slate uppercase tracking-wider">
                        Professional Network
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-200 font-mono text-[11px] font-semibold border border-white/[0.08]">
                        Verified
                      </span>
                    </div>
                    <h3 className="font-title-md text-title-md text-white font-semibold mb-1">
                      LinkedIn &amp; GitHub
                    </h3>
                    <p className="font-body-sm text-xs text-text-slate mb-4">
                      Review published source code repositories, commit logs, and engineering notes.
                    </p>
                    <div className="space-y-2">
                      <a
                        className="p-2.5 bg-[#0a0f1d] rounded-md border border-white/[0.08] flex items-center justify-between hover:bg-white/[0.04] transition-colors group"
                        href="https://www.linkedin.com/in/mohammed-rehan-z/"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="font-mono text-xs text-slate-200">
                          linkedin.com/in/mohammed-rehan-z
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-text-slate group-hover:text-white transition-colors" aria-hidden="true">
                          open_in_new
                        </span>
                      </a>
                      <a
                        className="p-2.5 bg-[#0a0f1d] rounded-md border border-white/[0.08] flex items-center justify-between hover:bg-white/[0.04] transition-colors group"
                        href="https://github.com/mohammed-rehan-z"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="font-mono text-xs text-slate-200">
                          github.com/mohammed-rehan-z
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-text-slate group-hover:text-white transition-colors" aria-hidden="true">
                          open_in_new
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="pt-6">
                    <a
                      className="w-full flex items-center justify-center gap-2 h-10 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white transition-all font-label-md text-sm font-medium cursor-pointer"
                      href="https://www.linkedin.com/in/mohammed-rehan-z/"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <LinkedinIcon className="w-4 h-4 text-[#0077b5]" />
                      <span>Connect on LinkedIn</span>
                    </a>
                  </div>
                </div>

                {/* Contact Card 3: Executive Resume */}
                <div
                  className="p-6 rounded-xl border border-white/[0.1] bg-gradient-to-b from-[#0e1424] to-[#0a0f1d] text-white flex flex-col justify-between shadow-2xl"
                  id="resume"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                        Curriculum Vitae
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-mono text-[11px] font-semibold">
                        UPDATED 2026
                      </span>
                    </div>
                    <h3 className="font-title-md text-title-md text-white font-semibold mb-1">
                      Executive Engineering Resume
                    </h3>
                    <p className="font-body-sm text-xs text-slate-300 leading-relaxed mb-4">
                      Includes comprehensive academic transcripts, benchmark results, production repository links, and references.
                    </p>
                    <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
                      <span className="material-symbols-outlined text-[15px] text-emerald-400" aria-hidden="true">
                        check_circle
                      </span>
                      <span>Mohammed_Rehan_Z-resume.pdf · 116 KB</span>
                    </div>
                  </div>
                  <div className="pt-6">
                    <a
                      className="w-full flex items-center justify-center gap-2 h-10 rounded-md bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all font-label-md text-sm font-bold cursor-pointer shadow-lg shadow-sky-500/20"
                      href="/Mohammed_Rehan_Z-resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined text-[17px]" aria-hidden="true">download</span>
                      <span>Download Formal Resume (PDF)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Immediate Availability Callout */}
              <div className="w-full p-5 rounded-lg bg-[#0e1424] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-emerald-500/10 flex items-center justify-center text-success-emerald">
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">bolt</span>
                  </div>
                  <div>
                    <span className="font-title-sm text-title-sm text-white block font-semibold">
                      Immediate Availability
                    </span>
                    <span className="font-body-sm text-xs text-text-slate">
                      Open to Internships, Technical Fellowships &amp; Freelance Web Contracts
                    </span>
                  </div>
                </div>
                <a
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-slate-950 hover:bg-slate-200 transition-colors font-label-md text-xs font-semibold shrink-0 cursor-pointer shadow-sm"
                  href={`mailto:mohammedrehanz517@gmail.com?subject=Opportunity%20Inquiry%20-%20Mohammed%20Rehan%20Z`}
                >
                  <span>Schedule Technical Discussion</span>
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">event</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-[#070b14] border-t border-white/[0.08] py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-white/[0.08]">
            <div className="space-y-3 max-w-md">
              <a
                href="#"
                onClick={(e) => scrollToSection(e, "overview")}
                className="flex items-center gap-2.5 cursor-pointer group hover:opacity-90 transition-opacity"
                aria-label="Back to top"
              >
                <div className="w-7 h-7 rounded-md bg-[#0e1424] text-cyan-400 flex items-center justify-center font-mono text-[12px] font-bold border border-white/[0.1] group-hover:scale-105 transition-transform">
                  &lt;/&gt;
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-title-sm text-white tracking-tight font-bold group-hover:text-cyan-400 transition-colors">
                    &lt;Mohammed Rehan.Z /&gt;
                  </span>
                  <span className="text-[11px] text-text-slate font-mono">
                    AI Engineering &amp; Innovation · Bengaluru, India
                  </span>
                </div>
              </a>
              <p className="font-body-sm text-xs text-text-slate leading-relaxed">
                Building innovative AI products, open-source software, and responsive web applications. Ready for impactful projects.
              </p>
              <p className="font-mono text-[11px] text-slate-700">
                Next.js • Tailwind CSS • WebAssembly • ONNX Runtime
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 font-mono text-xs">
              <div className="space-y-2.5">
                <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
                  Navigation
                </div>
                <ul className="space-y-1.5">
                  <li>
                    <a
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                      href="#"
                      onClick={(e) => scrollToSection(e, "overview")}
                    >
                      Overview
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                      href="#about"
                      onClick={(e) => scrollToSection(e, "about")}
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                      href="#case-studies"
                      onClick={(e) => scrollToSection(e, "case-studies")}
                    >
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                      href="#competencies"
                      onClick={(e) => scrollToSection(e, "competencies")}
                    >
                      Competencies
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                      href="#impact"
                      onClick={(e) => scrollToSection(e, "impact")}
                    >
                      Experience
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
                  Inquiries
                </div>
                <ul className="space-y-1.5">
                  <li>
                    <a
                      className="text-slate-400 hover:text-white transition-colors"
                      href="mailto:mohammedrehanz517@gmail.com"
                    >
                      Direct Email
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                      href="#contact"
                      onClick={(e) => scrollToSection(e, "contact")}
                    >
                      Schedule Call
                    </a>
                  </li>
                  <li>
                    <span className="text-text-slate">Bengaluru, IN</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5 col-span-2 sm:col-span-1">
                <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
                  Network
                </div>
                <ul className="space-y-1.5">
                  <li>
                    <a
                      className="text-slate-400 hover:text-white transition-colors"
                      href="https://github.com/mohammed-rehan-z"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-slate-400 hover:text-white transition-colors"
                      href="https://www.linkedin.com/in/mohammed-rehan-z/"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-slate-400 hover:text-white transition-colors"
                      href="https://www.npmjs.com/package/localresearcher"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      NPM Registry
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-slate">
            <p>© 2026 Mohammed Rehan Z. All rights reserved.</p>
            <a
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors font-medium cursor-pointer"
              href="#"
              onClick={(e) => scrollToSection(e, "overview")}
            >
              <span className="material-symbols-outlined text-[15px]" aria-hidden="true">arrow_upward</span>
              <span>Back to top</span>
            </a>
          </div>
        </div>
      </footer>

      {/* ── FLOATING BACK TO TOP BUTTON ── */}
      {showBackToTop && (
        <a
          href="#"
          onClick={(e) => scrollToSection(e, "overview")}
          aria-label="Scroll back to top"
          className="fixed bottom-6 left-6 z-40 p-2.5 rounded-full bg-[#0e1424] border border-white/[0.1] text-slate-300 hover:text-white hover:bg-white/[0.06] shadow-xl transition-all animate-fade-in flex items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_upward</span>
        </a>
      )}
    </div>
  );
}
