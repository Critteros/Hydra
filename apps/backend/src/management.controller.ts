import { Controller, Get } from '@nestjs/common';

@Controller()
export class ManagementController {
  @Get()
  getHello(): string {
    return 'Hello from socket';
  }
}
