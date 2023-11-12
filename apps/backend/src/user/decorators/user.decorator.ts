import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';

import { extractRequest } from '@/utils/context';

/** An error that is thrown when the user decorator is used without the AuthGuard. */
export const MissingAuthContextError = makeCustomError('MissingAuthContextError');

/** Param decorator that returns the user object from the request. */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const { user } = extractRequest(ctx);

  if (!user) {
    throw new MissingAuthContextError(
      'Missing user context in request. Did you forget to add the AuthGuard?',
    );
  }

  return user;
});
