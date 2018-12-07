// next.config.js
const withCSS = require('@zeit/next-css')
const emoji = require('remark-emoji')
const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const slug = require('slug');
const dayjs = require('dayjs');
const { promisify } = require('util');
const copyFile = promisify(fs.copyFile);

const slugify = text => slug(text, {
    lower: true,
    symbols: true,
  });

const contentDir = path.join(__dirname, 'content');

function generateGamePages() {
  const pages = {};
  // Enumerate the game articles sorted by date.
  const gamesDir = path.join(contentDir, 'games');
  const dirents = fs.readdirSync(gamesDir, {
    withFileTypes: true
  });
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
  });
  return pages;
}

function getBlogPosts() {
  const postsDir = path.join(__dirname, 'blogPosts');
  return fs.readdirSync(postsDir)
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      filename,
      contents: fs.readFileSync(path.join(postsDir, filename), 'utf8')
    }))
    .map(post => {
      const { attributes: frontmatter, body } = fm(post.contents);
      return {
        ...post,
        frontmatter,
        body
      };
    })
    .map(post => {
      const date = dayjs(post.frontmatter.date).add(6, 'hour');
      post.frontmatter.date = date;
      post.slug = `/${date.format('YYYY/MM/DD')}/${slugify(post.frontmatter.title)}`
      return post;
    });
}

function* contentDirectoryIterator(contentPath) {
  const entries = fs.readdirSync(contentPath, {
    withFileTypes: true
  });
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const entryName = path.join(contentPath, entry.name)
    if (entry.isDirectory()) {
      yield* contentDirectoryIterator(entryName);
    } else {
      yield entryName;
    }
  }
}

const config = {
  useFileSystemPublicRoutes: false,

  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    const blogPosts = getBlogPosts();
    const pathMap = {
      '/404': {
        page: '/404'
      }
    };

    // First, add the blog posts.
    const tags = new Map();
    blogPosts.forEach(post => {
      pathMap[post.slug] = {
        page: '/blogPost',
        query: post
      }
      // Aggregate the tags.
      if (post.frontmatter.tags) {
        post.frontmatter.tags.forEach(tag => {
          if (!tags.has(tag)) {
            tags.set(tag, []);
          }
          tags.get(tag).push(post);
        });
      }
    });

    // Make some tag pages.
    tags.forEach((posts, tag) => {
      const slug = `/tags/${slugify(tag)}`;
      pathMap[slug] = {
        page: '/tagPage',
        query: { tag, posts }
      }
    });

    // Iterate the content pages.
    const contentPath = path.join(__dirname, 'content');
    for (let filename of contentDirectoryIterator(contentPath)) {
      const relativePath = path.relative(contentPath, filename);
      const content = fs.readFileSync(filename, 'utf8');
      let slug = `/${relativePath}`;
      if (slug.match(/\.md/gi)) {
        slug = slug.replace(/\.md$/g, '');
      }
      if (slug.match(/\/index/gi)) {
        slug = slug.replace(/\/index$/gi, '');
      }
      pathMap[slug] = {
        page: '/contentPage',
        query: { content }
      }
    }

    // Set up the front page.
    pathMap['/'] = {
      page: '/frontPage',
      query: {
        blogPosts: blogPosts
      }
    }

    // Keybase proof.
    if (!dev) {
      await copyFile(path.join(dir, 'keybase.txt'), path.join(outDir, 'keybase.txt'))
    }

    return pathMap;
  }
};

module.exports = withCSS(config);
