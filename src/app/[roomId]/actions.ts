'use server'

import { uniqueNamesGenerator, animals } from 'unique-names-generator'

export async function randomUsername() {
  const random = uniqueNamesGenerator({ dictionaries: [animals] })
  return random
}
