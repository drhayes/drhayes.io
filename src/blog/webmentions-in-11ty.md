---
title: Webmentions in Eleventy
description: There comes a time in every Eleventy blog's life where the author must write a post about implementing webmentions. Here is mine.
date: 2023-09-01
tags:
  - 11ty
  - text
  - webmentions
toc: true
posse:
  - https://social.lol/@drhayes/110992124191804133
---

## Overview

[Webmentions](https://indieweb.org/Webmention) enables cross-site conversations across the web. Replies, likes, reposts -- you name it.

[Eleventy](https://www.11ty.dev/) is everyone's favorite static site generator.

Two great tastes that taste great together.

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

{% aside "Wait, what's a global data file?" %}

Eleventy has this thing called [the data cascade](https://www.11ty.dev/docs/data-cascade/). Eleventy gathers data from multiple sources before sending it to your template when it renders.

Here's a link to their documentation about global data files: <https://www.11ty.dev/docs/data-global/>

{% endaside %}

I'm using the `@11ty/eleventy-fetch` package so my builds don't yank on the webmention.io API too much during development; it caches responses. The `WEBMENTION_IO_TOKEN` is an environment variable that I have set in my local development so I can see webmentions in dev. It's also set as an environment variable in [Netlify](https://www.netlify.com/) when it builds my site. I received my own token after [signing in to Webmention.io](https://webmention.io/).

So now all my templates have a `webmentions` variable available with data for the whole site. That's okay, but if I'm within the context of a single page I want to only show webmentions for only that page.

### What is webmention.io sending us?

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
- Similarly, `author` is of `type: "card"`. Are there other types there? (I don't think so)
- The `wm-property` is named `mention-of`. That is the name of a property whose value (for this webmention) is: `"https://drhayes.io/writing/pretty-atom-feed/"`. Can that be different from `wm-target`? That'd be weird, what would that mean?
- What are valid values for `wm-property`? Are those specified anywhere? So far in others' code I've seen:
  - `in-reply-to`
  - `like-of`
  - `mention-of`
  - `repost-of`

I couldn't find answers to those questions in [the webmentions spec](https://www.w3.org/TR/webmention/) but that seems to mostly be about sending, not receiving. I mean, it _has_ [a section about receiving webmentions](https://www.w3.org/TR/webmention/#receiving-webmentions) but that doesn't seem super related to what webmention.io is sending me.

Turns out I should've been looking at the [README for the webmention.io project](https://github.com/aaronpk/webmention.io#api), duh! In addition to the properties I've seen it also includes `bookmark-of` (ooh!) and `rsvp` (ooooooh!). So that's neato.

I'm calling the service with a token but it looks like I don't need one in some cases. For instance: <https://webmention.io/api/mentions.jf2?target[]=https://drhayes.io/writing/pretty-atom-feed/> will return the webmentions for that particular URL only. If I were working client-side that might be perfect -- no exposed token that way. And [it looks like you can receive data for multiple pages that way](https://github.com/aaronpk/webmention.io#find-links-to-multiple-pages), so that's something to keep in your back pocket.

For more answers about the `type` fields, I turned to <http://microformats.org/wiki/jf2>. It seems like the `type` params are the suffixes of the various microformat objects. [The jf2 spec backs me up on that one](https://jf2.spec.indieweb.org/#reservedproperties). Hooray for reading comprehension!

I am _super glad_ that Aaron Parecki is, apparently, running this for the good of the community. Since Netlify has edge functions, though, I wonder if I could get something running to handle my own webmentions just in case.

### ...and how do I integrate it?

I have this in an include named `webmentions.njk`:

{% raw %}

<!-- prettier-ignore -->
```njk
{% if webmentions %}
{% set mentions = webmentions | webmentionsByUrl(aliases) %}
... template stuff ...
{% endif %}
```

{% endraw %}

Simply: if I have webmentions, do some stuff. But not just "webmentions", but "webmentions for this page" using [the `webmentionsByUrl` filter](https://github.com/drhayes/drhayes.io/blob/8ac7266ee963325d874a214b1387e1764a715a42/lib/filters/webmentionsByUrl.js):

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

I like it when my code makes little sentences: `data.likes = forThisPage.filter(isLike);` seems nice and clear. I'm also insulated from my own misunderstanding of the webmention.io format: should I need to change anything I can change the `isLike` function only.

In order to figure out what webmentions I received for this page, I have to filter my webmentions by URL. Eleventy calls its filters [within a context that makes `this.page` available](https://www.11ty.dev/docs/data-eleventy-supplied/#feature-availability), which means I don't have to pass in the `page.url` when I invoke the filter. Kinda nice, but kinda magical. I'm a big fan of magic when it comes from a wizard, less so when it comes from my code -- but I'll keep it for now.

On my site I do this thing where I can add an `aliases` key to my front matter and it'll add an entry into my `_redirects` file for Netlify for that file. I account for that here; I don't want to lose any interactions on the previous page so I pass those aliases right in.

Here's the `isThisUrl` function:

```js
const isThisUrl =
  (...urls) =>
  (mention) =>
    urls.map((u) => `https://drhayes.io${u}`).includes(mention['wm-target']);
```

This is honestly stretching my limit for a "one-line" arrow function and will probably become a regular ol' function in the near future.

The other predicates are similar:

```js
function makePredicate(propValue) {
  return function (mention) {
    return mention.type === propValue;
  };
}

const isValid = (mention) =>
  mention.author &&
  mention.author.name &&
  mention.published &&
  mention.content &&
  // Not sure if this is correct?
  !mention['wm-private'];
const isLike = makePredicate('like-of');
const isMention = makePredicate('mention-of');
const isRepost = makePredicate('repost-of');
const isReply = makePredicate('in-reply-to');
```

For `isValid` I'm aping some of the other code I've seen and validating that the mention will work on my site. I'm pretty sure a webmention _without_ those fields is still valid, but it'd be hard to meaningfully display it on my site.

### ...but what if I did this myself?

But hold on. [Netlify has these cool function things](https://docs.netlify.com/functions/overview/) so I **could** spend some time figuring out how to receive webmentions using those. I like keeping things in house, and I like writing code (who doesn't)... but I _also_ like not worrying about my site going down. I'm on the fence about this approach.

I'm trying to break myself of the _code_ habit and trying to create a _solution_ habit. And webmention.io is a perfectly fine solution. My goal is _not_ to make a webmention web service, it's to be able to display webmentions on my site. Writing my own thing doesn't serve that goal.

Moving on. 😼

## Caching... or maybe it's Storing

I noticed a couple of implementations caching the results returned from webmention.io.

- [Here's Sia Karamalegos with a code snippet.](https://sia.codes/posts/webmentions-eleventy-in-depth/#step-3%3A-fetch-webmentions-during-the-eleventy-build)
- [Here's Robb Knight's API doing it.](https://github.com/rknightuk/api/blob/e79de4d38faec461092fab88a4cc2e32a7d29345/services/webmentions.js)
- [Here's Sophie Koonin's site doing it.](https://github.com/sophiekoonin/localghost/blob/37b4fcb59e4b13032888fd84268837a8c68e28cd/src/_data/webmentions.js)

I'm interested! Especially if webmention.io ever goes down, then **poof** go all my webmentions. When developing locally I'm entirely dependent on [11ty/eleventy-fetch](https://github.com/11ty/eleventy-fetch) caching things on my computer while I'm messing around with my site; that's good enough for the short term. But I'm at a loss, longer term.

Netlify builds my site, so I could cache them up there I guess? I found a couple of utilities to handle something like that for me:

- https://www.npmjs.com/package/@netlify/cache-utils
- https://www.npmjs.com/package/netlify-plugin-cache

...but that's not really what I'm thinking of -- I don't want them available for the _next build_, I want them available _for the life of the site_. And I _think_ I'm okay with Eleventy's fetch cache disappearing from build to build on Netlify. At least I am until I notice all my webmentions are gone. 🙀

I did find [this post about saving webmentions back to the site's git repo as they're received](https://www.petergoes.nl/blog/review-webmentions-before-publishing-with-github-actions/) that I could probably ~~copy and paste right over~~ mine for inspiration for my own site. I appreciate how elegant his approach is and how he ends up with what I want: a git repo full of webmentions. I'm not sure I care as much about the moderation side of things, but I'll probably change my mind after a few too many rotten comments.

A project for future David.

## Sending

My site is now listening for webmentions and will display any that it gets in [a timely fashion](https://github.com/drhayes/drhayes.io/blob/005ae457014cfd48b95784127581f8feaf22e6c3/.github/workflows/deploy-on-cron.yml) thanks to [GitHub workflows](https://docs.github.com/en/actions/using-workflows), [a `23 */2 * * *` cron expression](https://crontab.guru/#23_*/2_*_*_*), and [Netlify build hooks](https://docs.netlify.com/configure-builds/build-hooks/).

I'd really like it if my site could _send_ or _publish_ webmentions as well: every time I link to another page it'd be great if the other person knew I was giving them credit for the work they've done. I am truly standing on the shoulders of giants.

Speaking of giants in webdev: the inimitable [Remy Sharp](https://remysharp.com/) has done it again and created **yet another** incredibly useful tool, [webmention.app](https://www.webmention.app/).

{% aside "A note on webmention.app" %}
When I first visited the site I kept getting a 404 and thought it was gone. It turns out that navigating to "https://webmention.app" will get you a 404. Navigating to <https://www.webmention.app/> will get you the app. Note the **`www`**! Naked domains are a killer, I guess.

Although, occasionally, [Vercel does knock his sites off the web](https://remysharp.com/2023/01/30/on-vercel-if-some-of-my-sites-are-down) so if you see an error it could legit be down.
{% endaside %}

Lots of sites recommend using webmention.app and calling it a day. But I like to [ice skate uphill](https://tenor.com/view/blade-ice-skating-motherfuckers-uphill-wesley-snipes-gif-5841140), so I dug in a bit and found [CodeFoodPixels/netlify-plugin-webmentions](https://github.com/CodeFoodPixels/netlify-plugin-webmentions)! It uses `@remy/webmention` as a library (the same code that powers webmention.app) but runs "locally" in the build at Netlify. That appeals! By default it searches the most recent post based on the feed for your site.

Well, sort of. I tested the `wm` command locally (I figure the binary would work a lot like the Netlify plugin) by giving it my [feed.xml](/feed.xml) file[^1] and it pooped out on entries in my feed that came early _textually_ -- no date sorting evident. That's not great for my purposes. But I **do** very much appreciate that it does a dry run by default to let you check your answers. Turns out I can run it directly on the generated HTML of my post (such a great tool) and that works great. I could figure out the most recent piece on my site and run it on that as part of my build, maybe.

But, apparently, [brid.gy will also do publishing?](https://brid.gy/about#publish) All I'd need to do there is [send brid.gy a webmention](https://brid.gy/about#webmentions) (we must go deeper) and they'd scan my post looking for mention-able things. But how would I know which posts to tell brid.gy about?

While both of these would work they're not quite satisfying. What if I change something _other_ than the most recent post on my site? I _try_ to keep my `updated` frontmatter... well, _updated_. Is that good enough? [Maybe it's not perfect, but that's okay.](/principles/perfect-is-the-enemy-of-good/)

But... I _also_ don't want to send webmentions for things every time I build my site if I've already sent webmentions. I am _forever_ tinkering with my site. I'd hate to keep blasting out webmentions for a blog post because I'm tweaking the colors or the layout. I'm much less sure of how to do that if I don't save the last updated date somewhere persistent.

This problem _feels_ isomorphic to storing my webmentions in the repo. _Surely_ they're related. But I don't want to rush to solve that one just yet.

So I'm going to kick that can down the road and run notify brid.gy manually from my desktop when I publish a new thing. I'll treat it as motivation to solve this problem. When I _do_ solve this problem I'll make sure to write about it.

## ...and I'm done!

And that's it! Webmentions are printing out on my site and I know how to send them to other sites when I publish.

For the future:

- Figure out how to save existing webmentions.
- Figure out how to automatically send webmentions for anything that has changed.

And speaking of webmentions... <a href="https://social.lol/@drhayes/110992124191804133" class="u-syndication">here's my social.lol post about this page</a>. Have at it!

[^1]: [Have you seen how pretty it looks?](/blog/pretty-atom-feed/)
