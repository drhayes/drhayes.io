const { parse, isValid } = require('date-fns');

const sentinelDate = new Date(2001, 0, 1);

function twDate(date) {
  try {
    // The TiddlyWiki date is a packed number that looks like YYYYMMDDhhmmsszzz.
    const parsedDate = parse(date.toString(), 'yyyyMMddHHmmssSSS', new Date());
    if (!isValid) {
      console.warn(`This made an invalid date: ${date}`);
      return sentinelDate;
    }
    return parsedDate;
  } catch (e) {
    console.error(e);
    return sentinelDate;
  }
}

module.exports = twDate;
