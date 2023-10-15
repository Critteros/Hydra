import { Module } from '@nestjs/common';

import { HydraCoreModule } from '@hydra-ipxe/core';

import { ManagementController } from './management.controller';

@Module({
  imports: [HydraCoreModule],
  controllers: [ManagementController],
  providers: [],
})
export class ManagementModule {}
