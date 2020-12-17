const test = require('ava');
const fs = require('fs');
const path = require('path');
const { parseNote, formatEleventyNote } = require('./bin/processNotes');

test('processNotes does not mess up jokes.md', t => {
  const rawPath = path.join(__dirname, 'fixtures', 'jokes.md');
  const rawNote = fs.readFileSync(rawPath, 'utf8');
  const note = parseNote(rawPath, rawNote);
  // Are there still ***s?
  t.is(note.contents.includes('***'), true);
  // Are they still there when it's formatted for eleventy?
  const markdownNote = formatEleventyNote(note, {});
  t.is(markdownNote.includes('***'), true);
});
