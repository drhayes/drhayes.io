const EleventyFetch = require('@11ty/eleventy-fetch');

async function getPost(url) {
  try {
    const post = await EleventyFetch(`${url}.json`, {
      duration: '1h',
      type: 'json',
    });
    if (post.published) {
      post.published = new Date(post.published);
    }
    return post;
  } catch (e) {
    console.error(`Error getting post from ${url}`, e);
  }
  return null;
}

module.exports = getPost;
