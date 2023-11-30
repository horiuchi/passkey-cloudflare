import { createId } from "@paralleldrive/cuid2";
import { Authenticator } from "remix-auth";
import type { GitHubStrategyOptions } from "remix-auth-github";
import { GitHubStrategy } from "remix-auth-github";
import invariant from "tiny-invariant";
import { sessionStorage } from "./session.server";
import { createUser, findUserByEmail, type User } from "../models/user";
import type { Env } from "../types";

export const authenticator = new Authenticator<User>(sessionStorage);

let githubStrategy: GitHubStrategy<User> | undefined;
export function initializeGithubAuthStrategy(options: GitHubStrategyOptions) {
  if (githubStrategy != null) {
    return;
  }

  const strategy = new GitHubStrategy(options, async ({ profile, context }) => {
    invariant(context?.env, "Missing env in context");

    const email = profile.emails[0].value;
    try {
      const user = await findUserByEmail(context?.env as Env, email);
      if (user != null) {
        return user;
      } else {
        const newUser = {
          id: createId(),
          name: profile.displayName,
          email,
          iconUrl: profile.photos[0].value,
        };
        await createUser(context?.env as Env, newUser);
        return {
          ...newUser,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } satisfies User;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  authenticator.use(strategy);
  githubStrategy = strategy;
}
