import type { Metadata } from 'next'
import { innovatorGrotesk } from '@/lib/fonts'
import './globals.css'
import '@avelin/ui/globals.css'

export const metadata: Metadata = {
  title: 'Avelin',
  description: 'Code together, right now.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${innovatorGrotesk.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
