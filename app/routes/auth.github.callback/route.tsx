import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { getAuthenticator } from '../../services/auth.server';
import {
  failureRedirect,
  providerNames,
  successRedirect,
} from '../../services/constants';
import type { Env } from '../../types';

export async function loader({ request, context }: LoaderFunctionArgs) {
  const env = context.env as Env;
  return getAuthenticator(env).authenticate(providerNames.github, request, {
    context,
    successRedirect,
    failureRedirect,
  });
}
