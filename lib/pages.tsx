import fs from 'fs/promises';
import path from 'path';
import components from './mdxComponents';
import renderToString from 'next-mdx-remote/render-to-string';
import { MdxRemote } from 'next-mdx-remote/types';
import matter from 'gray-matter';

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
  mdxSource: MdxRemote.Source;
  frontmatter: PageFrontmatter;

  constructor(slug: string, mdxSource: MdxRemote.Source, frontmatter: any) {
    this.slug = slug.replace(/\.mdx$/, '');
    this.mdxSource = mdxSource;
    // This might be duplicative for no good reason.
    // Frontmatter requires some special handling.
    const checkedFrontmatter: PageFrontmatter = {
      title: frontmatter.title,
      date: frontmatter.date,
      updated: frontmatter.updated,
      description: frontmatter.description,
      tags: frontmatter.tags,
    };
    // Now put the rest of that stuff in there.
    Object.keys(frontmatter).forEach((key) => {
      checkedFrontmatter[key] = frontmatter[key];
    });
    this.frontmatter = checkedFrontmatter;
  }

  toJSON(): any {
    const { slug, mdxSource, frontmatter } = this;
    const serializedFrontmatter = {};
    // Whatever you do, don't send any Dates.
    Object.keys(frontmatter).forEach((key) => {
      const value = frontmatter[key];
      if (value) {
        serializedFrontmatter[key] = value.toISOString ? value.toISOString() : value;
      }
    });

    return {
      slug,
      mdxSource,
      frontmatter: serializedFrontmatter,
    };
  }
}

export async function getPage(slug: string): Promise<SitePage> {
  if (!slug.endsWith('.mdx')) {
    slug = `${slug}.mdx`;
  }
  const pagePath = path.join(pagesDirectory, slug);
  const fileContents = await fs.readFile(pagePath);
  // Generate the frontmatter.
  const { content, data } = matter(fileContents);
  // Generate the page source.
  const mdxSource = await renderToString(content, { components });

  return new SitePage(slug, mdxSource, data as PageFrontmatter);
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
    // If this thing isn't a Markdown file, don't parse anything.
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

export type GameInfo = {
  name: string;
  screenshotPath: string;
  slug: string;
  description: string;
};

export async function getGames(): Promise<GameInfo[]> {
  const allPages: SitePage[] = await getAllPages();
  // Find the things that look like games. They have "game" set to "true" in their frontmatter. Have
  // to scan all the pages for that, I guess.
  const gamePages: SitePage[] = allPages.filter((page) => page.frontmatter.game);
  return gamePages.map((gamePage) => ({
    name: gamePage.frontmatter.title,
    slug: gamePage.slug.replace(/index$/i, ''),
    screenshotPath: gamePage.frontmatter.screenshot,
    description: gamePage.frontmatter.description,
  }));
}
