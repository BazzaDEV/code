import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'

export const innovatorGrotesk = localFont({
  src: [
    {
      path: './assets/InnovatorGrotesk-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './assets/InnovatorGrotesk-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: './assets/InnovatorGrotesk-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './assets/InnovatorGrotesk-ExtraLightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: './assets/InnovatorGrotesk-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './assets/InnovatorGrotesk-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './assets/InnovatorGrotesk-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/InnovatorGrotesk-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './assets/InnovatorGrotesk-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './assets/InnovatorGrotesk-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './assets/InnovatorGrotesk-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './assets/InnovatorGrotesk-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: './assets/InnovatorGrotesk-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './assets/InnovatorGrotesk-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: './assets/InnovatorGrotesk-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './assets/InnovatorGrotesk-ExtraBoldItalic.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: './assets/InnovatorGrotesk-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './assets/InnovatorGrotesk-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-innovator-grotesk',
  display: 'swap', // Recommended for performance
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})
