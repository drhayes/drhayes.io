const Cache = require('@11ty/eleventy-cache-assets');
// drhayes:04619C1D0D872F85A5B9
// https://user:passwd@api.pinboard.in/v1/posts/recent

module.exports = async function fetchPinboardPosts() {
  const pinboardToken = process.env.PINBOARD_API_TOKEN;
  const recentPosts = await Cache(`https://api.pinboard.in/v1/posts/recent?auth_token=${pinboardToken}&format=json`, {
    duration: '1h',
    type: 'json',
  })
  const processedPosts = recentPosts.posts
    .map(({ href, description, tags }) => ({ href, description, tags: tags.split(' ') }));
  return processedPosts;
}
