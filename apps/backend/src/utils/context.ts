import type { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext, type GqlContextType } from '@nestjs/graphql';

import type { Request } from 'express';

export function extractRequest(ctx: ExecutionContext): Request {
  if (ctx.getType<GqlContextType>() === 'graphql') {
    const gqlContext = GqlExecutionContext.create(ctx);
    const { req } = gqlContext.getContext<{ req: Request }>();

    return req;
  }

  return ctx.switchToHttp().getRequest<Request>();
}
