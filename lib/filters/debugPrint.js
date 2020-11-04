function jsonFilter() {
  console.log('filter');
  const seen = {};
  return function(key, value) {
    if (seen[value]) {
      return undefined;
    }
    seen[value] = true;
    return value;
  }
}

function debugFormat(data) {
  return JSON.stringify(data, jsonFilter(), 2);
}

module.exports = debugFormat;
