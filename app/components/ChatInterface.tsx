'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import DialogueBox from "./DialogueBox"
import Swing from "./avatars/Swing"
import Slide from "./avatars/Slide"
import Tree from "./avatars/Tree"
import DetectiveDee from "./avatars/DetectiveDee"

interface Message {
  role: 'child' | 'character'
  content: string
  character?: string
}

interface ChatInterfaceProps {
  sessionId: string
  character: string
  onClueCollected: (clue: string | null) => void
  onEmotionLearned: (emotion: string) => void
}

export default function ChatInterface({ 
  sessionId, 
  character, 
  onClueCollected,
  onEmotionLearned 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)
  const [hint, setHint] = useState<string | null>(null)

  const characterData: Record<string, { name: string; mood: any; Component: any }> = {
    swing: { name: 'Swing', mood: 'sad', Component: Swing },
    slide: { name: 'Slide', mood: 'worried', Component: Slide },
    tree: { name: 'Tree', mood: 'wise', Component: Tree },
  }

  const currentCharacter = characterData[character]

  useEffect(() => {
    // Reset when character changes
    setMessages([])
    setShowInput(false)
    setTypingComplete(false)
    setHint(null)
    // Send initial greeting
    sendInitialGreeting()
  }, [character])

  const getHint = async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: "Can you give me a hint?",
          target_character: "detective",
        }),
      })
      const data = await response.json()
      setHint(data.response)
    } catch (error) {
      console.error('Failed to get hint:', error)
      setHint("I seem to be lost in thought right now. Try asking one of the playground friends another question.")
    } finally {
      setLoading(false)
    }
  }

  const sendInitialGreeting = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: 'Hello!',
          target_character: character,
        }),
      })
      const data = await response.json()
      setMessages([{ role: 'character', content: data.response, character }])
      if (data.clue_unlocked) {
        onClueCollected(data.clue_unlocked)
      }
      extractEmotions(data.response)
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setLoading(false)
    }
  }

  const extractEmotions = (text: string) => {
    const emotionWords = ['lonely', 'sad', 'worried', 'happy', 'excited', 'grateful', 'forgotten', 'proud', 'scared', 'brave', 'kind', 'angry']
    emotionWords.forEach(word => {
      if (text.toLowerCase().includes(word)) {
        onEmotionLearned(word)
      }
    })
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'child', content: userMessage }])
    setLoading(true)
    setShowInput(false)
    setTypingComplete(false)
    setHint(null)

    try {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: userMessage,
          target_character: character,
        }),
      })
      const data = await response.json()
      
      setMessages(prev => [...prev, { 
        role: 'character', 
        content: data.response,
        character 
      }])

      if (data.clue_unlocked) {
        onClueCollected(data.clue_unlocked)
      }

      extractEmotions(userMessage + ' ' + data.response)
    } catch (error) {
      console.error('Failed to send message:', error)
      setMessages(prev => [...prev, { 
        role: 'character', 
        content: "I'm having trouble hearing you right now. Can you try again?",
        character 
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleTypingComplete = () => {
    setTypingComplete(true)
    setTimeout(() => setShowInput(true), 300)
  }

  const suggestedQuestions = [
    "How do you feel?",
    "Why do you feel that way?",
    "What would help you feel better?",
    "Can you tell me more?",
  ]

  const lastMessage = messages[messages.length - 1]
  const isCharacterTalking = lastMessage?.role === 'character'

  const CharacterAvatar = currentCharacter?.Component

  return (
    <div className="relative flex flex-col items-center justify-end min-h-[600px] bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 rounded-3xl shadow-2xl overflow-hidden p-8">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-20 blur-xl"
        animate={{ scale: [1, 1.2, 1], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-amber-200 rounded-full opacity-20 blur-xl"
        animate={{ scale: [1, 1.3, 1], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      {/* Character Avatar */}
      <AnimatePresence mode="wait">
        {isCharacterTalking && CharacterAvatar && (
          <motion.div
            key={`avatar-${character}`}
            initial={{ opacity: 0, x: -60, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="absolute left-16 bottom-48"
          >
            <CharacterAvatar mood={currentCharacter.mood} className="w-44 h-44 drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detective Dee (clickable for hint) */}
      <motion.button
        onClick={getHint}
        disabled={loading}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1, opacity: 1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-8 right-8 cursor-pointer focus:outline-none group"
        aria-label="Get a hint from Detective Dee"
      >
        <DetectiveDee mood="thinking" className="w-16 h-16 opacity-60 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      {/* Hint Bubble */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute top-28 right-8 z-10"
          >
            <Card className="p-4 bg-indigo-100 border-2 border-indigo-400 shadow-xl max-w-xs relative">
              <button
                onClick={() => setHint(null)}
                className="absolute top-2 right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-xs z-10"
              >
                ✕
              </button>
              <div className="flex items-start gap-3">
                <DetectiveDee mood="thinking" className="w-12 h-12 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-fredoka font-bold text-indigo-800">Detective Dee says:</h4>
                  <p className="font-fredoka text-slate-800 text-sm">{hint}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Area */}
      <div className="flex-1 w-full flex flex-col justify-end space-y-6 mb-6">
        <AnimatePresence mode="wait">
          {messages.slice(-3).map((msg, idx) => (
            <motion.div
              key={messages.length - 3 + idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex ${msg.role === 'child' ? 'justify-end' : 'justify-start'} w-full`}
            >
              {msg.role === 'character' ? (
                <DialogueBox
                  character={character}
                  characterName={currentCharacter?.name || character}
                  message={msg.content}
                  isTyping={idx === messages.slice(-3).length - 1 && !typingComplete}
                  onTypingComplete={idx === messages.slice(-3).length - 1 ? handleTypingComplete : undefined}
                />
              ) : (
                <motion.div
                  className="max-w-md bg-indigo-600 text-white px-6 py-3 rounded-3xl shadow-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-sm font-semibold mb-1 opacity-80">You asked:</p>
                  <p className="font-fredoka text-lg">{msg.content}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start w-full"
          >
            <div className="bg-white/90 backdrop-blur-sm border-4 border-indigo-600 px-6 py-4 rounded-3xl shadow-xl">
              <motion.div
                className="flex gap-2"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <span className="text-2xl">💭</span>
                <p className="font-fredoka text-lg text-slate-600">{currentCharacter?.name} is thinking...</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <AnimatePresence>
        {showInput && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full space-y-4"
          >
            {/* Suggested Questions */}
            <div className="flex gap-2 flex-wrap justify-center">
              {suggestedQuestions.map((q, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setInput(q)}
                  className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full text-sm font-fredoka font-semibold shadow-md transition-colors"
                >
                  💬 {q}
                </motion.button>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex gap-3 items-center">
              <motion.input
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Ask a question..."
                className="flex-1 px-6 py-4 border-4 border-indigo-300 bg-white rounded-2xl text-lg font-fredoka focus:outline-none focus:border-indigo-500 shadow-lg transition-all"
                disabled={loading}
                autoFocus
              />
              <Button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                size="lg"
                className="px-8 shadow-xl"
              >
                <span className="text-xl mr-2">📨</span>
                Send
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
