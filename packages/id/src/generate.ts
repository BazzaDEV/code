import { v7 as uuidv7 } from 'uuid'

const prefixes = {
  user: 'user_',
  session: 'session_',
  oauth: 'oauth_',
}

export function newId(prefix: keyof typeof prefixes): string {
  const pre = prefixes[prefix]
  const id = uuidv7().replace(/-/g, '')

  return `${pre}_${id}`
}
