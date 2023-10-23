import { type ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import type { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') implements CanActivate {
  override async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest<Request>();

    await super.logIn(request);
    return result;
  }
}
