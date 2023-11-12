import { Injectable } from '@nestjs/common';

import chalk from 'chalk';
import { z } from 'zod';

@Injectable()
export class CreateUserValidatorService {
  validateEmail(email: unknown) {
    const result = z.string().email().safeParse(email);
    if (!result.success) {
      throw new Error(chalk.redBright('Please enter a valid email address'));
    }
    return result.data;
  }

  validatePassword(password: unknown) {
    const result = z
      .string()
      .min(4, { message: 'Password must be at least 4 characters long' })
      .max(100, { message: 'Password must be less than 100 characters long' })
      .safeParse(password);
    if (!result.success) {
      const { error } = result;
      throw new Error(chalk.redBright(error.issues.map((issue) => issue.message).join('\n')));
    }
    return result.data;
  }

  validateName(name: unknown) {
    const result = z.string().max(100).optional().safeParse(name);
    if (!result.success) {
      throw new Error(chalk.redBright('Please enter a valid name'));
    }
    return result.data;
  }
}
