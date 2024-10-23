import { Hono } from 'hono'

export const authApp = new Hono()
  .get('/health', (c) => c.json({ message: 'Hello!' }))
  .get('/', (c) => c.json('Hi!'))
