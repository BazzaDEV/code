import baseConfig from '@avelin/ui/tailwind'
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  presets: [baseConfig],
} satisfies Config
