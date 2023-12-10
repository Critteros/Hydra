import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import type { Config } from '@hydra-ipxe/common/server/config';
import { unlink } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';

import { ConfigModule } from '@/config/config.module';
import { DatabaseModule } from '@/database/database.module';
import { MetadataModule } from '@/metadata/metadata.module';
import { Identity } from '@/utils/identity';

import { IpxeAssetController } from './controllers/ipxe-asset.controler';
import { IpxeBootControler } from './controllers/ipxe-boot.controler';
import { ComputerResolver } from './resolvers/computer.resolver';
import { ComputerGroupResolver } from './resolvers/computerGroup.resolver';
import { IpxeAssetResolver } from './resolvers/ipxe-asset.resolver';
import { IpxeGlobalStrategyResolver } from './resolvers/ipxe-global-strategy.resolver';
import { IpxeStrategyTemplateResolver } from './resolvers/ipxe-strategy-template.resolver';
import { IpxeStrategyResolver, BasicStrategyResolver } from './resolvers/ipxe-strategy.resolver';
import { ComputerService } from './services/computer.service';
import { ComputerGroupService } from './services/computerGroup.service';
import { IpxeAssetService } from './services/ipxe-asset.service';
import { IpxeRendererService } from './services/ipxe-renderer.service';
import { IpxeStrategySelectorService } from './services/ipxe-strategy-selector.service';
import { IpxeStrategyTemplateService } from './services/ipxe-strategy-template.service';
import { IpxeStrategyService } from './services/ipxe-strategy.service';
import { uniqueFilename } from './utils/file-storage';

@Module({
  imports: [
    DatabaseModule,
    MetadataModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Config>) => {
        const storages = {
          local: () =>
            diskStorage({
              destination: configService.get('filestorage.basePath', { infer: true }),
              filename: (req, file, cb) => {
                const fileId = Identity.compactUUID();
                const fileName = uniqueFilename(file.originalname, fileId);
                file.id = fileId;
                req.on('aborted', () => {
                  unlink(
                    join(configService.get('filestorage.basePath', { infer: true })!, fileName),
                    () => {},
                  );
                });
                cb(null, fileName);
              },
            }),
        };
        return {
          storage: storages[configService.get('filestorage.engine', { infer: true })!](),
        };
      },
    }),
  ],
  providers: [
    ComputerResolver,
    ComputerService,
    ComputerGroupResolver,
    ComputerGroupService,
    BasicStrategyResolver,
    IpxeAssetService,
    IpxeAssetResolver,
    IpxeStrategyTemplateResolver,
    IpxeRendererService,
    IpxeStrategyResolver,
    IpxeStrategyService,
    IpxeStrategySelectorService,
    IpxeStrategyTemplateService,
    IpxeGlobalStrategyResolver,
  ],
  controllers: [IpxeAssetController, IpxeBootControler],
})
export class IpxeModule {}
