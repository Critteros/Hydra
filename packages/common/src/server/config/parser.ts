import { FileNotFound, makeCustomError } from '@/server/errors';
import { load } from 'js-yaml';
import { readFile } from 'node:fs/promises';

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
      return new this(await configSchema.parseAsync(loaded));
    } catch (e) {
      throw new BadConfigFormat(path);
    }
  }
}
