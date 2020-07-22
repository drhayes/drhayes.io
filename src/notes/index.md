---
layout: page.njk
title: All The Notes
---

Once I have some favorites here I will curate them and display the ones I'm either most proud of or the ones I'm working to develop. Until that time, I'm just going to list all the notes.

Check out my [draft notes][drafts] for what I'm actively working on right now.

<ol>
{% for note in collections.notes %}
  <li>
    <a href="{{ note.url }}">{{ note.data.title }}</a>
  </li>
{% endfor %}
</ol>

[drafts]: /drafts
