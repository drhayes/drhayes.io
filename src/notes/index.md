---
layout: page.njk
title: All The Notes
---

## Guideposts

The [Projects note][projects] stays updated with what I'm up to.

Check out the [principle tag][principles] for a list of things I think that I think.

The [Drafts note][drafts] list shows notes that are in an even less finished state than most of the notes I'm trying to keep here.

There's also [the words list][words] and [the quotes list][quotes] notes to take a gander at.

## All The Notes

<ol>
{% for note in collections.notes %}
  <li>
    <a href="{{ note.url }}">
      {{ note.data.title }}
    </a>
  </li>
{% endfor %}
</ol>

[drafts]: /drafts
[projects]: /notes/projects
[words]: /notes/words
[quotes]: /notes/quotes
[principles]: /tags/principle
