function titleify(value) {
  if (value) {
    return `${value} · drhayes.io`;
  }
  return 'drhayes.io';
}

module.exports = titleify;
