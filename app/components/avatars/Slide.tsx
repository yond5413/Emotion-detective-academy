"use client"

import { motion } from "framer-motion"

interface SlideProps {
  mood?: "neutral" | "sad" | "happy" | "worried" | "excited"
  className?: string
  animated?: boolean
}

export default function Slide({ mood = "neutral", className = "", animated = true }: SlideProps) {
  const mouthPaths = {
    sad: "M48 75 Q60 82 72 75",
    happy: "M48 78 Q60 68 72 78",
    excited: "M45 78 Q60 65 75 78",
    worried: "M48 76 Q60 74 72 76",
    neutral: "M48 76 Q60 76 72 76",
  }

  const eyeY = mood === "sad" || mood === "worried" ? 58 : 55

  const idleAnimation = animated ? {
    scaleY: [1, 0.98, 1],
    scaleX: [1, 1.01, 1],
  } : {}

  return (
    <motion.svg
      viewBox="0 0 128 128"
      className={`${className} w-32 h-32`}
      animate={idleAnimation}
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
    >
      {/* Slide structure */}
      <path
        d="M 30 20 L 100 20 L 100 30 L 50 110 L 40 110 L 90 30 L 30 30 Z"
        fill="#60A5FA"
        stroke="#3B82F6"
        strokeWidth="3"
      />
      
      {/* Ladder rungs */}
      <line x1="30" y1="35" x2="25" y2="35" stroke="#3B82F6" strokeWidth="2" />
      <line x1="30" y1="45" x2="25" y2="45" stroke="#3B82F6" strokeWidth="2" />
      <line x1="30" y1="55" x2="25" y2="55" stroke="#3B82F6" strokeWidth="2" />
      
      {/* Face on the slide */}
      <ellipse cx="75" cy="45" rx="22" ry="20" fill="#93C5FD" stroke="#3B82F6" strokeWidth="2" />
      
      {/* Eyes */}
      <circle cx="68" cy={eyeY} r="3" fill="#1E293B" />
      <circle cx="82" cy={eyeY} r="3" fill="#1E293B" />
      
      {/* Eyebrows */}
      {mood === "worried" && (
        <>
          <path d="M64 48 L72 50" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M86 50 L78 48" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      
      {(mood === "happy" || mood === "excited") && (
        <>
          <path d="M64 50 L72 48" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M86 48 L78 50" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      
      {/* Mouth */}
      <path 
        d={mouthPaths[mood]} 
        stroke="#1E293B" 
        strokeWidth="3" 
        fill="transparent" 
        strokeLinecap="round"
      />
      
      {/* Sparkles for excited */}
      {mood === "excited" && (
        <>
          <motion.path
            d="M 100 35 L 102 37 L 100 39 L 98 37 Z"
            fill="#FBBF24"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <motion.path
            d="M 50 25 L 52 27 L 50 29 L 48 27 Z"
            fill="#FBBF24"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
          />
        </>
      )}
      
      {/* Blush */}
      {(mood === "happy" || mood === "excited") && (
        <>
          <ellipse cx="63" cy="62" rx="4" ry="3" fill="#F472B6" opacity="0.4" />
          <ellipse cx="87" cy="62" rx="4" ry="3" fill="#F472B6" opacity="0.4" />
        </>
      )}
    </motion.svg>
  )
}

