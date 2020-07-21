const markdownIt = require('markdown-it');
const markdownItEmoji = require('markdown-it-emoji');
const hljs = require('highlight.js');

// Custom Markdown library.
const markdownLib = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const code = hljs.highlight(lang, str).value;
        return `<pre class="hljs"><code>${code}</code></pre>`;
      } catch (e) {
        console.error('Error highlighting code', e);
      }
    }
  },
}).use(markdownItEmoji);

module.exports = markdownLib;
