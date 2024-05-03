import { createClient } from '@/libs/http/client';
import { RegisterFormProps } from '@/modules/Auth/models';

type RegisterResult = { email: string; password: string; name: string; token: string };

const client = createClient({
  baseURL: '/api/auth',
});

export async function registerAccount(payload: RegisterFormProps) {
  // FIXME: 送出資料渲染 dom 畫面會有問題
  try {
    const response = await client.post<RegisterResult>('/register', payload);

    return response.data;
  } catch (error: any) {
    console.log('🚀 ~ registerAccount ~ error:', error);
  }
}

export async function checkEmail(payload: { email: string }) {
  const response = await client.post<{ isExisting: boolean }>('/check-email', payload);

  return response.data;
}
