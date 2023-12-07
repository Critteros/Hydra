import { type ExecutionContext, createParamDecorator } from '@nestjs/common';

import { extractRequest } from '@/utils/context';

export const ServerHost = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = extractRequest(ctx);

  return `${req.protocol}://${req.get('host')}`;
});
