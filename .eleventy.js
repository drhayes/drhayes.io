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
  eleventyConfig.addFilter('dateFormat', require('./lib/filters/dateFormat'));
  eleventyConfig.addFilter('debugPrint', require('./lib/filters/debugPrint'));
  eleventyConfig.addFilter('tagFilter', require('./lib/filters/tagFilter'));
  eleventyConfig.addFilter('titleify', require('./lib/filters/titleify'));

  // Shortcodes.
  eleventyConfig.addNunjucksShortcode('gameScreenshot', require('./lib/shortcodes/gameScreenshot'));
  eleventyConfig.addNunjucksShortcode('meLink', require('./lib/shortcodes/meLink'));

  // Collections.
  eleventyConfig.addCollection('games', require('./lib/collections/games'));

  // Static stuff.
  eleventyConfig.addPassthroughCopy('./src/favicon.ico');
  eleventyConfig.addPassthroughCopy('./src/favicon.png');
  eleventyConfig.addPassthroughCopy('./src/img');
  eleventyConfig.addPassthroughCopy('./src/key.txt');
  eleventyConfig.addPassthroughCopy('./src/keybase.txt');
  eleventyConfig.addPassthroughCopy('./src/twtxt.txt');
  eleventyConfig.addPassthroughCopy('./css/**/*');
  eleventyConfig.addPassthroughCopy('./fonts/**/*');

  // What are watching for changes?
  eleventyConfig.addWatchTarget('./css/**/*');

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
