import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "../../services/auth.server";
import { useLoaderData } from "@remix-run/react";
import * as styles from "./styles.css";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return { user };
}

export default function Profile() {
  const { user } = useLoaderData<typeof loader>() ?? {};

  return (
    <>
      <h1>プロファイル</h1>
      <div className={styles.userInfo}>
        <div>名前: {user.username}</div>
        <div>メールアドレス: {user.email}</div>
      </div>
      <button onClick={undefined}>ログアウト</button>
    </>
  );
}
