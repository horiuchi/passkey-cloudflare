import { Button } from '@nextui-org/react';
import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { Form, useLoaderData } from '@remix-run/react';
import { FaGithub, FaKey } from 'react-icons/fa6';
import Layout from '../../components/layout';
import { authenticator } from '../../services/auth.server';
import { sessionStorage } from '../../services/session.server';

type LoaderError = { message: string } | null;

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  if (user != null) {
    return json({ user, error: null });
  }

  const session = await sessionStorage.getSession(
    request.headers.get('Cookie'),
  );
  const error = session.get(authenticator.sessionErrorKey) as LoaderError;
  return json({ user: null, error });
}

export default function Login() {
  const { user, error } = useLoaderData<typeof loader>() ?? {};

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
      <Button
        className="mt-2"
        color="primary"
        variant="ghost"
        startContent={<FaKey />}
      >
        Log in with Passkey
      </Button>
    </Layout>
  );
}
