import { z } from 'zod';

export const loginSchema = z.object({
  phoneNumber: z.string().min(10, "Please enter a valid 10-digit phone number"),
  password: z.string().min(1, "Password is required to log in"),
});

export type LoginInput = z.infer<typeof loginSchema>;