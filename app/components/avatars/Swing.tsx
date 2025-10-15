"use client"

import { motion } from "framer-motion"

interface SwingProps {
  mood?: "neutral" | "sad" | "happy" | "worried" | "excited"
  className?: string
  animated?: boolean
}

export default function Swing({ mood = "neutral", className = "", animated = true }: SwingProps) {
  // Mouth paths for different moods
  const mouthPaths = {
    sad: "M40 80 Q64 92 88 80",
    happy: "M40 85 Q64 70 88 85",
    excited: "M35 85 Q64 65 93 85",
    worried: "M40 82 L88 82",
    neutral: "M40 82 Q64 82 88 82",
  }

  // Eye styles for different moods
  const eyeY = mood === "sad" || mood === "worried" ? 45 : 42

  const idleAnimation = animated ? {
    y: [0, -3, 0],
    rotate: [-1, 1, -1],
  } : {}

  return (
    <motion.svg
      viewBox="0 0 128 128"
      className={`${className} w-32 h-32`}
      animate={idleAnimation}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    >
      {/* Chains */}
      <line x1="42" y1="8" x2="42" y2="58" stroke="#94A3B8" strokeWidth="3" strokeDasharray="2,2" />
      <line x1="86" y1="8" x2="86" y2="58" stroke="#94A3B8" strokeWidth="3" strokeDasharray="2,2" />
      
      {/* Swing seat */}
      <rect x="32" y="58" width="64" height="12" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" rx="4" />
      
      {/* Face on the seat */}
      <circle cx="50" cy={eyeY} r="3" fill="#1E293B" />
      <circle cx="78" cy={eyeY} r="3" fill="#1E293B" />
      
      {/* Eyebrows */}
      {(mood === "sad" || mood === "worried") && (
        <>
          <path d="M46 36 L54 38" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M82 38 L74 36" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      
      {mood === "excited" && (
        <>
          <path d="M46 38 L54 36" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M82 36 L74 38" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
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
      
      {/* Blush for happy/excited */}
      {(mood === "happy" || mood === "excited") && (
        <>
          <ellipse cx="35" cy="65" rx="6" ry="4" fill="#F472B6" opacity="0.4" />
          <ellipse cx="93" cy="65" rx="6" ry="4" fill="#F472B6" opacity="0.4" />
        </>
      )}
      
      {/* Tear for sad */}
      {mood === "sad" && (
        <motion.ellipse
          cx="80"
          cy="50"
          rx="2"
          ry="3"
          fill="#60A5FA"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: [0, 1, 1, 0], y: [0, 10] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
        />
      )}
    </motion.svg>
  )
}

