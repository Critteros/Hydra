import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext, type GqlContextType } from '@nestjs/graphql';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import type { Request } from 'express';

/** An error that is thrown when the user decorator is used without the AuthGuard. */
export const MissingAuthContextError = makeCustomError('MissingAuthContextError');

/** Param decorator that returns the user object from the request. */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const getGraphqlRequest = () => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const { req } = gqlContext.getContext<{ req: Request }>();

    return req;
  };

  const getRESTRquest = () => {
    return ctx.switchToHttp().getRequest<Request>();
  };

  const { user } =
    ctx.getType<GqlContextType>() === 'graphql' ? getGraphqlRequest() : getRESTRquest();

  if (!user) {
    throw new MissingAuthContextError(
      'Missing user context in request. Did you forget to add the AuthGuard?',
    );
  }

  return user;
});
