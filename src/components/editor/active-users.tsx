'use client'

import { useYjsStore } from '@/lib/stores/yjs-store'
import { cn } from '@/lib/utils'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { UsersRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

type User = { username: string; color: string }

export default function ActiveUsers() {
  const { provider } = useYjsStore()
  const [users, setUsers] = useState<User[]>([])

  const n = users.length

  useEffect(() => {
    if (provider) {
      provider.awareness.on('change', () => {
        const arr: User[] = []
        provider.awareness.getStates().forEach((state) => {
          if (state.user) {
            const username = state.user.name
            const color = state.user.color

            arr.push({ username, color })
          }
        })

        setUsers(arr)
      })
    }
  }, [provider])

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className="inline-flex select-none items-center gap-2 px-2 font-mono"
        >
          <UsersRound className="size-5 text-muted-foreground" />
          <span className="text-sm">{users.length}</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        className="flex flex-col gap-1 p-4"
      >
        <span className="mb-2 font-mono text-sm tracking-tight text-muted-foreground">
          There {n > 1 ? 'are' : 'is'} {n} active user{n > 1 && 's'}.
        </span>
        {users.map((user) => (
          <div
            style={{ color: user.color }}
            className="font-mono text-sm tracking-tight"
            key={user.username}
          >
            {user.username}
          </div>
        ))}
      </HoverCardContent>
    </HoverCard>
  )
}
