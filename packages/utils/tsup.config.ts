import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
  banner: {},
  splitting: true,
  entry: ['src/index.ts', 'src/types/index.ts', 'src/object.ts', 'src/compare.ts', 'src/errors.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  minify: false,
  clean: false,
  external: ['react', 'react-dom'],
  ...options,
}));
