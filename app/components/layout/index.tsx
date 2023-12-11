import type { PropsWithChildren } from "react";
import Footer from "../footer";
import type { HeaderProps } from "../header";
import Header from "../header";

export default function Layout(props: PropsWithChildren<HeaderProps>) {
  return (
    <div className="h-screen flex flex-col">
      <Header {...props} />
      <div className="flex flex-col flex-1 items-center justify-center">
        {props.children}
      </div>
      <Footer />
    </div>
  );
}
