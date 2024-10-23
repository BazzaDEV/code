import { pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid().primaryKey(),
})

export const oauthAccounts = pgTable(
  'oauth_accounts',
  {
    providerId: text().notNull(),
    providerUserId: text().notNull(),
    userId: uuid()
      .notNull()
      .references(() => users.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.providerId, table.providerUserId] }),
    }
  },
)

export const sessions = pgTable('sessions', {
  id: uuid().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp({
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})

export const schema = {
  users,
  sessions,
  oauthAccounts,
}
