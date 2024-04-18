import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { Check, Copy as CopyLucide } from 'lucide-react'
import { useState } from 'react'

interface Props {
  label: string | React.ReactNode
  value: string
  afterCopy: () => void
}
export default function Copy({ label, value, afterCopy }: Props) {
  const [, copy] = useCopyToClipboard()
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    copy(value)

    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)

    afterCopy()
  }
  return (
    <Button
      variant="outline"
      className="inline-flex gap-4"
      onClick={handleCopy}
    >
      <div>{label}</div>
      {copied ? (
        <Check className="size-5" />
      ) : (
        <CopyLucide className="size-5" />
      )}
    </Button>
  )
}
