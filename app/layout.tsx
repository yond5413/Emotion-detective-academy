import './globals.css'
import type { Metadata } from 'next'
import { Fredoka, Inter } from 'next/font/google'

const fredoka = Fredoka({ 
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Emotion Detective Academy',
  description: 'AI-powered mystery game for emotional learning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fredoka.variable} ${inter.variable}`}>
      <body className="font-sans bg-gradient-warm min-h-screen">
        <header className="w-full p-6 bg-primary text-white font-fredoka font-bold text-2xl shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <span className="text-3xl">🕵️</span>
            <span>Emotion Detective Academy</span>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-4 md:p-6">{children}</main>
      </body>
    </html>
  )
}

