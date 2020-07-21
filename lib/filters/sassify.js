const sass = require('node-sass');

function sassify(data) {
  const result = sass.renderSync({ data });
  return result.css.toString();
}

module.exports = sassify;
