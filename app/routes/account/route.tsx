import { type LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import Layout from '../../components/layout';
import { getAuthsByUserId } from '../../models/auth';
import { authenticator, failureRedirect } from '../../services/auth.server';
import type { Env } from '../../types';
import Accounts from './accounts';
import Profile from './profile';

export async function loader({ request, context }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect,
  });
  const auths = await getAuthsByUserId(context.env as Env, user.id);
  return json({ user, auths });
}

export default function Account() {
  const { user, auths } = useLoaderData<typeof loader>();

  return (
    <Layout user={user}>
      <h1 className="text-4xl font-bold mb-4">My Account</h1>
      <Profile user={user} />
      <Accounts user={user} auths={auths} />
    </Layout>
  );
}
