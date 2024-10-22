import { type User, type Session, db, schema } from '@avelin/database'
import { newId } from '@avelin/id'
import { eq } from 'drizzle-orm'

export async function createSession(userId: string): Promise<Session> {
  const sessionId = newId('session')
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  }

  const [createdSession] = await db
    .insert(schema.sessions)
    .values(session)
    .returning()
  return createdSession
}

export async function validateSession(
  sessionId: string,
): Promise<SessionValidationResult> {
  const result = await db
    .select({ user: schema.users, session: schema.sessions })
    .from(schema.sessions)
    .innerJoin(schema.users, eq(schema.sessions.userId, schema.users.id))
    .where(schema.sessions.id, sessionId)

  const { user, session } = result[0]

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(schema.sessions).where(eq(schema.sessions.id, sessionId))
    return null
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    await db
      .update(schema.sessions)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(schema.sessions.id, sessionId))
  }
  return { session, user }
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(schema.sessions).where(eq(schema.sessions.id, sessionId))
}

export type SessionValidationResult = { session: Session; user: User } | null
