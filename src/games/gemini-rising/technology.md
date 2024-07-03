---
title: Technology
date: 2018-09-13
description: The tech I'm using in Gemini Rising.
updated: 2024-07-03
aliases:
  - /games/gemini-rising/articles/technology
---

I always want to know what tools were used to make the games that I play, so I thought I would satisfy that curiosity for anyone else who feels the same as me.

<!--more-->

## The List

- [Löve][love2d]
- Multiple Lua libraries (including but not limited to):
  - [anim8][]
  - [baton][]
  - [batteries][]
  - [beehive][]
  - [classic][]
  - [flux][]
  - [jprof][]
  - [lily][]
  - [lume][]
  - [moonshine][]
  - [ripple][]
  - [serpent][]
  - [squeak][]
- [Neovim][]
- [Aseprite][]
- [cfxr][]
- [Ocean Audio][ocean]
- [Renoise][]
- [Massive][]
- [chipspeech][]
- [LDtk][]
- [GitHub Actions][ghactions]
- [Butler][]

## The Reasoning

My most important requirements when it came to technology were a developer-friendly toolchain and cross-platform capabilities. If the engine or framework I ended up with was open source, even better. My target for this game is desktops. I doubt I'm going to release it on mobile, but never say never.

I evaluated all the usuals: Unity, Unreal, Godot, GameMaker Studio, Defold, various Haxe flavors...

Then I fell in [Löve][love2d].

[Löve][love2d] is a fantastic 2d framework built on top of OpenGL and the SDL that will happily support as much complexity as you need with a very pleasant interface. It's what I recommend to people when they tell me they want to make games and learn to program at the same time. [Löve][love2d] makes use of the Lua language, which is great to work in -- especially if you love dynamic languages, which I do.

My toolchain consists of Git, a `Makefile`, and the outputs of lots of those programs I listed before.

[love2d]: https://love2d.org
[lume]: https://github.com/rxi/lume
[classic]: https://github.com/rxi/classic
[flux]: https://github.com/rxi/flux
[anim8]: https://github.com/kikito/anim8
[baton]: https://github.com/tesselode/baton
[aseprite]: https://www.aseprite.org/
[cfxr]: https://github.com/nevyn/cfxr
[ocean]: https://www.ocenaudio.com/en/whatis
[renoise]: https://www.renoise.com/
[massive]: https://www.native-instruments.com/en/products/komplete/synths/massive/
[chipspeech]: https://www.plogue.com/products/chipspeech.html
[tiled]: https://www.mapeditor.org/
[LDtk]: https://ldtk.io
[ecs]: https://en.wikipedia.org/wiki/Entity%E2%80%93component%E2%80%93system
[batteries]: https://github.com/1bardesign/batteries
[lily]: https://github.com/MikuAuahDark/lily
[ripple]: https://github.com/tesselode/ripple
[serpent]: https://github.com/pkulchenko/serpent
[squeak]: https://github.com/drhayes/squeak.lua
[Neovim]: https://neovim.io
[ghactions]: https://github.com/features/actions
[Butler]: https://itch.io/docs/butler/
[beehive]: https://github.com/drhayes/beehive.lua
[jprof]: https://github.com/pfirsich/jprof
[moonshine]: https://github.com/vrld/moonshine
