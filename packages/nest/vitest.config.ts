/// <reference types="vitest" />
import { fileURLToPath } from 'node:url';

import { defineConfig, coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    pool: 'threads',
    environment: 'node',
    alias: {
      '@/': fileURLToPath(new URL('./src/', import.meta.url)),
    },
    typecheck: {
      checker: 'tsc',
      enabled: true,
    },
    coverage: {
      exclude: ['**/index.ts', ...coverageConfigDefaults.exclude],
    },
    setupFiles: [fileURLToPath(new URL('./setupTests.ts', import.meta.url))],
    sequence: {
      concurrent: true,
      shuffle: true,
    },
  },
});
