const markdownIt = require('markdown-it');
const emoji = require('markdown-it-emoji');
const hljs = require('highlight.js');
const attribution = require('markdown-it-attribution');

// Custom Markdown library.
const markdownLib = markdownIt({
  html: true,
  breaks: false,
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
})
.use(emoji)
.use(attribution, {
  marker: '--',
  removeMarker: true,
});

module.exports = markdownLib;
