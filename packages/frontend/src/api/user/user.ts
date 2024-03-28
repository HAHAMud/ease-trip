import { createClient } from '../../libs/http/client';

type User = {
  name: string;
  desc: string;
};

const client = createClient({
  baseURL: '/api/user',
});

export async function getUser() {
  const response = await client.get<User>('/');
  return response.data;
}
