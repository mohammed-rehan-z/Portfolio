"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ProjectCategory = "all" | "ai" | "ml" | "cv";

interface ProjectItem {
  id: string;
  number: string;
  category: "ai" | "ml" | "cv";
  badge: string;
  version?: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  tags: string[];
  metrics: string;
  repoUrl: string;
  liveUrl?: string;
  npmUrl?: string;
  npmCommand?: string;
  architectureDetails: string[];
}

export default function Home() {
  // Theme state: dark / light
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Active navigation section
  const [activeNav, setActiveNav] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Project filtering & expanded details state
  const [selectedFilter, setSelectedFilter] = useState<ProjectCategory>("all");
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    "localresearcher": true, // Featured project expanded by default
    "fishing-detection": true,
    "facescan-attendance": true,
  });

  // Experience timeline scroll progress state
  const [timelineProgress, setTimelineProgress] = useState(0.35);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Sync theme with document on mount & restore from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light") {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      } else if (savedTheme === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
    } catch {
      // Ignore localStorage errors in restricted environments
    }
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        try { localStorage.setItem("theme", "dark"); } catch {}
        triggerToast("Switched to Dark Theme");
      } else {
        document.documentElement.classList.remove("dark");
        try { localStorage.setItem("theme", "light"); } catch {}
        triggerToast("Switched to Light Theme");
      }
      return next;
    });
  };

  // Scroll listener for experience timeline progress & active nav
  useEffect(() => {
    const handleScroll = () => {
      const timelineEl = document.getElementById("experience-timeline");
      if (timelineEl) {
        const rect = timelineEl.getBoundingClientRect();
        const viewportMid = window.innerHeight * 0.65;
        const raw = (viewportMid - rect.top) / rect.height;
        const progress = Math.max(0.15, Math.min(1, raw));
        setTimelineProgress(progress);
      }

      // ScrollSpy for active nav section
      const sections = ["home", "about", "projects", "experience", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      triggerToast(`Copied ${label}`);
    } else {
      triggerToast(`Copied: ${text}`);
    }
  };

  // Download resume helper
  const handleDownloadResume = () => {
    triggerToast("Downloading Mohammed_Rehan_Z_Resume.pdf...");
    const link = document.createElement("a");
    link.href = "/Mohammed_Rehan_Z-resume.pdf";
    link.download = "Mohammed_Rehan_Z_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Toggle project expansion
  const toggleProjectExpansion = (id: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Authentic 3 Core Projects
  const coreProjects: ProjectItem[] = [
    {
      id: "localresearcher",
      number: "01",
      category: "ai",
      badge: "FEATURED · PUBLIC OPEN-SOURCE · NPM",
      version: "v1.4.0 · MIT",
      title: "LocalResearcher",
      subtitle: "Deterministic In-Browser Academic RAG Engine",
      description:
        "A zero-hallucination academic intelligence platform engineered for deterministic synthesis of peer-reviewed research papers. Completely air-gapped and runs directly in-browser via WebAssembly & ONNX Runtime Web, performing local document chunking and vector indexing inside IndexedDB without recurring LLM API compute charges.",
      tags: ["TypeScript", "WebAssembly", "Transformers.js", "IndexedDB", "Next.js 14"],
      metrics: "0ms Server Latency · 100% Client-Side",
      liveUrl: "https://localresearcher.vercel.app/",
      npmUrl: "https://www.npmjs.com/package/localresearcher",
      npmCommand: "npm install localresearcher",
      repoUrl: "https://github.com/mohammed-rehan-z/LocalResearcher",
      architectureDetails: [
        "Local Vector Store: Pure browser-native IndexedDB embedding persistence with zero cloud database dependency.",
        "Deterministic Chunking: Semantic paragraph & markdown tokenization preventing context-window truncation.",
        "In-Browser WASM Inference: Runs quantized MiniLM-L6-v2 directly on CPU/GPU via WebAssembly.",
        "Air-Gapped Privacy: 100% local document analysis ensures zero data egress for confidential academic manuscripts.",
      ],
    },
    {
      id: "fishing-detection",
      number: "02",
      category: "ml",
      badge: "PRODUCTION ML · GEOSPATIAL TELEMETRY",
      title: "Fishing Detection System",
      subtitle: "Sequential AIS Vessel Telemetry Classification",
      description:
        "Predictive maritime surveillance architecture identifying illicit commercial trawling activity within marine protected sanctuaries. Ingests raw multi-dimensional AIS telemetry (SOG, COG, heading, drift variance) through sequential Bidirectional LSTM models and Random Forest classifiers.",
      tags: ["Python", "PyTorch", "Bidirectional LSTM", "Scikit-Learn", "GIS Telemetry", "Streamlit"],
      metrics: "94.8% Detection Precision · Real-Time AIS Stream",
      repoUrl: "https://github.com/mohammed-rehan-z/Fishing-detection-system-using-machine-learning-",
      architectureDetails: [
        "Sequential Bi-LSTM: Captures temporal kinematic variance, sharp turning maneuvers, and slow-trawling velocity patterns.",
        "Multi-Stage Feature Pipeline: Computes rate-of-turn, kinematic drift acceleration, and geofence boundary proximity in real time.",
        "Robust Geospatial Validation: Evaluated across 2.4M global maritime coordinate records with minimal false-alarm triggers.",
      ],
    },
    {
      id: "facescan-attendance",
      number: "03",
      category: "cv",
      badge: "EDGE COMPUTER VISION · BIOMETRICS",
      title: "FaceScan Attendance System",
      subtitle: "Anti-Spoofing Facial Recognition Pipeline",
      description:
        "Edge-deployed biometric attendance verification system designed for institutional access control. Combines Haar Cascade and Multi-Task Cascaded Convolutional Networks (MTCNN) with 128-dimensional facial embedding cosine distance matching, backed by liveness eye-blink detection.",
      tags: ["Python", "OpenCV", "Deep Learning", "NumPy", "Tkinter / GUI", "SQLite"],
      metrics: "< 350ms Verification Speed · Spoof-Resistant",
      repoUrl: "https://github.com/mohammed-rehan-z/facescan-attendance-system-using-machine-learning-and-python",
      architectureDetails: [
        "Passive & Active Liveness Defense: Blink-detection heuristics and micro-texture variance analysis block 2D photo spoofing.",
        "128-D Embedding Metric Learning: Computes high-precision Euclidean and cosine boundaries invariant to head yaw and lighting shifts.",
        "Zero Cloud Dependency: Lightweight local inference runs reliably on resource-constrained edge microcomputers.",
      ],
    },
  ];

  const filteredProjects =
    selectedFilter === "all"
      ? coreProjects
      : coreProjects.filter((p) => p.category === selectedFilter);

  // Framer Motion Animation Variants
  const heroContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const heroItemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_PREMIUM },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#0A0A0A] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950">
      {/* Editorial Minimal Masthead Header */}
      <header className="sticky top-0 z-40 bg-neutral-50/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 px-gutter-md md:px-page-margin">
        <div className="max-w-6xl mx-auto py-4 flex items-center justify-between gap-gutter-md">
          {/* Brand Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-gutter-xs font-headline text-title-lg text-neutral-900 dark:text-neutral-100 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white rounded-sm cursor-pointer"
          >
            <span className="italic tracking-tight font-medium">Rehan.Z</span>
            <span
              className="w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-neutral-100 inline-block group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:shadow-[0_0_8px_rgba(255,255,255,0.7)]"
              aria-hidden="true"
            ></span>
          </motion.a>

          {/* Primary Navigation Desktop */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-gutter-lg"
          >
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "projects", label: "Projects" },
              { id: "experience", label: "Experience" },
              { id: "contact", label: "Contact" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`font-label text-label-lg transition-colors duration-state-change ease-state-change hover:text-neutral-950 dark:hover:text-white ${
                  activeNav === link.id
                    ? "text-neutral-950 dark:text-white font-semibold underline underline-offset-4 decoration-2"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Center */}
          <div className="flex items-center gap-gutter-sm shrink-0">
            {/* Theme Toggle Button */}
            <motion.button
              type="button"
              onClick={toggleTheme}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-neutral-200/60 hover:bg-neutral-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-700/80 transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white cursor-pointer"
              title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                {isDarkMode ? "light_mode" : "dark_mode"}
              </span>
              <span className="font-label text-label-md font-medium">
                {isDarkMode ? "Light" : "Dark"}
              </span>
            </motion.button>

            {/* Social Links */}
            <a
              href="https://github.com/mohammed-rehan-z"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hidden sm:inline-flex items-center justify-center px-3 py-2 rounded-full font-label text-label-lg text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors duration-state-change"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/mohammed-rehan-z"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hidden sm:inline-flex items-center justify-center px-3 py-2 rounded-full font-label text-label-lg text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors duration-state-change"
            >
              LinkedIn
            </a>

            {/* Download Resume Button */}
            <motion.button
              type="button"
              onClick={handleDownloadResume}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-gutter-sm px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 font-label font-semibold transition-colors duration-state-change ease-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                download
              </span>
              <span className="font-label text-label-lg">Download Resume</span>
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-full text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white"
            >
              <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Framer Motion Transition */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: EASE_PREMIUM }}
              aria-label="Mobile Navigation"
              className="overflow-hidden lg:hidden py-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-3"
            >
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "projects", label: "Projects" },
                { id: "experience", label: "Experience" },
                { id: "contact", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-body-md font-label transition-colors ${
                    activeNav === link.id
                      ? "text-neutral-950 dark:text-white font-semibold bg-neutral-200/80 dark:bg-neutral-800/80"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 flex items-center justify-between px-3 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/mohammed-rehan-z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-label-lg font-label text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/mohammed-rehan-z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-label-lg font-label text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white"
                  >
                    LinkedIn
                  </a>
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-neutral-700 dark:text-neutral-300 bg-neutral-200/60 dark:bg-neutral-800/60 text-label-md font-label font-medium"
                >
                  <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                    {isDarkMode ? "light_mode" : "dark_mode"}
                  </span>
                  <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        {/* Centered Editorial Masthead Hero with Framer Motion Stagger */}
        <section
          id="home"
          className="max-w-6xl mx-auto px-gutter-md md:px-page-margin pt-section pb-section"
        >
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center gap-gutter-lg max-w-3xl mx-auto"
          >
            {/* Genuine Portrait Frame - Authentic Real Photograph with Framer Spring Physics */}
            <motion.div
              variants={heroItemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-72 h-72 rounded-full overflow-hidden border-4 border-neutral-300 dark:border-neutral-700 shadow-2xl ring-2 ring-black/10 dark:ring-white/10 relative group bg-neutral-200 dark:bg-neutral-800 cursor-pointer"
            >
              <Image
                src="/images/mohammed_real_portrait.jpg"
                alt="Portrait of Mohammed Rehan.Z"
                fill
                sizes="(max-width: 768px) 288px, 288px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                priority
              />
            </motion.div>

            {/* Role Capsule Badge */}
            <motion.div
              variants={heroItemVariants}
              className="inline-flex items-center gap-gutter-sm px-4 py-1.5 rounded-full bg-neutral-200/80 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 shadow-sm"
            >
              <span
                className="material-symbols-outlined text-body-md text-neutral-900 dark:text-neutral-100"
                aria-hidden="true"
              >
                terminal
              </span>
              <span className="font-label text-label-md text-neutral-800 dark:text-neutral-200 tracking-wide font-medium">
                AI Systems &amp; Full-Stack Web Engineer
              </span>
            </motion.div>

            {/* Masthead Headline with High-Contrast Editorial Typography */}
            <motion.h1
              variants={heroItemVariants}
              className="font-display text-display-lg-mobile lg:text-display-lg text-neutral-950 dark:text-white text-balance"
            >
              <em className="italic text-neutral-950 dark:text-white font-normal drop-shadow-[0_1px_12px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_1px_12px_rgba(255,255,255,0.2)]">
                Mohammed Rehan.Z
              </em>
            </motion.h1>

            {/* Mission Statement */}
            <motion.div variants={heroItemVariants} className="flex flex-col gap-gutter-xs items-center">
              <p className="font-label text-label-lg uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold">
                I’m focused on
              </p>
              <p className="font-headline text-headline-md text-neutral-900 dark:text-neutral-100 text-balance max-w-2xl">
                Building impactful, innovative AI projects and real-world web solutions.
              </p>
            </motion.div>

            {/* Hero Action CTAs */}
            <motion.div
              variants={heroItemVariants}
              className="flex flex-wrap items-center justify-center gap-gutter-md pt-gutter-xs"
            >
              <motion.a
                href="#projects"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-gutter-sm px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 font-label font-semibold transition-colors duration-state-change ease-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white shadow-md cursor-pointer"
              >
                <span className="font-label text-label-lg">Explore Projects</span>
                <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                  arrow_downward
                </span>
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-gutter-sm px-6 py-3 rounded-full bg-neutral-200/80 hover:bg-neutral-300/80 text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white border border-neutral-300 dark:border-neutral-700 font-label font-medium transition-colors duration-state-change ease-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white cursor-pointer"
              >
                <span className="font-label text-label-lg">Get in Touch</span>
              </motion.a>
            </motion.div>

            {/* Status Footer Meta */}
            <motion.div
              variants={heroItemVariants}
              className="inline-flex items-center gap-gutter-md pt-gutter-sm"
            >
              <span className="font-mono text-mono-sm text-neutral-600 dark:text-neutral-400 tracking-wider">
                BENGALURU, IN
              </span>
              <span
                className="font-mono text-mono-sm text-neutral-400 dark:text-neutral-600"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="font-mono text-mono-sm text-neutral-900 dark:text-neutral-100 font-semibold tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                AVAILABLE FOR ROLES
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* About / Highlights 2x2 Bento with Viewport Scroll Triggers */}
        <section
          id="about"
          className="max-w-6xl mx-auto px-gutter-md md:px-page-margin pb-section"
        >
          <div className="flex flex-col gap-gutter-lg">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-gutter-md"
            >
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg text-neutral-900 dark:text-neutral-100">
                Highlights &amp; Credentials
              </h2>
              <p className="font-body text-body-md text-neutral-600 dark:text-neutral-400 max-w-md">
                From 1st-place hackathon engineering to open-source npm tooling and cloud AI certifications.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-lg items-stretch">
              {/* Highlight Card 1 */}
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full flex flex-col justify-between gap-gutter-md p-gutter-xl rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors"
              >
                <header className="flex flex-col gap-gutter-xs">
                  <div className="flex items-center justify-between gap-gutter-sm">
                    <span className="font-label text-label-md uppercase tracking-wider text-neutral-900 dark:text-neutral-100 font-semibold">
                      1st Prize
                    </span>
                    <span
                      className="material-symbols-outlined text-title-md text-neutral-900 dark:text-neutral-100"
                      aria-hidden="true"
                    >
                      emoji_events
                    </span>
                  </div>
                  <h3 className="font-headline text-title-lg text-neutral-900 dark:text-neutral-100">
                    Project Expo Winner
                  </h3>
                </header>
                <p className="font-body text-body-sm text-neutral-700 dark:text-neutral-300 text-pretty leading-relaxed">
                  Won 1st prize at TECHKUBIK Project Expo for engineering excellence, system architecture, and practical project innovation.
                </p>
              </motion.article>

              {/* Highlight Card 2 */}
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.12 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full flex flex-col justify-between gap-gutter-md p-gutter-xl rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors"
              >
                <header className="flex flex-col gap-gutter-xs">
                  <div className="flex items-center justify-between gap-gutter-sm">
                    <span className="font-mono text-mono-sm text-neutral-900 dark:text-neutral-100 font-semibold">
                      NPM PACKAGE
                    </span>
                    <span
                      className="material-symbols-outlined text-title-md text-neutral-900 dark:text-neutral-100"
                      aria-hidden="true"
                    >
                      deployed_code
                    </span>
                  </div>
                  <h3 className="font-headline text-title-lg text-neutral-900 dark:text-neutral-100">
                    LocalResearcher
                  </h3>
                </header>
                <div className="flex flex-col gap-gutter-sm">
                  <p className="font-body text-body-sm text-neutral-700 dark:text-neutral-300 text-pretty leading-relaxed">
                    100% In-Browser RAG Engine running client-side retrieval with zero external API keys and local IndexedDB vector storage.
                  </p>
                  <motion.button
                    type="button"
                    onClick={() => handleCopy("npm i localresearcher", "npm command")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="font-mono text-mono-sm px-3 py-1.5 rounded-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 self-start hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center gap-2 cursor-pointer transition-colors border border-neutral-300 dark:border-neutral-700"
                    title="Click to copy"
                  >
                    <span>npm i localresearcher</span>
                    <span className="material-symbols-outlined text-body-sm" aria-hidden="true">
                      content_copy
                    </span>
                  </motion.button>
                </div>
              </motion.article>

              {/* Highlight Card 3 */}
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.18 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full flex flex-col justify-between gap-gutter-md p-gutter-xl rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors"
              >
                <header className="flex flex-col gap-gutter-xs">
                  <div className="flex items-center justify-between gap-gutter-sm">
                    <span className="font-label text-label-md uppercase tracking-wider text-neutral-900 dark:text-neutral-100 font-semibold">
                      CORE PROJECTS
                    </span>
                    <span
                      className="material-symbols-outlined text-title-md text-neutral-900 dark:text-neutral-100"
                      aria-hidden="true"
                    >
                      rocket_launch
                    </span>
                  </div>
                  <h3 className="font-headline text-title-lg text-neutral-900 dark:text-neutral-100 tabular-nums">
                    3 Production Projects
                  </h3>
                </header>
                <p className="font-body text-body-sm text-neutral-700 dark:text-neutral-300 text-pretty leading-relaxed">
                  Local In-Browser WASM RAG, Sequential AIS Maritime Telemetry Pipeline, and Edge Computer Vision Biometrics.
                </p>
              </motion.article>

              {/* Highlight Card 4 */}
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.24 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="h-full flex flex-col justify-between gap-gutter-md p-gutter-xl rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors"
              >
                <header className="flex flex-col gap-gutter-xs">
                  <div className="flex items-center justify-between gap-gutter-sm">
                    <span className="font-label text-label-md uppercase tracking-wider text-neutral-900 dark:text-neutral-100 font-semibold">
                      CREDENTIALS
                    </span>
                    <span
                      className="material-symbols-outlined text-title-md text-neutral-900 dark:text-neutral-100"
                      aria-hidden="true"
                    >
                      verified
                    </span>
                  </div>
                  <h3 className="font-headline text-title-lg text-neutral-900 dark:text-neutral-100 tabular-nums">
                    6+ Verified Credentials
                  </h3>
                </header>
                <p className="font-body text-body-sm text-neutral-700 dark:text-neutral-300 text-pretty leading-relaxed">
                  Anthropic Claude Generative AI, Microsoft Copilot Studio, Google Cloud ML &amp; IBM SkillBuild AI Engineering.
                </p>
              </motion.article>
            </div>
          </div>
        </section>

        {/* Selected Projects Section with AnimatePresence Filter Transitions */}
        <section
          id="projects"
          className="max-w-6xl mx-auto px-gutter-md md:px-page-margin pb-section"
        >
          <div className="flex flex-col gap-gutter-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-gutter-md">
              <div>
                <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg text-neutral-900 dark:text-neutral-100">
                  Selected Projects
                </h2>
                <p className="font-body text-body-md text-neutral-600 dark:text-neutral-400 mt-1">
                  Engineered systems across in-browser WASM inference, sequential telemetry networks, and edge computer vision.
                </p>
              </div>

              {/* Category Filter Chips with Smooth Spring Transitions */}
              <div
                className="flex flex-wrap items-center gap-gutter-sm"
                role="group"
                aria-label="Filter projects by category"
              >
                {[
                  { id: "all", label: `All Projects (${coreProjects.length})` },
                  { id: "ai", label: "AI & RAG" },
                  { id: "ml", label: "ML & Telemetry" },
                  { id: "cv", label: "Computer Vision" },
                ].map((chip) => {
                  const isActive = selectedFilter === chip.id;
                  return (
                    <motion.button
                      key={chip.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedFilter(chip.id as ProjectCategory)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      layout
                      className={`inline-flex items-center px-4 py-1.5 rounded-full font-label text-label-md transition-colors duration-state-change cursor-pointer ${
                        isActive
                          ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-sm"
                          : "bg-neutral-200/80 hover:bg-neutral-300/80 text-neutral-800 border border-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:border-neutral-700"
                      }`}
                    >
                      {chip.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Featured Hero Project Spotlight: LocalResearcher */}
            <AnimatePresence mode="popLayout">
              {(selectedFilter === "all" || selectedFilter === "ai") && (
                <motion.article
                  key="localresearcher"
                  layout
                  initial={{ opacity: 0, scale: 0.98, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-gutter-xl flex flex-col lg:flex-row items-stretch justify-between gap-gutter-xl shadow-md"
                >
                  <div className="flex-1 flex flex-col justify-between gap-gutter-md">
                    <div className="flex flex-col gap-gutter-sm">
                      <div className="flex flex-wrap items-center gap-gutter-sm">
                        <span className="font-mono text-mono-sm px-3 py-1 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold">
                          FEATURED · PUBLIC OPEN-SOURCE · NPM
                        </span>
                        <span className="font-mono text-mono-sm text-neutral-600 dark:text-neutral-400">
                          v1.4.0 · MIT
                        </span>
                      </div>

                      <h3 className="font-headline text-display-md-mobile lg:text-display-md text-neutral-900 dark:text-neutral-100">
                        LocalResearcher
                      </h3>

                      <p className="font-label text-title-md text-neutral-800 dark:text-neutral-200 font-medium">
                        Deterministic In-Browser Academic RAG Engine
                      </p>

                      <p className="font-body text-body-lg text-neutral-700 dark:text-neutral-300 text-pretty leading-relaxed">
                        A zero-hallucination academic intelligence platform engineered for deterministic synthesis of peer-reviewed research papers. Completely air-gapped and runs directly in-browser via WebAssembly &amp; ONNX Runtime Web, performing local document chunking and vector indexing inside IndexedDB without recurring LLM API compute charges.
                      </p>
                    </div>

                    <div className="flex flex-col gap-gutter-md pt-2">
                      <div className="flex flex-wrap items-center gap-gutter-sm">
                        {coreProjects[0].tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-mono-sm px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-gutter-md pt-1">
                        <motion.button
                          type="button"
                          onClick={() => handleCopy("npm install localresearcher", "npm command")}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-gutter-sm px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 font-label text-label-lg font-semibold transition-colors duration-state-change cursor-pointer shadow-sm"
                        >
                          <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                            content_copy
                          </span>
                          <span>Copy Install Command</span>
                        </motion.button>

                        {coreProjects[0].liveUrl && (
                          <motion.a
                            href={coreProjects[0].liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-gutter-xs px-4 py-2.5 rounded-full bg-neutral-200/80 hover:bg-neutral-300/80 text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white border border-neutral-300 dark:border-neutral-700 font-label text-label-lg transition-colors cursor-pointer"
                          >
                            <span>Live Demo</span>
                            <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                              open_in_new
                            </span>
                          </motion.a>
                        )}

                        <a
                          href={coreProjects[0].repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-gutter-xs font-label text-label-lg text-neutral-900 dark:text-neutral-100 hover:underline font-medium"
                        >
                          <span>GitHub Repository</span>
                          <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                            arrow_outward
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Code Preview & Architecture Details */}
                  <div className="lg:w-[460px] flex flex-col justify-between gap-gutter-md">
                    <div className="rounded-lg bg-neutral-950 text-neutral-200 border border-neutral-800 p-gutter-md flex flex-col gap-gutter-sm shadow-inner">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-gutter-xs">
                        <span className="font-mono text-mono-sm text-neutral-400">
                          rag-pipeline.ts
                        </span>
                        <span className="font-mono text-mono-sm text-neutral-100 font-semibold">
                          0ms Server Latency
                        </span>
                      </div>
                      <pre className="font-mono text-mono-sm text-neutral-300 overflow-x-auto leading-relaxed py-1">
                        <code>{`import { LocalResearcher } from 'localresearcher';

// 100% In-Browser RAG Engine
const engine = await LocalResearcher.init({
  storage: 'indexeddb',
  chunkSize: 512,
  topK: 4,
  model: 'Xenova/all-MiniLM-L6-v2'
});

// Deterministic query with zero API costs
const answer = await engine.query(prompt);`}</code>
                      </pre>
                    </div>

                    {/* Architecture Specs */}
                    <div className="p-gutter-md rounded-lg bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700">
                      <span className="font-mono text-mono-sm text-neutral-900 dark:text-neutral-100 uppercase tracking-wider font-semibold block mb-2">
                        Key Architecture Highlights
                      </span>
                      <ul className="flex flex-col gap-1.5 font-body text-body-sm text-neutral-700 dark:text-neutral-300">
                        {coreProjects[0].architectureDetails.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-neutral-900 dark:text-neutral-100 shrink-0 mt-0.5">▪</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>

            {/* Remaining Core Projects with AnimatePresence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-lg items-stretch">
              <AnimatePresence mode="popLayout">
                {filteredProjects
                  .filter((p) => p.id !== "localresearcher" || (selectedFilter !== "all" && selectedFilter !== "ai"))
                  .map((project) => {
                    const isExpanded = !!expandedProjects[project.id];
                    return (
                      <motion.article
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.98, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -10 }}
                        transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        className="flex flex-col justify-between gap-gutter-md p-gutter-xl rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-colors duration-state-change hover:border-neutral-900 dark:hover:border-neutral-100 shadow-sm"
                      >
                        <header className="flex flex-col gap-gutter-xs">
                          <div className="flex items-center justify-between gap-gutter-sm">
                            <span className="font-mono text-mono-sm text-neutral-900 dark:text-neutral-100 font-semibold">
                              {project.badge}
                            </span>
                            <span className="font-mono text-mono-sm text-neutral-500 dark:text-neutral-400">
                              #{project.number}
                            </span>
                          </div>

                          <div className="flex items-baseline justify-between gap-2 mt-1">
                            <h3 className="font-headline text-title-lg text-neutral-900 dark:text-neutral-100">
                              {project.title}
                            </h3>
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${project.title} on GitHub`}
                              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors p-1"
                            >
                              <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                                arrow_outward
                              </span>
                            </a>
                          </div>

                          <p className="font-label text-label-md text-neutral-800 dark:text-neutral-200 font-medium">
                            {project.subtitle}
                          </p>
                        </header>

                        <p className="font-body text-body-sm text-neutral-700 dark:text-neutral-300 text-pretty leading-relaxed">
                          {project.description}
                        </p>

                        {/* Metric Banner */}
                        <div className="px-3 py-1.5 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                          <span className="font-mono text-mono-sm text-neutral-900 dark:text-neutral-100 font-medium">
                            {project.metrics}
                          </span>
                        </div>

                        {/* Expandable Architecture Details with Framer Motion Height Transition */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.28, ease: "easeInOut" }}
                              className="overflow-hidden pt-2 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-1.5"
                            >
                              <span className="font-mono text-mono-sm text-neutral-600 dark:text-neutral-400 uppercase font-semibold">
                                Implementation Specs:
                              </span>
                              <ul className="flex flex-col gap-1 font-body text-body-sm text-neutral-700 dark:text-neutral-300">
                                {project.architectureDetails.map((detail, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-neutral-900 dark:text-neutral-100 shrink-0 mt-0.5">▪</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <footer className="flex flex-col gap-gutter-sm pt-gutter-sm border-t border-neutral-200 dark:border-neutral-800">
                          <div className="flex flex-wrap items-center gap-gutter-xs">
                            {project.tags.map((tag, idx) => (
                              <React.Fragment key={tag}>
                                <span className="font-mono text-mono-sm text-neutral-600 dark:text-neutral-400">
                                  {tag}
                                </span>
                                {idx < project.tags.length - 1 && (
                                  <span
                                    className="font-mono text-mono-sm text-neutral-400 dark:text-neutral-600"
                                    aria-hidden="true"
                                  >
                                    ·
                                  </span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <button
                              type="button"
                              onClick={() => toggleProjectExpansion(project.id)}
                              className="font-label text-label-md text-neutral-900 dark:text-neutral-100 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>{isExpanded ? "Hide Architecture" : "View Architecture"}</span>
                              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                                {isExpanded ? "expand_less" : "expand_more"}
                              </span>
                            </button>

                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-label text-label-md text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1"
                            >
                              <span>Source Code</span>
                              <span className="material-symbols-outlined text-body-sm" aria-hidden="true">
                                code
                              </span>
                            </a>
                          </div>
                        </footer>
                      </motion.article>
                    );
                  })}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Experience: 2-Column Sticky Header + Scroll Timeline */}
        <section
          id="experience"
          className="max-w-6xl mx-auto px-gutter-md md:px-page-margin pb-section"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-xl items-start">
            {/* Left Column Overview */}
            <div className="lg:col-span-4 flex flex-col gap-gutter-sm lg:sticky lg:top-28">
              <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg text-neutral-900 dark:text-neutral-100">
                Experience
              </h2>
              <span className="font-mono text-mono-sm text-neutral-500 dark:text-neutral-400 tabular-nums">
                3 INTERNSHIPS &amp; APPLIED ROLES
              </span>

              {/* Education Card with Framer Hover */}
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="mt-4 p-gutter-md rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-1.5 shadow-sm"
              >
                <span className="font-label text-label-md uppercase tracking-wider text-neutral-900 dark:text-neutral-100 font-semibold">
                  Education &amp; Academic Honors
                </span>
                <p className="font-headline text-body-md font-medium text-neutral-900 dark:text-neutral-100">
                  HKBK College of Engineering, Bengaluru
                </p>
                <p className="font-body text-body-sm text-neutral-700 dark:text-neutral-300">
                  B.Tech in Artificial Intelligence &amp; Machine Learning
                </p>
                <div className="inline-flex items-center gap-2 pt-1">
                  <span className="font-mono text-mono-sm px-2.5 py-0.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold">
                    7.3 CGPA
                  </span>
                  <span className="font-mono text-mono-sm text-neutral-600 dark:text-neutral-400">
                    2022 — 2026
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column Progressive Timeline with Viewport Scroll Triggers */}
            <div
              id="experience-timeline"
              className="lg:col-span-8 relative pl-gutter-xl md:pl-12 flex flex-col gap-gutter-xl"
            >
              {/* Background Guide Line */}
              <div
                className="absolute top-2 bottom-2 left-1.5 w-px bg-neutral-200 dark:border-neutral-800"
                aria-hidden="true"
              ></div>

              {/* Dynamic Scroll Progress Line */}
              <div
                id="experience-progress-line"
                className="absolute top-2 bottom-2 left-1.5 w-px bg-neutral-900 dark:bg-white origin-top transition-transform duration-150 ease-out"
                style={{ transform: `scaleY(${timelineProgress})` }}
                aria-hidden="true"
              ></div>

              {/* Role 1 */}
              <motion.article
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                className="experience-item relative flex flex-col gap-gutter-sm"
              >
                <span
                  className={`experience-dot absolute -left-gutter-xl md:-left-12 top-1.5 w-3 h-3 rounded-full ring-4 ring-neutral-50 dark:ring-[#0A0A0A] transition-colors duration-state-change ${
                    timelineProgress >= 0.1
                      ? "bg-neutral-900 dark:bg-white"
                      : "bg-neutral-300 dark:bg-neutral-700 border border-neutral-900 dark:border-white"
                  }`}
                  aria-hidden="true"
                ></span>
                <div className="flex flex-wrap items-baseline justify-between gap-gutter-sm">
                  <h3 className="font-headline text-title-lg text-neutral-900 dark:text-neutral-100">
                    AI Engineering Intern
                  </h3>
                  <span className="font-mono text-mono-sm text-neutral-900 dark:text-neutral-100 tabular-nums font-semibold">
                    2025 — PRESENT
                  </span>
                </div>
                <p className="font-label text-label-lg text-neutral-800 dark:text-neutral-200 font-medium">
                  Generative AI &amp; RAG Systems
                </p>
                <p className="font-body text-body-md text-neutral-700 dark:text-neutral-300 max-w-prose text-pretty leading-relaxed">
                  Architected client-side document chunking and retrieval workflows, cutting inference latency and eliminating external vector DB hosting overhead.
                </p>
                <div className="flex flex-wrap gap-gutter-xs pt-gutter-xs">
                  <span className="font-mono text-mono-sm text-neutral-600 dark:text-neutral-400">
                    RAG
                  </span>
                  <span className="font-mono text-mono-sm text-neutral-400 dark:text-neutral-600">
                    ·
                  </span>
                  <span className="font-mono text-mono-sm text-neutral-600 dark:text-neutral-400">
                    TypeScript
                  </span>
                </div>
              </motion.article>

              {/* Role 2 */}
              <motion.article
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                className="experience-item relative flex flex-col gap-gutter-sm"
              >
                <span
                  className={`experience-dot absolute -left-gutter-xl md:-left-12 top-1.5 w-3 h-3 rounded-full ring-4 ring-neutral-50 dark:ring-[#0A0A0A] transition-colors duration-state-change ${
                    timelineProgress >= 0.45
                      ? "bg-neutral-900 dark:bg-white"
                      : "bg-neutral-300 dark:bg-neutral-700 border border-neutral-900 dark:border-white"
                  }`}
                  aria-hidden="true"
                ></span>
                <div className="flex flex-wrap items-baseline justify-between gap-gutter-sm">
                  <h3 className="font-headline text-title-lg text-neutral-900 dark:text-neutral-100">
                    Full-Stack Web Intern
                  </h3>
                  <span className="font-mono text-mono-sm text-neutral-900 dark:text-neutral-100 tabular-nums font-semibold">
                    2024 — 2025
                  </span>
                </div>
                <p className="font-label text-label-lg text-neutral-800 dark:text-neutral-200 font-medium">
                  Web Platforms &amp; APIs
                </p>
                <p className="font-body text-body-md text-neutral-700 dark:text-neutral-300 max-w-prose text-pretty leading-relaxed">
                  Shipped responsive React dashboards and RESTful Node.js microservices with automated schema validation and role-based access control.
                </p>
                <div className="flex flex-wrap gap-gutter-xs pt-gutter-xs">
                  <span className="font-mono text-mono-sm text-neutral-600 dark:text-neutral-400">
                    React
                  </span>
                  <span className="font-mono text-mono-sm text-neutral-400 dark:text-neutral-600">
                    ·
                  </span>
                  <span className="font-mono text-mono-sm text-neutral-600 dark:text-neutral-400">
                    Node.js
                  </span>
                </div>
              </motion.article>

              {/* Role 3 */}
              <motion.article
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                className="experience-item relative flex flex-col gap-gutter-sm"
              >
                <span
                  className={`experience-dot absolute -left-gutter-xl md:-left-12 top-1.5 w-3 h-3 rounded-full ring-4 ring-neutral-50 dark:ring-[#0A0A0A] transition-colors duration-state-change ${
                    timelineProgress >= 0.8
                      ? "bg-neutral-900 dark:bg-white"
                      : "bg-neutral-300 dark:bg-neutral-700 border border-neutral-900 dark:border-white"
                  }`}
                  aria-hidden="true"
                ></span>
                <div className="flex flex-wrap items-baseline justify-between gap-gutter-sm">
                  <h3 className="font-headline text-title-lg text-neutral-900 dark:text-neutral-100">
                    ML Research Intern
                  </h3>
                  <span className="font-mono text-mono-sm text-neutral-900 dark:text-neutral-100 tabular-nums font-semibold">
                    2024
                  </span>
                </div>
                <p className="font-label text-label-lg text-neutral-800 dark:text-neutral-200 font-medium">
                  Telemetry &amp; Forecasting
                </p>
                <p className="font-body text-body-md text-neutral-700 dark:text-neutral-300 max-w-prose text-pretty leading-relaxed">
                  Trained and evaluated telemetry prediction models on multivariate sensor streams, improving early anomaly recall by 18%.
                </p>
                <div className="flex flex-wrap gap-gutter-xs pt-gutter-xs">
                  <span className="font-mono text-mono-sm text-neutral-600 dark:text-neutral-400">
                    Python
                  </span>
                  <span className="font-mono text-mono-sm text-neutral-400 dark:text-neutral-600">
                    ·
                  </span>
                  <span className="font-mono text-mono-sm text-neutral-600 dark:text-neutral-400">
                    Google Cloud ML
                  </span>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        {/* Dedicated Clean Editorial Contact Section */}
        <section
          id="contact"
          className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/40 py-section"
        >
          <div className="max-w-6xl mx-auto px-gutter-md md:px-page-margin flex flex-col gap-gutter-xl">
            {/* Contact Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-gutter-md"
            >
              <div className="flex flex-col gap-gutter-sm max-w-2xl">
                <span className="font-mono text-mono-sm text-neutral-900 dark:text-neutral-100 uppercase tracking-wider font-semibold">
                  Get In Touch · Let’s Collaborate
                </span>
                <h2 className="font-headline text-headline-lg-mobile lg:text-headline-lg text-neutral-900 dark:text-neutral-100">
                  Let’s build something{" "}
                  <em className="italic text-neutral-950 dark:text-white font-normal drop-shadow-[0_1px_12px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_1px_12px_rgba(255,255,255,0.2)]">
                    impactful
                  </em>
                  .
                </h2>
                <p className="font-body text-body-lg text-neutral-700 dark:text-neutral-300">
                  Open to AI engineering roles, full-stack web platforms, and open-source collaborations. Reach out directly below.
                </p>
              </div>

              <div className="flex items-center gap-gutter-sm shrink-0">
                <motion.a
                  href="#home"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-gutter-sm px-5 py-2.5 rounded-full bg-neutral-200/80 hover:bg-neutral-300/80 text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white border border-neutral-300 dark:border-neutral-700 font-label text-label-lg transition-colors duration-state-change cursor-pointer"
                >
                  <span>Back to Top</span>
                  <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                    arrow_upward
                  </span>
                </motion.a>
              </div>
            </motion.div>

            {/* Direct Contact Bento Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Card 1: Primary Direct Email Hub (Spans 7 cols on desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.05 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between gap-6 shadow-sm"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
                      Primary Channel
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-mono-sm font-mono font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Available · Response &lt; 24h</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-headline text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-100 font-medium">
                      Start a Conversation
                    </h3>
                    <p className="font-body text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mt-2">
                      Actively interviewing for full-time AI Systems Engineering, Machine Learning, and Full-Stack Platform roles. Whether you have an open position, an ambitious project, or an engineering inquiry, reach out directly.
                    </p>
                  </div>

                  {/* Interactive Email Showcase Box */}
                  <div className="mt-2 p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-neutral-900 dark:text-neutral-100 text-title-md" aria-hidden="true">
                          mail
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                          Direct Email
                        </p>
                        <p className="font-mono text-sm sm:text-base font-semibold text-neutral-950 dark:text-white break-all">
                          mohammedrehanz517@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <motion.button
                        type="button"
                        onClick={() => handleCopy("mohammedrehanz517@gmail.com", "primary email")}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 font-label text-sm font-semibold transition-colors cursor-pointer shadow-sm"
                      >
                        <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                          content_copy
                        </span>
                        <span>Copy</span>
                      </motion.button>
                      <motion.a
                        href="mailto:mohammedrehanz517@gmail.com"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 font-label text-sm font-medium transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                          send
                        </span>
                        <span>Email</span>
                      </motion.a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                  <span>Timezone: IST (UTC +5:30) · Bengaluru, India</span>
                  <span>Direct Communication Guaranteed</span>
                </div>
              </motion.div>

              {/* Right Column: Codebases & Career (Spans 5 cols on desktop) */}
              <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
                {/* Card 2: Professional Profiles & Codebases */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.12 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-6 sm:p-7 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
                      Profiles &amp; Codebases
                    </span>
                    <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
                      PUBLIC PROFILES
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <a
                      href="https://github.com/mohammed-rehan-z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-title-md text-neutral-900 dark:text-neutral-100" aria-hidden="true">
                          code
                        </span>
                        <div>
                          <p className="font-headline text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            GitHub Profile
                          </p>
                          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                            github.com/mohammed-rehan-z
                          </p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-body-md text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" aria-hidden="true">
                        arrow_outward
                      </span>
                    </a>

                    <a
                      href="https://linkedin.com/in/mohammed-rehan-z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-title-md text-neutral-900 dark:text-neutral-100" aria-hidden="true">
                          work
                        </span>
                        <div>
                          <p className="font-headline text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            LinkedIn Profile
                          </p>
                          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                            linkedin.com/in/mohammed-rehan-z
                          </p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-body-md text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" aria-hidden="true">
                        arrow_outward
                      </span>
                    </a>
                  </div>
                </motion.div>

                {/* Card 3: Location, Availability & Resume */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.18 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-6 sm:p-7 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
                      Location &amp; Career
                    </span>
                    <span className="font-mono text-xs text-neutral-900 dark:text-neutral-100 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Open to Work</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="font-headline text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      Bengaluru, Karnataka, India
                    </h4>
                    <p className="font-body text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      Available for immediate full-time engineering roles, remote engineering teams, and global relocation.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2 border-t border-neutral-200 dark:border-neutral-800">
                    <motion.button
                      type="button"
                      onClick={handleDownloadResume}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 font-label text-sm font-semibold transition-colors cursor-pointer shadow-sm"
                    >
                      <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                        download
                      </span>
                      <span>Download Resume (PDF)</span>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Sub-footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0A0A0A] py-6">
        <div className="max-w-6xl mx-auto px-gutter-md md:px-page-margin flex flex-col sm:flex-row items-center justify-between gap-4 text-mono-sm font-mono text-neutral-600 dark:text-neutral-400">
          <p>© 2026 Mohammed Rehan.Z</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mohammed-rehan-z"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href="https://linkedin.com/in/mohammed-rehan-z"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            <button
              type="button"
              onClick={handleDownloadResume}
              className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              Resume PDF
            </button>
          </div>
        </div>
      </footer>

      {/* Toast Notification Pill with Framer Motion Spring */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-gutter-lg right-gutter-lg z-50 px-5 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-label text-label-lg border border-neutral-700 dark:border-neutral-300 shadow-2xl"
          >
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
