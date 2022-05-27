---
title: "Gemini Rising: The Stats"
tags:
  - gemini-rising
  - stats
date: 2018-09-14
---

I thought it'd be interesting to include stats about the game as I develop it.

 Gemini Rising has 14,852 lines of Lua in it excluding libraries and generated files. As a friend of mine put it, that's "profit", not "revenue" -- I've written and re-written lots of the game up to now. Hopefully I'm done doing large scale rewrites. Hopefully. Sure.

 The longest module in the project is `ui.lua` at 669 lines, the immediate-mode keyboard/gamepad accessible UI library I wrote for the game. Every other UI library I could find relied on using the mouse, which wasn't going to work for me. I think it might make a good library someday.

So far I've got 736k of raw assets that turns into 2.5M of data once processed by my build. I can build the entire game with one step, `make start`. I suspect I'm entering the "content" phase of my game, where the amount of stuff that I put into it exceeds the amount of work I do on the systems underlying it, but we'll see.

I'm using [Concord][], which is an [entity-component-system][ecs] framework. As of today, I've got 33 separate systems managing entities using up to 42 components. I'm not done making types of entities, or types of maps, otherwise I'd write about that.

I'm planning on writing more articles going into detail about my components and systems in the future.


[concord]: https://github.com/Tjakka5/Concord
[ecs]: https://en.wikipedia.org/wiki/Entity%E2%80%93component%E2%80%93system
