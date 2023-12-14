import type { ActionFunctionArgs } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/cloudflare';
import {
  authenticator,
  failureRedirect,
  successRedirect,
} from '../../services/auth.server';

export async function loader() {
  return redirect(failureRedirect);
}

export async function action({ request, context }: ActionFunctionArgs) {
  return authenticator.authenticate('github', request, {
    context,
    successRedirect,
    failureRedirect,
  });
}
