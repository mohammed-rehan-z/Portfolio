"use client"

import React, { useState, useEffect, useRef } from "react"

interface TypingEffectProps {
  strings: string[]
  /** typing speed in ms per character */
  typeSpeed?: number
  /** backspace speed in ms per character */
  deleteSpeed?: number
  /** pause at end of fully typed string before deleting (ms) */
  pauseEnd?: number
  /** pause after fully deleted before typing next (ms) */
  pauseStart?: number
  className?: string
  cursorClassName?: string
}

export function TypingEffect({
  strings,
  typeSpeed = 55,
  deleteSpeed = 28,
  pauseEnd = 1800,
  pauseStart = 400,
  className = "",
  cursorClassName = "",
}: TypingEffectProps) {
  const [displayed, setDisplayed] = useState("")
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing")
  const [stringIndex, setStringIndex] = useState(0)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const target = strings[stringIndex] ?? ""

    const clear = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

    if (phase === "typing") {
      if (displayed.length < target.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(target.slice(0, displayed.length + 1))
        }, typeSpeed)
      } else {
        // Fully typed — pause before deleting
        timeoutRef.current = setTimeout(() => setPhase("pausing"), pauseEnd)
      }
    } else if (phase === "pausing") {
      timeoutRef.current = setTimeout(() => setPhase("deleting"), 0)
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed((prev) => prev.slice(0, -1))
        }, deleteSpeed)
      } else {
        // Fully deleted — wait before next string
        timeoutRef.current = setTimeout(() => {
          setStringIndex((i) => (i + 1) % strings.length)
          setPhase("typing")
        }, pauseStart)
      }
    }

    return clear
  }, [displayed, phase, stringIndex, strings, typeSpeed, deleteSpeed, pauseEnd, pauseStart])

  return (
    <span className={className}>
      {displayed}
      <span
        className={`inline-block w-[2px] h-[1em] ml-[2px] align-middle translate-y-[-1px] rounded-sm bg-current animate-[cursor-blink_1s_ease-in-out_infinite] ${cursorClassName}`}
      />
    </span>
  )
}
