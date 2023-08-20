const { parse } = require('date-fns');

function twDate(date) {
  // The TiddlyWiki date is a packed number that looks like YYYYMMDDhhmmsszzz.
  return parse(date.toString(), 'yyyyMMddHHmmssSSS', new Date());
}

module.exports = twDate;
