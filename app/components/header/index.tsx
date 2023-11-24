import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "../../services/auth.server";
import { Link, useLoaderData } from "@remix-run/react";
import * as styles from "./styles.css";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  return { user };
}

export default function Header() {
  const { user } = useLoaderData<typeof loader>() ?? {};

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        Example of Passkey
      </Link>
      {user ? (
        <div className={styles.user}>{user.username}</div>
      ) : (
        <Link className={styles.button} to="/login">
          Log in
        </Link>
      )}
    </header>
  );
}
