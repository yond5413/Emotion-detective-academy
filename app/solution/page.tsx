'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import CelebrationModal from '../components/CelebrationModal'
import DetectiveDee from '../components/avatars/DetectiveDee'
import Swing from '../components/avatars/Swing'
import Slide from '../components/avatars/Slide'
import Tree from '../components/avatars/Tree'

function SolutionPageContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session')
  
  const [solution, setSolution] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleSubmit = async () => {
    if (!solution.trim() || !sessionId) return

    setLoading(true)
    try {
      const response = await fetch('/api/solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          solution: solution.trim(),
        }),
      })
      const data = await response.json()
      setResult(data)
      setSubmitted(true)
      
      // Show celebration after a brief delay
      setTimeout(() => setShowCelebration(true), 500)
    } catch (error) {
      console.error('Failed to submit solution:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!sessionId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">🔍</div>
        <p className="font-fredoka text-xl text-slate-700 mb-4">No session found. Please start a mystery first!</p>
        <Link href="/mystery">
          <Button size="lg" className="font-fredoka">
            Go to Mystery
          </Button>
        </Link>
      </motion.div>
    )
  }

  if (submitted && result) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto py-8"
        >
          <Card className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 border-4 border-emerald-400 p-8 shadow-2xl">
            {/* Detective Dee celebrating */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <DetectiveDee mood="proud" className="w-32 h-32" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h1 className="font-fredoka text-4xl font-bold text-emerald-700 mb-3">
                {result.celebration.title}
              </h1>
              <p className="font-fredoka text-xl text-slate-700">
                You solved the mystery with empathy and kindness!
              </p>
            </motion.div>

            {/* Character Reactions */}
            <div className="space-y-4 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-5 border-2 border-amber-300 shadow-md"
              >
                <Swing mood="happy" className="w-20 h-20 flex-shrink-0" />
                <div>
                  <h3 className="font-fredoka font-bold text-lg text-amber-900 mb-1">Swing says:</h3>
                  <p className="font-fredoka text-slate-700">{result.character_reactions.swing}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-5 border-2 border-blue-300 shadow-md"
              >
                <Slide mood="happy" className="w-20 h-20 flex-shrink-0" />
                <div>
                  <h3 className="font-fredoka font-bold text-lg text-blue-900 mb-1">Slide says:</h3>
                  <p className="font-fredoka text-slate-700">{result.character_reactions.slide}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-5 border-2 border-emerald-300 shadow-md"
              >
                <Tree mood="proud" className="w-20 h-20 flex-shrink-0" />
                <div>
                  <h3 className="font-fredoka font-bold text-lg text-emerald-900 mb-1">Tree says:</h3>
                  <p className="font-fredoka text-slate-700">{result.character_reactions.tree}</p>
                </div>
              </motion.div>
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/">
                <Button size="lg" className="font-fredoka w-full sm:w-auto">
                  🏠 Back to Home
                </Button>
              </Link>
              <Link href={`/parent/${sessionId}`}>
                <Button size="lg" variant="outline" className="font-fredoka w-full sm:w-auto">
                  👨‍👩‍👧 View Parent Report
                </Button>
              </Link>
            </motion.div>
          </Card>
        </motion.div>

        {/* Celebration Modal */}
        <CelebrationModal
          isOpen={showCelebration}
          onClose={() => setShowCelebration(false)}
          emotionsLearned={result.celebration.emotion_words_learned}
          cluesCollected={3}
          sessionId={sessionId}
        />
      </>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-8"
    >
      <Card className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-4 border-indigo-400 p-8 shadow-2xl">
        {/* Detective Dee thinking */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex justify-center mb-6"
        >
          <DetectiveDee mood="thinking" className="w-28 h-28" />
        </motion.div>

        <h1 className="font-fredoka text-4xl font-bold text-center text-indigo-900 mb-4">
          💡 Time to Solve the Mystery!
        </h1>
        <p className="font-fredoka text-lg text-center text-slate-700 mb-8">
          You've talked to Swing, Slide, and Tree. Now it's your turn to help them! 
          What do you think could make everyone feel better?
        </p>

        <div className="mb-6">
          <label className="block font-fredoka font-bold text-lg mb-3 text-slate-800">
            💭 Your Solution:
          </label>
          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="I think we could help by..."
            className="w-full h-40 px-5 py-4 border-4 border-indigo-300 rounded-2xl text-lg font-fredoka focus:outline-none focus:border-indigo-500 resize-none shadow-inner transition-all"
            disabled={loading}
          />
          <p className="mt-2 text-sm font-fredoka text-slate-600 italic">
            💡 Tip: Think about how each character feels and what would help them all be happy together!
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading || !solution.trim()}
          size="lg"
          className="w-full font-fredoka text-xl py-6 shadow-xl"
        >
          {loading ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="inline-block text-2xl mr-2"
              >
                ⏳
              </motion.span>
              Thinking...
            </>
          ) : (
            <>
              <span className="text-2xl mr-2">✨</span>
              Submit Your Solution
            </>
          )}
        </Button>
      </Card>
    </motion.div>
  )
}

export default function SolutionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="font-fredoka text-xl text-slate-700">Loading...</p>
        </div>
      </div>
    }>
      <SolutionPageContent />
    </Suspense>
  )
}
