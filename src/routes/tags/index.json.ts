export async function get() {
  const posts = import.meta.glob('../blog/*.md');
  // const posts = await fetch('/blog.json').then(res => res.json());
  // const tagsSet = posts.reduce((all, post) => {
  //   if (post.tags) {
  //     post.tags.forEach(tag => all.add(tag));
  //   }
  //   return all;
  // }, new Set());
  // const tags = [...tagsSet];
  // tags.sort();
  console.log(posts);

  return {
    body: posts,
  };
}
