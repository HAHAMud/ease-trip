import { createApiClient } from '../apiBase';

const client = createApiClient({
  baseURL: '/api/user',
});

export async function getUser() {
  const { data } = await client.get<{ name: string; desc: string }>('/');
  return data;
}
