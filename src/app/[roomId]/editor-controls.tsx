'use client'

import Copy from '@/components/copy'
import ActiveUsers from '@/components/editor/active-users'
import LanguageSelector from '@/components/editor/language-selector'
import { hostname, prettyHostname } from '@/lib/constants'
import { useYjsStore } from '@/lib/stores/yjs-store'
import { CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

const CopyRoomLink = ({ roomId }: { roomId: string }) => (
  <Copy
    label={
      <span className="font-mono">
        <span className="hidden text-muted-foreground sm:inline">
          {prettyHostname}/
        </span>
        {roomId}
      </span>
    }
    value={`${hostname}/${roomId}`}
    afterCopy={() =>
      toast.success('Copied room link - share it!', {
        description: `${prettyHostname}/${roomId}`,
        icon: <CheckCircle className="size-4" />,
      })
    }
  />
)

export default function EditorControls() {
  const { roomId } = useYjsStore()
  return (
    <div className="flex justify-between gap-4 bg-zinc-950 p-2 px-4">
      <div className="inline-flex items-center gap-2">
        <ActiveUsers />
        <LanguageSelector />
      </div>
      <div>
        <CopyRoomLink roomId={roomId!} />
      </div>
    </div>
  )
}
