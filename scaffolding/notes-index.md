---
layout: page.njk
title: All The Notes
---

## Guideposts

The [Projects note][projects] stays updated with what I'm up to.

Check out the [principle tag][principles] for a list of things I think that I think.

Check out the [fiction tag][fiction] for things I'm brave enough to write and then put somewhere public.

There's also [the words list][words] and [the quotes list][quotes] notes to take a gander at.

The [drafts note list][drafts] shows notes that are in an even less finished state than most of the notes I'm trying to keep here.

## All The Notes

<ol class="list-decimal mt-4 ml-12">
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
[quotes]: /tags/quotes
[principles]: /tags/principle
[fiction]: /tags/fiction
