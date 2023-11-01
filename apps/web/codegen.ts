import type { CodegenConfig } from '@graphql-codegen/cli';

import { env } from './src/env.mjs';

const config: CodegenConfig = {
  schema: `${env.BACKEND_BASE_URL}/api/graphql`,
  documents: ['./src/**/*.{tsx,ts}'],
  ignoreNoDocuments: true,
  generates: {
    './src/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;
