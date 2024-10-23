import { AppType } from './app'
import { hc } from 'hono/client'

export const client = hc<AppType>('http://localhost:4000/')
