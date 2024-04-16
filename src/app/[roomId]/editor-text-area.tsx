// @ts-nocheck
'use client'

import { Monaco, default as MonacoEditor } from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react'
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
import { useYjsStore } from '@/lib/stores/yjs-store'
import { toast } from 'sonner'
import { languages } from '@/lib/constants'
import { jetbrainsMono } from '@/lib/fonts'
import { argv0 } from 'process'
import { Code } from 'lucide-react'

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
  const { provider, doc, initialize, destroy } = useYjsStore()
  const { language, updateLanguage } = useEditorStore()
  const [editorMounted, setEditorMounted] = useState(false)

  useEffect(() => {
    initialize(roomId)

    return () => destroy()
  }, [roomId])

  useEffect(() => {
    if (editorMounted && provider) {
      const username = uniqueNamesGenerator({ dictionaries: [animals] })

      let awareness = provider.awareness

      awareness.on('change', () => {
        updateCursorStyles(awareness, editorRef.current)
      })

      awareness.setLocalStateField('user', {
        name: username,
        color: randomColor(),
      })

      const remoteSettings = doc.getMap('settings')
      const remoteLanguage = remoteSettings.get('language')

      if (!remoteLanguage) {
        remoteSettings.set('language', 'plaintext')
      } else {
        updateLanguage(remoteLanguage)
      }

      const settings = doc.getMap('settings')
      settings.observe((event) => {
        event.keysChanged.forEach((key) => {
          if (key === 'language') {
            const remoteLanguageValue = settings.get('language')
            const remoteLanguageName =
              languages.find((l) => l.value === remoteLanguageValue)?.name ||
              'Plain Text'

            toast.info(`Editor language is now ${remoteLanguageName}.`, {
              icon: <Code className="size-5" />,
            })

            console.log(
              `Remote language changed to ${remoteLanguageValue} - reflecting this on your editor.`,
            )

            updateLanguage(remoteLanguageValue)
          }
        })
      })

      const type = doc.getText('monaco')

      const binding = new MonacoBinding(
        type,
        editorRef.current.getModel()!,
        new Set([editorRef.current]),
        awareness,
      )
    }
  }, [editorMounted, provider])

  function setupEditor(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) {
    editorRef.current = editor
    monacoRef.current = monaco

    monacoRef.current.editor.defineTheme('dark', themes['dark'])
    monacoRef.current.editor.defineTheme('light', themes['light'])

    monacoRef.current.editor.setTheme(theme ?? 'dark')

    setEditorMounted(true)
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
        onMount={setupEditor}
        options={{
          padding: {
            top: 10,
            bottom: 10,
          },
          fontSize: 16,
          fontFamily: `${jetbrainsMono.style.fontFamily}`,
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
