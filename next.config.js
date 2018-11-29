// next.config.js
const withCSS = require('@zeit/next-css')
const emoji = require('remark-emoji')

const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    mdPlugins: [emoji]
  }
})

module.exports = withCSS(withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx']
}));
