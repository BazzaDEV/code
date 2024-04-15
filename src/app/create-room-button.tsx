'use client'

import { Button } from '@/components/ui/button'
import { createRoom } from '@/lib/api/room'
import { sleep } from '@/lib/utils'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useScramble } from 'use-scramble'

export default function CreateRoomButton() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const buttonText = !loading ? 'Create a new room' : 'Building your room...'
  const { ref } = useScramble({
    text: buttonText,
  })

  async function handleClick() {
    setLoading(true)

    await sleep(3000)
    const room = await createRoom()

    setLoading(false)

    router.push(`/${room.id}`)
  }

  return (
    <Button
      size="lg"
      className="min-w-[350px] font-mono text-xl font-medium tracking-tight"
      disabled={loading}
      onClick={handleClick}
    >
      <span ref={ref} />
    </Button>
  )
}
