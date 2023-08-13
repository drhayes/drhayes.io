---
title: Principles
---

Some ideas I consider important.

<!--more-->

---

<dl class="principles-list">
  {%- for principle in collections.principles %}
    <dt>
    <a href="#{{principle.data.title | slugify }}" id="{{ principle.data.title | slugify }}">{{ principle.data.title }}</a>
    </dt>
    <dd>
      {{ principle.page.excerpt }}
    </dd>
  {% endfor %}
</dl>
