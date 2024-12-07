import { z } from 'zod';

export const SignupUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  confirmPassword: z.string()
});

export const LoginUserSchema = z.object({
  username: z.string(),
  password: z.string()
});
