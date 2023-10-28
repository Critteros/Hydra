import { z } from 'zod';

export const sessionSchema = z.object({
  uid: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
});

export type Session = z.infer<typeof sessionSchema>;
