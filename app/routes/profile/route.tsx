import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "../../services/auth.server";
import * as styles from "./styles.css";
import Layout from "../../components/layout";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return json({ user });
}

export default function Profile() {
  const { user } = useLoaderData<typeof loader>() ?? {};

  return (
    <Layout user={user}>
      <h1>Profile</h1>
      <div className={styles.userInfo}>
        <div className={styles.row}>
          icon:
          {user.iconUrl != null ? (
            <img
              src={user.iconUrl}
              alt="user icon"
              className={styles.userIcon}
            />
          ) : null}
        </div>
        <div className={styles.row}>user: {user.name}</div>
        <div className={styles.row}>email: {user.email}</div>
      </div>
      <Form action="/logout" method="post">
        <button className={styles.btnLogout}>Logout</button>
      </Form>
    </Layout>
  );
}
