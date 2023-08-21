---
title: Principles
tags:
  - writing
date: 2023-08-21
---

Some ideas I consider important.

<!--more-->

---

<dl class="principles-list">
  {%- for principle in principles %}
    <dt>
      <a href="/principles/{{principle.title | slugify }}" id="{{ principle.title | slugify }}">{{ principle.title }}</a>
    </dt>
    <dd>
      {{ principle.description }}
    </dd>
  {% endfor %}
</dl>
