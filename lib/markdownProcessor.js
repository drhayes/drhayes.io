import remark from 'remark';
import remark2react from 'remark-react';
import frontmatter from 'remark-frontmatter';
import extract from 'remark-extract-frontmatter';
import yaml from 'yaml';
import emoji from 'remark-emoji';

const thing = () => (tree, file) => {
  console.log(tree, file);
}

// Given content, returns a React element with all the right
// things set.
export default function markdownProcessor(markdown) {
  return remark()
    .use(remark2react, {
      sanitize: null,
    })
    .use(frontmatter, ['yaml'])
    .use(extract, { yaml: yaml.parse })
    .use(emoji)
    .use(thing)
    .processSync(markdown);
}
