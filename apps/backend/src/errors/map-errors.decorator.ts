import { Reflector } from '@nestjs/core';

import type { RemapInput } from '@hydra-ipxe/common/shared/errors';

export const MapErrors = Reflector.createDecorator<RemapInput | RemapInput[], RemapInput[]>({
  transform: (mapping: RemapInput | RemapInput[]) => {
    if (!Array.isArray(mapping)) {
      return [mapping];
    }
    return mapping;
  },
});
