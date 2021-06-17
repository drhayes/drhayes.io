export default async function allTags(): Promise<string[]> {
  const pageFiles = import.meta.glob('/src/routes/**/*.md');
  const pagePromises = Object.values(pageFiles).map(page => page());
  const pages = await Promise.all([...pagePromises]);
  const tagsSet = new Set();
  for (const page of pages) {
    const { metadata: { tags } } = page;
    if (tags) {
      tags.forEach(tag => tagsSet.add(tag));
    }
  }

  return [...tagsSet].sort();
}
