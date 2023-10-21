import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateAccountSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  name: z.string().optional(),
});

export class CreateAccountDto extends createZodDto(CreateAccountSchema) {}
