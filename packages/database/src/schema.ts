import { pgTable, integer, timestamp, uuid } from 'drizzle-orm/pg-core'
import { InferSelectModel } from 'drizzle-orm/table'

const usersTable = pgTable('users', {
  id: uuid('id').primaryKey(),
})

const sessionsTable = pgTable('sessions', {
  id: uuid('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})

export type User = InferSelectModel<typeof usersTable>
export type Session = InferSelectModel<typeof sessionsTable>
