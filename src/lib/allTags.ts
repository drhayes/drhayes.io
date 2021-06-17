export default async function allTags(): Promise<string[]> {
  const postFiles = import.meta.glob('/src/routes/blog/*.md');
  const postPromises = Object.values(postFiles).map(page => page());
  const posts = await Promise.all(postPromises);
  const tagsSet: Set<string> = posts.reduce((all: Set<string>, post) => {
    const { metadata: { tags } } = post;
    if (tags) {
      tags.forEach(tag => all.add(tag));
    }
    return all;
  }, new Set<string>());

  return [...tagsSet];
}
