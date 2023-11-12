import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

// Services
import { MetadataService } from './metadata.service';

@Module({
  providers: [
    MetadataService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
      }),
    },
  ],
  exports: [MetadataService],
})
export class MetadataModule {}
