import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { authenticator } from '../../services/auth.server';
import {
  failureRedirect,
  providerNames,
  successRedirect,
} from '../../services/constants';

export async function loader({ request, context }: LoaderFunctionArgs) {
  return authenticator.authenticate(providerNames.github, request, {
    context,
    successRedirect,
    failureRedirect,
  });
}
