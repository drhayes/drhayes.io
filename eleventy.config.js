const readingTime = require('eleventy-plugin-reading-time');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const webmentionsConfig = require('./lib/webmentions.js');
const pluginWebmentions = require('@chrisburnell/eleventy-cache-webmentions');
const pluginSass = require('eleventy-sass');
const { ogImageGenerate } = require('./lib/events/ogImageGenerate');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const embeds = require('eleventy-plugin-embed-everything');
const pluginTOC = require('eleventy-plugin-toc');
const mdfigcaption = require('markdown-it-image-figures');

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
  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  })
    .disable('code')
    .use(mdfigcaption, { figcaption: true, lazy: true, async: true })
    .use(markdownItAttrs)
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink(),
      level: 2,
    });
  eleventyConfig.setLibrary('md', md);

  // Deep data merge!
  eleventyConfig.setDataDeepMerge(true);

  // Don't use .gitignore for ignoring things.
  eleventyConfig.setUseGitIgnore(false);

  // Plugins.
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginWebmentions, webmentionsConfig);
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
  eleventyConfig.addFilter('dateFormat', require('./lib/filters/dateFormat'));
  eleventyConfig.addFilter('debugPrint', require('./lib/filters/debugPrint'));
  eleventyConfig.addFilter(
    'isBigLetterPage',
    require('./lib/filters/isBigLetterPage.js')
  );
  eleventyConfig.addFilter('tagFilter', require('./lib/filters/tagFilter'));
  eleventyConfig.addFilter('titleify', require('./lib/filters/titleify'));
  eleventyConfig.addFilter('splitlines', require('./lib/filters/splitlines'));
  eleventyConfig.addFilter('twDate', require('./lib/filters/twDate'));

  // Shortcodes.
  eleventyConfig.addNunjucksShortcode(
    'gameScreenshot',
    require('./lib/shortcodes/gameScreenshot')
  );
  eleventyConfig.addNunjucksShortcode(
    'meLink',
    require('./lib/shortcodes/meLink')
  );
  eleventyConfig.addNunjucksShortcode(
    'omgStatus',
    require('./lib/shortcodes/omgStatus')
  );

  // Collections.
  eleventyConfig.addCollection('games', require('./lib/collections/games'));
  eleventyConfig.addCollection(
    'principles',
    require('./lib/collections/principles')
  );
  eleventyConfig.addCollection(
    'allTheWriting',
    require('./lib/collections/allTheWriting')
  );

  // Static stuff.
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
