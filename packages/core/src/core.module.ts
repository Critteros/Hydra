import { Module } from '@nestjs/common';

import { CoreService } from './core.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [CoreService, PrismaService],
  exports: [CoreService],
})
export class HydraCoreModule {}
