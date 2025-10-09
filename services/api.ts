// services/api.ts
export async function apiFetch(
  endpoint: string,
  options?: RequestInit
): Promise<any> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      ...options,
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`API Error ${res.status}: ${errorBody}`);
    }

    return res.json();
  } catch (err) {
    console.error('[apiFetch error]', err);
    throw err;
  }
}
