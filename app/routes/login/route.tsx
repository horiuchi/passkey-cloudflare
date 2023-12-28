import { Button } from '@nextui-org/react';
import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { Form, useLoaderData } from '@remix-run/react';
import { FaGithub, FaKey } from 'react-icons/fa6';
import Layout from '../../components/layout';
import {
  generateWebAuthnRegistrationOptions,
  getAuthenticator,
} from '../../services/auth.server';
import { getSessionStorage } from '../../services/session.server';
import { handleFormSubmit } from '../../services/webauthn';
import type { Env } from '../../types';

type LoaderError = { message: string } | null;

export async function loader({ request, context }: LoaderFunctionArgs) {
  const env = context.env as Env;
  const user = await getAuthenticator(env).isAuthenticated(request);
  const options = await generateWebAuthnRegistrationOptions(request, env, user);
  const opts = await options.json();
  const init = { headers: options.headers };

  if (user != null) {
    return json({ user, opts, error: null }, init);
  }

  const session = await getSessionStorage(env).getSession(
    request.headers.get('Cookie'),
  );
  const error = session.get(
    getAuthenticator(env).sessionErrorKey,
  ) as LoaderError;
  return json({ user: null, opts, error }, init);
}

export default function Login() {
  const { user, opts, error } = useLoaderData<typeof loader>() ?? {};

  return (
    <Layout user={user}>
      <h1 className="text-4xl font-bold mb-4">Log in</h1>
      {error != null ? (
        <p role="alert" className="text-danger m-2">
          {error.message}
        </p>
      ) : null}
      <Form action="/auth/github" method="post">
        <Button
          type="submit"
          className="mt-2"
          color="primary"
          variant="ghost"
          startContent={<FaGithub />}
        >
          Log in with Github
        </Button>
      </Form>
      {/* <Button
        className="mt-2"
        color="primary"
        variant="ghost"
        startContent={<FaGoogle />}
      >
        Log in with Google
      </Button> */}
      <Form
        action="/auth/passkey"
        onSubmit={handleFormSubmit(opts)}
        method="post"
      >
        <Button
          type="submit"
          name="intent"
          value="authentication"
          className="mt-2"
          color="primary"
          variant="ghost"
          startContent={<FaKey />}
        >
          Log in with Passkey
        </Button>
      </Form>
    </Layout>
  );
}
