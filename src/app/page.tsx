import CreateRoomButton from './create-room-button'
import {
  Code,
  Highlighter,
  Package,
  Terminal,
  UsersRound,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import bazzadev from '@/../public/bazzadev.png'
import Title from './title'

export default function Home() {
  return (
    <main className="mx-auto flex h-screen max-w-screen-xl flex-col items-center bg-zinc-100 dark:bg-zinc-950">
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-12 p-4">
        <div className="flex flex-col items-center gap-12">
          <Terminal className="size-24 text-zinc-800 sm:size-64" />
          <Title />
          <p className="text-center font-mono text-lg tracking-tighter sm:text-2xl">
            Create a code room to get started.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6 text-center font-mono">
          <ul className="list-inside space-y-1 text-left text-sm *:flex *:items-center *:gap-2 *:text-center *:text-muted-foreground sm:space-y-2 sm:text-base">
            <li>
              <Package className="text-blue-500/70" /> Powered by{' '}
              <Link
                className="font-semibold hover:underline"
                href="https://microsoft.github.io/monaco-editor"
              >
                Monaco Editor.
              </Link>
            </li>
            <li>
              <UsersRound className="text-green-500/70" /> Real-time
              collaboration.
            </li>
            <li>
              <Highlighter className="text-orange-500/70" /> Syntax
              highlighting.
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
      </div>

      <footer className="flex w-screen items-center justify-center gap-2 p-4">
        <Image
          priority
          src={bazzadev}
          alt="BazzaDEV"
          className="size-6"
        />
        <span className="font-mono text-sm tracking-tighter text-muted-foreground">
          Built by{' '}
          <Link
            className="text-zinc-300 hover:underline"
            href="https://bazza.dev"
          >
            Kian
          </Link>
          .
        </span>
      </footer>
    </main>
  )
}
