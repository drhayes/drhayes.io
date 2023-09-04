const EleventyFetch = require('@11ty/eleventy-fetch');

async function inreplyto(url) {
  // try {
  //   const post = await EleventyFetch(`${url}.json`, {
  //     duration: '1h',
  //     type: 'json',
  //   });
  //   const account = await EleventyFetch(`${post.attributedTo}.json`, {
  //     duration: '1h',
  //     type: 'json',
  //   });
  //   console.log(account);
  //   return `<article class="box stack">
  // <div class="with-sidebar">
  //   <div>
  //     <img src="${account.icon.url}" width="48" height="48">
  //   </div>
  //   <div>${post.content}</div>
  // </div>
  // <small>
  //   <a href="${url}" class="h-cite u-in-reply-to">${post.published}</a>
  // </small>
  // </article>`;
  // } catch (e) {
  // This is our fallback.
  return `<a href="${url}" rel="in-reply-to" class="h-cite u-in-reply-to"></a>`;
  // }
}

module.exports = inreplyto;
