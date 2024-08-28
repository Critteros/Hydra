/**
 * Configuration base for Node.js apps and packages
 *
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    node: true,
    browser: false,
  },
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
