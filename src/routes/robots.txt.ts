export async function get({ host }) {

  return {
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Content-Type': 'text/plain; charset=UTF-8'
    },
    body: `Sitemap: https://${host}/sitemap.xml

User-agent: *
Disallow:`,
  };
}
