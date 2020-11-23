const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    require('tailwindcss'),
    isProduction ? cssnano({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: false,
      }],
    }) : null,
    isProduction? purgecss({
      content: [
        './src/**/*.html',
        './src/**/*.njk',
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }) : null,
  ]
}
