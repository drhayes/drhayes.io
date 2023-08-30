---
title: Webmentions in Eleventy
description: Yet another post about how to do webmentions in eleventy.
date: 2023-08-30
draft: true
tags:
  - 11ty
  - text
  - webmentions
---

There comes a time in every [Eleventy](https://www.11ty.dev/) blog's life where the author must write a post about implementing webmentions. Here is mine.

There is so much prior art it's almost silly. In no particular order:

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
- [equilibriumuk's "Adding Webmentions in Eleventy"](https://equk.co.uk/2023/07/18/adding-webmentions-in-eleventy/)

That is all to say... seems like a solved problem. I'm not breaking new ground with anything I've done here.

I will say that it seems like most posts are focused on _receiving_ webmentions and I wish there were more resources on _sending_ webmentions. More on that below.

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

{% infoAside "Wait, what's a global data file?" %}

Eleventy has this thing called [the data cascade](https://www.11ty.dev/docs/data-cascade/). Eleventy gathers data from multiple sources before sending it to your template when it renders.

Here's a link to their documentation about global data files: <https://www.11ty.dev/docs/data-global/>

{% endinfoAside %}

I'm using the `@11ty/eleventy-fetch` package so my builds don't yank on the webmentions.io API too much during development; it caches responses. The `WEBMENTION_IO_TOKEN` is an environment variable that I have set in my local development so I can see webmentions in dev. It's also set as an environment variable in [Netlify](https://www.netlify.com/) when it builds my site.

So now all my templates have a `webmentions` variable available with data for the whole site. That's okay, but if I'm within the context of a single page I want to only show webmentions for that page.

Within my default template, I have this in an include named `webmentions.njk`:

{% raw %}

<!-- prettier-ignore -->
```markup
{% if webmentions %}
{% set mentions = webmentions | webmentionsByUrl(aliases) %}
... template stuff ...
{% endif %}
```

{% endraw %}

If I have webmentions, do some stuff. But not just "webmentions", but "webmentions for this page" using [the `webmentionsByUrl` filter](https://github.com/drhayes/drhayes.io/blob/8ac7266ee963325d874a214b1387e1764a715a42/lib/filters/webmentionsByUrl.js):

```js
function webmentionsByUrl(webmentions, aliases) {
  aliases = aliases || [];
  const data = {
    likes: [],
    reposts: [],
    replies: [],
  };

  if (!webmentions) {
    return data;
  }

  const forThisPage = webmentions
    .filter(isThisUrl(this.page.url, ...aliases))
    .filter(isValid)
    .map(transform);

  data.likes = forThisPage.filter(isLike);
  data.reposts = forThisPage.filter((m) => isRepost(m) || isMention(m));
  data.replies = forThisPage.filter(isReply);

  return data;
}
```

In order to figure out what webmentions I received for this page, I have to filter my webmentions by URL. Eleventy calls its filters [within a context that makes `this.page` available](https://www.11ty.dev/docs/data-eleventy-supplied/#feature-availability), which means I don't have to pass in the `page.url` when I invoke the filter. Kinda nice, but kinda magical. I'm not sure I like it yet.

Also, I do this thing where I can add an `aliases` key to my front matter and it'll add an entry into my `_redirects` file for Netlify for that file. If I do that, I don't want to lose any interactions on the previous page so I pass those aliases right in.

Here's the `isThisUrl` function:

```js
const isThisUrl =
  (...urls) =>
  (mention) =>
    urls.map((u) => `https://drhayes.io${u}`).includes(mention['wm-target']);
```

This is honestly stretching my limit for a "one-line" arrow function and will probably become a regular ol' function in the near future.

But we should probably talk about `wm-target` and all those other properties.

### What is the webmentions structure?

Here's the entire webmentions structure I received from webmention.io as of 2023-08-30. I only have a single interaction 😿 so far (I'll be okay). When my templates access `webmentions`, this is what they see:

```json
[
  {
    "type": "entry",
    "author": {
      "type": "card",
      "name": "Webmention Rocks!",
      "photo": "https://webmention.io/avatar/webmention.rocks/e08155b03da96cb1bdfd161ea24efdfad8d85d06afcee540ec246f1f613eb5a9.png",
      "url": ""
    },
    "url": "https://webmention.rocks/receive/1",
    "published": "2023-08-26T16:17:32",
    "wm-received": "2023-08-26T16:17:33Z",
    "wm-id": 1709428,
    "wm-source": "https://webmention.rocks/receive/1/f59a68e4d1fc23ca612411c9af3d93bb",
    "wm-target": "https://drhayes.io/writing/pretty-atom-feed/",
    "wm-protocol": "webmention",
    "name": "Receiver Test #1",
    "content": {
      "html": "<p>This test verifies that you accept a Webmention request that contains a valid source and target URL. To pass this test, your Webmention endpoint must return either HTTP 200, 201 or 202 along with the <a href=\"https://www.w3.org/TR/webmention/#receiving-webmentions\">appropriate headers</a>.</p>\n        <p>If your endpoint returns HTTP 201, then it MUST also return a <code>Location</code> header. If it returns HTTP 200 or 202, then it MUST NOT include a <code>Location</code> header.</p>",
      "text": "This test verifies that you accept a Webmention request that contains a valid source and target URL. To pass this test, your Webmention endpoint must return either HTTP 200, 201 or 202 along with the appropriate headers.\n        If your endpoint returns HTTP 201, then it MUST also return a Location header. If it returns HTTP 200 or 202, then it MUST NOT include a Location header."
    },
    "mention-of": "https://drhayes.io/writing/pretty-atom-feed/",
    "wm-property": "mention-of",
    "wm-private": false
  }
]
```

I received this by testing my implementation using [Webmention Rocks!](https://webmention.rocks/), in the "Testing your Receiver" section all the way at the bottom of the page. It sent a `mention-of` my way. Sort of.

Seeing this structure raised so many questions for me:

- I've got an array of objects that have `type: "entry"`. Are there other types? (I don't think so)
- Similarly, `author` is of `type` `"card"`. Are there other types there? (I don't think so)
- The `wm-property` is named `mention-of`. That is the name of a property whose value (for this webmention) is: `"https://drhayes.io/writing/pretty-atom-feed/"`. Can that be different from `wm-target`? That'd be weird, what would that mean?
- What are valid values for `wm-property`? Are those specified anywhere? So far in others' code I've seen:
  - `in-reply-to`
  - `like-of`
  - `mention-of`
  - `repost-of`

I couldn't find answers to those questions in [the webmentions spec](https://www.w3.org/TR/webmention/) because that's mostly about sending, not receiving. I mean, it _has_ [a section about receiving webmentions](https://www.w3.org/TR/webmention/#receiving-webmentions) but that doesn't seem super related to what webmention.io is sending me.

Turns out I should've been looking at the [README for the webmention.io project](https://github.com/aaronpk/webmention.io#api)! In addition to the properties I've seen it also includes `bookmark-of` (ooh!) and `rsvp` (ooooooh!).
