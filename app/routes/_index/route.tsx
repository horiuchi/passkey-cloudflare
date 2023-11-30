import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import Layout from "../../components/layout";
import { authenticator } from "../../services/auth.server";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  return json({ user });
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>() ?? {};

  return (
    <Layout user={user}>
      <h1>Passkey Web Service</h1>
      <p>
        Sample service to log in using Passkey. <br />
        To try it out, first sign in with your Google account and then register
        Passkey.
      </p>
    </Layout>
  );
}
