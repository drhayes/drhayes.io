import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import SitePage from './sitePage';
import { PageFrontmatter } from './sitePage';

const pagesDirectory = path.join(process.cwd(), 'src');

export async function getPage(slug: string): Promise<SitePage> {
  if (!slug.endsWith('.mdx')) {
    slug = `${slug}.mdx`;
  }
  const pagePath = path.join(pagesDirectory, slug);
  const fileContents = await fs.readFile(pagePath);
  const { content, data } = matter(fileContents);

  return new SitePage(slug, content, data as PageFrontmatter);
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

export async function getTagMap(): Promise<Map<string, SitePage[]>> {
  const allPages: SitePage[] = await getAllPages();
  const tagMap = new Map<string, SitePage[]>();
  for (const page of allPages) {
    const tags = page.frontmatter.tags;
    if (!tags) {
      continue;
    }
    for (const tag of tags) {
      let pageList = tagMap.get(tag);
      if (!pageList) {
        pageList = [];
        tagMap.set(tag, pageList);
      }
      pageList.push(page);
    }
  }
  return tagMap;
}
