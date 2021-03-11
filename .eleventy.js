const path = require('path');
const fs = require('fs');
const readingTime = require('eleventy-plugin-reading-time');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const markdown = require('./lib/library/markdown');

module.exports = (eleventyConfig) => {
  // Markdown stuff.
  eleventyConfig.setLibrary('md', markdown());

  // Deep data merge!
  eleventyConfig.setDataDeepMerge(true);

  // Don't use .gitignore for ignoring things.
  eleventyConfig.setUseGitIgnore(false);

  // Plugins.
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);

  // Filters.
  eleventyConfig.addFilter('articlesfor', require('./lib/filters/articlesfor'));
  eleventyConfig.addFilter('dateFormat', require('./lib/filters/dateFormat'));
  eleventyConfig.addFilter('debugPrint', require('./lib/filters/debugPrint'));
  eleventyConfig.addFilter('linksHere', require('./lib/filters/linksHere'));
  eleventyConfig.addNunjucksAsyncFilter('lessify', require('./lib/filters/lessify'));
  eleventyConfig.addFilter('titleify', require('./lib/filters/titleify'));
  eleventyConfig.addFilter('truncateHtml', require('./lib/filters/truncateHtml'));

  // Collections.
  eleventyConfig.addCollection('drafts', require('./lib/collections/drafts'));
  eleventyConfig.addCollection('gamearticles', require('./lib/collections/gameArticles'));
  eleventyConfig.addCollection('games', require('./lib/collections/games'));
  eleventyConfig.addCollection('notes', require('./lib/collections/notes'));
  eleventyConfig.addCollection('quotes', require('./lib/collections/quotes'));

  // Static stuff.
  eleventyConfig.addPassthroughCopy('./src/favicon.ico');
  eleventyConfig.addPassthroughCopy('./src/img');
  eleventyConfig.addPassthroughCopy('./src/key.txt');
  eleventyConfig.addPassthroughCopy('./src/keybase.txt');
  eleventyConfig.addPassthroughCopy('./src/twtxt.txt');

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
    templateFormats: ['njk', 'md'],
    markdownTemplateEngine: 'njk',
  };
};
