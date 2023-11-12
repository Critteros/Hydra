import { Reflector } from '@nestjs/core';

import type { Permissions } from '@hydra-ipxe/common/shared/permissions';

export const RequirePermission = Reflector.createDecorator<
  Permissions | Permissions[],
  Permissions[]
>({
  transform(value) {
    if (Array.isArray(value)) {
      return value;
    }
    return [value];
  },
});
