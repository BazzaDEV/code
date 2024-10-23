import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { InferSelectModel } from 'drizzle-orm/table'

const users = pgTable('users', {
  id: uuid().primaryKey(),
})

const sessions = pgTable('sessions', {
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
}

export type User = InferSelectModel<typeof users>
export type Session = InferSelectModel<typeof sessions>
