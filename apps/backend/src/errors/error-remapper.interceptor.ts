import {
  Injectable,
  type NestInterceptor,
  type ExecutionContext,
  type CallHandler,
} from '@nestjs/common';

import { remapErrors } from '@hydra-ipxe/common/shared/errors';
import type { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

import { MetadataService } from '@/metadata/metadata.service';

import { MapErrors } from './map-errors.decorator';

@Injectable()
export class ErrorRemapperInterceptor implements NestInterceptor {
  constructor(private readonly metadataService: MetadataService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const metadata = this.metadataService.getDecoratorMetadata({
      context,
      decorator: MapErrors,
      selector: (metadata) => metadata.if,
    });

    if (!metadata) {
      return next.handle();
    }

    const remapper = remapErrors(metadata);
    return next.handle().pipe(catchError((err) => throwError(() => remapper(err))));
  }
}
