import { join } from 'node:path';
import { cwd } from 'node:process';

import type { SocketOptions, Config } from './schema';

const defaultSocketOptions: SocketOptions = {
  enable: true,
  path: join(cwd(), 'hydra.sock'),
};

export const defaultConfig: Config = {
  socket: defaultSocketOptions,
};
