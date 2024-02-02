#! /usr/bin/env node

const { addBook } = require('./books');

const isbn = process.argv[2];
const label = process.argv[3];

if (!isbn || !label) {
  console.error('Usage: add-book.js <isbn> <label>');
  process.exit(1);
}

async function main() {
  await addBook(isbn, label);
}

main();
