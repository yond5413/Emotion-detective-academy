"use client"

import { motion } from "framer-motion"
import { Card } from "./ui/card"
import TypewriterText from "./TypewriterText"

interface DialogueBoxProps {
  character: string
  characterName: string
  message: string
  isTyping?: boolean
  onTypingComplete?: () => void
}

export default function DialogueBox({ 
  character, 
  characterName, 
  message, 
  isTyping = true,
  onTypingComplete 
}: DialogueBoxProps) {
  const characterColors: Record<string, string> = {
    swing: "bg-amber-500",
    slide: "bg-blue-500",
    tree: "bg-emerald-500",
    detective: "bg-indigo-600",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative z-10 w-full max-w-3xl"
    >
      {/* Character nameplate */}
      <motion.div
        initial={{ scale: 0, x: -20 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
        className={`absolute -top-4 left-8 ${characterColors[character] || 'bg-gray-600'} text-white px-4 py-1.5 rounded-lg font-fredoka font-bold text-sm shadow-lg z-20`}
      >
        {characterName.toUpperCase()}
      </motion.div>

      {/* Dialogue content */}
      <Card className="border-4 border-indigo-600 bg-white/95 backdrop-blur-sm p-6 shadow-2xl">
        {isTyping ? (
          <TypewriterText 
            text={message} 
            className="font-fredoka text-xl text-slate-800 leading-relaxed"
            speed={25}
            onComplete={onTypingComplete}
          />
        ) : (
          <p className="font-fredoka text-xl text-slate-800 leading-relaxed">
            {message}
          </p>
        )}
      </Card>
    </motion.div>
  )
}


