const sass = require('node-sass');
const path = require('path');
const fs = require('fs');

module.exports = eleventyConfig => {
  // What will eleventy copy to the output?
  eleventyConfig.setTemplateFormats([
    'md',
    'png',
  ]);

  // Handle the CSS.
  const sassResult = sass.renderSync({
    data: fs.readFileSync('./src/_includes/css/site.scss').toString(),
    includePaths: [],
  });
  eleventyConfig.addNunjucksShortcode('sitecss', () => sassResult.css.toString());

  eleventyConfig.addFilter('titleify', value => {
    if (value) {
      return `${value} · drhayes.io`;
    }
    return 'drhayes.io';
  });

  // Handle the images.
  // eleventyConfig.addPassthroughCopy('**/*.png');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    }
  };
};
