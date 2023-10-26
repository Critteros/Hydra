import { Controller, Get, Session } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Session() session: Record<string, unknown>) {
    return {
      message: this.appService.getHello(),
      session,
    };
  }
}
