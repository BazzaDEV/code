import { create } from 'zustand'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { IndexeddbPersistence } from 'y-indexeddb'
import {
  clearCursorStyles,
  getCursorStylesSheet,
  updateCursorVisibility,
} from '@/app/[roomId]/editor-text-area'
import { toast } from 'sonner'

type YjsState = {
  doc: Y.Doc
  offlineProvider: IndexeddbPersistence | null
  provider: WebrtcProvider | null
  roomId: string | null
  activeUsers: Map<number, number>
}

type YjsActions = {
  initialize: (roomId: string) => void
  destroy: () => void
  setUserActive: (clientId: number) => void
  setUserIdle: (clientId: number) => void
  cleanupIdleUsers: () => void
}

type YjsStore = YjsState & YjsActions

export const useYjsStore = create<YjsStore>((set, get) => ({
  doc: new Y.Doc(),
  roomId: null,
  activeUsers: new Map<number, number>(),
  offlineProvider: null,
  provider: null,
  initialize: (roomId) => {
    const { doc, provider, offlineProvider } = get()

    if (!offlineProvider) {
      const newOfflineProvider = new IndexeddbPersistence(roomId, doc)
      newOfflineProvider.on(
        'synced',
        (iDbPersistence: IndexeddbPersistence) => {
          console.log(
            `Content restored for room ${iDbPersistence.name} from local cache.`,
          )
        },
      )

      set({ offlineProvider: newOfflineProvider })
    }

    if (!provider) {
      // Only create a new provider if one does not already exist
      const newProvider = new WebrtcProvider(roomId, doc, {
        signaling: ['wss://bazzadev-code-server.fly.dev'],
      })

      console.log('=============================')
      console.log('Initialized WebRTC provider.')
      console.log('Room:', newProvider.roomName)
      console.log('Client ID:', newProvider.awareness.clientID)
      console.log('=============================')

      set({ provider: newProvider, roomId })
    } else {
      console.log('Already initialized - no need to repeat.')
    }
  },
  setUserActive: (clientId) => {
    const { activeUsers } = get()

    // console.log(`Setting ${clientId} active`)

    activeUsers.set(clientId, Date.now())

    set({ activeUsers: new Map([...activeUsers]) })
  },
  setUserIdle: (clientId) => {
    const { activeUsers } = get()

    // console.log(`Setting ${clientId} idle`)

    activeUsers.delete(clientId)

    set({ activeUsers: new Map([...activeUsers]) })
  },
  cleanupIdleUsers: () => {
    const { activeUsers, provider } = get()

    // console.log('Cleaning up idle users...')

    const allUsers = [...activeUsers]
    const allUsersSet = new Set([...allUsers.keys()])

    const now = Date.now()

    clearCursorStyles()

    const styleSheet = getCursorStylesSheet()

    provider?.awareness.getStates().forEach((state, clientId) => {
      if (state.user && !allUsersSet.has(clientId)) {
        const color = state.user.color
        const cursorColorStyle = `.yRemoteSelectionHead-${clientId}, .yRemoteSelectionHead-${clientId}::after { border-color: ${color}; }`
        const selectionColorStyle = `.yRemoteSelection-${clientId} { background-color: ${color}88; }` // Slightly transparent

        styleSheet.insertRule(cursorColorStyle, styleSheet.cssRules.length)
        styleSheet.insertRule(selectionColorStyle, styleSheet.cssRules.length)
      }
    })

    const onlyActiveUsers = allUsers.filter(([clientId, lastActive]) => {
      const state = provider?.awareness.getStates().get(clientId)

      if (now - lastActive > 3000) {
        updateCursorVisibility(clientId, state, false)
        return false
      }

      updateCursorVisibility(clientId, state, true)
      return true
    })

    set({ activeUsers: new Map<number, number>(onlyActiveUsers) })
  },
  destroy: () => {
    const { doc, provider, offlineProvider } = get()

    doc.destroy()
    provider?.destroy()
    offlineProvider?.destroy()

    console.log('Destroyed Yjs document.')
    console.log('Tore down WebRTC provider.')
    console.log('Tore down IndexedDB provider.')

    set({
      doc: new Y.Doc(),
      provider: null,
      offlineProvider: null,
      activeUsers: new Map<number, number>(),
    })
  },
}))
