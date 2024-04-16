import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import BreakpointHelper from '@/components/breakpoint-helper'
import { Toaster } from '@/components/ui/sonner'
import { inter, jetbrainsMono } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'code.',
  description: 'Real-time code editing.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div
            className={`${inter.className} ${jetbrainsMono.variable} min-h-screen bg-background`}
          >
            {children}
            {process.env.NODE_ENV === 'development' && (
              <div className="absolute bottom-0 left-0 m-4">
                <BreakpointHelper />
              </div>
            )}
            <Toaster richColors />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
