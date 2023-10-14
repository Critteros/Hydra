import { z } from 'zod';

import { defaultConfig } from './default';

const {
  socket: { enable, path },
} = defaultConfig;

export type SocketOptions = {
  enable: boolean;
  path: string;
};
export type Config = {
  socket: SocketOptions;
};

const socketOptionsSchema = z.object({
  path: z.string().default(path),
  enable: z.boolean().default(enable),
});

export const configSchema = z.object({
  socket: socketOptionsSchema,
});
