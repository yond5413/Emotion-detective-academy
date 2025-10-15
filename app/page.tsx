'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from './components/ui/button'
import DetectiveDee from './components/avatars/DetectiveDee'
import Swing from './components/avatars/Swing'
import Slide from './components/avatars/Slide'
import Tree from './components/avatars/Tree'

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12">
      <div className="max-w-5xl w-full px-4">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Detective Dee Hero */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <DetectiveDee mood="excited" className="w-40 h-40 drop-shadow-2xl" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-fredoka text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-6"
          >
            Emotion Detective Academy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-fredoka text-2xl md:text-3xl text-slate-700 mb-4"
          >
            The Lonely Playground Mystery
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-fredoka text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8"
          >
            Something's not quite right at Sunny Park Playground... 
            Our friends need a detective to help them understand their feelings!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            <Link href="/mystery">
              <Button
                size="lg"
                className="font-fredoka text-2xl px-12 py-8 shadow-2xl transform hover:scale-105 transition-all"
              >
                <span className="text-3xl mr-3">🕵️</span>
                Start Investigation
                <span className="text-3xl ml-3">🔍</span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Characters Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { Component: Swing, name: "Swing", mood: "sad" as const, bg: "from-amber-100 to-orange-100", border: "border-amber-400" },
            { Component: Slide, name: "Slide", mood: "worried" as const, bg: "from-blue-100 to-sky-100", border: "border-blue-400" },
            { Component: Tree, name: "Tree", mood: "wise" as const, bg: "from-emerald-100 to-green-100", border: "border-emerald-400" },
          ].map((char, idx) => (
            <motion.div
              key={char.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className={`bg-gradient-to-br ${char.bg} rounded-3xl p-6 border-4 ${char.border} shadow-xl`}
            >
              <div className="flex flex-col items-center">
                <char.Component mood={char.mood} className="w-32 h-32 mb-3" />
                <p className="font-fredoka text-xl font-bold text-slate-800">{char.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border-4 border-indigo-200 shadow-xl mb-8"
        >
          <h2 className="font-fredoka text-2xl font-bold text-center text-indigo-900 mb-6">
            🌟 What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: "❤️", title: "Empathy", description: "Understand how others feel" },
              { emoji: "💭", title: "Emotions", description: "Learn to name feelings" },
              { emoji: "🤝", title: "Friendship", description: "Help friends get along" },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + idx * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-3">{feature.emoji}</div>
                <h3 className="font-fredoka text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="font-fredoka text-sm text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Parent note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center"
        >
          <p className="font-fredoka text-sm text-slate-500">
            👨‍👩‍👧 <strong>For parents:</strong> After your child completes the mystery, 
            view insights at <code className="bg-indigo-100 px-2 py-1 rounded">/parent/[session-id]</code>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
