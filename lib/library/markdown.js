// const markdownIt = require('markdown-it');
// const emoji = require('markdown-it-emoji');
// const container = require('markdown-it-container');
// const hljs = require('highlight.js');
// const attribution = require('markdown-it-attribution');

// // Custom Markdown library.
// const markdownLib = markdownIt({
//   html: true,
//   breaks: false,
//   linkify: true,
//   typographer: true,
//   highlight: (str, lang) => {
//     if (lang && hljs.getLanguage(lang)) {
//       try {
//         const code = hljs.highlight(lang, str).value;
//         return `<pre class="hljs"><code>${code}</code></pre>`;
//       } catch (e) {
//         console.error('Error highlighting code', e);
//       }
//     }
//   },
// })
// .use(emoji)
// .use(attribution, {
//   marker: '--',
//   removeMarker: true,
// })
// .use(container, 'full-bleed', {
//   validate: params => params.trim().match(/^full-bleed$/),

//   render: (tokens, idx) => {
//     const token = tokens[idx];

//     if (token.nesting == 1) {
//       return '<div class="full-bleed">\n';
//     } else if (token.nesting == -1) {
//       return `</div>\n`;
//     }
//   },
// });

// module.exports = markdownLib;
const remark = require('remark');
const html = require('remark-html');
const githubFlavoredMarkdown = require('remark-gfm');
const highlight = require('remark-highlight.js');

module.exports = function eleventyRemark() {
  const processor = remark()
    .use(html)
    .use(githubFlavoredMarkdown)
    .use(highlight);

  return {
    set: () => {},
    render: async (str) => {
      const { contents } = await processor.process(str);
      return contents.toString();
    },
  };
}
