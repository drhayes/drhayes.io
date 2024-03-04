---
title: Updated robots.txt for March 4th, 2024
date: 2024-03-04
description: Keeping that robots.txt to keep out good-faith crawlers
---

I know it doesn't prevent some unprincipled company from scraping my site; indeed, I almost wouldn't want it to since that would break the web. But I *can* opt-out of the scraping by bots I know about and dislike, which is what I've done here.

I updated my list with some additions from [friend of the site Cory Dransfeldt's excellent list](https://coryd.dev/posts/2024/go-ahead-and-block-ai-web-crawlers/).

[Here's the file that keeps the list of bad robots for this site.](https://github.com/drhayes/drhayes.io/blob/b546604006e2f931715d70291cea79ea9d4a442b/src/data/badRobots.js) That file is read by [this template file](https://github.com/drhayes/drhayes.io/blob/b546604006e2f931715d70291cea79ea9d4a442b/src/robots.njk) to generate my `robots.txt` file.

[Here's my updated robots.txt.](/robots.txt)
