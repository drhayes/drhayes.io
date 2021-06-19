import slugFromPath from '$lib/slugFromPath';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ query }) {
  const modules = import.meta.glob('./*.{md,svx,svelte.md}');

  const postPromises = [];
  const limit = Number(query.get('limit') ?? Infinity);

  if (Number.isNaN(limit)) {
    return {
      status: 400
    };
  }

  for (const [path, resolver] of Object.entries(modules)) {
    const slug = slugFromPath(path);
    const promise = resolver().then((post) => ({
      slug: `blog/${slug}`,
      ...post.metadata
    }));

    postPromises.push(promise);
  }

  const posts = await Promise.all(postPromises);
  const publishedPosts = posts.filter((post) => post.published !== false).slice(0, limit);

  publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return {
    body: publishedPosts,
  };
}
