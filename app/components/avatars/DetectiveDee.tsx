"use client"

import { motion } from "framer-motion"

interface DetectiveDeeProps {
  mood?: "neutral" | "happy" | "excited" | "thinking" | "proud"
  className?: string
  animated?: boolean
}

export default function DetectiveDee({ mood = "happy", className = "", animated = true }: DetectiveDeeProps) {
  const mouthPaths = {
    happy: "M42 72 Q52 62 62 72",
    excited: "M40 72 Q52 60 64 72",
    thinking: "M42 70 Q52 68 62 70",
    proud: "M42 72 Q52 65 62 72",
    neutral: "M42 70 Q52 70 62 70",
  }

  const eyeY = mood === "thinking" ? 56 : 54

  const idleAnimation = animated ? {
    y: [0, -4, 0],
  } : {}

  // Hat tip for proud
  const hatAnimation = mood === "proud" && animated ? {
    rotate: [0, -5, 0],
  } : {}

  return (
    <motion.svg
      viewBox="0 0 128 128"
      className={`${className} w-32 h-32`}
      animate={idleAnimation}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    >
      {/* Detective body/coat */}
      <ellipse cx="64" cy="90" rx="28" ry="22" fill="#6366F1" stroke="#4F46E5" strokeWidth="2" />
      
      {/* Head */}
      <circle cx="64" cy="58" r="22" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
      
      {/* Detective hat */}
      <motion.g animate={hatAnimation} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
        <ellipse cx="64" cy="38" rx="24" ry="8" fill="#1E293B" />
        <rect x="52" y="32" width="24" height="12" fill="#334155" stroke="#1E293B" strokeWidth="2" rx="2" />
        <ellipse cx="64" cy="32" rx="12" ry="4" fill="#1E293B" />
      </motion.g>
      
      {/* Eyes */}
      <circle cx="56" cy={eyeY} r="3" fill="#1E293B" />
      <circle cx="72" cy={eyeY} r="3" fill="#1E293B" />
      
      {/* Magnifying glass for thinking */}
      {mood === "thinking" && (
        <motion.g
          animate={{ rotate: [0, 10, 0], x: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <circle cx="85" cy="75" r="10" fill="transparent" stroke="#94A3B8" strokeWidth="3" />
          <line x1="92" y1="82" x2="100" y2="90" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
      )}
      
      {/* Sparkles for excited */}
      {mood === "excited" && (
        <>
          <motion.path
            d="M 85 45 L 87 47 L 85 49 L 83 47 Z"
            fill="#FBBF24"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          <motion.path
            d="M 43 48 L 45 50 L 43 52 L 41 50 Z"
            fill="#FBBF24"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.5 }}
          />
        </>
      )}
      
      {/* Eyebrows */}
      {mood === "excited" && (
        <>
          <path d="M52 50 L60 48" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M76 48 L68 50" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      
      {mood === "thinking" && (
        <>
          <path d="M52 51 L60 51" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M76 51 L68 51" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
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
      
      {/* Blush */}
      {(mood === "happy" || mood === "excited" || mood === "proud") && (
        <>
          <ellipse cx="48" cy="62" rx="4" ry="3" fill="#F472B6" opacity="0.4" />
          <ellipse cx="80" cy="62" rx="4" ry="3" fill="#F472B6" opacity="0.4" />
        </>
      )}
      
      {/* Badge on coat */}
      <motion.circle
        cx="64"
        cy="85"
        r="6"
        fill="#FBBF24"
        stroke="#F59E0B"
        strokeWidth="2"
        animate={mood === "proud" ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
      <text x="64" y="88" textAnchor="middle" fontSize="8" fill="#92400E" fontWeight="bold">★</text>
    </motion.svg>
  )
}


