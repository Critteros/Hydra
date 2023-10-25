import { type CanActivate, type ExecutionContext, Injectable } from '@nestjs/common';

import type { Request } from 'express';

@Injectable()
export class UserAuthenticated implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    return request.isAuthenticated();
  }
}
