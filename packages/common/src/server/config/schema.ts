import { z } from 'zod';

import { defaultConfig } from './default';

const { socket, filestorage } = defaultConfig;

const { enable, path } = socket;
const { engine, basePath, maxFileSize } = filestorage;

export type SocketOptions = {
  enable: boolean;
  path: string;
};

export type FilestorageOptions = {
  engine: 'local';
  basePath: string;
  maxFileSize: number;
};

export type Config = {
  socket: SocketOptions;
  filestorage: FilestorageOptions;
};

export const configSchema = z.object({
  socket: z
    .object({
      path: z.string().default(path),
      enable: z.boolean().default(enable),
    })
    .default(socket),
  filestorage: z
    .object({
      engine: z.literal('local').default(engine),
      basePath: z.string().default(basePath),
      maxSize: z.number().default(maxFileSize),
    })
    .default(filestorage),
});
