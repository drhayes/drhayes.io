export async function get({ host }) {

  return {
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Content-Type': 'application/xml'
    },
    body: `<things />`,
  };
}
