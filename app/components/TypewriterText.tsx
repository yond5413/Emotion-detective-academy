"use client"

import { useState, useEffect } from "react"

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  onComplete?: () => void
}

export default function TypewriterText({ 
  text, 
  className = "", 
  speed = 30,
  onComplete 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (currentIndex === text.length && onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return <span className={className}>{displayedText}</span>
}


