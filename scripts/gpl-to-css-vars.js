#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const gplFilePath = process.argv[2];
if (!gplFilePath) {
  console.error('Please provide a path to the GIMP palette file');
  process.exit(1);
}

const gplFileContents = fs.readFileSync(gplFilePath, 'utf8');
const gplLines = gplFileContents.split('\n');
// Create an array of objects of the form { r, g, b, name }.
// Filter out the header.
const colorValues = gplLines.filter(line => !line.startsWith('GIMP Palette'))
// Ignore comments.
.filter(line => !line.startsWith('#'))
// Ignore blanks.
.filter(Boolean)
.map(line => {
  const [r, g, b, name] = line.trim().split(/\s+/);
  return { r, g, b, name: name.toLowerCase() };
})
// Sort them by name.
.toSorted((a, b) => a.name.localeCompare(b.name))
// Now change them to CSS variable names.
.map(({ r, g, b, name }) => {
  const color = (r << 16) | (g << 8) | b;
  return `--color-${name}: #${color.toString(16)};`;
});

console.log(colorValues.join('\n'));
