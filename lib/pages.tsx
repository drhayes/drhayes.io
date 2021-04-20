import fs from 'fs/promises';
import path from 'path';
import { bundleMDX } from 'mdx-bundler';

const pagesDirectory = path.join(process.cwd(), 'src');

export async function getPage(slug: string): Promise<{ code: string; frontmatter: any }> {
  const contents = await fs.readFile(path.join(pagesDirectory, slug));
  const { code, frontmatter } = await bundleMDX(contents.toString());
  // Fix those date objects.
  if (frontmatter.updated) {
    frontmatter.updated = frontmatter.updated.toISOString();
  }
  if (frontmatter.created) {
    frontmatter.created = frontmatter.created.toISOString();
  }
  return { code, frontmatter };
}
