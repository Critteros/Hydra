/** @type {import('eslint').Linter.Config} **/
module.exports = {
  extends: ['@hydra-ipxe/hydra/node'],
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
      },
    },
  ],
};
