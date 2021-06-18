import type { Metadata } from './metadataUtil';
import { dateSortDescending } from './metadataUtil';

export default async function allPages(): Promise<Metadata[]> {
  const pageFiles = import.meta.glob('/src/routes/**/*.md');
  const metadataPromises: Promise<Metadata>[] = [];
  for (const [slug, resolver] of Object.entries(pageFiles)) {
    metadataPromises.push(resolver().then(({ metadata }) => ({
      slug,
      ...metadata,
    })));
  }
  const metadata = await Promise.all(metadataPromises);
  return metadata.sort(dateSortDescending);
}
