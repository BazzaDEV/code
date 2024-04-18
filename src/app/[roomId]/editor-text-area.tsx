// @ts-nocheck
'use client'

import { Monaco, default as MonacoEditor } from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react'
import { MonacoBinding } from 'y-monaco'
import { uniqueNamesGenerator, animals } from 'unique-names-generator'
import randomColor from 'randomcolor'
import { useTheme } from 'next-themes'
import * as monaco from 'monaco-editor'
import { colors, tw } from '@/lib/utils'
import useMeasure from 'react-use-measure'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useYjsStore } from '@/lib/stores/yjs-store'
import { toast } from 'sonner'
import { languages } from '@/lib/constants'
import { jetbrainsMono } from '@/lib/fonts'
import { Code } from 'lucide-react'
import './styles.css'

export function getCursorStylesSheet() {
  let styleElement = document.getElementById('cursor-styles')

  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = 'cursor-styles'
    document.head.appendChild(styleElement)
  }

  let styleSheet = styleElement.sheet

  return styleSheet
}

interface EditorProps {
  roomId: string
}

export function updateCursorVisibility(
  clientId: number,
  state,
  isVisible: boolean,
) {
  const styleSheet = getCursorStylesSheet()

  const visibility = isVisible ? 'visible' : 'hidden'
  const opacity = isVisible ? 1 : 0
  const username = state.user?.name || 'Anonymous'
  const color = state.user?.color || randomColor()

  const cursorColorStyle = `.yRemoteSelectionHead-${clientId}, .yRemoteSelectionHead-${clientId}::after { border-color: ${color}; }`
  const selectionColorStyle = `.yRemoteSelection-${clientId} { background-color: ${color}88; }`
  const usernameTagStyle = `
    .yRemoteSelectionHead-${clientId}::before { 
      content: '${username}';
      position: absolute;
      left: -2px; 
      top: -27px;
      white-space: nowrap;
      background-color: ${color};
      color: white;
      padding: ${tw.padding['0.5']} ${tw.padding['1.5']};
      border-radius: 4px;
      font-size: ${tw.fontSize['xs'][0]};
      visibility: ${visibility};
      opacity: ${opacity};
      transition: opacity 0.3s, visibility 0.3s ease-in-out;
    }
  `

  styleSheet.insertRule(cursorColorStyle, styleSheet.cssRules.length)
  styleSheet.insertRule(selectionColorStyle, styleSheet.cssRules.length)
  styleSheet.insertRule(usernameTagStyle, styleSheet.cssRules.length)
}

export function clearCursorStyles() {
  const styleSheet = getCursorStylesSheet()

  while (styleSheet.cssRules.length > 0) {
    styleSheet.deleteRule(0)
  }
}

function initialCursorStyles(awareness, editor) {
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
  const {
    provider,
    doc,
    activeUsers,
    setUserActive,
    setUserIdle,
    cleanupIdleUsers,
    initialize,
    destroy,
  } = useYjsStore()
  const { language, updateLanguage } = useEditorStore()
  const [editorMounted, setEditorMounted] = useState(false)

  useEffect(() => {
    initialize(roomId)

    const intervalId = setInterval(cleanupIdleUsers, 3000)

    return () => {
      clearInterval(intervalId)
      destroy()
    }
  }, [roomId, cleanupIdleUsers])

  useEffect(() => {
    // console.log('Updated active users:', activeUsers)
  }, [activeUsers])

  useEffect(() => {
    if (editorMounted && provider) {
      const username = uniqueNamesGenerator({ dictionaries: [animals] })

      let awareness = provider.awareness

      awareness.getStates().forEach((state, clientId) => {
        // console.log(`Setting ${clientId} to ACTIVE`)
        setUserActive(clientId)
      })

      awareness.on('change', ({ added, updated, removed }) => {
        clearCursorStyles()

        const styleSheet = getCursorStylesSheet()

        const changedClients = new Set([...added, ...updated, ...removed])

        awareness.getStates().forEach((state, clientId) => {
          if (state.user && !changedClients.has(clientId)) {
            const color = state.user.color || randomColor()
            const cursorColorStyle = `.yRemoteSelectionHead-${clientId}, .yRemoteSelectionHead-${clientId}::after { border-color: ${color}; }`
            const selectionColorStyle = `.yRemoteSelection-${clientId} { background-color: ${color}88; }` // Slightly transparent

            styleSheet.insertRule(cursorColorStyle, styleSheet.cssRules.length)
            styleSheet.insertRule(
              selectionColorStyle,
              styleSheet.cssRules.length,
            )
          }
        })

        // console.log('CHANGED:', changedClients)

        added.forEach((clientId) => {
          const state = awareness.getStates().get(clientId)

          setUserActive(clientId)
          updateCursorVisibility(clientId, state, true)
        })
        updated.forEach((clientId) => {
          const state = awareness.getStates().get(clientId)

          setUserActive(clientId)
          updateCursorVisibility(clientId, state, true)
        })
        removed.forEach((clientId) => {
          setUserIdle(clientId)
        })
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
  }, [editorMounted, provider, updateLanguage, setUserActive, setUserIdle])

  function setupEditor(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) {
    editor.focus()

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
            top: 30,
            bottom: 30,
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
