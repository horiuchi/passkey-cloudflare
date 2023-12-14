import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { createSelectSchema } from 'drizzle-zod';
import type { Env } from '../types';
import * as schema from './schema';
import type { User } from './user';

const selectSchema = createSelectSchema(schema.auths);
export type Auth = typeof selectSchema._type;

export async function getAuthsByUserId(
  env: Env,
  userId: string,
): Promise<Auth[]> {
  const db = drizzle(env.DB, { schema });
  const result = await db
    .select()
    .from(schema.auths)
    .where(eq(schema.auths.userId, userId))
    .execute();
  return result;
}

export async function findUserByProviderId(
  env: Env,
  provider: string,
  id: string,
): Promise<User | undefined> {
  const db = drizzle(env.DB, { schema });
  const result = await db
    .select({
      id: schema.users.id,
      name: schema.users.name,
      email: schema.users.email,
      iconUrl: schema.users.iconUrl,
      createdAt: schema.users.createdAt,
      updatedAt: schema.users.updatedAt,
    })
    .from(schema.users)
    .innerJoin(schema.auths, eq(schema.auths.userId, schema.users.id))
    .where(
      and(
        eq(schema.auths.provider, provider),
        eq(schema.auths.providerUserId, id),
      ),
    )
    .limit(1)
    .execute();
  return result[0];
}
