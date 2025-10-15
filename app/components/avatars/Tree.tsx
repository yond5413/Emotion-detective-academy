"use client"

import { motion } from "framer-motion"

interface TreeProps {
  mood?: "neutral" | "sad" | "happy" | "worried" | "wise" | "proud"
  className?: string
  animated?: boolean
}

export default function Tree({ mood = "wise", className = "", animated = true }: TreeProps) {
  const mouthPaths = {
    sad: "M50 78 Q64 85 78 78",
    happy: "M50 82 Q64 72 78 82",
    worried: "M50 80 Q64 78 78 80",
    wise: "M50 80 Q64 78 78 80",
    proud: "M50 82 Q64 75 78 82",
    neutral: "M50 80 Q64 80 78 80",
  }

  const eyeType = mood === "wise" || mood === "proud" ? "calm" : "normal"

  const idleAnimation = animated ? {
    rotate: [-0.5, 0.5, -0.5],
  } : {}

  // Gentle sway for leaves
  const leafAnimation = animated ? {
    rotate: [-2, 2, -2],
    scale: [1, 1.02, 1],
  } : {}

  return (
    <motion.svg
      viewBox="0 0 128 128"
      className={`${className} w-32 h-32`}
      animate={idleAnimation}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      {/* Tree trunk */}
      <rect x="52" y="70" width="24" height="50" fill="#92400E" stroke="#78350F" strokeWidth="2" rx="4" />
      
      {/* Tree foliage - three layers */}
      <motion.ellipse 
        cx="64" 
        cy="55" 
        rx="35" 
        ry="30" 
        fill="#34D399" 
        stroke="#10B981" 
        strokeWidth="2"
        animate={leafAnimation}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <motion.ellipse 
        cx="64" 
        cy="48" 
        rx="28" 
        ry="24" 
        fill="#6EE7B7" 
        stroke="#10B981" 
        strokeWidth="2"
        animate={leafAnimation}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.2 }}
      />
      
      {/* Face on trunk */}
      {eyeType === "calm" ? (
        <>
          <path d="M54 58 Q58 56 62 58" stroke="#1E293B" strokeWidth="2" fill="transparent" strokeLinecap="round" />
          <path d="M66 58 Q70 56 74 58" stroke="#1E293B" strokeWidth="2" fill="transparent" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="58" cy="58" r="3" fill="#1E293B" />
          <circle cx="70" cy="58" r="3" fill="#1E293B" />
        </>
      )}
      
      {/* Eyebrows */}
      {mood === "wise" && (
        <>
          <path d="M52 54 L62 52" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M76 52 L66 54" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      
      {mood === "proud" && (
        <>
          <path d="M52 52 L62 50" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M76 50 L66 52" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
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
      
      {/* Wisdom sparkles */}
      {(mood === "wise" || mood === "proud") && (
        <>
          <motion.circle
            cx="38"
            cy="42"
            r="2"
            fill="#FBBF24"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0 }}
          />
          <motion.circle
            cx="90"
            cy="48"
            r="2"
            fill="#FBBF24"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.7 }}
          />
          <motion.circle
            cx="64"
            cy="30"
            r="2"
            fill="#FBBF24"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, delay: 1.4 }}
          />
        </>
      )}
      
      {/* Gentle glow for wise mood */}
      {mood === "wise" && (
        <motion.ellipse
          cx="64"
          cy="55"
          rx="40"
          ry="35"
          fill="#34D399"
          opacity="0.1"
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
      )}
    </motion.svg>
  )
}


