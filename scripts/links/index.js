const Pinboard = require('node-pinboard').default;
const util = require('util');

function createPinboard(pinboardApiToken) {
  const pinboard = new Pinboard(pinboardApiToken);
  pinboard.recent = util.promisify(pinboard.recent);
  pinboard.all = util.promisify(pinboard.all);
  return pinboard;
}

async function getLinks(pinboardApiToken) {
  const pinboard = createPinboard(pinboardApiToken);
  const recentThings = await getLastSevenDays(pinboard, new Date());
  console.log(recentThings);
}

async function getLastSevenDays(pinboard, today) {
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const results = await pinboard.all({
    fromdt: sevenDaysAgo.toISOString(),
  });
  if (!results || !results.length) {
    throw Error('no posts came back!');
  }
  // Filter out the posts that are not shared.
  const sharedPosts = results.filter(post => post.shared === 'yes');
  return sharedPosts;
}

module.exports = {
  getLastSevenDays,
  getLinks,
};
