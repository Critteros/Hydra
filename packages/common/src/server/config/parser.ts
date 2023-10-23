import { FileNotFound } from '@/server/errors';
import { load } from 'js-yaml';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

import { makeCustomError } from '../../shared/errors';

import { defaultConfig } from './default';
import { configSchema, type Config } from './schema';

export const BadConfigFormat = makeCustomError(
  'BadConfigFormat',
  (path: string) => `Bad config format for "${path}"`,
);

export class HydraConfig {
  constructor(public config: Config = defaultConfig) {}

  static async fromFile(path: string) {
    const contents = await readFile(path, 'utf-8').catch(() => {
      throw new FileNotFound(path);
    });

    try {
      const loaded = load(contents);
      return new this(await this.buildSchema(path).parseAsync(loaded));
    } catch (e) {
      throw new BadConfigFormat(path);
    }
  }

  private static buildSchema(path: string) {
    return configSchema.transform(
      ({ socket: { path: inputPath, ...socketOptions }, ...other }) => ({
        socket: {
          path: resolve(dirname(path), inputPath),
          ...socketOptions,
        },
        ...other,
      }),
    );
  }
}
