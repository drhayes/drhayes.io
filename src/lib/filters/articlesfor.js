function articlesfor(articles, include) {
  return articles.filter((article) => article.inputPath.includes(include));
}

module.exports = articlesfor;
