import { Injectable } from '@nestjs/common';

import { findWorkspaceRoot } from '@hydra-ipxe/common/server/utils/fs';

@Injectable()
export class AppService {
  async getHello(): string {
    return await findWorkspaceRoot();
  }
}
