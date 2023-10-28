/** @type {import('eslint').Linter.Config} * */
module.exports = {
  extends: ['@hydra-ipxe/hydra/next'],
  rules: {
    'react/prop-types': 'off',
    'testing-library/no-debugging-utils': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-misused-promises': 'off',
  },
};
