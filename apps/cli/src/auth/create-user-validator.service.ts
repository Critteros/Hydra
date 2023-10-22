import { Injectable } from '@nestjs/common';

import { CreateAccountSchema } from '@hydra-ipxe/common/server/internal/dto/accounts.dto';
import chalk from 'chalk';

@Injectable()
export class CreateUserValidatorService {
  validateEmail(email: unknown) {
    const result = CreateAccountSchema.shape.email.safeParse(email);
    if (!result.success) {
      throw new Error(chalk.redBright('Please enter a valid email address'));
    }
    return result.data;
  }

  validatePassword(password: unknown) {
    const result = CreateAccountSchema.shape.password.safeParse(password);
    if (!result.success) {
      const { error } = result;
      throw new Error(chalk.redBright(error.issues.map((issue) => issue.message).join('\n')));
    }
    return result.data;
  }

  validateName(name: unknown) {
    const result = CreateAccountSchema.shape.name.safeParse(name);
    if (!result.success) {
      throw new Error(chalk.redBright('Please enter a valid name'));
    }
    return result.data;
  }
}
