const { format } = require('date-fns');

function dateFormat(date, isDateTimeAttribute) {
  if (isDateTimeAttribute) {
    return format(date, `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`);
  } else {
    return format(date, 'y.LL.dd');
  }
}

module.exports = dateFormat;
