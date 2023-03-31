const { defaults } = require('@chrisburnell/eleventy-cache-webmentions')();
const { host, domain } = require('../src/data/site.json');

const { WEBMENTION_IO_TOKEN } = process.env;

module.exports = Object.assign(defaults, {
  // host has protocol on it...
  domain: host,
  // ..domain does not.
  feed: `https://webmention.io/api/mentions.json?domain=${domain}&token=${WEBMENTION_IO_TOKEN}&per-page=9001`,
  key: 'links',
});
