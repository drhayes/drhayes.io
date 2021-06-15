function drafts(collectionApi) {
  return collectionApi.getAll().filter((page) => page.data.draft);
}

module.exports = drafts;
