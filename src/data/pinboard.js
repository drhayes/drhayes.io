const got = require('got');

function getRecentPostsUrl() {
  return `https://drhayes:${process.env.PINBOARD_PASSWORD}@api.pinboard.in/v1/posts/recent?format=json`;
}

module.exports = async function getPinboardPins() {
  try {
    const response = await got(getRecentPostsUrl());
    const { body } = response;
    const recentPosts = JSON.parse(body);
    return recentPosts.posts;
    return [];
  } catch (error) {
    console.error(error);
  }
  return [];
}
