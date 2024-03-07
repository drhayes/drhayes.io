const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItFootnotes = require('markdown-it-footnote');
const mdfigcaption = require('markdown-it-image-figures');
const markdownItContainer = require('markdown-it-container');

// Set up markdown.
const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
.disable('code')
.use(mdfigcaption, { figcaption: true, lazy: true, async: true })
.use(markdownItAttrs)
.use(markdownItFootnotes)
.use(markdownItContainer, 'aside', {
  render: function(tokens, idx) {
    const currentToken = tokens[idx];
    if (currentToken.type === 'container_aside_open') {
      const title = currentToken.info.replace(/\W+aside\W*/, '').trim();
      let titleElement = '';
      if (title) {
        titleElement = `<h4>${title}</h4>`;
      }
      return `<aside class="box stack">${titleElement}`;
    } else if (currentToken.type === 'container_aside_close') {
      return '</aside>';
    }
  },
})
.use(markdownItContainer, 'joke', {
  render: function(tokens, idx) {
    const currentToken = tokens[idx];
    if (currentToken.type === 'container_joke_open') {
      const title = currentToken.info.replace(/\W+joke\W*/, '').trim();
      let titleElement = '';
      if (title) {
        titleElement = `<h4>${title}</h4>`;
      }
      return `<aside class="joke box stack">${titleElement}`;
    } else if (currentToken.type === 'container_joke_close') {
      return '</aside>';
    }
  },
})
.use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.headerLink(),
  level: 2,
});

// Add noopener and noreferrer to external links.
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  const href = token.attrGet('href');
  if (href && href.startsWith('http')) {
    token.attrJoin('rel', 'noopener noreferrer');
  }
  return self.renderToken(tokens, idx, options);
};

module.exports = md;

