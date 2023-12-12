import { Authenticator } from 'remix-auth';
import type { GitHubStrategyOptions } from 'remix-auth-github';
import { GitHubStrategy, GitHubStrategyDefaultName } from 'remix-auth-github';
import invariant from 'tiny-invariant';
import { sessionStorage } from './session.server';
import { createUser, type User } from '../models/user';
import type { Env } from '../types';
import { findUserByProviderId } from '../models/auth';

export const authenticator = new Authenticator<User>(sessionStorage);

let githubStrategy: GitHubStrategy<User> | undefined;
export function initializeGithubAuthStrategy(options: GitHubStrategyOptions) {
  if (githubStrategy != null) {
    return;
  }

  const provider = GitHubStrategyDefaultName;
  const strategy = new GitHubStrategy(options, async ({ profile, context }) => {
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
  authenticator.use(strategy);
  githubStrategy = strategy;
}
