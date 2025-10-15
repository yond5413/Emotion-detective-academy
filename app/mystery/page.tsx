'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatInterface from '../components/ChatInterface'
import DetectiveNotebook from '../components/DetectiveNotebook'
import { Button } from '../components/ui/button'
import Swing from '../components/avatars/Swing'
import Slide from '../components/avatars/Slide'
import Tree from '../components/avatars/Tree'
import DetectiveDee from '../components/avatars/DetectiveDee'

export default function MysteryPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)
  const [clues, setClues] = useState<string[]>([])
  const [emotions, setEmotions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    // Start session on mount
    startSession()
  }, [])

  const startSession = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/session/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mystery_id: 'playground_lonely' }),
      })
      const data = await response.json()
      setSessionId(data.session_id)
    } catch (error) {
      console.error('Failed to start session:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClueCollected = (clue: string | null) => {
    if (clue && !clues.includes(clue)) {
      setClues([...clues, clue])
    }
  }

  const handleEmotionLearned = (emotion: string) => {
    if (!emotions.includes(emotion)) {
      setEmotions([...emotions, emotion])
    }
  }

  const characters = [
    { id: 'swing', name: 'Swing', emoji: '🎢', Component: Swing, mood: 'sad' as const },
    { id: 'slide', name: 'Slide', emoji: '🛝', Component: Slide, mood: 'worried' as const },
    { id: 'tree', name: 'Tree', emoji: '🌳', Component: Tree, mood: 'wise' as const },
  ]

  if (loading || !sessionId) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[600px]"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="text-6xl mb-4"
          >
            🔍
          </motion.div>
          <p className="font-fredoka text-2xl text-slate-700">Setting up your detective case...</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="relative">
      {/* Detective Notebook - Floating */}
      <DetectiveNotebook clues={clues} emotions={emotions} />

      {/* Mystery Introduction */}
      <AnimatePresence>
        {showIntro && !selectedCharacter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-6"
          >
            <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 rounded-3xl p-8 shadow-2xl border-4 border-indigo-300">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-6 mb-6"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <DetectiveDee mood="excited" className="w-24 h-24" />
                </motion.div>
                <div className="flex-1">
                  <h2 className="font-fredoka text-3xl font-bold text-indigo-900 mb-3">
                    🔍 The Lonely Playground Mystery
                  </h2>
                  <p className="font-fredoka text-lg text-slate-700 leading-relaxed mb-3">
                    Welcome, Detective! Something isn't quite right at Sunny Park Playground today. 
                    The playground feels... lonely. Can you help figure out what's going on?
                  </p>
                  <p className="font-fredoka text-md text-indigo-800 italic">
                    💡 <strong>Your mission:</strong> Talk to the playground friends, ask them how they feel, 
                    and collect clues to solve the mystery!
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center"
              >
                <Button
                  onClick={() => setShowIntro(false)}
                  size="lg"
                  className="font-fredoka text-xl px-8 py-6 shadow-xl"
                >
                  <span className="text-2xl mr-2">🕵️</span>
                  Begin Investigation
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Selection */}
      {!showIntro && !selectedCharacter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-4 border-indigo-200">
            <h2 className="font-fredoka text-2xl font-bold text-center text-slate-800 mb-6">
              🎪 Who would you like to talk to?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {characters.map((char, idx) => (
                <motion.button
                  key={char.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: idx * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCharacter(char.id)}
                  className="relative bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-6 shadow-lg border-4 border-indigo-300 hover:border-indigo-500 transition-all group"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <char.Component mood={char.mood} className="w-32 h-32 mb-4" />
                    </motion.div>
                    <h3 className="font-fredoka text-2xl font-bold text-slate-800 mb-2">
                      {char.emoji} {char.name}
                    </h3>
                    <p className="font-fredoka text-sm text-slate-600 text-center">
                      {char.id === 'swing' && "Feeling lonely lately..."}
                      {char.id === 'slide' && "Worried about something"}
                      {char.id === 'tree' && "Has seen everything"}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <motion.div
                    className="absolute inset-0 bg-indigo-400 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Chat Interface */}
      <AnimatePresence mode="wait">
        {selectedCharacter && sessionId && (
          <motion.div
            key={`chat-${selectedCharacter}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Back button */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="mb-4"
            >
              <Button
                onClick={() => setSelectedCharacter(null)}
                variant="ghost"
                className="font-fredoka"
              >
                ← Back to Characters
              </Button>
            </motion.div>

            <ChatInterface
              sessionId={sessionId}
              character={selectedCharacter}
              onClueCollected={handleClueCollected}
              onEmotionLearned={handleEmotionLearned}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Solution Button */}
      <AnimatePresence>
        {clues.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", delay: 0.5 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
          >
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(99, 102, 241, 0.5)",
                  "0 0 40px rgba(99, 102, 241, 0.8)",
                  "0 0 20px rgba(99, 102, 241, 0.5)",
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-gradient-to-r from-emerald-400 to-green-500 rounded-full p-1"
            >
              <Button
                onClick={() => window.location.href = `/solution?session=${sessionId}`}
                size="lg"
                className="font-fredoka text-xl px-10 py-6 bg-white text-emerald-700 hover:bg-emerald-50 rounded-full shadow-2xl"
              >
                <span className="text-3xl mr-3">💡</span>
                Ready to Solve the Mystery!
                <span className="text-3xl ml-3">✨</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
