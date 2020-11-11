const fs = require('fs').promises;
const path = require('path');
const markdown = require('../../lib/library/markdown');

const EXCEPTIONS = [
  '.git',
];

async function crawlDir(baseDir, dir) {
  dir = dir || baseDir;
  const files = await fs.readdir(dir);
  const results = [];
  for (file of files) {
    // Skip things we don't want.
    if (EXCEPTIONS.includes(file)) {
      continue;
    }

    const stat = await fs.stat(path.join(dir, file));
    // If it's a directory, recursively crawl it.
    if (stat.isDirectory()) {
      const files = await crawlDir(baseDir, path.join(dir, file));
      results.push.apply(results, files);
    } else {
      // Read files and put them in there.
      const contents = await fs.readFile(path.join(dir, file), 'utf8');
      results.push({
        path: path.relative(baseDir, path.join(dir, file)),
        contents
      });
    }
  }
  return results;
}

function parseNoteDate(dateString) {
  return dateString;
  const match = dateString.match(/(\d\d\d\d)-(\d\d)-(\d\d)/);
  return new Date(match[1], match[2], match[3]);
}

// Given an object that looks like { path, contents } will return a note object
// or null if the given object was invalid.
function processNote(rawNote) {
  const note = {};
  // First line is the title, minus any leading '#' character.
  const contents = rawNote.split('\n');
  const titleLine = contents.shift().trim();
  note.title = titleLine.replace(/^#\s+/, '');
  // Next, look for words (maybe with dashes!) that start with @ delimited by spaces.
  // Those are tags. They are case-insensitive.
  const tagLine = contents.shift().trim();
  note.tags = tagLine
    .toLowerCase()
    .split(' ')
    .map(tag => tag.replace('@', ''));
  // Then zero or more of (in any order):
  // * ":created:" followed by a space followed by a YYYY-MM-DD date.
  // * ":updated:" followed by a space followed by a YYYY-MM-DD date.
  // * ":description:" followed by text until a new line.
  let nextLine = contents.shift().trim();
  while (nextLine.length > 0) {
    if (nextLine.startsWith(':created:')) {
      note.created = parseNoteDate(nextLine.replace(':created:', '').trim());
    } else if (nextLine.startsWith(':updated:')) {
      note.updated = parseNoteDate(nextLine.replace(':updated:', '').trim());
    } else if (nextLine.startsWith(':description:')) {
      note.description = nextLine.replace(':description:', '').trim();
    }
    nextLine = contents.shift().trim();
  }
  // Then a blank line.
  // Anything else is content that should be processed as markdown.
  note.contents = markdown.render(contents.join('\n'));
  return note;
}

module.exports = async function() {
  const notesBasePath = path.join(__dirname, '../../notes');
  const noteFiles = await crawlDir(notesBasePath);
  return noteFiles
    // Parse the raw note contents.
    .map(({ path, contents }) => ({ path, noteData: processNote(contents) }))
    // Filter out any invalid ones.
    .filter(note => note.noteData)
    // Change to a form eleventy likes.
    .map(note => note.noteData);
};
