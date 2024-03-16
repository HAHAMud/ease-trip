import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const defaultValues = {
  email: '',
  password: '',
  rememberMe: false,
} satisfies LoginForm
  
  