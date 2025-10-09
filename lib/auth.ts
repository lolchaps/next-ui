import api from './api';
import { cookies } from 'next/headers'; // <-- Import Next.js cookies utility

// NOTE: This function must be called from a Server Component or Server Action

export async function fetchUser() {
  // 1. Read the token from the request cookies (Server-side)
  const token = cookies().get('auth_token')?.value;

  if (!token) {
    return { success: false, message: 'No authentication token found' };
  }

  try {
    // 2. Temporarily set the Authorization header for this specific request
    // This is safer than modifying the global 'api' instance's configuration
    const res = await api.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // If the request succeeds, return the user data
    return { success: true, data: res.data };
  } catch (err: any) {
    // If the API returns 401/403 (Token is invalid or expired)
    return { success: false, message: err.response?.data?.message || 'Unauthenticated' };
  }
}

export async function signIn(email: string, password: string) {
  try {
    // 1. Send login request. Laravel should return a token here.
    // Ensure your Laravel API is configured to issue tokens on login.
    // Example: Laravel route calls Auth::attempt() and then $user->createToken('token-name')->plainTextToken;
    const res = await api.post('/api/login', { email, password });
    // Assume Laravel returns the token in a field named 'token'
    const token = res.data.token;

    return { success: true, token };
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed',
    };
  }
}
