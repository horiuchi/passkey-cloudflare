import { Button } from '@nextui-org/react';
import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { Form, useLoaderData } from '@remix-run/react';
import Layout from '../../components/layout';
import { getAuthenticator } from '../../services/auth.server';
import { failureRedirect } from '../../services/constants';
import type { Env } from '../../types';

export async function loader({ request, context }: LoaderFunctionArgs) {
  const env = context.env as Env;
  const user = await getAuthenticator(env).isAuthenticated(request, {
    failureRedirect,
  });
  return json({ user });
}

export async function action({ request, context }: LoaderFunctionArgs) {
  const env = context.env as Env;
  return await getAuthenticator(env).logout(request, { redirectTo: '/' });
}

export default function Logout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <Layout user={user}>
      <h1 className="text-4xl font-bold mb-4">Log out</h1>
      <p role="alert" className="text-danger m-2">
        Log out from your account?
      </p>
      <Form action="/logout" method="post">
        <Button type="submit" className="mt-2" color="danger" variant="ghost">
          Log out
        </Button>
      </Form>
    </Layout>
  );
}
