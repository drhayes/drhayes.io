function titleify(value) {
  if (!value) {
    return 'drhayes.io';
  }

  if (value.indexOf('drhayes.io') === -1) {
    return `${value} · drhayes.io`;
  } else {
    return value;
  }
}

module.exports = titleify;
