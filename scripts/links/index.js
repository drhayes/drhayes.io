const Pinboard = require('node-pinboard').default;
const util = require('util');
const slugify = require('@sindresorhus/slugify');
const dateFns = require('date-fns');
const path = require('path');

async function writeLinks(linksDir, pinboardLinks, fsPromises) {
  const processedLinks = pinboardLinks.map(processPinboardLink);
  for (const link of processedLinks) {
    await maybeWriteLinkFile(linksDir, link, fsPromises);
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
  const post = ['---', `title: "🔗 ${processedLink.title}"`];
  if (processedLink.description) {
    post.push(`description: "${processedLink.description}"`);
  }
  post.push(`date: ${processedLink.date}`);
  if (processedLink.tags) {
    post.push('tags:');
    for (const tag of processedLink.tags) {
      post.push(`  - ${tag}`);
    }
  }
  post.push(`url: ${processedLink.url}`, '---', '');
  post.push(processedLink.note, '');
  post.push(`Check it out: ${processedLink.url}`);
  return post.join('\n');
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
  formatLinkDir,
  getLastSevenDays,
  maybeWriteLinkFile,
  processPinboardLink,
  writeLinks,
};
