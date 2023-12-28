export interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  OAUTH_CALLBACK_URL_BASE: string;
  COOKIE_SECRET: string;

  KV: KVNamespace;
  DB: D1Database;
}
