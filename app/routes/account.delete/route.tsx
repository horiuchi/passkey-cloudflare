import { redirect, type ActionFunctionArgs } from '@remix-run/server-runtime';
import { deleteAuthenticator } from '../../models/authenticator';
import type { Env } from '../../types';

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get('id');
  if (typeof id !== 'string') {
    return new Response('Invalid request', { status: 400 });
  }

  const env = context.env as Env;
  await deleteAuthenticator(env, id);
  return redirect('../');
}
