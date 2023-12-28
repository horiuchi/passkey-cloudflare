import { Authenticator } from 'remix-auth';
import type { GitHubStrategyOptions } from 'remix-auth-github';
import { GitHubStrategy } from 'remix-auth-github';
import invariant from 'tiny-invariant';
import { findUserByProviderId } from '../models/auth';
import {
  createAuthenticator,
  getAuthenticatorById,
  getAuthenticatorsByUserId,
} from '../models/authenticator';
import {
  createUser,
  findUserByEmail,
  getUserById,
  type User,
} from '../models/user';
import type { Env } from '../types';
import { providerNames } from './constants';
import { getSessionStorage } from './session.server';
import { WebAuthnStrategy } from './webauthn';

let authenticator: Authenticator<User>;
let webAuthnStrategy: WebAuthnStrategy<User>;

export function getAuthenticator(env: Env) {
  if (authenticator != null) {
    return authenticator;
  }

  authenticator = new Authenticator(getSessionStorage(env));
  authenticator.use(
    createGithubAuthStrategy({
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: `${env.OAUTH_CALLBACK_URL_BASE}/auth/github/callback`,
    }),
  );

  webAuthnStrategy = createWebAuthnStrategy(env);
  authenticator.use(webAuthnStrategy);

  return authenticator;
}

function createGithubAuthStrategy(options: GitHubStrategyOptions) {
  const provider = providerNames.github;
  return new GitHubStrategy(options, async ({ profile, context }) => {
    invariant(context?.env, 'Missing env in context');

    const providerId = profile.id;
    try {
      const user = await findUserByProviderId(
        context?.env as Env,
        provider,
        providerId,
      );
      if (user != null) {
        return user;
      } else {
        const data = {
          provider,
          providerId,
          name: profile.displayName,
          email: profile.emails[0].value,
          iconUrl: profile.photos[0].value,
        };
        return await createUser(context?.env as Env, data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
}

function createWebAuthnStrategy(env: Env) {
  return new WebAuthnStrategy(
    {
      rpName: 'Example of Passkey',
      rpID: (request) => new URL(request.url).hostname,
      origin: (request) => new URL(request.url).origin,
      getUserAuthenticators: async (user: User | null) => {
        const authenticators = await getAuthenticatorsByUserId(env, user?.id);

        return authenticators.map((authenticator) => ({
          ...authenticator,
          transports: authenticator.transports.split(','),
        }));
      },
      getUserDetails: (user: User | null) =>
        user ? { id: user.id, username: user.email } : null,
      getUserByUsername: (username) => findUserByEmail(env, username),
      getAuthenticatorById: (id) => getAuthenticatorById(env, id),
    },
    async ({ authenticator, type, name, username }) => {
      let user: User | null = null;
      const savedAuthenticator = await getAuthenticatorById(
        env,
        authenticator.credentialID,
      );
      if (type === 'registration') {
        if (savedAuthenticator) {
          throw new Error('Authenticator has already been registered.');
        } else {
          if (!name) throw new Error('Name is required.');

          if (!username) throw new Error('Email is required.');
          user = await findUserByEmail(env, username);
          if (user == null) throw new Error('User is not found.');

          await createAuthenticator(env, user.id, name, authenticator);
        }
      } else if (type === 'authentication') {
        if (!savedAuthenticator) throw new Error('Authenticator not found');
        user = (await getUserById(env, savedAuthenticator.userId)) ?? null;
      }

      if (!user) throw new Error('User not found');
      return user;
    },
  );
}

export async function generateWebAuthnRegistrationOptions(
  request: Request,
  env: Env,
  user: User | null,
) {
  if (webAuthnStrategy == null) {
    throw new Error('WebAuthnStrategy is not initialized.');
  }

  const res = await webAuthnStrategy.generateOptions(
    request,
    getSessionStorage(env),
    user,
  );
  return res;
}
