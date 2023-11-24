import * as styles from "./styles.css";

export default function Register() {
  return (
    <>
      <h1>新規登録</h1>
      <form className={styles.container}>
        <label className={styles.label} htmlFor="email">
          メールアドレス:
        </label>
        <input
          className={styles.inputText}
          type="email"
          name="email"
          id="email"
        />
        <button className={styles.inputButton} type="submit">
          登録する
        </button>
      </form>
    </>
  );
}
