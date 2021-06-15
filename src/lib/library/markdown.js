const remark = require('remark');
const githubFlavoredMarkdown = require('remark-gfm');
const highlight = require('remark-highlight.js');
const attribution = require('./plugins/attribution');
const remark2rehype = require('remark-rehype');
const stringify = require('rehype-stringify');
const raw = require('rehype-raw');

module.exports = function eleventyRemark() {
  const processor = remark()
    .use(githubFlavoredMarkdown)
    .use(highlight)
    .use(attribution)
    .use(remark2rehype)
    // .use(raw)
    .use(stringify);

  return {
    set: () => {},
    render: async (str) => {
      const { contents } = await processor.process(str);
      return contents.toString();
    },
  };
}
