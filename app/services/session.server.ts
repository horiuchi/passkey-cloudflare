import type { SessionStorage } from '@remix-run/cloudflare';
import {
  createCookie,
  createWorkersKVSessionStorage,
} from '@remix-run/cloudflare';
import type { Env } from '../types';

let sessionStorage: SessionStorage;

export function getSessionStorage(env: Env) {
  if (sessionStorage != null) {
    return sessionStorage;
  }

  sessionStorage = createWorkersKVSessionStorage({
    kv: env.KV,
    cookie: createCookie('__session', {
      sameSite: 'lax',
      path: '/',
      httpOnly: true,
      secrets: [env.COOKIE_SECRET],
      secure: process.env.NODE_ENV === 'production',
    }),
  });
  return sessionStorage;
}
