import remark from 'remark';
import remark2react from 'remark-react';
import frontmatter from 'remark-frontmatter';
import extract from 'remark-extract-frontmatter';
import yaml from 'yaml';
import emoji from 'remark-emoji';
import RemarkLowlight from 'remark-react-lowlight';
import js from 'highlight.js/lib/languages/javascript';
import githubSchema from 'hast-util-sanitize/lib/github.json';

// import 'highlight.js/styles/a11y-light.css';
import 'highlight.js/styles/atelier-forest-light.css';

const schema = Object.assign({}, githubSchema, {
  attributes: Object.assign({}, githubSchema.attributes, {
    code: [
      ...(githubSchema.attributes.code || []),
      'className'
    ],
    iframe: ['width', 'height', 'src', 'frameBorder', 'allow', 'allowFullScreen']
  }),
  tagNames: githubSchema.tagNames.concat('iframe')
});

// Given content, returns a React element with all the right
// things set.
export default function markdownProcessor(markdown) {
  return remark()
    .use(remark2react, {
      sanitize: schema,
      remarkReactComponents: {
        code: RemarkLowlight({ js })
      }
    })
    .use(frontmatter, ['yaml'])
    .use(extract, { yaml: yaml.parse })
    .use(emoji)
    .processSync(markdown);
}
