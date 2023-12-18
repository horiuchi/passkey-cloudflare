import type { ActionFunctionArgs } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/cloudflare';
import { authenticator } from '../../services/auth.server';
import {
  failureRedirect,
  providerNames,
  successRedirect,
} from '../../services/constants';

export async function loader() {
  return redirect(failureRedirect);
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    await authenticator.authenticate(providerNames.passkey, request, {
      successRedirect,
      // failureRedirect,
    });
    return { error: null };
  } catch (error) {
    // This allows us to return errors to the page without triggering the error boundary.
    if (error instanceof Response && error.status >= 400) {
      return { error: (await error.json()) as { message: string } };
    }
    throw error;
  }
}
