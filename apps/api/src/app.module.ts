import { Module } from '@nestjs/common';

import { HydraCoreModule } from '@hydra-ipxe/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HydraCoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
