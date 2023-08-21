const allTheWriting = require('./allTheWriting');

function writingByTag(collectionApi) {
  const writings = allTheWriting(collectionApi);
  const tagToPostMap = new Map();
  for (const post of writings) {
    const tags = post.data?.tags || [];
    for (const tag of tags) {
      let posts = tagToPostMap.get(tag);
      if (!posts) {
        posts = [];
        tagToPostMap.set(tag, posts);
      }
      posts.push(post);
    }
  }
  return tagToPostMap;
}

module.exports = writingByTag;
