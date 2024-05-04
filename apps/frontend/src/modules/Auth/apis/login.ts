import { createClient } from '../../../libs/http/client';

type User = {
  id: number;
  name: string;
  email: string;
  token: string;
};

const client = createClient({
  baseURL: '/api/auth',
});

export type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
  const response = await client.post<User>('/login', payload);
  return response.data;
}
