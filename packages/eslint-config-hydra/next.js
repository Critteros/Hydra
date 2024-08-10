/**
 * Eslint config file used for Next.js apps
 *
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['next', 'next/core-web-vitals', require.resolve('./react.js')],
};
