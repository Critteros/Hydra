import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';

import { Command, CommandRunner, InquirerService, Option } from 'nest-commander';
import ora from 'ora';
import { firstValueFrom } from 'rxjs';

import { CreateUserValidatorService } from './create-user-validator.service';

type CreateAccount = {
  email: string;
  password: string;
  name?: string;
};

abstract class CreateUserCommand extends CommandRunner {
  abstract readonly url: string;
  abstract readonly userType: string;
  readonly logger: Logger;

  constructor(
    protected readonly httpService: HttpService,
    protected readonly inquirerService: InquirerService,
    protected readonly validator: CreateUserValidatorService,
  ) {
    super();
    this.logger = new Logger(this.constructor.name);
  }

  override async run(inputs: string[], options?: CreateAccount) {
    const params = await this.inquirerService.prompt<CreateAccount>('create-user', options);
    const loading = ora(`Creating ${this.userType} user`).start();

    try {
      await firstValueFrom(this.httpService.post<{ message: 'success' }>(this.url, params));
    } catch (e) {
      loading.fail(`Failed to create ${this.userType} user`);
      throw e;
    }

    loading.succeed(`${this.userType} user created`);
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

@Command({ name: 'create-admin-user', description: 'Create an admin user' })
export class CreateAdminUserCommand extends CreateUserCommand {
  readonly url = '/accounts/create-admin-account';
  readonly userType = 'admin';

  constructor(
    protected readonly httpService: HttpService,
    protected readonly inquirerService: InquirerService,
    protected readonly validator: CreateUserValidatorService,
  ) {
    super(httpService, inquirerService, validator);
  }
}

@Command({ name: 'create-standard-user', description: 'Create an standard user' })
export class CreateStandardUserCommand extends CreateUserCommand {
  readonly url = '/accounts/create-standard-account';
  readonly userType = 'standard';

  constructor(
    protected readonly httpService: HttpService,
    protected readonly inquirerService: InquirerService,
    protected readonly validator: CreateUserValidatorService,
  ) {
    super(httpService, inquirerService, validator);
  }
}
