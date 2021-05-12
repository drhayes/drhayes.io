/**
 * Can be used as the comparator in a Array.sort call to sort in descending date order.
 * @param a
 * @param b
 * @returns
 */
export default function pageSorter(a: SitePage, b: SitePage) {
  if (a.frontmatter.date > b.frontmatter.date) {
    return -1;
  } else if (a.frontmatter.date < b.frontmatter.date) {
    return 1;
  } else {
    return 0;
  }
}
