"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import EmotionBadge from "./EmotionBadge"
import DetectiveDee from "./avatars/DetectiveDee"

interface CelebrationModalProps {
  isOpen: boolean
  onClose: () => void
  emotionsLearned: string[]
  cluesCollected: number
  sessionId?: string
}

export default function CelebrationModal({ 
  isOpen, 
  onClose, 
  emotionsLearned, 
  cluesCollected,
  sessionId 
}: CelebrationModalProps) {
  
  useEffect(() => {
    if (isOpen) {
      // Trigger confetti
      const duration = 3000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ['#6366F1', '#FBBF24', '#34D399', '#EC4899']
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ['#6366F1', '#FBBF24', '#34D399', '#EC4899']
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()

      // Big burst at the start
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366F1', '#FBBF24', '#34D399', '#EC4899', '#F472B6']
      })
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="relative max-w-2xl w-full bg-gradient-to-br from-amber-50 via-white to-purple-50 border-4 border-indigo-500 p-8 shadow-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>

              {/* Detective Dee */}
              <motion.div
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex justify-center mb-6"
              >
                <DetectiveDee mood="proud" className="w-32 h-32" />
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-6"
              >
                <h2 className="font-fredoka text-4xl font-bold text-indigo-900 mb-2 flex items-center justify-center gap-3">
                  <span className="text-5xl">🎉</span>
                  Case Closed!
                  <span className="text-5xl">🎉</span>
                </h2>
                <p className="font-fredoka text-xl text-slate-700">
                  Amazing detective work! You solved the mystery!
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 gap-4 mb-6"
              >
                <div className="bg-gradient-to-br from-emerald-100 to-green-100 p-4 rounded-2xl border-2 border-emerald-400 text-center">
                  <div className="text-4xl mb-2">🔍</div>
                  <div className="font-fredoka text-3xl font-bold text-emerald-900">{cluesCollected}</div>
                  <div className="font-fredoka text-sm text-emerald-800">Clues Found</div>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-2xl border-2 border-purple-400 text-center">
                  <div className="text-4xl mb-2">✨</div>
                  <div className="font-fredoka text-3xl font-bold text-purple-900">{emotionsLearned.length}</div>
                  <div className="font-fredoka text-sm text-purple-800">Emotions Learned</div>
                </div>
              </motion.div>

              {/* Emotions Learned */}
              {emotionsLearned.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <h3 className="font-fredoka text-lg font-bold text-center text-slate-800 mb-3">
                    Emotions You Discovered:
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {emotionsLearned.map((emotion, idx) => (
                      <motion.div
                        key={emotion}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.6 + idx * 0.1, type: "spring" }}
                      >
                        <EmotionBadge emotion={emotion} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Badge earned */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 rounded-2xl text-center mb-6 shadow-lg"
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1.1, 1.1, 1] }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-6xl mb-2"
                >
                  🏆
                </motion.div>
                <p className="font-fredoka text-2xl font-bold text-white drop-shadow-lg">
                  Empathy Detective Badge Earned!
                </p>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex gap-4 justify-center"
              >
                {sessionId && (
                  <Button
                    onClick={() => window.location.href = `/parent/${sessionId}`}
                    variant="outline"
                    size="lg"
                    className="font-fredoka"
                  >
                    👨‍👩‍👧 View Parent Report
                  </Button>
                )}
                <Button
                  onClick={() => window.location.href = '/'}
                  size="lg"
                  className="font-fredoka"
                >
                  🏠 Back to Home
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


