const Pinboard = require('node-pinboard').default;
const util = require('util');
const slugify = require('@sindresorhus/slugify');
const dateFns = require('date-fns');
const { stripIndents } = require('common-tags');
const path = require('path');

function createPinboard(pinboardApiToken) {
  const pinboard = new Pinboard(pinboardApiToken);
  pinboard.recent = util.promisify(pinboard.recent);
  pinboard.all = util.promisify(pinboard.all);
  return pinboard;
}

async function writeLinks(pinboardLinks, fsPromises) {
  const processedLinks = pinboardLinks.map(processPinboardLink);
  for (const link of processedLinks) {
    await maybeWriteLinkFile('content/links', link, fsPromises);
  }
}

function processPinboardLink(pinboardLink) {
  const date = new Date(pinboardLink.time);
  return {
    date: dateFns.format(date, 'yyyy-MM-dd'),
    month: date.getMonth() + 1,
    note: pinboardLink.extended,
    slug: `${slugify(pinboardLink.description)}.md`,
    tags: pinboardLink.tags.split(' '),
    title: pinboardLink.description,
    url: pinboardLink.href,
    year: date.getFullYear(),
  };
}

function createLinkPost(processedLink) {
  let optionalDescription = '';
  if (processedLink.description) {
    optionalDescription = `description: "${processedLink.description}"\n`;
  }
  return stripIndents`---
    title: "${processedLink.title}"
    ${optionalDescription}date: ${processedLink.date}
    url: ${processedLink.url}
    ---

    ${processedLink.note}`;
}

function formatLinkDir(baseDir, processedLink) {
  return path.join(baseDir, String(processedLink.year), String(processedLink.month).padStart(2, '0'));
}

async function maybeWriteLinkFile(baseDir, processedLink, fsPromises) {
  const linkDir = formatLinkDir(baseDir, processedLink);
  try {
    // Shouldn't throw if directory exists since we're passing recursive: true.
    await fsPromises.mkdir(linkDir, { recursive: true });
  } catch (err) {
    console.error(`Error creating directory: ${err}`);
    return;
  }

  const linkPost = createLinkPost(processedLink);
  try {
    await fsPromises.writeFile(path.join(linkDir, processedLink.slug), linkPost);
  } catch (err) {
    console.error(`Error writing file: ${err}`);
    return;
  }
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
  createLinkPost,
  createPinboard,
  formatLinkDir,
  getLastSevenDays,
  maybeWriteLinkFile,
  processPinboardLink,
  writeLinks,
};
