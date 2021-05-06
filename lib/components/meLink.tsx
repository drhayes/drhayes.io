export default function MeLink({ href, children }) {
  if (!children) {
    children = href.replace('https://', '').replace('www.', '');
  }
  return <a href={href}>{children}</a>;
}
