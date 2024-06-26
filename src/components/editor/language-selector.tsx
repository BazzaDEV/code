'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { languages } from '@/lib/constants'
import { useEditorStore } from '@/lib/stores/editor-store'
import { useYjsStore } from '@/lib/stores/yjs-store'

export default function LanguageSelector() {
  const [open, setOpen] = React.useState(false)
  const { language, updateLanguage } = useEditorStore()
  const { doc } = useYjsStore()

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="justify-between font-mono tracking-tight"
        >
          <div className="inline-flex items-center gap-2">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Language:
            </span>
            <span>
              {language
                ? languages.find((l) => l.value === language)?.name
                : 'Select language...'}
            </span>
          </div>
          <ChevronsUpDown className="ml-4 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No languages found.</CommandEmpty>
            <CommandGroup>
              {languages.map((l) => (
                <CommandItem
                  key={l.value}
                  value={l.value}
                  onSelect={(currentValue) => {
                    updateLanguage(currentValue)

                    const settings = doc.getMap('settings')
                    settings.set('language', currentValue)

                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      language === l.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {l.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
