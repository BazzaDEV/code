import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/../tailwind.config'

const fullConfig = resolveConfig(tailwindConfig)

export const colors = fullConfig.theme.colors

export function getPrettyHostname() {
  const url = new URL(process.env.NEXT_PUBLIC_BASE_URL as string)
  let hostname = url.hostname

  if (url.port !== '') {
    hostname += ':' + url.port
  }

  return hostname
}
