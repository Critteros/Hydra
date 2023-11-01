// @ts-check
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_BACKEND_BASE_URL: z.string().url().default('http://localhost:8000'),
  },
  server: {
    BACKEND_BASE_URL: z.string().url().default('http://localhost:8000'),
  },
  runtimeEnv: {
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
    NEXT_PUBLIC_BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
  },
});
