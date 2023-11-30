import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "../../services/auth.server";
import { sessionStorage } from "../../services/session.server";
import * as styles from "./styles.css";
import Layout from "../../components/layout";

type LoaderError = { message: string } | null;

export async function loader({ request, context }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  if (user != null) {
    return json({ user, error: null });
  }

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const error = session.get(authenticator.sessionErrorKey) as LoaderError;
  return json({ user: null, error });
}

export default function Login() {
  const { user, error } = useLoaderData<typeof loader>() ?? {};

  return (
    <Layout user={user}>
      <h1>Login</h1>
      {error != null ? (
        <p role="alert" className={styles.alert}>
          {error.message}
        </p>
      ) : null}
      <Form action="/auth/github" method="post">
        <button className={styles.btnGithub}>Login with GitHub</button>
      </Form>
      <button className={styles.btnGoogle}>Login with Google</button>
      <button className={styles.btnPasskey}>Login by Passkey</button>
    </Layout>
  );
}
