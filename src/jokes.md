---
title: Jokes
layout: page.njk
tags:
  - jokes
date: 2020-10-21
---

{% if jokes.length > 0 %}
Here are some mostly short jokes that I know.

{% for joke in jokes %}
***
{{ joke.body }}
{% endfor %}
{% else %}
Jokes go here, usually. But they're missing. Maybe it's the weather.
{% endif %}
