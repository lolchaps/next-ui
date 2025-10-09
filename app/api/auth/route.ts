import { NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = process.env.LARAVEL_API_URL || 'http://localhost:8000';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Create an axios instance with credentials enabled
    const client = axios.create({
      baseURL: API_URL,
      withCredentials: true,
    });

    // Step 1: Get CSRF cookie from Laravel
    await client.get('/sanctum/csrf-cookie');

    // Step 2: Login request
    const response = await client.post('/login', { email, password });

    // Laravel sets HTTP-only cookies for the session automatically
    return NextResponse.json({ success: true, data: response.data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.response?.data?.message || err.message },
      { status: 401 },
    );
  }
}
