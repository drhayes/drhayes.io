import allTags from '$lib/allTags';

export async function get() {
  const body = await allTags();
  return {
    body,
  };
}
