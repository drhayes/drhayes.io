---
title: Wisps!
date: 2021-03-04
description: A weird microblogging thing for me.
tags:
  - projects
  - microblogging
  - text
---

I started building a [weird microblogging thing I'm calling wisps][wisps]. I wanted a place to dump
random linkspam, or post things that I thought were interesting, or whatever, but I didn't want or
need a social network, a login, or another database somewhere with my personal info in it. Hence, I
built my own. Coders gonna code, I guess.

I always wanted to build a messy tumblelog in the "true" sense, something like
[Anarchaia][anarchaia] but never quite got around to it. Now I have. It's powered entirely by
Markdown on a filesystem.

I think its form is going to stay pretty stripped down, for now: maybe an "about" page, maybe
(maybe!) tags, and then... just keep dumping stuff on it.

It currently handles only URLs, but I think the next thing is photos, maybe music (either Spotify or
Soundcloud).

The other fun part is the CLI helper I built for myself. Written in JS, it looks on my clipboard to
see if there's a URL there and, if so, fetches it and pulls the title. Then it writes a Markdown doc
in the right place on the filesystem with the right metadata leaving me a place to comment. I like
painless and automated input systems.

[wisps]: https://wisps.drhayes.io
[anarchaia]: https://leahneukirchen.org/anarchaia/
