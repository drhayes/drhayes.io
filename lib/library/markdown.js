const remark = require('remark');
const html = require('remark-html');
const githubFlavoredMarkdown = require('remark-gfm');
const highlight = require('remark-highlight.js');
const attribution = require('./plugins/attribution');

module.exports = function eleventyRemark() {
  const processor = remark()
    .use(html)
    .use(githubFlavoredMarkdown)
    .use(highlight)
    .use(attribution);

  return {
    set: () => {},
    render: async (str) => {
      const { contents } = await processor.process(str);
      return contents.toString();
    },
  };
}
