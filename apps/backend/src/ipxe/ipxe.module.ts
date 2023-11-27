import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { ComputerResolver } from './resolvers/computer.resolver';
import { ComputerService } from './services/computer.service';

@Module({
  imports: [DatabaseModule],
  providers: [ComputerResolver, ComputerService],
})
export class IpxeModule {}
