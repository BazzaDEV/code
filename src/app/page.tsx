'use client'

import { useScramble } from 'use-scramble'
import CreateRoomButton from './create-room-button'
import { useEffect, useState } from 'react'
import { Code, Highlighter, UsersRound, Zap } from 'lucide-react'

export default function Home() {
  const texts = [
    'Ready to code?',
    'Ready to develop?',
    'Ready to share?',
    'Ready to work?',
  ]
  const [index, setIndex] = useState(0)

  const { ref: titleRef, replay } = useScramble({
    text: texts[index],
    overflow: true,
    scramble: 5,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((index + 1) % 3)
    }, 3000)

    return () => clearInterval(timer)
  })
  return (
    <main className="mx-auto flex h-screen max-w-screen-xl flex-col items-center justify-center gap-48 bg-zinc-100 p-4 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-12">
        <h1
          className="h-12 text-center text-5xl font-bold tracking-tighter sm:h-24 sm:text-7xl"
          ref={titleRef}
        />
        <p className="text-center font-mono text-xl tracking-tighter sm:text-2xl">
          Create a new room to get started.
        </p>
      </div>
      <div className="flex flex-col items-center gap-6 text-center font-mono">
        <ul className="list-inside space-y-1 text-left *:flex *:gap-2 *:text-center *:text-muted-foreground">
          <li>
            <UsersRound className="text-green-500/70" /> Real-time
            collaboration.
          </li>
          <li>
            <Highlighter className="text-orange-500/70" /> Syntax highlighting.
          </li>
          <li>
            <Zap className="text-yellow-500/70" /> Language servers.
          </li>
          <li>
            <Code className="text-purple-500/70" /> Over 20 languages.
          </li>
        </ul>
      </div>

      <CreateRoomButton />
    </main>
  )
}
