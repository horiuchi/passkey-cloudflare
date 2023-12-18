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

export async function action({ request, context }: ActionFunctionArgs) {
  return authenticator.authenticate(providerNames.github, request, {
    context,
    successRedirect,
    failureRedirect,
  });
}
