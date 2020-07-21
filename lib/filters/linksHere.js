function linksHere(pages, url) {
  return (
    pages
      .filter(Boolean)
      // Tag pages don't count.
      .filter((page) => !page.url.includes('/tag'))
      .filter((page) =>
        page.templateContent.includes(url.substr(0, url.length - 1)),
      )
  );
}

module.exports = linksHere;
