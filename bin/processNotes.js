#! /usr/bin/env node

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

function parseNoteDate(dateString) {
  return dateString;
  const match = dateString.match(/(\d\d\d\d)-(\d\d)-(\d\d)/);
  return new Date(match[1], match[2], match[3]);
}

// Given an object that looks like { path, contents } will return a note object
// or null if the given object was invalid.
function parseNote(rawNote) {
  const note = {};
  // First line is the title, minus any leading '#' character.
  const contents = rawNote.split('\n');
  const titleLine = contents.shift().trim();
  note.title = titleLine.replace(/^#\s*/, '');
  // Next, look for words (maybe with dashes!) that start with @ delimited by spaces.
  // Those are tags. They are case-insensitive.
  // There can be zero of them!
  let nextLine = contents.shift().trim();
  if (nextLine.indexOf('@') !== -1) {
    note.tags = nextLine
      .toLowerCase()
      .split(' ')
      .map(tag => tag.replace('@', ''));
    nextLine = contents.shift().trim();
  }
  // Then zero or more of (in any order):
  // * ":created:" followed by a space followed by a YYYY-MM-DD date.
  // * ":updated:" followed by a space followed by a YYYY-MM-DD date.
  // * ":description:" followed by text until a new line.
  // * ":draft:" followed by nothing.
  while (nextLine.length > 0) {
    if (nextLine.startsWith(':created:')) {
      note.created = parseNoteDate(nextLine.replace(':created:', '').trim());
    } else if (nextLine.startsWith(':updated:')) {
      note.updated = parseNoteDate(nextLine.replace(':updated:', '').trim());
    } else if (nextLine.startsWith(':description:')) {
      note.description = nextLine.replace(':description:', '').trim();
    } else if (nextLine.startsWith(':draft:')) {
      note.draft = true;
    }
    nextLine = contents.shift().trim();
  }
  // Then a blank line.
  // Anything else is content that should be left as markdown contents.
  note.contents = contents.join('\n');
  return note;
}

function formatEleventyNote(note) {
  const frontmatter = [
    `title: ${note.title}`,
    note.tags ? `tags: [${note.tags.join(', ')}]` : false,
    note.created ? `date: ${note.created}` : false,
    note.updated ? `updated: ${note.updated}` : false,
    note.description ? `description: ${note.description}` : false,
    note.draft ? `draft: true` : false,
  ].filter(Boolean);
  return `---
${frontmatter.join('\n')}
---

${note.contents}
`.trim()
}

async function main(rawNotesDir, templateNotesDir) {
  try {
    const scanDir = path.resolve(process.cwd(), rawNotesDir);
    console.log(`Scanning ${scanDir}`);
    const noteFiles = await crawlDir(scanDir);
    return noteFiles
      // Parse the raw note contents.
      .map(({ path, contents }) => ({ path, ... parseNote(contents) }))
      // Filter out any invalid ones.
      .filter(note => note.title)
      // Write as templates to disk.
      .map(async note => {
        try {
          const noteContent = formatEleventyNote(note);
          const fullNotePath = path.resolve(templateNotesDir, note.path);
          const noteDir = path.dirname(fullNotePath);
          // Ensure directory exists.
          try {
            await fs.mkdir(noteDir);
          }
          catch (e) {
            // Ignore if it failed, it's probably because the dir exists already.
          }
          // Write out a template that looks like an eleventy note template.
          await fs.writeFile(fullNotePath, noteContent, 'utf8')
        }
        catch (e) {
          // Log and move on.
          console.error(`Error generating ${note.path}`, e)
        }
      });
  }
  catch (e) {
    console.error(e);
  }
};

// Validate our two params.
if (process.argv.length < 4) {
  console.error('Should be two params: <raw notes dir> and <template notes dir>');
  process.exit(1);
}

[ , , rawNotesDir, templateNotesDir ] = process.argv;

main(rawNotesDir, templateNotesDir);