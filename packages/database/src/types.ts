import { InferSelectModel } from 'drizzle-orm/table'
import { users, sessions, oauthAccounts } from './schema'

export type User = InferSelectModel<typeof users>
export type Session = InferSelectModel<typeof sessions>
export type OAuthAccount = InferSelectModel<typeof oauthAccounts>
