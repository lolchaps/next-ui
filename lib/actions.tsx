'use server';

import { signIn } from './auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Call your API, but do NOT access localStorage here
  const result = await signIn(email, password);

  if (!result.success) {
    return result.message; // return error message to the client
  }

  // The token is returned to the client component.
  return { token: result.token as string };
}
