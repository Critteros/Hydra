import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { MetadataService } from '@/metadata/metadata.service';
import { extractRequest } from '@/utils/context';

import { PublicHandler } from '../decorators/public.decorator';

@Injectable()
export class AuthenticatedOrPublic implements CanActivate {
  constructor(private readonly metadataService: MetadataService) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.metadataService.getDecoratorMetadata({
      context,
      decorator: PublicHandler,
      priority: 'handler',
    });

    if (isPublic) return true;

    const req = extractRequest(context);

    if (!req.isAuthenticated()) throw new UnauthorizedException();

    return true;
  }
}
