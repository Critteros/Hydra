import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
  banner: {},
  splitting: false,
  entry: ['src/**/*.ts'],
  format: ['cjs'],
  dts: true,
  minify: false,
  clean: true,
  external: ['@nestjs/microservices', '@nestjs/websockets/socket-module', '@nestjs/websockets'],
  ...options,
}));
