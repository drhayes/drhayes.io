---
title: Technology
date: 2018-09-13
---

I always want to know what tools were used to make the games that I play, so I thought I would satisfy that curiosity for anyone else who feels the same as me.

## The List

* [Löve][love2d]
* Multiple Lua libraries:
  * [lume][]
  * [classic][]
  * [bump][]
  * [flux][]
  * [hump][]
  * [anim8][]
  * [lua-state-machine][]
  * [cargo]
  * [Concord][]
  * [TESound][]
  * [baton][]
* [Sublime Text 3][sublime]
* [Aseprite][]
* [cfxr][]
* [Ocean Audio][ocean]
* [Renoise][]
* [Massive][]
* [chipspeech][]
* [Tiled][]


## The Reasoning

My most important requirements when it came to technology were a developer-friendly toolchain and cross-platform capabilities. If the engine or framework I ended up with was open source, even better. My target for this game is desktops. I doubt I'm going to release it on mobile, but never say never.

I evaluated all the usuals: Unity, Unreal, Godot, GameMaker Studio, Defold, various Haxe flavors...

Then I fell in [Löve][love2d].

[Löve][love2d] is a fantastic 2d framework built on top of OpenGL and the SDL that will happily support as much complexity as you need with a very pleasant interface. It's what I recommend to people when they tell me they want to make games and learn to program at the same time. [Löve][love2d] makes use of the Lua language, which is great to work in -- especially if you love dynamic languages, which I do.

My toolchain consists of Git, a `Makefile`, and the outputs of lots of those programs I listed before.


[love2d]: https://love2d.org
[lume]: https://github.com/rxi/lume
[classic]: https://github.com/rxi/classic
[bump]: https://github.com/kikito/bump.lua
[flux]: https://github.com/rxi/flux
[hump]: https://hump.readthedocs.io/en/latest/
[anim8]: https://github.com/kikito/anim8
[lua-state-machine]: https://github.com/kyleconroy/lua-state-machine
[cargo]: https://github.com/bjornbytes/cargo
[Concord]: https://github.com/Tjakka5/Concord
[tesound]: https://love2d.org/wiki/TEsound
[baton]: https://github.com/tesselode/baton
[sublime]: https://www.sublimetext.com/3
[aseprite]: https://www.aseprite.org/
[cfxr]: https://github.com/nevyn/cfxr
[ocean]: https://www.ocenaudio.com/en/whatis
[renoise]: https://www.renoise.com/
[massive]: https://www.native-instruments.com/en/products/komplete/synths/massive/
[chipspeech]: https://www.plogue.com/products/chipspeech.html
[tiled]: https://www.mapeditor.org/
[ecs]: https://en.wikipedia.org/wiki/Entity%E2%80%93component%E2%80%93system
