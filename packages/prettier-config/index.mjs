/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: 'all',
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  singleAttributePerLine: true,
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
