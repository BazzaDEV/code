export const dynamic = 'force-dynamic'

import { getRoom } from '@/lib/api/room'
import EditorTextArea from './editor-text-area'
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
    <div className="flex flex-col min-h-screen w-full">
      <EditorControls />
      <EditorTextArea roomId={room.id} />
    </div>
  )
}
