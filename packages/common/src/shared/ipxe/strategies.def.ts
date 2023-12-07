import { z } from 'zod';

export type BasicBootStrategy = 'strategy.basicBoot';
export type IPXEStrategy = BasicBootStrategy;

export const BasicBootInfoSchema = z.object({
  kernelPath: z.string(),
  initramfsPath: z.string(),
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
