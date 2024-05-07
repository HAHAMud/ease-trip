import { service } from '@/libs/http/service';
import { LoginPayload, LoginResponse } from './dto-login';

export async function serviceLogin(payload: LoginPayload) {
  const response = await service.post<LoginResponse>('/auth/login', payload);
  return response.data;
}
