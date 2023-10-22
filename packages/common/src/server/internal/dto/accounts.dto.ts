import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateAccountSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, { message: 'Password must be at least 4 characters long' }),
  name: z.string().optional(),
});
export type CreateAccount = z.infer<typeof CreateAccountSchema>;

export class CreateAccountDto extends createZodDto(CreateAccountSchema) {}
