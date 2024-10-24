import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'

export const innovatorGrotesk = localFont({
  src: './assets/InnovatorGroteskVF-VF.woff2',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
})
