export async function get({ query }) {

  return {
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Content-Type': 'text/plain; charset=UTF-8'
    },
    body: `Hi there ${query}`,
  };
}
