---
title: Ha Ha Again, It's Hugo
description: Just kidding, I'm using Hugo now.
date: 2018-12-12T23:25:53-06:00
tags:
  - static-site-generators
  - hugo
---

I shouldn't be left alone with static site generators.

<!--more-->

Seduced by Hugo's speed and an itch to learn the Go templating language! An excuse to learn [Tachyons]! Why the hell not!

Truthfully, my [NextJS][thatcommit] solution had two glaring flaws:

1. I'd written most of it. I'm a big fan of code I didn't write.
2. It didn't refresh automatically when I saved my posts.

Because of how I'd written my [`next.config.js`][nextconfig] it didn't re-generate the site when I saved posts. It was the tiniest thing, I didn't even notice it as I was changing all the React components around to make my previous site. But once I got to writing that last post and noticed... it's like a tiny rock fell in my shoe. And then the rock grew in size until I sat down and re-read a bunch of Hugo documentation.

There has to be some trick to get Next to watch the `content` directory. I couldn't find it, though. And I was *basically* re-writing a system similar to Hugo's, with a `content` directory and automatically generating tag pages. Once that realization struck me I knew I was doomed -- I was gonna convert the site back to Hugo. Ugh.

All that stuff I said in the last post is still true, though. A part of me worries that there will be some bit of customization to the site that I won't be able to accomplish in Hugo. That's the only "requirement" that I had for my site. However, I also don't believe in engineering for things that haven't happened yet, so here we are.

Yet, also truthfully, I like messing around with this stuff. Coder's gonna code. And my personal site has to be frictionless and exactly the way I want it to work.

![Ha Ha, The Internet](/funny/ha_ha_guy.jpg)

[thatcommit]: https://github.com/drhayes/drhayes.io/tree/23d27e32f6b8ca02b08651020c0e83e64478653d
[tachyons]: https://tachyons.io/
[nextconfig]: https://github.com/drhayes/drhayes.io/blob/23d27e32f6b8ca02b08651020c0e83e64478653d/next.config.js
