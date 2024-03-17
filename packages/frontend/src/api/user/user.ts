import { z } from 'zod';
import { createClient } from '../../libs/http/client';

const UserSchema = z.object({
  name: z.string(),
  desc: z.string(),
})

export enum QueryKey {
 GET_USER  = 'getUser',
}

const client = createClient({
  baseURL: '/api/user',
});

export async function getUser() {
  const response = await client.get('/');
  return UserSchema.parse(response.data);
}
