import { Metadata, whichDate } from '$lib/metadataUtil';

import allPages from '../lib/allPages';
import RSS from 'rss';

export async function get({ host }) {
  const pages: Metadata[] = await allPages();

  const feed = new RSS({
    title: 'drhayes.io',
    description: 'All the pages from drhayes.io',
    site_url: 'https://drhayes.io',
    feed_url: 'https://drhayes.io/feed.xml',
    image_url: 'https://drhayes.io/img/raven.png',
    copyright: 'This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License by David R. Hayes.',
    pubDate: new Date().toISOString(),
  });

  pages.forEach(page => {
    const pagePath = page.slug
      .replace('.md', '')
      .replace('/src/routes/', '/');
    feed.item({
      title: page.title,
      url: `https://drhayes.io${pagePath}`,
      date: whichDate(page),
      description: page.description,
      author: 'David Hayes <hi@drhayes.io>',
      categories: page.tags || [],
    });
  });

  return {
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Content-Type': 'application/xml'
    },
    body: feed.xml({ indent: true }),
  };
}
