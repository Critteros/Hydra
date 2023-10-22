import { HttpService } from '@nestjs/axios';

import { type CreateAccount } from '@hydra-ipxe/common/server/internal/dto/accounts.dto';
import { Command, CommandRunner, InquirerService, Option } from 'nest-commander';
import ora from 'ora';
import { firstValueFrom } from 'rxjs';

import { CreateUserValidatorService } from './create-user-validator.service';

@Command({ name: 'create-admin-user', description: 'Create an admin user' })
export class CreateAdminUserCommand extends CommandRunner {
  constructor(
    private readonly httpService: HttpService,
    private readonly inquirerService: InquirerService,
    private readonly validator: CreateUserValidatorService,
  ) {
    super();
  }

  override async run(inputs: string[], options: CreateAccount) {
    const params = await this.inquirerService.prompt<CreateAccount>('create-admin-user', options);
    const loading = ora('Creating admin user').start();

    try {
      await firstValueFrom(
        this.httpService.post<{ message: 'success' }>('/accounts/create-admin-account', params),
      );
    } catch (e) {
      loading.fail('Failed to create admin user');
      throw e;
    }

    loading.succeed('Admin user created');
  }

  @Option({
    flags: '-e, --email <email>',
    description: 'The email address of the user',
  })
  parseEmail(email: string) {
    return this.validator.validateEmail(email);
  }

  @Option({
    flags: '-p, --password <password>',
    description: 'The password of the user',
  })
  parsePassword(password: string) {
    return this.validator.validatePassword(password);
  }

  @Option({
    flags: '-n, --name <name>',
    description: 'The name of the user',
  })
  parseName(name: string) {
    return this.validator.validateName(name);
  }
}
