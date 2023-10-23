import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import type { Request } from 'express';

export const MissingAuthContextError = makeCustomError('MissingAuthContextError');

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest<Request>();

  if (!user) {
    throw new MissingAuthContextError(
      'Missing user context in request. Did you forget to add the AuthGuard?',
    );
  }

  return user;
});
