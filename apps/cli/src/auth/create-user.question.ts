import { QuestionSet, Question, ValidateFor } from 'nest-commander';

import { CreateUserValidatorService } from './create-user-validator.service';

@QuestionSet({ name: 'create-user' })
export class CreateUserQuestion {
  constructor(private readonly validator: CreateUserValidatorService) {}

  @Question({
    type: 'input',
    name: 'email',
    message: 'Email address',
  })
  parseEmail(email: string) {
    return email.trim();
  }

  @ValidateFor({ name: 'email' })
  validateEmail(email: string) {
    try {
      this.validator.validateEmail(email);
    } catch (e) {
      return 'Please enter a valid email address';
    }
    return true;
  }

  @Question({
    type: 'password',
    name: 'password',
    message: 'Password',
  })
  parsePassword(password: string) {
    return password.trim();
  }

  @ValidateFor({ name: 'password' })
  validatePassword(password: string) {
    try {
      this.validator.validatePassword(password);
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
      return 'Please enter a valid password';
    }

    return true;
  }

  @Question({
    type: 'input',
    name: 'name',
    message: 'Name',
  })
  parseName(name: string) {
    const trimmed = name.trim();
    if (trimmed.length === 0) {
      return undefined;
    }
    return trimmed;
  }
}
