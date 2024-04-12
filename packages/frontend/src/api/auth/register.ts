import { createClient } from '@/libs/http/client';
import { RegisterForm } from '@/modules/Auth/models';

type RegisterResult = { email: string; password: string; name: string; token: string };

const client = createClient({
  baseURL: '/api/auth',
});

export async function register(payload: RegisterForm) {
  const response = await client.post<RegisterResult>('/register', payload);

  return response.data;
}
