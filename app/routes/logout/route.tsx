import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "../../services/auth.server";
import Layout from "../../components/layout";
import { Form, useLoaderData } from "@remix-run/react";
import { Button } from "@nextui-org/react";

export async function action({ request }: LoaderFunctionArgs) {
  return await authenticator.logout(request, { redirectTo: "/" });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return json({ user });
}

export default function Logout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <Layout user={user}>
      <h1 className="text-4xl font-bold mb-4">Log out</h1>
      <p role="alert" className="text-danger m-2">
        Log out from your account?
      </p>
      <Form action="/logout" method="post">
        <Button type="submit" className="mt-2" color="danger" variant="ghost">
          Log out
        </Button>
      </Form>
    </Layout>
  );
}
