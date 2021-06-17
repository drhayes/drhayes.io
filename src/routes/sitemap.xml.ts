import getAllTags from '$lib/allTags';

function renderStaticPage(page) {
  const lastmod = new Date().toISOString();
  return `<url>
  <loc>${page}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>weekly</changefreq>
</url>`;
}

function renderTagPage(host, tag) {
  const lastmod = new Date().toISOString();
  return `<url>
  <loc>https://${host}/tags/${tag}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>weekly</changefreq>
</url>`;
}

export async function get({ host }) {
  const staticPageFilters = ['slug]', '_', 'private'];
  const staticPages = Object.keys(import.meta.glob('/src/routes/**/!(_)*.{svelte,md}'))
    .filter(page => !staticPageFilters.find(filter => page.includes(filter)))
    .map(page => page
      .replace('/src/routes', `https://${host}`)
      .replace('/index.svelte', '')
      .replace('.svelte', '')
      .replace('.md', ''));

  const allTags = await getAllTags();

  return {
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Content-Type': 'application/xml'
    },
    body: `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(renderStaticPage)}
  ${allTags.map(tag => renderTagPage(host, tag))}
</urlset>`,
  };
}
