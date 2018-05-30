module.exports = {
  siteMetadata: {
    title: 'drhayes.io',
    author: 'David Hayes'
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            }
          },
          'gatsby-remark-copy-linked-files'
        ]
      }
    },
    'gatsby-plugin-react-helmet',
  ],
}
