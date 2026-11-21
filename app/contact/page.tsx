"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ContactPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light") {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      } else {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    } catch {}
  }, []);

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

  const handleCopy = (text: string, label: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      triggerToast(`Copied ${label}`);
    } else {
      triggerToast(`Copied: ${text}`);
    }
  };

  const handleDownloadResume = () => {
    triggerToast("Downloading Mohammed_Rehan_Z_Resume.pdf...");
    const link = document.createElement("a");
    link.href = "/Mohammed_Rehan_Z-resume.pdf";
    link.download = "Mohammed_Rehan_Z_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-[#0A0A0A] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-neutral-50/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 px-gutter-md md:px-page-margin">
        <div className="max-w-6xl mx-auto py-4 flex items-center justify-between gap-gutter-md">
          <Link
            href="/"
            className="inline-flex items-center gap-gutter-xs font-headline text-title-lg text-neutral-900 dark:text-neutral-100 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white rounded-sm"
          >
            <span className="italic tracking-tight font-medium">Rehan.Z</span>
            <span
              className="w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-neutral-100 inline-block group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:shadow-[0_0_8px_rgba(255,255,255,0.7)]"
              aria-hidden="true"
            ></span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="font-label text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                arrow_back
              </span>
              <span>Back to Portfolio</span>
            </Link>

            <motion.button
              type="button"
              onClick={toggleTheme}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-neutral-200/60 hover:bg-neutral-200 dark:bg-neutral-800/60 dark:hover:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-700/80 transition-colors cursor-pointer text-sm font-label font-medium"
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                {isDarkMode ? "light_mode" : "dark_mode"}
              </span>
              <span>{isDarkMode ? "Light" : "Dark"}</span>
            </motion.button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-gutter-md md:px-page-margin py-12 md:py-20 flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="flex flex-col gap-4 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-neutral-200/80 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 font-mono text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open to Engineering Roles · Bengaluru &amp; Remote</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-neutral-950 dark:text-white leading-tight">
            Let’s build something{" "}
            <em className="italic font-normal">impactful</em>.
          </h1>

          <p className="font-body text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl">
            I am actively interviewing for AI Systems Engineering, Machine Learning, and Full-Stack Platform roles. Reach out directly through any of the channels below.
          </p>
        </motion.div>

        {/* Contact Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Direct Email Hub */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between gap-6 shadow-sm"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
                  Primary Direct Channel
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-mono-sm font-mono font-medium">
                  Guaranteed Fast Reply
                </span>
              </div>

              <div>
                <h2 className="font-headline text-2xl sm:text-3xl text-neutral-900 dark:text-neutral-100 font-medium">
                  Direct Inquiries &amp; Hiring
                </h2>
                <p className="font-body text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mt-2">
                  Best route for recruiters, technical leads, and founders discussing full-time opportunities, system design contracts, or open-source AI collaborations.
                </p>
              </div>

              {/* Email Capsule */}
              <div className="mt-4 p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-neutral-900 dark:text-neutral-100 text-title-md" aria-hidden="true">
                      mail
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Email Address
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
              <span>Timezone: IST (UTC+5:30) · Bengaluru, India</span>
              <span>Available for Global Remote Collaboration</span>
            </div>
          </motion.div>

          {/* Right Column Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Profiles */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: EASE_PREMIUM }}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-4 shadow-sm"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
                Profiles &amp; Repositories
              </span>

              <div className="flex flex-col gap-3">
                <a
                  href="https://github.com/mohammed-rehan-z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between transition-colors group"
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
                  className="p-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between transition-colors group"
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

            {/* Resume & Career */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: EASE_PREMIUM }}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
                  Location &amp; Career
                </span>
                <span className="font-mono text-xs text-neutral-900 dark:text-neutral-100 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Available</span>
                </span>
              </div>

              <div>
                <h3 className="font-headline text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Bengaluru, Karnataka, India
                </h3>
                <p className="font-body text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Open for immediate roles, global relocation, and distributed remote teams.
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <motion.button
                  type="button"
                  onClick={handleDownloadResume}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 font-label text-sm font-semibold transition-colors cursor-pointer shadow-sm"
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
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0A0A0A] py-6">
        <div className="max-w-6xl mx-auto px-gutter-md md:px-page-margin flex flex-col sm:flex-row items-center justify-between gap-4 text-mono-sm font-mono text-neutral-600 dark:text-neutral-400">
          <p>© 2026 Mohammed Rehan.Z</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>·</span>
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
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
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
