import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean(),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, 'At least 6 characters.')
    .max(100, 'At most 100 characters.')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, 'At least 1 letter and 1 number.'),
  city: z.string().optional(),
  serviceAgreement: z.literal<boolean>(true, {
    errorMap: () => ({ message: 'You must agree to the terms of service.' }),
  }),
  businessAgreement: z.literal<boolean>(true, {
    errorMap: () => ({ message: 'You must agree to the data collection for commercial purposes.' }),
  }),
});

export type LoginForm = z.infer<typeof loginSchema>;

export type RegisterFormProps = z.infer<typeof registerSchema>;

export const defaultValues = {
  email: '',
  password: '',
  rememberMe: false,
} satisfies LoginForm;

export const defaultRegisterValues = {
  email: '',
  password: '',
  city: undefined,
  serviceAgreement: false,
  businessAgreement: false,
} satisfies RegisterFormProps;
