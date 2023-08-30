---
title: Webmentions in Eleventy
description: Yet another post about how to do webmentions in eleventy.
date: 2023-08-30
draft: true
tags:
  - 11ty
  - text
---

There comes a time in every [Eleventy](https://www.11ty.dev/) blog's life where the author must write a post about implementing webmentions. Here is mine.

There is so much prior art it's almost silly:

- [Max Böck's "Using Webmentions in Eleventy"](https://mxb.dev/blog/using-webmentions-on-static-sites/)
- [Sia Karamalegos' "An In-Depth Tutorial of Webmentions + Eleventy](https://sia.codes/posts/webmentions-eleventy-in-depth/)
  - I like the hand-drawn diagrams in this one.
- [Luke Bonaccorsi's "No comment: Adding Webmentions to my site](https://lukeb.co.uk/blog/2021/03/15/no-comment-adding-webmentions-to-my-site/) (Go for the info, stay for the 8-bit graphics)
- [Jan Monschke's "Adding webmentions to your static blog"](https://janmonschke.com/adding-webmentions-to-your-static-blog/)
  - Great diagrams in this one.
- [Sophie Koonin's "Building a website like it's 1999... in 2022"](https://localghost.dev/blog/building-a-website-like-it-s-1999-in-2022/)
- [Cory Dransfeldt's "Webmentions in Eleventy"](https://coryd.dev/posts/2023/webmentions-in-eleventy/)
- [Robb Knight's "Adding Webmentions to Your Site"](https://rknight.me/adding-webmentions-to-your-site/)
  - Robb has a follow-up post [with a ton more links](https://rknight.me/additional-webmention-resources/).

This is all to say... this seems like a solved problem and I'm not breaking new ground with anything I've done here.

I will say that it seems like most posts are focused on _receiving_ webmentions and I wish there were more resources on _sending_ webmentions.

## Receiving webmentions

I set up 11ty to [fetch my webmentions as a global data file](https://github.com/drhayes/drhayes.io/blob/896febd9b465e2f7aa799a8ad78b18f139ca640e/src/data/webmentions.js):

```js
// Lifted almost entirely from: https://github.com/cdransf/coryd.dev/blob/2c64737f1fd97514f791178e59d07ad861370fbe/src/_data/webmentions.js
// Any changes or bugs are mine!
const EleventyFetch = require('@11ty/eleventy-fetch');

module.exports = async function () {
  const webmentionKey = process.env.WEBMENTION_IO_TOKEN;
  const url = `https://webmention.io/api/mentions.jf2?token=${webmentionKey}&per-page=1000`;
  try {
    const webmentions = await EleventyFetch(url, {
      duration: '1h',
      type: 'json',
    });
    return webmentions.children;
  } catch (e) {
    console.error('Error fetching webmentions', e);
    // Return a blank.
    return [];
  }
};
```

<aside class="stack box">
  <h4>Wait, what's a global data file?</h4>
  <p>Eleventy has this thing called <a href="https://www.11ty.dev/docs/data-cascade/" rel="noopener">"the data cascade"</a>. Eleventy gathers data from multiple sources before sending it to your template when it renders.</p>
  <p>Here's a link to their documentation about global data files: <a href="https://www.11ty.dev/docs/data-global/" rel="noopener">https://www.11ty.dev/docs/data-global/</a></p>
</aside>

I'm using the `@11ty/eleventy-fetch` package so my builds don't yank on the webmentions.io API too much during development; it caches responses. The `WEBMENTION_IO_TOKEN` is an environment variable that I have set in my local development so I can see webmentions in dev. It's also set as an environment variable in [Netlify](https://www.netlify.com/) when it builds my site.

So now all my templates have a `webmentions` variable available with data for the whole site. That's okay, but if I'm within the context of a single page I want to only show webmentions for that page.

Within my default template, I have an include that includes this:

{% raw %}

<!-- prettier-ignore -->
```markup
{% if webmentions %}
{% set mentions = webmentions | webmentionsByUrl %}
... template stuff ...
{% endif %}
```

{% endraw %}

[Enter my `webmentionsByUrl` filter](https://github.com/drhayes/drhayes.io/blob/896febd9b465e2f7aa799a8ad78b18f139ca640e/lib/filters/webmentionsByUrl.js):

```js
function webmentionsByUrl(webmentions) {
  const data = {
    likes: [],
    reposts: [],
    replies: [],
  };

  if (!webmentions) {
    return data;
  }

  const pageUrl = `https://drhayes.io${this.page.url}`;
  const forThisPage = webmentions
    .filter(isThisUrl(pageUrl))
    .filter(isValid)
    .map(transform);

  data.likes = forThisPage.filter(isLike);
  data.reposts = forThisPage.filter((m) => isRepost(m) || isMention(m));
  data.replies = forThisPage.filter(isReply);

  return data;
}
```

In order to figure out what webmentions I received for this page, I have to filter my webmentions by URL. Eleventy calls its filters [within a context that makes `this.page` available](https://www.11ty.dev/docs/data-eleventy-supplied/#feature-availability), which means I don't have to pass in the `page.url` when I invoke the filter. Kinda nice, but kinda magical. I'm not sure I like it yet, but I'm using it so I thought I'd explain it.
