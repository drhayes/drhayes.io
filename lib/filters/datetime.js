const { format } = require('date-fns');

function datetime(date) {
  if (!date) {
    return '';
  }

  // eslint-disable-next-line
  return format(date, `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`);
}

module.exports = datetime;
