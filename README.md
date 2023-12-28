# Example for Passkey authentication with Cloudflare Pages

- [Demo](https://passkey-cloudflare.pages.dev/)

To log in with Passkey, you need to create an account once you login with your Github account.
After logging in, you will be able to log in by adding Passkey.

## Stack

- TypeScript
- Remix
- cloudflare pages
- cloudflare KV workers
- cloudflare D1
- drizzle-orm
- simplewebauthn

## Setup

### Create a Cloudflare account

Go to [Cloudflare](https://dash.cloudflare.com/sign-up) and create an account.

### Create a Cloudflare Pages application

Go to [Cloudflare Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages) and create a application.

```bash
# setup wrangler command
npx wrangler login
```

### Create a Cloudflare KV namespace

Create a KV namespace for session storage.

```bash
npx wrangler kv:namespace create session
npx wrangler kv:namespace create session --preview
```

And add the following to `wrangler.toml`.

```toml
name = "<your application name>"

...

[[kv_namespaces]]
binding = "KV"
id = "<your kv namespace id>"
preview_id = "<your kv namespace preview_id>"
```

### Create a Cloudflare D1 database

Create a D1 database.

```bash
npx wrangler d1 create <your database name>
```

And add the following to `wrangler.toml`.

```toml
...

[[d1_databases]]
binding = "DB"
database_name = "<your database name>"
database_id = "<your database id>"
```

### Initialize migration files

```bash
rm -rf migrations/*
npm run migrate:create
npm run migrate:apply # apply to local sqlite database
```

### Start development server

```bash
npm run dev
open http://localhost:8788/
```

## Development

Deploy to Cloudflare Pages.

```bash
npm run migrate:apply-prod
npm run deploy-prod
```
