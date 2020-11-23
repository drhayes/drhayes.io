module.exports = {
  purge: {
    mode: 'all',
    preserveHtmlElements: false,
    content: [
      './src/**/*.njk',
      './src/**/*.md',
      './src/**/*.html',
    ],
  },
  // purge: [
  //   './src/**/*.njk',
  //   './src/**/*.md',
  //   './src/**/*.html',
  // ],
  darkMode: false,
  theme: {
    fontFamily: {
      mono: ['Monaco','Inconsolata', 'Consolas', 'Ubuntu Mono', 'Liberation Mono', 'Menlo', 'FreeMono', 'monospace']
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}
