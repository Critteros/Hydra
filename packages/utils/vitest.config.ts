/// <reference types="vitest" />
import { defineConfig, coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    pool: 'threads',
    environment: 'node',
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    typecheck: {
      checker: 'tsc',
      enabled: true,
    },
    coverage: {
      exclude: ['**/index.ts', ...coverageConfigDefaults.exclude],
    },
    sequence: {
      concurrent: true,
      shuffle: true,
    },
  },
});
