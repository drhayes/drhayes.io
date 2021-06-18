export async function get() {
  const pinboardToken = import.meta.env.VITE_PINBOARD_API_TOKEN;
  if (!pinboardToken) {
    console.log('got nothing for token');
    // If it's not there, bail.
    return {
      body: [],
    };
  }
  const recentPosts = await fetch(`https://api.pinboard.in/v1/posts/recent?auth_token=${pinboardToken}&format=json`).then(response => response.json());
  const processedPosts = recentPosts.posts
    .map(post => ({
      href: post.href,
      title: post.description || '<no title!>',
      tags: post.tags?.split(' ') || [],
    }));
  return {
    body: processedPosts,
  }
}
