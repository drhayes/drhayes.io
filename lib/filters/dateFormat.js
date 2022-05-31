const { format } = require('date-fns');

function dateFormat(date, isDateTimeAttribute) {
  // omg this is so hacky. But 11ty reads all my dates at UTC instead of CDT/CST. The other solutions
  // I could think of were longer and less clear rather than undoing the offset via math, so...
  date.setHours(date.getHours() + 6);

  if (isDateTimeAttribute) {
    return format(date, `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`);
  } else {
    return format(date, 'y.LL.dd');
  }
}

module.exports = dateFormat;
