#! /usr/bin/env node

const {
  createPinboard,
  getLastSevenDays,
  writeLinks,
} = require('./links');
const fsPromises = require('fs').promises;

const pinboardApiToken = process.env.PINBOARD_API_TOKEN;

if (!pinboardApiToken) {
  console.error('PINBOARD_API_TOKEN environment variable is required');
  process.exit(1);
}

async function main() {
  console.log('Getting links...');
  const pinboard = createPinboard(pinboardApiToken);
  const recentPinboardLinks = await getLastSevenDays(pinboard);
  await writeLinks(recentPinboardLinks, fsPromises);
  console.log('Done!');
}

main();
