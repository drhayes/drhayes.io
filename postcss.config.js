const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

const isProduction = process.env.NODE_ENV === 'production';

const cssnanoPlugin = cssnano({
  preset: ['default', {
    discardComments: {
      removeAll: true,
    },
    normalizeWhitespace: false,
  }],
});

const purgecssPlugin = purgecss({
  content: [
    './src/**/*.html',
    './src/**/*.njk',
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  safelist: ['blockquote', 'c-blockquote', 'c-blockquote__attribution'],
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    isProduction ?  cssnanoPlugin : null,
    isProduction ? purgecssPlugin : null,
  ]
}
