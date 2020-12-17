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
  const [, year, rawMonth, rawDay] = dateString.match(/(\d\d\d\d)(?:-(\d\d?)(?:-(\d\d?))?)?/);
  const month = rawMonth ? rawMonth.padStart(2, '0') : '01';
  const day = rawDay ? rawDay.padStart(2, '0') : '01';
  return `${year}-${month}-${day}`;
}

const processingRules = {
  author: (note, line) => note.author = line,
  created: (note, line) => note.created = parseNoteDate(line),
  description: (note, line) => note.description = line,
  draft: (note, line) => note.draft = true,
  subtitle: (note, line) => note.subtitle = line,
  updated: (note, line) => note.updated = parseNoteDate(line),
};

// Given an object that looks like { path, contents } will return a note object
// or null if the given object was invalid.
function parseNote(notePath, rawNote) {
  const note = {
    path: notePath,
    slug: notePath.replace(/\.md$/i, ''),
  };
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
    [, tag, value] = nextLine.match(/^\s*:(\w+):\s*(.*)$/);
    const rule = processingRules[tag];
    if (rule) {
      rule(note, value.trim());
    } else {
      console.error(`Unknown rule: ${nextLine}`);
    }
    nextLine = contents.shift().trim();
  }
  // Then a blank line.
  // Anything else is content that should be left as markdown contents.
  note.contents = contents.join('\n');
  console.log(`Parsed "${note.title}." from ${note.slug}`);
  return note;
}

function formatEleventyNote(note, notesBySlug) {
  // Format the front-matter suitable for an eleventy template.
  const frontmatter = [
    `title: ${note.title}`,
    note.tags ? `tags: [${note.tags.join(', ')}]` : false,
    note.created ? `date: ${note.created}` : false,
    note.updated ? `updated: ${note.updated}` : false,
    note.description ? `description: ${note.description}` : false,
    note.draft ? `draft: true` : false,
    note.author ? `author: ${note.author}` : false,
    note.subtitle ? `subtitle: ${note.subtitle}` : false,
  ].filter(Boolean);
  // Substitute any links in the text for Markdown-flavored links.
  const matches = note.contents.matchAll(/\[\[(.+)\]\s*(.*)\]/gi);
  for (const match of matches) {
    const [reference, noteId, linkText] = match;
    console.log(reference, noteId, linkText);
    const noteRef = notesBySlug[noteId];
    if (noteRef) {
      note.contents = note.contents.replace(reference, `[${ linkText || (noteRef && noteRef.title )}](/notes/${noteId})`);
    }
  }
  // Return the template we should write to disk.
  return `---
${frontmatter.join('\n')}
---

${note.contents}`.trim()
}

async function main(rawNotesDir, templateNotesDir) {
  try {
    const scanDir = path.resolve(process.cwd(), rawNotesDir);
    console.log(`Scanning ${scanDir}`);
    const noteFiles = await crawlDir(scanDir);
    const parsedNotes = noteFiles
      // Parse the raw note contents.
      .map(({ path, contents }) => parseNote(path, contents))
      // Filter out any invalid ones.
      .filter(note => note.title);

    const notesBySlug = parsedNotes.reduce((results, note) => {
      results[note.slug] = note;
      return results;
    }, {});

    for (note of parsedNotes) {
      try {
        const noteContent = formatEleventyNote(note, notesBySlug);
        const fullNotePath = path.resolve(templateNotesDir, note.path);
        const noteDir = path.dirname(fullNotePath);
        // Ensure directory exists.
          await fs.mkdir(noteDir, {
            recursive: true
          });
        // Write out a template that looks like an eleventy note template.
        await fs.writeFile(fullNotePath, noteContent, 'utf8')
      }
      catch (e) {
        // Log and move on.
        console.error(`Error generating ${note.path}`, e)
      }
    }
  }
  catch (e) {
    console.error(e);
  }
};

if (require.main === module) {
  // Validate our two params.
  if (process.argv.length < 4) {
    console.error('Should be two params: <raw notes dir> and <template notes dir>');
    process.exit(1);
  }

  [ , , rawNotesDir, templateNotesDir ] = process.argv;

  main(rawNotesDir, templateNotesDir);
} else {
  module.exports = {
    parseNote,
    formatEleventyNote,
  };
}
