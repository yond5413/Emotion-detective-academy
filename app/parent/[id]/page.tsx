'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '../../components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'
import EmotionBadge from '../../components/EmotionBadge'
import DetectiveDee from '../../components/avatars/DetectiveDee'

export default function ParentDashboardPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSessionData()
  }, [])

  const fetchSessionData = async () => {
    try {
      const response = await fetch(`/api/parent/session/${params.id}`)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Failed to fetch session data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
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
            📊
          </motion.div>
          <p className="font-fredoka text-2xl text-slate-700">Loading session insights...</p>
        </div>
      </motion.div>
    )
  }

  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">🔍</div>
        <p className="font-fredoka text-xl text-slate-700 mb-4">Session not found</p>
        <Link href="/">
          <Button size="lg" className="font-fredoka">Go to Home</Button>
        </Link>
      </motion.div>
    )
  }

  const { session_summary, conversation_starters, growth_indicators } = data

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-4 border-indigo-300">
          <CardHeader>
            <div className="flex items-center gap-4">
              <DetectiveDee mood="proud" className="w-20 h-20" />
              <div className="flex-1">
                <CardTitle className="font-fredoka text-3xl text-indigo-900 mb-2">
                  👨‍👩‍👧 Parent Dashboard
                </CardTitle>
                <p className="font-fredoka text-slate-600">
                  Session ID: <code className="bg-indigo-100 px-2 py-1 rounded text-sm">{params.id}</code>
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Session Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-4 border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50">
          <CardHeader>
            <CardTitle className="font-fredoka text-2xl text-emerald-900 flex items-center gap-2">
              <span className="text-3xl">📊</span>
              Session Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-4 shadow-md text-center border-2 border-emerald-200"
              >
                <p className="font-fredoka text-sm text-slate-600 mb-1">Duration</p>
                <p className="font-fredoka text-3xl font-bold text-emerald-600">
                  {session_summary.duration_minutes}
                </p>
                <p className="font-fredoka text-xs text-slate-500">minutes</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-4 shadow-md text-center border-2 border-blue-200"
              >
                <p className="font-fredoka text-sm text-slate-600 mb-1">Questions</p>
                <p className="font-fredoka text-3xl font-bold text-blue-600">
                  {session_summary.questions_asked}
                </p>
                <p className="font-fredoka text-xs text-slate-500">asked</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-4 shadow-md text-center border-2 border-purple-200"
              >
                <p className="font-fredoka text-sm text-slate-600 mb-1">Emotions</p>
                <p className="font-fredoka text-3xl font-bold text-purple-600">
                  {session_summary.emotion_words.length}
                </p>
                <p className="font-fredoka text-xs text-slate-500">learned</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-4 shadow-md text-center border-2 border-amber-200"
              >
                <p className="font-fredoka text-sm text-slate-600 mb-1">Status</p>
                <p className="font-fredoka text-2xl font-bold text-amber-600">
                  {session_summary.mystery_completed ? '✓ Done' : '⏳ Active'}
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Emotion Words */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-4 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="font-fredoka text-2xl text-purple-900 flex items-center gap-2">
              <span className="text-3xl">✨</span>
              Emotion Words Learned
            </CardTitle>
          </CardHeader>
          <CardContent>
            {session_summary.emotion_words.length === 0 ? (
              <p className="font-fredoka text-slate-600 italic text-center py-4">
                No emotion words recorded yet
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {session_summary.emotion_words.map((word: string, idx: number) => (
                  <motion.div
                    key={word}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                  >
                    <EmotionBadge emotion={word} />
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Empathy Moments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-4 border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50">
          <CardHeader>
            <CardTitle className="font-fredoka text-2xl text-pink-900 flex items-center gap-2">
              <span className="text-3xl">❤️</span>
              Empathy Moments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {session_summary.empathy_moments.length === 0 ? (
              <p className="font-fredoka text-slate-600 italic text-center py-4">
                No empathy moments recorded yet
              </p>
            ) : (
              <ul className="space-y-3">
                {session_summary.empathy_moments.map((moment: string, idx: number) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-start gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl border-2 border-pink-200 shadow-sm"
                  >
                    <span className="text-2xl flex-shrink-0">💖</span>
                    <span className="font-fredoka text-slate-800">{moment}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Solution */}
      {session_summary.solution && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-4 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="font-fredoka text-2xl text-amber-900 flex items-center gap-2">
                <span className="text-3xl">💡</span>
                Solution Proposed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white/70 backdrop-blur-sm p-5 rounded-xl border-2 border-amber-200">
                <p className="font-fredoka text-lg text-slate-800 leading-relaxed">
                  "{session_summary.solution}"
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Conversation Starters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-4 border-indigo-300 bg-gradient-to-br from-indigo-50 to-blue-50">
          <CardHeader>
            <CardTitle className="font-fredoka text-2xl text-indigo-900 flex items-center gap-2">
              <span className="text-3xl">💬</span>
              Conversation Starters for You
            </CardTitle>
            <p className="font-fredoka text-sm text-slate-600 mt-2">
              Use these prompts to continue the learning offline with your child:
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {conversation_starters.map((starter: string, idx: number) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="bg-gradient-to-r from-indigo-100 to-blue-100 p-5 rounded-xl border-2 border-indigo-200 shadow-md cursor-pointer"
                >
                  <p className="font-fredoka text-slate-800 flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">💭</span>
                    <span>{starter}</span>
                  </p>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Growth Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-4 border-emerald-300 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="font-fredoka text-2xl text-emerald-900 flex items-center gap-2">
              <span className="text-3xl">📈</span>
              Growth Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center border-4 border-indigo-200"
              >
                <div className="text-4xl mb-2">💙</div>
                <p className="font-fredoka text-sm text-slate-600 mb-2">Empathy Score</p>
                <p className="font-fredoka text-5xl font-bold text-indigo-600">
                  {growth_indicators.empathy_score}
                </p>
                <p className="font-fredoka text-sm text-slate-500">out of 10</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center border-4 border-purple-200"
              >
                <div className="text-4xl mb-2">📚</div>
                <p className="font-fredoka text-sm text-slate-600 mb-2">Emotional Vocabulary</p>
                <p className="font-fredoka text-5xl font-bold text-purple-600">
                  {growth_indicators.emotional_vocabulary}
                </p>
                <p className="font-fredoka text-sm text-slate-500">words</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center border-4 border-emerald-200"
              >
                <div className="text-4xl mb-2">👁️</div>
                <p className="font-fredoka text-sm text-slate-600 mb-2">Perspective Taking</p>
                <p className="font-fredoka text-3xl font-bold text-emerald-600 capitalize">
                  {growth_indicators.perspective_taking}
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center pt-4"
      >
        <Link href="/">
          <Button variant="outline" size="lg" className="font-fredoka">
            ← Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
