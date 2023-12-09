import { z } from 'zod';

import { RESOURCE_ID_REGEX } from '../regex';
import { trimStart } from '../utils/string';

export const IPXEStrategySchema = z.literal('strategy.basicBoot');

export type BasicBootStrategy = 'strategy.basicBoot';
export type IPXEStrategy = BasicBootStrategy;

export const BasicBootInfoSchema = z.object({
  kernelPath: z
    .string()
    .transform((val) => {
      if (val.startsWith('/')) {
        return trimStart(val, '/');
      }
      return val;
    })
    .pipe(z.string().regex(RESOURCE_ID_REGEX)),
  initramfsPath: z
    .string()
    .transform((val) => {
      if (val.startsWith('/')) {
        return trimStart(val, '/');
      }
      return val;
    })
    .pipe(z.string().regex(RESOURCE_ID_REGEX)),
});

export type BasicBootInfo = z.infer<typeof BasicBootInfoSchema>;

export const BasicBootDataSchema = BasicBootInfoSchema.extend({
  kernelParams: z.union([z.string(), z.array(z.string())]).transform((val) => {
    if (Array.isArray(val)) {
      return val.join(' ');
    }
    return val;
  }),
});

export type BasicBootDataType = BasicBootInfo & {
  kernelParams?: string;
};
