'use client'

import Copy from '@/components/copy'
import LanguageSelector from '@/components/editor/language-selector'
import { useYjsStore } from '@/lib/stores/yjs-store'
import { toast } from 'sonner'

const CopyRoomLink = ({ roomId }: { roomId: string }) => (
  <Copy
    label={
      <span className="font-mono">
        <span className="text-muted-foreground">Room:</span> {roomId}
      </span>
    }
    value={`${process.env.NEXT_PUBLIC_BASE_URL as string}/${roomId}`}
    afterCopy={() =>
      toast.success('Room link is in your clipboard, boss.', {
        description: `Room ID: ${roomId}`,
      })
    }
  />
)

export default function EditorControls() {
  const { roomId } = useYjsStore()
  return (
    <div className="flex justify-between gap-4 bg-zinc-950 p-2">
      <LanguageSelector />
      <div>
        <CopyRoomLink roomId={roomId!} />
      </div>
    </div>
  )
}
