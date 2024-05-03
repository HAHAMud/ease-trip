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
    .min(6, 'At least 6 digits.')
    .max(100, 'At most 100 digits.')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, 'At least 1 letter and 1 number.'),
  city: z.string().optional(),
  serviceAgreement: z.boolean(),
  businessAgreement: z.boolean(),
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
