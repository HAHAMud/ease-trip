import { client } from '@/libs/http/client';
import { LoginPayload, LoginResponse } from './dto-login';

export async function clientLogin(payload: LoginPayload) {
  const response = await client.post<LoginResponse>('/auth/login', payload);
  return response.data;
}
