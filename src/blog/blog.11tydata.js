const webmentionsConfig = require('../../lib/webmentions');
const { getWebmentions } =
  require('@chrisburnell/eleventy-cache-webmentions')();

module.exports = {
  tags: ['blog'],
  layout: 'default.njk',
  eleventyComputed: {
    webmentions: (data) =>
      getWebmentions(webmentionsConfig, webmentionsConfig + data.page.url),
  },
};
