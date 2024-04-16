'use client'

import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { createRoom } from '@/lib/api/room'
import { hostname, prettyHostname } from '@/lib/constants'
import { sleep } from '@/lib/utils'
import { Link, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { useScramble } from 'use-scramble'

export default function CreateRoomButton() {
  const router = useRouter()
  const [, copy] = useCopyToClipboard()
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

    copy(`${hostname}/${room.id}`)

    toast.info('Room link is in your clipboard - share it!', {
      description: `${prettyHostname}/${room.id}`,
      icon: <Link className="size-4" />,
    })

    router.push(`/${room.id}`)
  }

  return (
    <Button
      size="lg"
      className="min-w-[350px] font-mono text-xl font-medium tracking-tight"
      disabled={loading}
      onClick={handleClick}
    >
      {!loading && <Plus className="mr-2" />}
      <span ref={ref} />
    </Button>
  )
}
