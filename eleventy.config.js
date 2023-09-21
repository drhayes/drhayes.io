const readingTime = require('eleventy-plugin-reading-time');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginSass = require('eleventy-sass');
const { ogImageGenerate } = require('./lib/events/ogImageGenerate');
const embeds = require('eleventy-plugin-embed-everything');
const pluginTOC = require('eleventy-plugin-toc');
const tagFilters = require('./lib/filters/tagFilters');
const md = require('./lib/markdown');

module.exports = (eleventyConfig) => {
  // Server options.
  eleventyConfig.setServerOptions({
    liveReload: true,
    port: 3000,
  });

  // Data.
  eleventyConfig.addGlobalData('global', {
    baseUrl: process.env.BASE_URL || 'https://drhayes.io',
    isDev: process.env.NODE_ENV !== 'production',
  });

  // Events.
  eleventyConfig.on('eleventy.after', ogImageGenerate);

  // Set up markdown.
  eleventyConfig.setLibrary('md', md);

  // Deep data merge!
  eleventyConfig.setDataDeepMerge(true);

  // Don't use .gitignore for ignoring things.
  eleventyConfig.setUseGitIgnore(false);

  // Plugins.
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginSass);
  eleventyConfig.addPlugin(embeds);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h2', 'h3'],
    wrapper: '',
    ul: true,
  });

  // Filters.
  eleventyConfig.addFilter('md', (value, o = {}) => {
    if (typeof value !== 'string') {
      if (value instanceof String) {
        value = value + '';
      } else {
        return value;
      }
    }

    let ret = md.render(value, o);

    return ret;
  });
  eleventyConfig.addFilter('mdInline', (value, o = {}) => {
    if (typeof value !== 'string') {
      return value;
    }

    return md.renderInline(value, o);
  });
  eleventyConfig.addFilter('dateformat', require('./lib/filters/dateformat'));
  eleventyConfig.addFilter('debugPrint', require('./lib/filters/debugPrint'));
  eleventyConfig.addFilter(
    'isBigLetterPage',
    require('./lib/filters/isBigLetterPage.js')
  );
  eleventyConfig.addFilter('titleify', require('./lib/filters/titleify'));
  eleventyConfig.addFilter('splitlines', require('./lib/filters/splitlines'));
  eleventyConfig.addFilter('twDate', require('./lib/filters/twDate'));
  eleventyConfig.addFilter(
    'isValidIsoDate',
    require('./lib/filters/isValidIsoDate')
  );
  eleventyConfig.addFilter('dateSort', require('./lib/filters/dateSort'));
  for (const filterName in tagFilters) {
    eleventyConfig.addFilter(filterName, tagFilters[filterName]);
  }
  eleventyConfig.addFilter(
    'webmentionsByUrl',
    require('./lib/filters/webmentionsByUrl')
  );
  eleventyConfig.addFilter('titleSort', require('./lib/filters/titleSort'));
  eleventyConfig.addFilter('first', function (list, num = 5) {
    return list.slice(0, num);
  });
  eleventyConfig.addFilter('last', function (list, num = 5) {
    return list.slice(list.length - num);
  });
  eleventyConfig.addFilter('datetime', require('./lib/filters/datetime'));
  eleventyConfig.addFilter('timeformat', require('./lib/filters/timeformat'));
  eleventyConfig.addAsyncFilter('getPost', require('./lib/filters/getPost'));
  eleventyConfig.addAsyncFilter(
    'getAccount',
    require('./lib/filters/getAccount')
  );

  // Shortcodes.
  eleventyConfig.addShortcode(
    'gameScreenshot',
    require('./lib/shortcodes/gameScreenshot')
  );
  eleventyConfig.addShortcode('meLink', require('./lib/shortcodes/meLink'));
  eleventyConfig.addShortcode(
    'omgStatus',
    require('./lib/shortcodes/omgStatus')
  );
  eleventyConfig.addPairedShortcode('aside', require('./lib/shortcodes/aside'));

  // Collections.
  eleventyConfig.addCollection('games', require('./lib/collections/games'));
  eleventyConfig.addCollection(
    'allTheWriting',
    require('./lib/collections/allTheWriting')
  );
  eleventyConfig.addCollection(
    'writingByTag',
    require('./lib/collections/writingByTag')
  );
  eleventyConfig.addCollection('aliases', require('./lib/collections/aliases'));
  eleventyConfig.addCollection('notes', require('./lib/collections/notes'));
  eleventyConfig.addCollection('blog', (api) =>
    api.getFilteredByGlob('src/blog/**/*.md')
  );

  // Static stuff.
  eleventyConfig.addPassthroughCopy('./src/.well-known/security.txt');
  eleventyConfig.addPassthroughCopy('./src/favicon.ico');
  eleventyConfig.addPassthroughCopy('./src/favicon.png');
  eleventyConfig.addPassthroughCopy('./src/img');
  eleventyConfig.addPassthroughCopy('./src/key.txt');
  eleventyConfig.addPassthroughCopy('./src/keybase.txt');
  eleventyConfig.addPassthroughCopy('./src/twtxt.txt');
  eleventyConfig.addPassthroughCopy('./fonts/**/*');

  // Front matter.
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!--more-->',
  });

  // What are we watching for changes?
  eleventyConfig.addWatchTarget('./src/css/**/*');

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
    templateFormats: ['njk', 'md', 'js'],
    markdownTemplateEngine: 'njk',
  };
};
