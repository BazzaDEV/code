import { Hono } from 'hono'
import { generateGoogleAuthorizationUrl } from '@avelin/auth'

export const authApp = new Hono().post('/google', async (c) => {
  const { state, codeVerifier, url } = generateGoogleAuthorizationUrl()
})
