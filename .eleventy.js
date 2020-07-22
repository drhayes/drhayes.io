const path = require('path');
const fs = require('fs');
const readingTime = require('eleventy-plugin-reading-time');
const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = (eleventyConfig) => {
  eleventyConfig.setLibrary('md', require('./lib/library/markdown'));

  // Deep data merge!
  eleventyConfig.setDataDeepMerge(true);

  // Plugins.
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);

  // Filters.
  eleventyConfig.addFilter('sassify', require('./lib/filters/sassify'));
  eleventyConfig.addFilter('titleify', require('./lib/filters/titleify'));
  eleventyConfig.addFilter('dateFormat', require('./lib/filters/dateFormat'));
  eleventyConfig.addFilter('truncateHtml', require('./lib/filters/truncateHtml'));
  eleventyConfig.addFilter('articlesfor', require('./lib/filters/articlesfor'));
  eleventyConfig.addFilter('linksHere', require('./lib/filters/linksHere'));

  // Collections.
  eleventyConfig.addCollection('games', require('./lib/collections/games'));
  eleventyConfig.addCollection('gamearticles', require('./lib/collections/gameArticles'));
  eleventyConfig.addCollection('drafts', require('./lib/collections/drafts'));
  eleventyConfig.addCollection('notes', require('./lib/collections/notes'));

  // Static stuff.
  eleventyConfig.addPassthroughCopy('./src/img');
  eleventyConfig.addPassthroughCopy('./src/keybase.txt');
  eleventyConfig.addPassthroughCopy('./src/key.txt');
  eleventyConfig.addPassthroughCopy('./src/twtxt.txt');
  eleventyConfig.addPassthroughCopy('./src/favicon.ico');

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
