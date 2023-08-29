function titleSort(things) {
  if (!things) {
    return;
  }

  return things.toSorted((a, b) => {
    let aTitle = a.data?.title || '';
    let bTitle = b.data?.title || '';
    return aTitle.localeCompare(bTitle);
  });
}

module.exports = titleSort;
