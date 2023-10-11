/**
 * Configuration used for Nest.js apps and packages
 *
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ['./node.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/require-await': 'off',
  },
};
