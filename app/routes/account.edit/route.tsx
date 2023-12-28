import { redirect, type ActionFunctionArgs } from '@remix-run/server-runtime';
import { updateAuthenticatorName } from '../../models/authenticator';
import type { Env } from '../../types';

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get('id');
  if (typeof id !== 'string') {
    return new Response('Invalid request', { status: 400 });
  }
  const name = formData.get('name');
  if (typeof name !== 'string') {
    return new Response('Invalid request', { status: 400 });
  }

  const env = context.env as Env;
  await updateAuthenticatorName(env, id, name);
  return redirect('../');
}
