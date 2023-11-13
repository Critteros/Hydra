import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { MetadataModule } from '../metadata/metadata.module';

import { ErrorRemapperInterceptor } from './error-remapper.interceptor';

@Module({
  imports: [MetadataModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorRemapperInterceptor,
    },
  ],
})
export class ErrorsModule {}
