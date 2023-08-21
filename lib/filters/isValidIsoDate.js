function isValidIsoDate(date) {
  if (!date) {
    return false;
  }

  if (!date.toISOString) {
    return false;
  }

  try {
    // This can throw a RangeError.
    date.toISOString();
  } catch (e) {
    return false;
  }

  return true;
}

module.exports = isValidIsoDate;
