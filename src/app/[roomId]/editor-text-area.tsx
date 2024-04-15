// @ts-nocheck
'use client'

import { Monaco, default as MonacoEditor } from '@monaco-editor/react'
import { useEffect, useRef } from 'react'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { MonacoBinding } from 'y-monaco'
import { uniqueNamesGenerator, animals } from 'unique-names-generator'
import randomColor from 'randomcolor'
import './styles.css'
import { useTheme } from 'next-themes'
import * as monaco from 'monaco-editor'
import { colors } from '@/lib/utils'
import useMeasure from 'react-use-measure'
import { useEditorStore } from '@/lib/stores/editor-store'

interface EditorProps {
  roomId: string
}

function updateCursorStyles(awareness, editor) {
  // Create or update a style element specifically for cursor styles
  let styleElement = document.getElementById('cursor-styles')
  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = 'cursor-styles'
    document.head.appendChild(styleElement)
  }

  let styleSheet = styleElement.sheet
  while (styleSheet.cssRules.length > 0) {
    styleSheet.deleteRule(0)
  }

  awareness.getStates().forEach((state, clientId) => {
    if (state.user) {
      const color = state.user.color || randomColor()
      const cursorColorStyle = `.yRemoteSelectionHead-${clientId}, .yRemoteSelectionHead-${clientId}::after { border-color: ${color}; }`
      const selectionColorStyle = `.yRemoteSelection-${clientId} { background-color: ${color}88; }` // Slightly transparent

      styleSheet.insertRule(cursorColorStyle, styleSheet.cssRules.length)
      styleSheet.insertRule(selectionColorStyle, styleSheet.cssRules.length)
    }
  })
}

const themes: Record<string, monaco.editor.IStandaloneThemeData> = {
  dark: {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': colors.zinc['900'],
    },
  },
  light: {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': colors.zinc['100'],
    },
  },
} as const

export default function EditorTextArea({ roomId }: EditorProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<Monaco | null>(null)
  const { theme } = useTheme()
  const [ref, { height }] = useMeasure()
  const { language } = useEditorStore()

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) {
    editorRef.current = editor
    monacoRef.current = monaco

    monacoRef.current.editor.defineTheme('dark', themes['dark'])
    monacoRef.current.editor.defineTheme('light', themes['light'])

    monacoRef.current.editor.setTheme(theme ?? 'dark')

    const doc = new Y.Doc()

    const provider = new WebrtcProvider(roomId, doc, {
      signaling: ['wss://signaling.yjs.dev'],
    })

    const username = uniqueNamesGenerator({ dictionaries: [animals] })

    let awareness = provider.awareness

    awareness.on('change', () => {
      updateCursorStyles(awareness, editorRef.current)
    })

    awareness.setLocalStateField('user', {
      name: username,
      color: randomColor(),
    })

    const type = doc.getText('monaco')

    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel()!,
      new Set([editorRef.current]),
      awareness,
    )
  }

  return (
    <div
      ref={ref}
      className="flex-1"
    >
      <MonacoEditor
        width="100vw"
        height={height}
        theme={theme}
        language={language}
        value=""
        onMount={handleEditorDidMount}
        options={{
          padding: {
            top: 10,
            bottom: 10,
          },
          fontSize: 16,
          fontFamily: 'JetBrains Mono',
          fontLigatures: true,
          minimap: {
            enabled: false,
          },
          renderLineHighlight: 'none',
        }}
      />
    </div>
  )
}
