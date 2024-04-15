export const dynamic = 'force-dynamic'

import { getRoom } from '@/lib/api/room'
import { default as _dynamic } from 'next/dynamic'
const EditorTextArea = _dynamic(() => import('./editor-text-area'), {
  ssr: false,
})
import EditorControls from './editor-controls'

interface Props {
  params: {
    roomId: string
  }
}

export default async function Page({ params }: Props) {
  const room = await getRoom({ id: params.roomId })

  if (!room) {
    return <div>Room does not exist.</div>
  }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <EditorControls />
      <EditorTextArea roomId={room.id} />
    </div>
  )
}
