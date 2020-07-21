const moment = require('moment');

function dateFormat(date, format) {
  return moment(date).format(format);
}

module.exports = dateFormat;
