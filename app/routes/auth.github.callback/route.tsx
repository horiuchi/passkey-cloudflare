import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "../../services/auth.server";

export async function loader({ request, context }: LoaderFunctionArgs) {
  return authenticator.authenticate("github", request, {
    context,
    successRedirect: "/profile",
    failureRedirect: "/login",
  });
}
