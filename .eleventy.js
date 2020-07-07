const sass = require('node-sass');
const path = require('path');
const fs = require('fs');
const readingTime = require('eleventy-plugin-reading-time');
const moment = require('moment');
const markdownIt = require('markdown-it');
const markdownItEmoji = require('markdown-it-emoji');
const hljs = require('highlight.js');

module.exports = eleventyConfig => {
  // Custom Markdown library.
  const markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          const code = hljs.highlight(lang, str).value;
          return `<pre class="hljs"><code>${code}</code></pre>`;
        } catch (e) {
          console.error('Error highlighting code', e);
        }
      }
    },
  }).use(markdownItEmoji);
  eleventyConfig.setLibrary("md", markdownLib);

  // Deep data merge!
  eleventyConfig.setDataDeepMerge(true);

  // Plugins.
  eleventyConfig.addPlugin(readingTime);

  // What will eleventy copy to the output?
  eleventyConfig.setTemplateFormats([
    'njk',
    'md',
    'png',
    'jpg',
    'jpeg',
  ]);

  // Handle the CSS.
  eleventyConfig.addFilter('sassify', data => {
    const result = sass.renderSync({ data });
    return result.css.toString();
  });

  // Custom filters.
  eleventyConfig.addFilter('titleify', value => {
    if (value) {
      return `${value} · drhayes.io`;
    }
    return 'drhayes.io';
  });

  // Date format.
  eleventyConfig.addFilter('dateformat', (date, format) => moment(date).format(format));

  // Blog posts.
  eleventyConfig.addCollection('blogPosts', collection => collection
    .getAllSorted()
    .reverse()
    .filter(item => item.url
      && !item.inputPath.includes('index')
      && item.inputPath.startsWith('./src/blog/')
    )
  );

  // Games.
  eleventyConfig.addCollection('games', collection => collection
    .getFilteredByGlob('src/games/**/index.md')
    .reverse()
  );

  eleventyConfig.addCollection('gamearticles', collection => collection
    .getFilteredByGlob('src/games/**/*.md')
    .filter(page => !page.inputPath.includes('index.md'))
  );

  eleventyConfig.addFilter('articlesfor', (articles, include) => articles
    .filter(article => article.inputPath.includes(include))
  );

  // Handle the images.
  eleventyConfig.addPassthroughCopy({
    static: '.',
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    markdownTemplateEngine: "njk",
  };
};
