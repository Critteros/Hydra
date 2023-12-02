import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { ComputerResolver } from './resolvers/computer.resolver';
import { ComputerGroupResolver } from './resolvers/computerGroup.resolver';
import { ComputerService } from './services/computer.service';
import { ComputerGroupService } from './services/computerGroup.service';

@Module({
  imports: [DatabaseModule],
  providers: [ComputerResolver, ComputerService, ComputerGroupResolver, ComputerGroupService],
})
export class IpxeModule {}
