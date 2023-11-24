import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <h1>Passkey Webサービス</h1>
      <p>GoogleアカウントまたはPasskeyを使用して、簡単にログインできます。</p>
    </>
  );
}
