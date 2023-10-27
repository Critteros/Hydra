import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import type { Request } from 'express';

@Injectable()
export class UserAuthenticated implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const isPublic = this.reflector.get<boolean>('public', context.getHandler());
    if (isPublic) return true;
    if (!request.isAuthenticated()) throw new UnauthorizedException();
    return true;
  }
}
