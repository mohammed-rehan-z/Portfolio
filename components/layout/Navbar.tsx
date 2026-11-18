"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, Terminal, Sparkles } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Magnet } from "@/components/react-bits/Magnet"

const navLinks = [
  { name: "Home", href: "#", id: "" },
  { name: "About", href: "#about", id: "about" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Contact", href: "#contact", id: "contact" },
]

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["contact", "experience", "projects", "skills", "about"]
      const scrollPos = window.scrollY + 200

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionId)
          return
        }
      }
      setActiveSection("")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none mt-3.5 sm:mt-4 px-3 sm:px-4">
        <div className="pointer-events-auto w-full max-w-[1000px]">
          <nav
            aria-label="Main Navigation"
            className="flex items-center justify-between w-full rounded-full bg-[rgba(9,13,22,0.85)] border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl px-4 sm:px-5 py-2"
          >
            {/* ── Logo ── */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="font-mono text-sm sm:text-[15px] font-bold tracking-tight text-[#00f0ff] hover:opacity-80 transition-opacity flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-[#00f0ff] rounded-md px-1 py-0.5"
              >
                <Terminal className="h-4 w-4 shrink-0 text-[#00f0ff]" />
                <span className="whitespace-nowrap">&lt;Mohammed Rehan.Z /&gt;</span>
              </a>

              {/* Status pill on large screens */}
              <div className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[rgba(0,240,255,0.06)] border border-[#00f0ff]/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00f0ff]"></span>
                </span>
                <span className="font-mono text-[11px] text-[#00f0ff] tracking-tight">Available</span>
              </div>
            </div>

            {/* ── Nav links ── */}
            <div className="hidden md:flex items-center justify-center gap-0.5 lg:gap-1 bg-[rgba(255,255,255,0.03)] px-1.5 py-1 rounded-full border border-[rgba(255,255,255,0.04)]">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-3 py-1 rounded-full text-[13px] font-medium transition-all duration-200 ${
                      isActive
                        ? "text-[#00f0ff] bg-[rgba(0,240,255,0.1)] shadow-[0_0_12px_rgba(0,240,255,0.15)] font-semibold"
                        : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-white/[0.05]"
                    }`}
                  >
                    {link.name}
                  </a>
                )
              })}
            </div>

            {/* ── GitHub, LinkedIn, CTA ── */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Social icons — desktop */}
              <div className="hidden lg:flex items-center gap-0.5">
                <a
                  href="https://github.com/mohammed-rehan-z"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Mohammed Rehan's GitHub Profile"
                  className="p-1.5 rounded-lg text-[#8b949e] hover:text-[#f0f6fc] hover:bg-white/[0.06] transition-all"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohammed-rehan-z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Mohammed Rehan's LinkedIn Profile"
                  className="p-1.5 rounded-lg text-[#8b949e] hover:text-[#f0f6fc] hover:bg-white/[0.06] transition-all"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>

              {/* Divider */}
              <span className="hidden lg:block h-3.5 w-px bg-white/10" />

              {/* CTA button */}
              <Magnet distance={12}>
                <Button
                  asChild
                  variant="default"
                  size="sm"
                  className="hidden sm:inline-flex h-8 px-3.5 text-xs font-semibold shadow-[0_0_15px_-3px_rgba(0,240,255,0.35)]"
                >
                  <a href="#contact" className="flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" />
                    <span>Get in Touch</span>
                  </a>
                </Button>
              </Magnet>

              {/* Mini avatar with status ring */}
              <div className="relative h-8 w-8 rounded-full overflow-hidden border border-[#00f0ff]/50 hidden sm:block shrink-0 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                <Image
                  src="/images/mohammed_portrait_original.jpg"
                  alt="Mohammed Rehan Z"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>

              {/* Mobile hamburger */}
              <div className="md:hidden">
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#8b949e] hover:text-[#f0f6fc]"
                      aria-label="Open mobile navigation menu"
                    >
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[290px] sm:w-[340px] bg-[#090d16] border-l border-[rgba(0,240,255,0.2)] p-6"
                  >
                    <SheetHeader className="mb-6">
                      <SheetTitle className="font-mono text-[#00f0ff] flex items-center gap-2 text-base">
                        <Terminal className="h-4 w-4" />
                        &lt;MohammedRehan.Z /&gt;
                      </SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-col space-y-2">
                      {navLinks.map((link) => {
                        const isActive = activeSection === link.id
                        return (
                          <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                              isActive
                                ? "bg-[rgba(0,240,255,0.1)] border-[#00f0ff]/40 text-[#00f0ff] font-semibold"
                                : "bg-[rgba(22,27,34,0.6)] border-[rgba(255,255,255,0.06)] text-[#f0f6fc] hover:border-[#00f0ff]/30 hover:text-[#00f0ff]"
                            }`}
                          >
                            {link.name}
                          </a>
                        )
                      })}

                      {/* Social links in mobile drawer */}
                      <div className="flex items-center gap-2 pt-4">
                        <a
                          href="https://github.com/mohammed-rehan-z"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(22,27,34,0.6)] text-xs text-[#8b949e] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 transition-all"
                        >
                          <GithubIcon className="h-3.5 w-3.5" />
                          <span>GitHub</span>
                        </a>
                        <a
                          href="https://www.linkedin.com/in/mohammed-rehan-z/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(22,27,34,0.6)] text-xs text-[#8b949e] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 transition-all"
                        >
                          <LinkedinIcon className="h-3.5 w-3.5" />
                          <span>LinkedIn</span>
                        </a>
                      </div>

                      <div className="pt-2">
                        <Button
                          asChild
                          variant="default"
                          className="w-full h-10 text-xs font-semibold shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                          onClick={() => setIsMobileOpen(false)}
                        >
                          <a href="#contact">Get in Touch</a>
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
