"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Button } from "./ui/button"
import EmotionBadge from "./EmotionBadge"

interface DetectiveNotebookProps {
  clues: string[]
  emotions: string[]
}

export default function DetectiveNotebook({ clues, emotions }: DetectiveNotebookProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [previousEmotionCount, setPreviousEmotionCount] = useState(0)

  // Track new emotions for animation
  const newEmotions = emotions.slice(previousEmotionCount)
  if (newEmotions.length > 0 && emotions.length > previousEmotionCount) {
    setTimeout(() => setPreviousEmotionCount(emotions.length), 1000)
  }

  return (
    <>
      {/* Floating Notebook Button */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
        className="fixed top-24 right-6 z-40"
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="relative rounded-full w-16 h-16 shadow-2xl bg-amber-500 hover:bg-amber-600"
        >
          <span className="text-3xl">📔</span>
          
          {/* Badge for clue count */}
          {clues.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-7 h-7 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
            >
              {clues.length}
            </motion.div>
          )}

          {/* Pulse animation for new items */}
          {(clues.length > 0 || emotions.length > 0) && (
            <motion.div
              className="absolute inset-0 rounded-full bg-amber-400"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </Button>
      </motion.div>

      {/* Notebook Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-full sm:w-[500px] overflow-y-auto bg-gradient-to-br from-amber-50 to-orange-50">
          <SheetHeader className="border-b-4 border-amber-300">
            <SheetTitle className="font-fredoka text-3xl text-amber-900 flex items-center gap-3">
              <span className="text-4xl">📔</span>
              Detective Notebook
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-8">
            {/* Clues Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-fredoka text-2xl text-slate-800 flex items-center gap-2">
                  <span>🔍</span>
                  Clues Found
                </h3>
                <div className="bg-amber-200 px-3 py-1 rounded-full">
                  <span className="font-fredoka font-bold text-amber-900">{clues.length}/3</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-4 bg-amber-100 rounded-full overflow-hidden mb-4 border-2 border-amber-300">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(clues.length / 3) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                />
              </div>

              {clues.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 px-4 bg-white/50 rounded-2xl border-2 border-dashed border-amber-300"
                >
                  <p className="text-amber-700 font-fredoka text-lg italic">
                    Talk to characters to discover clues...
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {clues.map((clue, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ delay: idx * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-md border-2 border-amber-200"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: idx * 0.1 + 0.2, type: "spring" }}
                        className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white font-bold">✓</span>
                      </motion.div>
                      <p className="flex-1 font-fredoka text-slate-800">{clue}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {clues.length >= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="mt-4 p-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl shadow-lg"
                >
                  <p className="font-fredoka font-bold text-white text-center text-lg flex items-center justify-center gap-2">
                    <span className="text-2xl">🎉</span>
                    Ready to solve the mystery!
                    <span className="text-2xl">🎉</span>
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Emotions Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-fredoka text-2xl text-slate-800 mb-4 flex items-center gap-2">
                <span>✨</span>
                Emotions Learned
              </h3>

              {emotions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 px-4 bg-white/50 rounded-2xl border-2 border-dashed border-purple-300"
                >
                  <p className="text-purple-700 font-fredoka text-lg italic">
                    Discover emotion words as you investigate...
                  </p>
                </motion.div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  <AnimatePresence>
                    {emotions.map((emotion, idx) => (
                      <motion.div
                        key={emotion}
                        layout
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ 
                          delay: idx * 0.05,
                          type: "spring",
                          stiffness: 200,
                          damping: 15
                        }}
                      >
                        <EmotionBadge 
                          emotion={emotion} 
                          isNew={newEmotions.includes(emotion)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {emotions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 p-3 bg-indigo-100 rounded-xl border-2 border-indigo-300"
                >
                  <p className="text-sm font-fredoka text-indigo-800 text-center">
                    🌟 You've learned <strong>{emotions.length}</strong> emotion word{emotions.length !== 1 ? 's' : ''}!
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Encouragement Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-5 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl border-3 border-indigo-300 shadow-inner"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl flex-shrink-0">🕵️</span>
                <div>
                  <p className="font-fredoka font-bold text-indigo-900 mb-1">Detective Dee says:</p>
                  <p className="font-fredoka text-sm text-indigo-800 leading-relaxed">
                    {clues.length === 0 
                      ? "Great start, Detective! Ask the characters how they feel to discover clues."
                      : clues.length < 3
                      ? "You're doing amazing! Keep asking questions to learn more."
                      : "Wow! You've collected all the clues. Time to solve this mystery!"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
