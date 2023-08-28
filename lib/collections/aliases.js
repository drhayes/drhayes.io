function aliases(collectionApi) {
  const all = collectionApi.getAll();
  const aliasesMap = {};
  all
    .filter((thing) => thing.data?.aliases)
    .forEach((thing) => {
      thing.data.aliases.forEach((alias) => {
        aliasesMap[alias] = thing.page.url;
      });
    });
  return aliasesMap;
}

module.exports = aliases;
