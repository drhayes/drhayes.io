import SitePage from './sitePage';

/**
 * Can be used as the comparator in a Array.sort call to sort in descending date order.
 * @param a
 * @param b
 * @returns
 */
export default function pageSorter(a: SitePage, b: SitePage) {
  return b.frontmatter.date.valueOf() - a.frontmatter.date.valueOf();
}
