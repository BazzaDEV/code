import { create } from 'zustand'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

type YjsState = {
  doc: Y.Doc
  provider: WebrtcProvider | null
  roomId: string | null
}

type YjsActions = {
  initialize: (roomId: string) => void
  destroy: () => void
}

type YjsStore = YjsState & YjsActions

export const useYjsStore = create<YjsStore>((set, get) => ({
  doc: new Y.Doc(),
  roomId: null,
  provider: null,
  initialize: (roomId) => {
    const { doc, provider } = get()

    if (!provider) {
      // Only create a new provider if one does not already exist
      const newProvider = new WebrtcProvider(roomId, doc, {
        signaling: ['wss://bazzadev-code-server.fly.dev'],
      })

      console.log('Initialized WebRTC provider in room', roomId)

      set({ provider: newProvider, roomId })
    } else {
      console.log('Already initialized - no need to repeat.')
    }
  },
  destroy: () => {
    const { provider } = get()

    provider?.destroy()

    console.log('Tore down WebRTC provider.')

    set({ provider: null })
  },
}))
