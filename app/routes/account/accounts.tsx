import { Button } from '@nextui-org/react';
import { Form } from '@remix-run/react';
import { FaGithub, FaKey } from 'react-icons/fa6';
import type { WebAuthnOptionsResponse } from 'remix-auth-webauthn';
import { handleFormSubmit } from 'remix-auth-webauthn';
import type { Auth } from '../../models/auth';
import type { User } from '../../models/user';
import { providerNames } from '../../services/constants';

export interface AccountsProps {
  user: User;
  auths: Auth[];
  opts: WebAuthnOptionsResponse;
}

export default function Accounts({ user, auths, opts }: AccountsProps) {
  let isLoggedInByGithub = false;
  for (const auth of auths) {
    if (auth.provider === providerNames.github) {
      isLoggedInByGithub = true;
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold m-4">Accounts</h1>
      <Form action="/auth/github" method="post">
        <Button
          type="submit"
          className="mt-2"
          color="primary"
          variant="ghost"
          startContent={<FaGithub />}
          isDisabled={isLoggedInByGithub}
        >
          {isLoggedInByGithub ? 'Logged' : 'Log'} in with Github
        </Button>
      </Form>
      <Form
        action="/auth/passkey"
        onSubmit={handleFormSubmit(opts)}
        method="POST"
      >
        <input type="hidden" name="username" value={user.email} />
        <Button
          type="submit"
          name="intent"
          value="registration"
          className="mt-2"
          color="primary"
          variant="ghost"
          startContent={<FaKey />}
        >
          Add Passkey
        </Button>
      </Form>
    </>
  );
}
