// Markdown processing.
const frontmatter = require('remark-frontmatter');
const extract = require('remark-extract-frontmatter');
const yaml = require('yaml');
const emoji = require('remark-emoji');

const addIt = () => {
  console.log('outer');
  return function() {
    console.log('inner');
    console.log(arguments);
  }
};

const withCSS = require('@zeit/next-css');
const withMDX = require('@zeit/next-mdx')({
  extension: /.mdx?$/,

  options: {
    mdPlugins: [
      [ frontmatter, ['yaml'] ],
      [ extract, { yaml: yaml.parse } ],
      [ emoji ],
      [ addIt ]
    ],
  },
});
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

const config = {
  pageExtensions: ['jsx', 'js', 'md', 'mdx'],

  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    console.log(Object.keys(defaultPathMap));
    const pathMap = Object.assign({
      '/404': {
        page: '/404'
      }
    }, defaultPathMap);

    const blogPosts = getBlogPosts();
    // First, add the blog posts.
    const tags = new Map();
    blogPosts.forEach(post => {
      // pathMap[post.slug] = {
      //   page: '/blogPost',
      //   query: post
      // }
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

    // Set up the front page.
    pathMap['/'] = {
      page: '/index',
      query: {
        blogPosts: blogPosts
      }
    }

    // Keybase proof.
    if (!dev) {
      await copyFile(path.join(dir, 'keybase.txt'), path.join(outDir, 'keybase.txt'))
    }

    delete pathMap['blogPost'];
    delete pathMap['tagPage'];

    console.log(JSON.stringify(Object.keys(pathMap), null, 2));
    throw Error('cats');

    return pathMap;
  }
};

module.exports = withCSS(withMDX(config));
