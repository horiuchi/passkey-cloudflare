import type { PropsWithChildren } from "react";
import Footer from "../footer";
import type { HeaderProps } from "../header";
import Header from "../header";
import * as styles from "./styles.css";

export default function Layout(props: PropsWithChildren<HeaderProps>) {
  return (
    <>
      <Header {...props} />
      <div className={styles.content}>{props.children}</div>
      <Footer />
    </>
  );
}
