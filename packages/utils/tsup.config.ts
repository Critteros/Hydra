import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
  banner: {},
  splitting: true,
  entry: [
    'src/index.ts',
    'src/types/index.ts',
    'src/object.ts',
    'src/compare.ts',
    'src/errors.ts',
    'src/async.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  minify: false,
  clean: false,
  external: [],
  ...options,
}));
