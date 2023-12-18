export const providerNames = {
  github: 'github',
  passkey: 'webauthn',
} as const;

export const successRedirect = '/account';
export const failureRedirect = '/login';
