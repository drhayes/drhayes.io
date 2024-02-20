function dateSort(things) {
  if (!things) {
    return;
  }

  if (!Array.isArray(things)) {
    return [things];
  }

  return things.toSorted((a, b) => {
    let aDate = a.data.date;
    if (a.data.updated) {
      aDate = a.data.updated;
    }
    let bDate = b.data.date;
    if (b.data.updated) {
      bDate = b.data.updated;
    }
    return aDate - bDate;
  });
}

module.exports = dateSort;
