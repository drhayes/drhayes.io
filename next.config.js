// next.config.js
const withCSS = require('@zeit/next-css')
const emoji = require('remark-emoji')
const fs = require('fs');
const path = require('path');
const fm = require('front-matter');

const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    mdPlugins: [emoji]
  }
});

const config = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  publicRuntimeConfig: {
    cat: 'pants',
  }
};

// Enumerate the game articles sorted by date.
const gamesDir = path.join(__dirname, 'pages', 'games');
const dirents = fs.readdirSync(gamesDir, {
  withFileTypes: true
});
const games = {}
const dirs = dirents.filter(dirent => dirent.isDirectory());
dirs.forEach(dir => {
  const gameInfo = {};
  const gameDir = path.join(gamesDir, dir.name);
  const filenames = fs.readdirSync(path.join(gameDir, 'articles'));
  const articles = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      filename,
      frontmatter: fm(fs.readFileSync(path.join(gameDir, 'articles', filename), 'utf8')).attributes
    }));
  // Ensure dates.
  articles.filter(({ frontmatter }) => !Boolean(frontmatter.date))
    .forEach(article => {
      throw Error(`Missing date for article: ${article.frontmatter.title}`)
    });
  articles.sort((a, b) => a.frontmatter.date < a.frontmatter.date);
  gameInfo.articles = articles.map(article => ({
    title: article.frontmatter.title,
    slug: `/games/${dir.name}/articles/${path.basename(article.filename, '.md')}`
  }));
  games[dir.name] = gameInfo;
});
config.publicRuntimeConfig.games = games;


// process.exit();

module.exports = withCSS(withMDX(config));
