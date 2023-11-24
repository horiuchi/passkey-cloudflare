import { Link } from "@remix-run/react";
import * as styles from "./styles.css";

export default function Login() {
  return (
    <>
      <h1>ログイン</h1>
      <button className={styles.btnGoogle}>Googleでログイン</button>
      <button className={styles.btnPasskey}>Passkeyでログイン</button>
      <p>
        <Link to="/register">登録</Link>
      </p>
    </>
  );
}
