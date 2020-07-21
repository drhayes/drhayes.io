const truncateHtml = require('truncate-html');

function truncate(text) {
  return truncateHtml(text, 50, {
    byWords: true,
    reserveLastWord: true,
  });
}

module.exports = truncate;
