const EleventyFetch = require('@11ty/eleventy-fetch');

async function getAccount(url) {
  try {
    const account = await EleventyFetch(`${url}.json`, {
      duration: '1h',
      type: 'json',
    });
    return account;
  } catch (e) {
    console.error(`Error getting account from ${url}`, e);
  }
  return null;
}

module.exports = getAccount;
