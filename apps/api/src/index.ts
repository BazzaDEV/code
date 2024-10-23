import { Hono } from 'hono'
import { auth } from '@avelin/api-routes'

const app = new Hono()

app.route('/auth', auth)

export default {
  port: 4000,
  fetch: app.fetch,
}
