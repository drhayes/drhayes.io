const less = require('less');

const options = {};

function lessify(input, cb) {
  less.render(input, options, (err, output) => {
    if (err) {
      console.error(err);
      return cb(err);
    }
    cb(null, output.css);
  });
}

module.exports = lessify;
