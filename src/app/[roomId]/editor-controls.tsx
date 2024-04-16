'use client'

import Copy from '@/components/copy'
import LanguageSelector from '@/components/editor/language-selector'
import { hostname, prettyHostname } from '@/lib/constants'
import { useYjsStore } from '@/lib/stores/yjs-store'
import { Link } from 'lucide-react'
import { toast } from 'sonner'

const CopyRoomLink = ({ roomId }: { roomId: string }) => (
  <Copy
    label={
      <span className="font-mono">
        <span className="text-muted-foreground">Room:</span> {roomId}
      </span>
    }
    value={`${hostname}/${roomId}`}
    afterCopy={() =>
      toast.info('Room link is in your clipboard - share it!', {
        description: `${prettyHostname}/${roomId}`,
        icon: <Link className="size-4" />,
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
