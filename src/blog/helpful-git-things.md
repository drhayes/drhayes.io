---
title: Helpful git things
description: Some helpful git resources that modernize everyone's "favorite" distributed version control system
date: 2024-03-08
tags:
  - git
---

Seriously, does anybody *love* `git`?
I love the capabilities that it grants me, sure.
But it has a seriously bad UI that makes it very hard to teach anyone, stunting its usefulness.

But of course `git` continues to improve, like (hopefully) most software projects.
And I found two links about `git` stuff that are worth mentioning:

* [Julia Evans' survey of popular `git` options](https://jvns.ca/blog/2024/02/16/popular-git-config-options/)
* [Martin Heinz's list of modern `git` commands and features you should be using](https://martinheinz.dev/blog/109)

Julia Evans is my favorite in-the-open-learner-and-teacher type person.
I love her curiosity and humility and how she presents things from first-principles.

Because of her post, I added some things to my global `.gitconfig`:

* `rerere.enabled true` to make `git` remember how I resolved merge conflicts before.
* `diff.algorithm histogram` to try a different diff algorithm for a bit, see what I think.

I already had `core.pager delta` set in my global `.gitconfig` and it's been so great that I can't remember what I did before.

Martin's tips are interesting and more specialized.

I need to get better about reaching for `git restore` vs. `git checkout`.
If it's in my muscle memory then I'm more likely to remember to teach it to someone else and break the horrible UI cycle of using `git checkout` for seven different things.

I tend to make so many small commits so often that I don't often have anything to `stash` when switching branches.
But if I did, I'll do my best to remember `git switch`.

`git worktree` is amazing and what I was using to manage my dotfiles for a very long time with my [`dotfiles` fish function](https://github.com/drhayes/drfish/blob/bccad630e3ef544b9eed51f968af39da2f090718/functions/dotfiles.fish).
I don't use this as much anymore.

My favorite `git` tip is the command I use so often it's enshrined as [`gl` within my library of `fish` functions](https://github.com/drhayes/drfish/blob/bccad630e3ef544b9eed51f968af39da2f090718/functions/gl.fish):

```shell
git log --graph --date=relative --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset%n%w(0,4,4)%-b%n%n%-N'
```

This monster of a command shows a very usefully formatted timeline view of recent commits, with branches.
It's my best tool for getting to know what's been going on recently in a repo.

Thanks, `git`!
You're so much better than Subversion and the unnamed things I used that came before that I sometimes forget I used to fear branching and merging.
On the other hand, sometimes you're very opaque.
But I'm always on the lookout for learnings that improve my daily development experience, and these were all so interesting I just had to share.

::: aside One sentence per line
I thought I'd start taking [Derek Sivers' advice about writing one sentence per line](https://sive.rs/1s).
I started with this post but, thanks to the magic of Markdown, you can't tell that's what I did.
It's in the [repo for the site](https://github.com/drhayes/drhayes.io) and makes for nice diffing and reviewing.
:::
