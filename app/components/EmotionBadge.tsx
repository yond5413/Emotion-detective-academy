"use client"

import { motion } from "framer-motion"

interface EmotionBadgeProps {
  emotion: string
  isNew?: boolean
}

export default function EmotionBadge({ emotion, isNew = false }: EmotionBadgeProps) {
  return (
    <motion.span
      initial={isNew ? { scale: 0, rotate: -180 } : false}
      animate={isNew ? { scale: 1, rotate: 0 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1, y: -2 }}
      className="relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-sm font-fredoka font-semibold shadow-md"
    >
      <span className="text-lg">✨</span>
      <span>{emotion}</span>
      
      {isNew && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"
        />
      )}
    </motion.span>
  )
}

