import renderToString from 'next-mdx-remote/render-to-string';
import components from './mdxComponents';

export type PageFrontmatter = {
  title: string;
  date?: Date;
  updated?: Date;
  description?: string;
  tags?: string[];
  [key: string]: any;
};

export default class SitePage {
  slug: string;
  // mdxSource: MdxRemote.Source;
  content: string;
  frontmatter: PageFrontmatter;

  constructor(slug: string, content: string, frontmatter: PageFrontmatter) {
    this.slug = slug.replace(/\.mdx$/, '');
    this.content = content;
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

  async render(): Promise<any> {
    const { slug, content, frontmatter } = this;

    // Generate the page source.
    const mdxSource = await renderToString(content, { components });

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
