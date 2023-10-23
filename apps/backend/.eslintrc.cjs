/** @type {import("eslint").Linter.Config} **/
module.exports = {
  extends: ['@hydra-ipxe/hydra/nest'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    // See https://typescript-eslint.io/linting/typed-linting/monorepos/#one-tsconfigjson-per-package-and-an-optional-one-in-the-root
    project: 'tsconfig.json',
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'off',
        'import/named': 'off',
      },
    },
  ],
};
