/**
 * Main root configuration file that is used by all packages
 *
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/recommended-type-checked',
    // turborepo custom eslint configuration configures the following rules:
    //  - https://github.com/vercel/turbo/blob/main/packages/eslint-plugin-turbo/docs/rules/no-undeclared-env-vars.md
    'turbo',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'unicorn'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    // See https://typescript-eslint.io/linting/typed-linting/monorepos/#one-tsconfigjson-per-package-and-an-optional-one-in-the-root
    project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'],
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  env: {
    es2024: true,
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/consistent-type-exports': 'error',
    'prettier/prettier': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/no-named-as-default-member': 'off',
  },
  overrides: [
    {
      files: ['*.spec.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};
