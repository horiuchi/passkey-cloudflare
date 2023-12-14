import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import type { Env } from '../types';
import * as schema from './schema';

const selectSchema = createSelectSchema(schema.users);
export type User = typeof selectSchema._type;

export async function getUserById(
  env: Env,
  id: string,
): Promise<User | undefined> {
  const db = drizzle(env.DB, { schema });
  const result = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, id))
    .limit(1)
    .execute();
  return result[0];
}

export async function findUserByEmail(
  env: Env,
  email: string,
): Promise<User | undefined> {
  const db = drizzle(env.DB, { schema });
  const result = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1)
    .execute();
  return result[0];
}

export async function getUsers(env: Env): Promise<User[]> {
  const db = drizzle(env.DB, { schema });
  const result = await db.select().from(schema.users).all();
  return result;
}

const insertUserSchema = createInsertSchema(schema.users, {
  email: (schema) => schema.email.email(),
  iconUrl: (schema) => schema.iconUrl.url().optional(),
  createdAt: z.never(),
  updatedAt: z.never(),
});
const insertAuthSchema = createInsertSchema(schema.auths, {
  providerEmail: (schema) => schema.providerEmail.email().optional(),
  providerIconUrl: (schema) => schema.providerIconUrl.url().optional(),
  createdAt: z.never(),
  updatedAt: z.never(),
});

export async function createUser(
  env: Env,
  data: {
    provider: string;
    providerId: string;
    name: string;
    email: string;
    iconUrl?: string;
  },
): Promise<User> {
  const db = drizzle(env.DB, { schema });
  const userId = createId();
  const authId = createId();

  const user = insertUserSchema.parse({ ...data, id: userId });
  const result = await db.insert(schema.users).values(user).execute();
  if (result.error != null) {
    throw result.error;
  }
  {
    const auth = insertAuthSchema.parse({
      id: authId,
      userId,
      provider: data.provider,
      providerUserId: data.providerId,
      providerName: data.name,
      providerEmail: data.email,
      providerIconUrl: data.iconUrl,
    });
    const result = await db.insert(schema.auths).values(auth).execute();
    if (result.error != null) {
      throw result.error;
    }
  }
  return {
    ...user,
    iconUrl: user.iconUrl ?? null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
