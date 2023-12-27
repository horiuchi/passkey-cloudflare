import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import type { Env } from '../types';
import * as schema from './schema';

const selectSchema = createSelectSchema(schema.authenticators, {
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
type AuthenticatorRow = typeof selectSchema._type;

export interface Authenticator {
  credentialID: string;
  name: string;
  userId: string;
  credentialPublicKey: string;
  counter: number;
  credentialDeviceType: string;
  credentialBackedUp: number;
  transports: string;
}

function convert(row: AuthenticatorRow): Authenticator {
  return {
    ...row,
    credentialID: row.id,
  };
}

export async function getAuthenticatorById(
  env: Env,
  id: string,
): Promise<Authenticator | null> {
  const db = drizzle(env.DB, { schema });
  const results = await db
    .select()
    .from(schema.authenticators)
    .where(eq(schema.authenticators.id, id))
    .limit(1)
    .execute();
  const result = results[0];
  return result != null ? convert(result) : null;
}

export async function getAuthenticatorsByUserId(
  env: Env,
  userId?: string,
): Promise<Authenticator[]> {
  if (userId == null) {
    return [];
  }

  const db = drizzle(env.DB, { schema });
  const result = await db
    .select()
    .from(schema.authenticators)
    .where(eq(schema.authenticators.userId, userId))
    .execute();
  return result.map(convert);
}

const insertSchema = createInsertSchema(schema.authenticators, {
  credentialBackedUp: (schema) =>
    schema.credentialBackedUp.nonnegative().max(1),
  createdAt: z.never(),
  updatedAt: z.never(),
});

export async function createAuthenticator(
  env: Env,
  userId: string,
  name: string,
  data: Omit<Authenticator, 'userId' | 'name'>,
): Promise<Authenticator> {
  const db = drizzle(env.DB, { schema });

  const authenticator = insertSchema.parse({
    ...data,
    userId,
    id: data.credentialID,
    name,
  });
  const result = await db
    .insert(schema.authenticators)
    .values(authenticator)
    .execute();
  if (result.error != null) {
    throw result.error;
  }
  return convert(authenticator);
}

export async function deleteAuthenticator(
  env: Env,
  credentialID: string,
): Promise<void> {
  const db = drizzle(env.DB, { schema });
  const result = await db
    .delete(schema.authenticators)
    .where(eq(schema.authenticators.id, credentialID))
    .execute();
  if (result.error != null) {
    throw result.error;
  }
}
