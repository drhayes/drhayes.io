const sass = require('node-sass');
const path = require('path');
const fs = require('fs');
const readingTime = require('eleventy-plugin-reading-time');

module.exports = eleventyConfig => {
  // Deep data merge!
  eleventyConfig.setDataDeepMerge(true);

  // Plugins.
  eleventyConfig.addPlugin(readingTime);

  // What will eleventy copy to the output?
  eleventyConfig.setTemplateFormats([
    'njk',
    'md',
    'png',
  ]);

  // Handle the CSS.
  const sassResult = sass.renderSync({
    data: fs.readFileSync('./src/_includes/css/site.scss').toString(),
    includePaths: [],
  });
  eleventyConfig.addNunjucksShortcode('sitecss', () => sassResult.css.toString());

  // Custom filters.
  eleventyConfig.addFilter('titleify', value => {
    if (value) {
      return `${value} · drhayes.io`;
    }
    return 'drhayes.io';
  });

  // Blog posts.
  eleventyConfig.addCollection('blogPosts', collection => collection
    .getAllSorted()
    .reverse()
    .filter(item => item.url
      && !item.inputPath.includes('index')
      && item.inputPath.startsWith('./src/blog/')
    )
  );

  // Handle the images.
  // eleventyConfig.addPassthroughCopy('**/*.png');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    }
  };
};
