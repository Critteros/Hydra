/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    // require.resolve('prettier-plugin-tailwindcss'),
    require.resolve('@trivago/prettier-plugin-sort-imports'),
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
    '^(next/(.*)$)|^(next$)',
    '^(react/(.*)$)|^(react$)',
    '^(@nestjs/(.*)$)|^(@nestjs$)',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^~/',
    '^[.][.]/',
    '^[.]/',
  ],
};
