const sass = require('node-sass');
const path = require('path');
const fs = require('fs');
const readingTime = require('eleventy-plugin-reading-time');
const moment = require('moment');
const markdownIt = require('markdown-it');
const markdownItEmoji = require('markdown-it-emoji');
const hljs = require('highlight.js');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const truncateHtml = require('truncate-html');

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
  eleventyConfig.addPlugin(pluginRss);

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

  // HTML-safe truncation.
  eleventyConfig.addFilter('truncateHtml', text => truncateHtml(text, 50, {
    byWords: true,
    reserveLastWord: true,
  }));

  // Collections.
  eleventyConfig.addCollection('games', collectionApi => collectionApi
    .getFilteredByGlob('src/games/**/index.md')
    .reverse()
  );

  eleventyConfig.addCollection('gamearticles', collectionApi => collectionApi
    .getFilteredByGlob('src/games/**/*.md')
    .filter(page => !page.inputPath.includes('index.md'))
  );

  eleventyConfig.addCollection('drafts', collectionApi => collectionApi
    .getAll()
    .filter(page => page.data.draft));

  eleventyConfig.addCollection('notes', collectionApi => collectionApi
    .getAll()
    .filter(page => page.inputPath.includes('notes/'))
    .filter(page => !page.inputPath.includes('index.md')));

  // Useful filters.
  eleventyConfig.addFilter('articlesfor', (articles, include) => articles
    .filter(article => article.inputPath.includes(include))
  );

  eleventyConfig.addFilter('linksHere', (pages, url) => {
    return pages
      .filter(Boolean)
      // Tag pages don't count.
      .filter(page => !page.url.includes('/tag'))
      .filter(page => page.templateContent.includes(url.substr(0, url.length - 1)));
  });

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
