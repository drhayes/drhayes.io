import type { EndpointOutput } from '@sveltejs/kit';
import { dateSortAscending } from '../../lib/metadataUtil';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(): Promise<EndpointOutput> {
  const modules = import.meta.glob('./**/index.md');
  const gamePromises = [];

  const slugify = path => path.replace('./', '').replace('/index.md', '');
  for (const [path, resolver] of Object.entries(modules)) {
    const promise = resolver().then((post) => ({
      slug: slugify(path),
      ...post.metadata
    }));

    gamePromises.push(promise);
  }

  const games = await Promise.all(gamePromises);
  games.sort(dateSortAscending);

  return {
    body: games
  };
}
