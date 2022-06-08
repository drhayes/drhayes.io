const hasBigLetterTag = [
  'article',
  'blog',
];

function isBigLetterPage(tags) {
  if (!tags) {
    return false;
  }

  return tags.reduce((prev, curr) => prev || hasBigLetterTag.includes(curr), false);
}

module.exports = isBigLetterPage;
