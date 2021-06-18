import allPages from './allPages';
import type { Metadata } from './metadataUtil';

export default async function allTags(): Promise<string[]> {
  const pages: Metadata[] = await allPages();
  const tagsSet: Set<string> = new Set();
  for (const page of pages) {
    const { tags } = page;
    if (tags) {
      tags.forEach(tag => tagsSet.add(tag));
    }
  }

  return [...tagsSet].sort();
}
