const Pinboard = require('node-pinboard').default;
const util = require('util');
const slugify = require('@sindresorhus/slugify');
const dateFns = require('date-fns');

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

function processPinboardLink(pinboardLink) {
  const date = new Date(pinboardLink.time);
  return {
    date: dateFns.format(date, 'yyyy-MM-dd'),
    month: date.getMonth() + 1,
    note: pinboardLink.extended,
    slug: slugify(pinboardLink.description),
    tags: pinboardLink.tags.split(' '),
    title: pinboardLink.description,
    url: pinboardLink.href,
    year: date.getFullYear(),
  };
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
  processPinboardLink,
};
