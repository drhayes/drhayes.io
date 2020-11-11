const fs = require('fs').promises;
const path = require('path');

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

async function processNote(rawNote) {
  // First line is the title, minus any leading '#' character.
  // Next, look for words that start with @. Those are tags.
  // Then zero or more of (in any order):
  // * ":created:" followed by a space followed by a YYYY-MM-DD date.
  // * ":updated:" followed by a space followed by a YYYY-MM-DD date.
  // * ":description:" followed by text until a new line.
  // Then a blank line.
  // Anything else is content that should be processed as markdown.
  return null;
  return {
    title: Date.now().toString(),
  }
}

module.exports = async function() {
  const notesBasePath = path.join(__dirname, '../../notes');
  const rawNotes = await crawlDir(notesBasePath)
  const notes = await Promise.all(rawNotes.map(processNote));
  const filteredNotes = notes.filter(Boolean);
  console.log(filteredNotes);
  return filteredNotes;
};
