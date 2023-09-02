const { format } = require('date-fns');

function timeformat(date) {
  if (!date) {
    return '';
  }

  const adjustedDate = new Date(date);
  // This is lame, but 11ty is handing me UTC Date instances and I wrote
  // the date frontmatter values as CST/CDT.
  // adjustedDate.setHours(date.getHours() + 6);

  return format(adjustedDate, 'hh:mmaaa');
}

module.exports = timeformat;
