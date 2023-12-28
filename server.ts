import { logDevReady } from '@remix-run/cloudflare';
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import * as build from '@remix-run/dev/server-build';
import {
  initializeGithubAuthStrategy,
  initializeWebAuthnStrategy,
} from './app/services/auth.server';
import type { Env } from './app/types';

if (process.env.NODE_ENV === 'development') {
  logDevReady(build);
}

interface AuthEnv extends Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  OAUTH_CALLBACK_URL_BASE: string;
}

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: (context) => {
    const env = context.env as AuthEnv;
    initializeGithubAuthStrategy({
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: `${env.OAUTH_CALLBACK_URL_BASE}/auth/github/callback`,
    });
    initializeWebAuthnStrategy(env);
    // console.log('initialized', env);

    return { env };
  },
  mode: build.mode,
});
