import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import type { Config } from '@hydra-ipxe/common/server/config';
import { diskStorage } from 'multer';

import { ConfigModule } from '@/config/config.module';
import { DatabaseModule } from '@/database/database.module';
import { MetadataModule } from '@/metadata/metadata.module';

import { IpxeAssetController } from './controllers/ipxe-asset.controler';
import { uniqueFilename } from './files';
import { ComputerResolver } from './resolvers/computer.resolver';
import { ComputerGroupResolver } from './resolvers/computerGroup.resolver';
import { IpxeAssetResolver } from './resolvers/ipxe-asset.resolver';
import { ComputerService } from './services/computer.service';
import { ComputerGroupService } from './services/computerGroup.service';
import { IpxeAssetService } from './services/ipxe-asset.service';

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
                cb(null, uniqueFilename(file.originalname));
              },
            }),
        };
        return {
          storage: storages[configService.get('filestorage.engine', { infer: true })!](),
          limits: {
            fileSize: configService.get('filestorage.maxFileSize', { infer: true }),
          },
        };
      },
    }),
  ],
  providers: [
    ComputerResolver,
    ComputerService,
    ComputerGroupResolver,
    ComputerGroupService,
    IpxeAssetService,
    IpxeAssetResolver,
  ],
  controllers: [IpxeAssetController],
})
export class IpxeModule {}
