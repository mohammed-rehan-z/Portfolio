"use client"

import React, { useEffect, useState } from "react"

interface DecryptedTextProps {
  text: string
  speed?: number
  maxIterations?: number
  characters?: string
  className?: string
  encryptedClassName?: string
}

export function DecryptedText({
  text,
  speed = 40,
  maxIterations = 12,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><",
  className = "",
  encryptedClassName = "text-[#00f0ff]",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(true)

  useEffect(() => {
    let iteration = 0
    let interval: NodeJS.Timeout

    interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iteration) {
              return text[index]
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
      )

      if (iteration >= text.length) {
        setIsScrambling(false)
        clearInterval(interval)
      }

      iteration += 1 / (maxIterations / text.length)
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, maxIterations, characters])

  return (
    <span className={`${className} ${isScrambling ? encryptedClassName : ""}`}>
      {displayText}
    </span>
  )
}
