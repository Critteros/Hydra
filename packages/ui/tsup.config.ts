import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
  banner: {},
  // treeshake: true,
  splitting: false,
  entry: ['src/**/*.tsx', 'src/**/*.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  minify: false,
  clean: true,
  external: ['react', 'react-dom'],
  ...options,
}));
