import { type LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import Layout from '../../components/layout';
import { getAuthsByUserId } from '../../models/auth';
import { getAuthenticatorsByUserId } from '../../models/authenticator';
import {
  generateWebAuthnRegistrationOptions,
  getAuthenticator,
} from '../../services/auth.server';
import { failureRedirect } from '../../services/constants';
import type { Env } from '../../types';
import Accounts from './accounts';
import Passkeys from './passkeys';
import Profile from './profile';

export async function loader({ request, context }: LoaderFunctionArgs) {
  const env = context.env as Env;
  const user = await getAuthenticator(env).isAuthenticated(request, {
    failureRedirect,
  });

  const auths = await getAuthsByUserId(env, user.id);
  const authenticators = await getAuthenticatorsByUserId(env, user.id);
  const opts = await generateWebAuthnRegistrationOptions(request, env, user);
  return json(
    { user, auths, authenticators, opts: await opts.json() },
    { headers: opts.headers },
  );
}

export default function Account() {
  const { user, auths, authenticators, opts } = useLoaderData<typeof loader>();

  return (
    <Layout user={user}>
      <h1 className="text-4xl font-bold mb-4">My Account</h1>
      <Profile user={user} />
      <Accounts user={user} auths={auths} />
      <Passkeys user={user} authenticators={authenticators} opts={opts} />
    </Layout>
  );
}
