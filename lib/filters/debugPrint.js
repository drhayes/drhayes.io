const { stringify } = require('flatted');

function debugFormat(data) {
  return stringify(data, null, 2);
}

module.exports = debugFormat;
