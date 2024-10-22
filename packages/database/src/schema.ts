import { pgTable, integer, timestamp, uuid } from 'drizzle-orm/pg-core'
import { InferSelectModel } from 'drizzle-orm/table'

const users = pgTable('users', {
  id: uuid('id').primaryKey(),
})

const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})

export const schema = {
  users,
  sessions,
}

export type User = InferSelectModel<typeof users>
export type Session = InferSelectModel<typeof sessions>
