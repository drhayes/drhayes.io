#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const wordsFilePath = process.argv[2];
if (!wordsFilePath) {
  console.error('Please provide a path to the words file');
  process.exit(1);
}

const wordPostsPath = process.argv[3];
if (!wordPostsPath) {
  console.error('Please provide a path to the words posts directory');
  process.exit(1);
}

const wordsString = fs.readFileSync(wordsFilePath, 'utf8');
const wordsArray = JSON.parse(wordsString);

function unTiddly(text) {
  return text.replace(/\/\/(\w+)\/\//g, '*$1*');
}

const wordsPosts = wordsArray.map(word => {
  const post = ['---'];
  post.push(`title: "${word.caption}"`);
  post.push('definition: |', `   ${unTiddly(word.description)}`);
  post.push('---', '');
  return {
    word: word.caption,
    post: post.join('\n'),
  };
});

for (const { word, post } of wordsPosts) {
  console.log(`Writing ${word}.md`);
  fs.writeFileSync(path.join(wordPostsPath, `${word}.md`), post);
}
