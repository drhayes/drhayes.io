---
title: Draft notes
layout: layouts/article.njk
description: A short explanation of what a draft note is and directions leading you to where I write about it more.
eleventyExcludeFromCollections: true
---

You probably ended up here because I marked one of the pages on my site as a "draft". It's a thing I'm trying where I don't hide the notes I'm actively writing but expose my audience to my thinking and refining process.

[I discuss this at length in my post on public note systems][publicnotes].

{% set drafts = collections.drafts %}
{% if drafts.length > 0 %}
## Current Drafts
{% for page in collections.drafts %}
  * <a href="{{ page.url }}">{{ page.data.title }}</a>
{% endfor %}
{% else %}
No current drafts! I'm not being brave enough.
{% endif %}

[publicnotes]: /blog/captivated-by-public-note-systems
