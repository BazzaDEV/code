import { AppType } from './app'
import { hc } from 'hono/client'

if (!process.env.API_URL) {
  throw new Error('API_URL is not set')
}

export const client = hc<AppType>(process.env.API_URL)
