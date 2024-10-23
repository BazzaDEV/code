import { app } from './app'
import { showRoutes } from 'hono/dev'

showRoutes(app, {
  verbose: true,
})

export default {
  port: 4000,
  fetch: app.fetch,
}
