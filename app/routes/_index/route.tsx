import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import Layout from '../../components/layout';
import { getAuthenticator } from '../../services/auth.server';
import type { Env } from '../../types';

export async function loader({ request, context }: LoaderFunctionArgs) {
  const user = await getAuthenticator(context.env as Env).isAuthenticated(
    request,
  );
  return json({ user });
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>() ?? {};

  return (
    <Layout user={user}>
      <h1 className="text-4xl font-bold mb-8">Passkey Web Service</h1>
      <p className="text-large">
        Sample service to log in using Passkey. <br />
        To try it out, first sign in with your Google account and then register
        Passkey.
      </p>
    </Layout>
  );
}
