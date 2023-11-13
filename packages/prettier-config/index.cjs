/** @type {import('prettier').Config} */
module.exports = {
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-jsdoc'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  importOrderSeparation: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy', 'jsx'],
  importOrder: [
    '^server-only$',
    '^node:(.*)$',
    '^(next/(.*)$)|^(next$)',
    '^(react/(.*)$)|^(react$)',
    '^(@nestjs/(.*)$)|^(@nestjs$)',
    '<THIRD_PARTY_MODULES>',
    '<BUILTIN_MODULES>',
    '^@/',
    '^[.][.]/',
    '^[.]/',
  ],
};
