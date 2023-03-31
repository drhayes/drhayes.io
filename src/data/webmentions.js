const { domain } = require('./site.json');
const fetch = require('node-fetch');

const API_ORIGIN = 'https://webmention.io/api/mentions.jf2';
const token = process.env.WEBMENTION_IO_TOKEN;
const url = `${API_ORIGIN}?domain=${domain}&token=${token}`;

module.exports = async function () {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const feed = await response.json();
      console.log(feed);
      return feed;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
