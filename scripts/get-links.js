#! /usr/bin/env node

const { getLinks } = require('./links');

const pinboardApiToken = process.env.PINBOARD_API_TOKEN;

if (!pinboardApiToken) {
  console.error('PINBOARD_API_TOKEN environment variable is required');
  process.exit(1);
}

async function main() {
  console.log('Getting links...');
  await getLinks(pinboardApiToken);
  console.log('Done!');
}

main();
