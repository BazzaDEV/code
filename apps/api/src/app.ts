import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authApp } from './routes/auth'

export const app = new Hono().use('*', cors()).route('/auth', authApp)

export type AppType = typeof app
