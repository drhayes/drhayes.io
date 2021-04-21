import fs from 'fs/promises';
import path from 'path';
import { bundleMDX } from 'mdx-bundler';

const pagesDirectory = path.join(process.cwd(), 'src');

export type PageFrontmatter = {
  title: string;
  date?: Date;
  updated?: Date;
  description?: string;
  tags?: string[];
  [key: string]: any;
};
export class SitePage {
  slug: string;
  code: string;
  frontmatter: PageFrontmatter;

  constructor(slug: string, code: string, frontmatter: any) {
    this.slug = slug.replace(/\.mdx$/, '');
    this.code = code;
    // Frontmatter requires some special handling.
    const checkedFrontmatter: PageFrontmatter = {
      title: frontmatter.title,
      date: frontmatter.date,
      updated: frontmatter.updated,
      description: frontmatter.description,
      tags: frontmatter.tags,
    };
    this.frontmatter = checkedFrontmatter;
  }

  toJSON(): any {
    const { slug, code, frontmatter } = this;
    const serializedFrontmatter = {};
    Object.keys(frontmatter).forEach((key) => {
      const value = frontmatter[key];
      if (value) {
        serializedFrontmatter[key] = value.toISOString ? value.toISOString() : value;
      }
    });

    return {
      slug,
      code,
      frontmatter: serializedFrontmatter,
    };
  }
}

export async function getPage(slug: string): Promise<SitePage> {
  const pagePath = path.join(pagesDirectory, slug);
  const contents = await fs.readFile(pagePath);
  const { code, frontmatter } = await bundleMDX(contents.toString('utf-8'));
  return new SitePage(slug, code, frontmatter as PageFrontmatter);
}

export async function* walkDir(dir: string) {
  try {
    const filenames = await fs.readdir(dir);
    for (const name of filenames) {
      const fullpath = path.join(dir, name);
      const stat = await fs.stat(fullpath);
      if (stat.isFile()) {
        yield fullpath;
      } else if (stat.isDirectory()) {
        yield* walkDir(fullpath);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export async function getAllPages(): Promise<SitePage[]> {
  const pages = [];
  for await (const fullpath of walkDir(pagesDirectory)) {
    const slug = fullpath.replace(pagesDirectory, '');
    // If this thing isn't an Markdown file, don't parse anything.
    if (slug.endsWith('.mdx')) {
      try {
        const page = await getPage(slug);
        pages.push(page);
      } catch (error) {
        console.error(`error: Generating page for ${slug}`, error);
      }
    }
  }
  return pages;
}

export async function getAllBlogPages(): Promise<SitePage[]> {
  const pages: SitePage[] = await getAllPages();
  // Filter out anything that isn't a blog post.
  const blogPages = pages.filter((page) => page.slug.startsWith('/blog'));
  return blogPages;
}

/**
 * Can be used as the comparator in a Array.sort call to sort in descending date order.
 * @param a
 * @param b
 * @returns
 */
export function pageSorter(a: SitePage, b: SitePage) {
  if (a.frontmatter.date > b.frontmatter.date) {
    return -1;
  } else if (a.frontmatter.date < b.frontmatter.date) {
    return 1;
  } else {
    return 0;
  }
}
