import { db, schema } from '@avelin/database'
import { eq } from 'drizzle-orm'

export async function getUserByGoogleId(googleId: string) {
  const [existingUser] = await db
    .select({ id: schema.users.id })
    .from(schema.users)
    .innerJoin(
      schema.oauthAccounts,
      eq(schema.users.id, schema.oauthAccounts.userId),
    )
    .where(eq(schema.oauthAccounts.providerUserId, googleId))
    .limit(1)

  return existingUser
}
