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
  safelist: {
    standard: [/blockquote/, /hr/],
    greedy: [/hljs/],
  },
});

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    isProduction ? cssnanoPlugin : null,
    isProduction ? purgecssPlugin : null,
  ]
}
