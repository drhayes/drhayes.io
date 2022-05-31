const markdownIt = require('markdown-it');
const markdownItEmoji = require('markdown-it-emoji');
const hljs = require('highlight.js');

module.exports = function markdown() {
  const options = {
    html: true,
    breaks: false,
    linkify: true,
    typographer: true,
    highlight: (str, language) => {
      try {
        const code = hljs.highlight(str, { language }).value;
        return `<pre class="hljs"><code>${code}</code></pre>`;
      } catch (e) {
        console.error(`Error rendering code in markdown lib: ${e}`);
      }
    },
  };

  const markdownLib = markdownIt(options).use(markdownItEmoji);

  return markdownLib;
}

