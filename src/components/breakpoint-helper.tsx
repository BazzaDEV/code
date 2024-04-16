'use client'

import { useBreakpoint } from '@/hooks/use-breakpoint'
import { useMeasure } from '@/hooks/use-measure'
import { Ruler, SeparatorVertical } from 'lucide-react'
import { useScramble } from 'use-scramble'

export default function BreakpointHelper() {
  const breakpoint = useBreakpoint()
  const [width] = useMeasure()

  const { ref: bpRef } = useScramble({
    text: breakpoint,
    speed: 0.4,
  })

  return (
    <div className="flex items-center gap-4 rounded-full bg-background px-4 py-1 font-mono">
      <Ruler className="size-4" />
      <span ref={bpRef}></span>
      <span className="text-muted-foreground">{width}px</span>
    </div>
  )
}
