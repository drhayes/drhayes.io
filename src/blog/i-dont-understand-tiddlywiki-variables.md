---
title: I don't understand TiddlyWiki variables
description: Whatever the mental model is for TiddlyWiki variables, I don't have it yet.
date: 2024-03-19
tags:
  - tiddlywiki
---

I'm a huge fan of [TiddlyWiki](https://tiddlywiki.com/).
I think of it as a [convivial tool](https://archive.org/details/illich-conviviality).

The software is rock-solid from version to version.
The [TW community is unfailingly helpful and dedicated](https://talk.tiddlywiki.org/).
I love its end-user programmable model, that I can adjust my wiki as I see fit to better work with how I think and what I need.

It's my journal, where I write my morning pages, my todo manager, my repository for all my scribblings, it tracks who I've lent my comics too... seriously, it's great.
I've tried nearly every other note-taking software and it's my fave.

But **man** I just don't get how its variables work in all their incarnations.

Here are some examples of what TiddlyWiki variables might look like:

* `<<variable>>`
* `<variable>`
* `$variable$`
* `$(variable)$`
* `<<__variable__>>`

You can also dynamically construct and evaluate them in filters using the [`getvariable` operator](https://tiddlywiki.com/static/getvariable%2520Operator.html), among others.

They can be set by a bunch of widgets:

* `$let` widget
* `$set` widget
* `$parameters` widget
* `$vars` widget
* `$setmultiplevariables` widget

...as well as being set incidentally via the `$list` widget.

It turns out that many of the re-usable bits of functionality in TiddlyWiki are actually implemented by means of variables:

* Procedures
* Functions
* Custom Widgets
* Macros

Macros are deprecated, but in the way that Python 2.6 was deprecated -- still all over the place, still very important to understand.

TiddlyWiki has existed for more than twenty years.
To mangle a Yoda quote, "When twenty years old your software reaches, look as good it will not."

I know it sounds like it, but this is **not** criticism!
But I also don't trust myself to explain when each form is necessary because I'm not confident I know the differences.

Each form is needed depending on where it's used:

* Is the variable a param inside a procedure?
* Is the variable being referenced in a tiddler that is transcluded inside a `$set` widget?
* Is the variable part of a filter in a `$list` widget?
* Is the variable part of a filter expression inside a transclusion?

All these things change what form you need, and it all depends on what you need to do.
It's a lesson in humility and an intriguing box to try and squeeze my programmer brain into.

## References

* [Search filter with variable reply](https://talk.tiddlywiki.org/t/search-filter-with-variable/5010/3)
* [How to make a variable work inside another variable](https://talk.tiddlywiki.org/t/how-to-make-a-variable-work-inside-another-variable/7243)
* [Some explanation of who-what-where with variables](https://talk.tiddlywiki.org/t/could-you-please-stop-joking-around-on-the-setwidget-page-regarding-examples-for-the-currenttiddler-variable/7624/5?u=drhayes)
* [The docs page for Macros](https://tiddlywiki.com/#Macros)
