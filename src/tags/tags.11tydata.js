module.exports = {
  eleventyComputed: {
    title: data => `Pages tagged "${data.tag}"`,
  },
  eleventyExcludeFromCollections: 'tag',
};
