import { create } from 'zustand'

type EditorState = {
  language: string
}

type EditorActions = {
  updateLanguage: (language: EditorState['language']) => void
}

type EditorStore = EditorState & EditorActions

export const useEditorStore = create<EditorStore>((set) => ({
  language: 'plaintext',
  updateLanguage: (newLanguage) => set({ language: newLanguage }),
}))
