---
layout: page.njk
title: All The Quotes
---

{% for quote in collections.quotes %}
{{ quote.templateContent | safe }}

***
{% endfor %}
