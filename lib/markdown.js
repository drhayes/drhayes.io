const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItFootnotes = require('markdown-it-footnote');
const mdfigcaption = require('markdown-it-image-figures');

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
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink(),
    level: 2,
  });

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  const href = token.attrGet('href');
  if (href && href.startsWith('http')) {
    token.attrJoin('rel', 'noopener noreferrer');
  }
  return self.renderToken(tokens, idx, options);
};

module.exports = md;
