module.exports = {
  ...require('gts/.prettierrc.json'),
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: ['<THIRD_PARTY_MODULES>', '^(components|lib)', '^[./]'],
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};
