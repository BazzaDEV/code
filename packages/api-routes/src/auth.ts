import { Hono } from 'hono'

export const auth = new Hono().get('/', (c) => c.json('Hello!'))
