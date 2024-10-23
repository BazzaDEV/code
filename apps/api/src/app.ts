import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { authApp } from './routes/auth'

export const app = new Hono()
  .use('*', cors())
  .use(logger())
  .route('/auth', authApp)

export type AppType = typeof app
