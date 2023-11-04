import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

import type { Request } from 'express';

import { extractRequest } from './context';

export const InjectRequest = createParamDecorator((data: never, ctx: ExecutionContext): Request => {
  return extractRequest(ctx);
});
