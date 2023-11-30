import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import type { Env } from "../types";
import * as schema from "./schema";

const selectSchema = createSelectSchema(schema.users);
export type User = typeof selectSchema._type;

const insertSchema = createInsertSchema(schema.users, {
  email: (schema) => schema.email.email(),
  created_at: z.never(),
  updated_at: z.never(),
});

export async function findUserById(
  env: Env,
  id: string
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
  email: string
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

export async function createUser(
  env: Env,
  data: typeof insertSchema._type
): Promise<void> {
  const user = insertSchema.parse(data);
  const db = drizzle(env.DB, { schema });
  const result = await db.insert(schema.users).values(user).execute();
  if (result.error != null) {
    throw result.error;
  }
}
