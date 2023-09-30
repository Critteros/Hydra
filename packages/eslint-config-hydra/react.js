/**
 * Eslint config file used as a base for React apps
 *
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/react',
  ],
  plugins: ['jsx-a11y', 'react-hooks', 'jest-dom', 'testing-library'],
  env: {
    browser: true,
    node: false,
  },
  globals: {
    React: true,
    JSX: true,
  },
};
