import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Config } from '@hydra-ipxe/common/server/config';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService<Config>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
