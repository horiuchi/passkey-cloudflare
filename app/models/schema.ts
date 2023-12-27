/*
  DO NOT RENAME THIS FILE FOR DRIZZLE-ORM TO WORK
*/
import { sql } from 'drizzle-orm';
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

const sharedColumns = {
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
};

export const users = sqliteTable(
  'users',
  {
    id: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    iconUrl: text('icon_url'),

    ...sharedColumns,
  },
  (table) => ({
    emailIdx: uniqueIndex('email_idx').on(table.email),
  }),
);

export const auths = sqliteTable(
  'auths',
  {
    id: text('id').primaryKey().notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    provider: text('provider').notNull(),
    providerUserId: text('provider_user_id').notNull(),
    providerName: text('provider_name').notNull(),
    providerEmail: text('provider_email'),
    providerIconUrl: text('provider_icon_url'),

    ...sharedColumns,
  },
  (table) => ({
    providerIdx: uniqueIndex('provider_idx').on(
      table.provider,
      table.providerUserId,
    ),
  }),
);

export const authenticators = sqliteTable('authenticators', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  credentialPublicKey: text('credential_public_key').notNull(),
  counter: integer('counter').notNull(),
  credentialDeviceType: text('credential_device_type').notNull(),
  credentialBackedUp: integer('credential_backed_up').notNull(),
  transports: text('transports').notNull(),

  ...sharedColumns,
});
