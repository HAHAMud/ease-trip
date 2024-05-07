import { client } from '@/libs/http/client';

type User = {
  name: string;
  desc: string;
};

export async function getUser() {
  const response = await client.get<User>('/user/profile');
  return response.data;
}
