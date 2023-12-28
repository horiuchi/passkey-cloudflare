import type { ActionFunctionArgs } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/cloudflare';
import { getAuthenticator } from '../../services/auth.server';
import {
  failureRedirect,
  providerNames,
  successRedirect,
} from '../../services/constants';
import type { Env } from '../../types';

export async function loader() {
  return redirect(failureRedirect);
}

export async function action({ request, context }: ActionFunctionArgs) {
  const env = context.env as Env;
  return getAuthenticator(env).authenticate(providerNames.passkey, request, {
    successRedirect,
    failureRedirect,
  });
}
