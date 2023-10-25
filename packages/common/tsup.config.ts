import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
  banner: {},
  splitting: false,
  entry: ['src/**/*.tsx', 'src/**/*.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  minify: false,
  clean: false,
  external: ['react', 'react-dom'],
  ...options,
}));
