import { Link } from "@remix-run/react";
import type { User } from "../../models/user";
import * as styles from "./styles.css";

export interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        Example of Passkey
      </Link>
      {user != null ? (
        <div className={styles.container}>
          {user.iconUrl != null ? (
            <img className={styles.icon} src={user.iconUrl} alt={user.name} />
          ) : (
            <div className={styles.user}>{user.name}</div>
          )}
        </div>
      ) : (
        <Link className={styles.button} to="/login">
          Log in
        </Link>
      )}
    </header>
  );
}
