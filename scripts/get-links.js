#! /usr/bin/env node

const {
  createPinboard,
  getLastSevenDays,
  writeLinks,
} = require('./links');
const fsPromises = require('fs').promises;
const path = require('path');
const Pinboard = require('node-pinboard').default;

const pinboardApiToken = process.env.PINBOARD_API_TOKEN;

if (!pinboardApiToken) {
  console.error('PINBOARD_API_TOKEN environment variable is required');
  process.exit(1);
}

async function main() {
  console.log('Getting links...');
  const linksDir = path.join(__dirname, '..', 'src', 'links');
  const pinboard = new Pinboard(pinboardApiToken);
  const recentPinboardLinks = await getLastSevenDays(pinboard, new Date());
  await writeLinks(linksDir, recentPinboardLinks, fsPromises);
  console.log('Done!');
}

main();
