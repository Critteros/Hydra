import { Module } from '@nestjs/common';

import { BasicCommand } from './commands/basic';

@Module({
  providers: [BasicCommand],
})
export class AppModule {}
