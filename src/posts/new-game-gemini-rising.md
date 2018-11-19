---
title: Announcing Gemini Rising, my new game
tags:
  - gemini-rising
  - löve
date: 2018-09-13
published: true
---

The name of the _Big Game_ that I've been working on for forever is "[Gemini Rising][gr]".

[Here's the game's home page][gr].

I will be documenting the process here on my site. Beyond blog posts with updates about my progress, I also plan on writing longer-form articles about problems I encountered and the solutions I've come up with to those problems. Hopefully, if other people have similar problems my solutions and failures along the way will help them.

Here are some topics I've got planned:

* **AI**: behavior trees and GOAP.
* **Navmeshes**: platforming and flight.
* **Procedural level generation**: pros and cons

As of today, the game has around 15k lines of code in it:

```bash
[~/games/gr (master) ⚡] ➔  find . -name "*.lua" -not -path "./lib/*" -not -path "./media/levels/*" | xargs wc -l | sort | tail
     260 ./core/crafting.lua
     261 ./procgen/chunkTilemap.lua
     264 ./systems/cameraSystem.lua
     287 ./systems/playerMoveSystem.lua
     376 ./systems/mapSystem.lua
     431 ./states/manageInventory/chassisScreen.lua
     470 ./states/manageInventory/loadoutsScreen.lua
     521 ./core/inventory.lua
     669 ./core/ui.lua
   14852 total
```

That's startling to me given what the game can and cannot do at this point. This project is officially the largest single thing I've ever written and I don't think I can call myself a dilettante game programmer. So, yay?


[gr]: /games/gemini-rising
