---
title: Gemini Rising AI - Lua Scripting
date: 2019-03-22T11:10:26-05:00
tags:
  - Gemini Rising
  - AI
  - Gemini Rising AI
  - setfenv
  - coroutines
photoCredit: Markus Spiske from Unsplash
---

This post is the first in [a series I'm writing about scripting the AI in my game][grai], [Gemini Rising][gr]. This one covers scripting with `setfenv` and Lua coroutines.

<!--more-->

## Intro

When I started this game I'd never programmed seriously in Lua before. I'd purchased the Lua book a long time ago, read it once, then never had a chance to use the language again.

Until I fell in [Löve][love2d].

So I set about hoovering up as much Lua content as I could. I was excited to dig into what seemed from the outside to be *the* gamedev scripting language.

The first decision I made regarding my game AI was what technology to use. I decided that I would use a scripting language. The first language I considered was...well, Lua. Since I was already using a scripting language I didn't see the point in introducing another complexity into my hobby project.

### Coroutines

I'm not going to talk about what a coroutine is. There are [great references for coroutines][coroutines] out there.

Suffice to say, the canonical example for using coroutines is for AI in video games. This models well inside the code since a video game could be said to be a cooperative multitasking endeavor. I figured I was on firm ground.

### `setfenv`

Löve uses Lua 5.1, which means I have access to `setfenv`. It lets you isolate the environment that your function runs in. It's been removed from later versions of the language. That is what we in the writing business call "foreshadowing".

Here are the [docs for `setfenv`][setfenv].

## Scripting with `setfenv`

I had some vague notion of organizing my game as a series of plugins. At this point, every entity in my game was an object that lived in an array of `entities` somewhere in the `game` global object. I felt like I needed some kind of overall architecture, even at this early phase. I find hard API boundaries impose rigor on my coding and make sure I don't make too many hacky messes off in the dark corners of a codebase.

In the name of not making hacky messes, I thought that my initial AI scripts shouldn't have access to the entire game. I thought that I needed some kind of isolation. And, since I was programming in Lua, I thought I'd explore its features and use things I hadn't used in other languages before.

Enter `setfenv`.

Wiser heads than mine warned me not to do this. I thought I'd be fine. I was wrong.

### The `Brain`

The version I was working with is here: https://gist.github.com/drhayes/340fbc7f967b35dbc462efd5f187619d

The basic idea is that the game AI will look relatively straightforward, lots of "make decision about how to do this" followed by "wait for it to finish".

The scripts would be loaded from disk and passed to the `Brain.create` function. More on that janky-looking `loadString(string.dump(f))` business below.

I thought to myself, *How great this'll be! I can write the game AI as normal Lua programs without having to muck around with all those weird data structures that are in state machines and stuff.*

Here's what that looked like in practice:

```lua
return function(env)
  local sprite, player, lume, flux, waitSeconds = env.target, env.player, env.lume, env.flux, env.waitSeconds
  while true do
    sprite.animations:play('idle')
    if game.entities.player then
      local player = game.entities.player
      local distance = lume.distance(sprite.x, sprite.y, player.x, player.y)
      local sign = lume.sign(player.x - sprite.x)
      if sprite.y < player.y and distance < 200 then
        -- Swoop!
        sprite.animations:play('soar')
        sprite.animations.flipX = sign == -1

        local midX = sprite.x + (sign * 100)
        local endX = midX + (sign * 100)
        local oy = sprite.y
        flux.to(sprite, 1, { x = midX }):ease('linear')
          :oncomplete(function()
              flux.to(sprite, 1, { x = endX }):ease('linear')
            end)
        flux.to(sprite, 1, { y = player.y - player.height / 5 })
          :ease('cubicout')
          :oncomplete(function()
            flux.to(sprite, 1, { y = oy })
              :ease('cubicin')
              :oncomplete(function() sprite.animations:play('idle') end)
            end)
        waitSeconds(4)
      end
    end
    waitSeconds(1)
  end
end
```

Turns out it doesn't go so well.

Looking at this code now makes me cringe. There are so many lessons to be learned here that I hadn't learned yet. I was so busy trying to get the animations and pathing to work that I wasn't handling cases like *Did I just get shot and need to play my hurt animation?* and *Am I actually dead?*.

I thought what I wanted was imperative, synchronous-looking code for my AI routines. I thought writing the AI for this game would be simpler that way. But it's not; I don't think an imperative solution to my event-based problem was going to work.

I wanted my game entities to be responsive to outside stimuli, which meant that after every `wait*` call I'd have to check if the sprite was dead. Or, if it died during the `wait*` calls I'd have to... what, exactly? I never figured it out with this method because I knew the end-result would be a tangled mess of repetition and a bad representation of what I really wanted the entities to do.

Imagine after every wait a multi-line `if` statement about what to do if my entity had died. Or what to set the animation to if it had been hurt during one of those `wait`s. Now repeat it after every wait. For this simple example it's not so bad. For something with more complex behavior such as a patrolling guard that chases you from platform to platform before giving up and returning to trigger an alarm panel it could get truly gross.

On top of that, the `Brain`s are doing too much. This code is not only making decisions in response to what the player is doing, it is also managing the animations, playing sounds, adjusting physics. If I have multiple strategies for each enemy type (one that patrols, one that stands guard, one that investigates noises) then each one of those `Brain`s will have to duplicate the logic of how to handle the animations, sound, and physics.

By interleaving all those game system decisions with the entity-level decisions, I was obscuring the unique value of the brain as well, making it less self-documenting. I would argue that the most important line out of that prior script is this one:

```lua
if sprite.y < player.y and distance < 200 then
```

Every other line in that script obscures the true *behavior* of this entity's brain: if the player is below me and less than 200 distance away, swoop down and get them.

But those are just stylistic problems. I haven't gotten to the big bug yet.

### In Which I Make Things Too Complicated

Remember how I said I wanted a plugin architecture for my game? At this point, the code for the entities' AI were stored as Lua scripts somewhat separate from the codebase. Instead of getting `require`d in, they would be read from the filesystem and handed to the `Brain` when needed. This seemed like a fantastic idea at the time; I could customize what brain an entity had in the tilemap editor by writing its name as a string!

But, remember how I'd just started programming in Lua? I'd missed some subtleties with my approach.

I was loading the text of the functions from disk, then passing them directly to `coroutine.create`. That means that each function was only loaded once, even if multiple entities used them. That means that, if I loaded seven Beetles in a row that I would be modifying **the same function** with `setfenv`. Oh yeah.

It took me a while to figure out why all my enemies of one type were sort of moving in sync. Very pernicious.

My brilliant solution to this was this code:

```lua
function Brain.create(f, sprite)
  local f_clone = loadstring(string.dump(f))
  setfenv(f_clone, {
    sprite = sprite,
    waitSeconds = waitSeconds,
    waitForAnimation = waitForAnimation,
    -- Useful globals...
    game = sprite.game,
    print = print,
    inspect = inspect,
    math = math,
    lume = lume
  })
  local co = coroutine.create(f_clone)
  local okay, msg = coroutine.resume(co)
  if not okay then
    print('Error in Brain.create', msg)
  end
end
```

Note to any programmers out there: if the solution to your problem is to dump the function as a string and then, basically, `eval` it back into your environment... you might be on the wrong path.

When I touched on the possible code duplication in the last section, one could argue that the common behaviors for any particular `Brain` could be refactored out into a common script that was then included in every `Brain` that needed it. But, with `setfenv`, how would I do that? I'd have to pass the "common" scripts into the environment that I was passing into my script. That "common" script area now becomes a kind of kitchen sink of code that applies to several different `Brain`s, an organizational mess -- all to solve a problem I'm imposing on myself because I was fascinated with isolating the scripts' environments. Not a good move.

If I were truly interested in making my game use a plugin architecture then I would revisit these issues. `setfenv` is not to blame here; *I* am, for cursing the limitations of a tool that solves a problem that I created myself. Once I unpacked all of that, I abandoned this approach.

## Finale

I don't want to throw the baby out with the bathwater. Coroutines are very useful constructs. There are parts of my game today that still use them for straightforward timing that doesn't need to react to any outside events. I coordinate my coroutines these days using the excellent [knife.convoke][convoke] library.

Coroutines for my game AI, though, are the wrong approach. They are iterative where I need something more event-based. My initial foray, at least, wasn't modular enough to get me a lot of bang for my buck.

`setfenv` is not a solution to a problem I have. Simple as that.

In hindsight, some of these were newbie Lua programmer mistakes. I also hadn't settled on a larger architecture for my game yet, so there were lots of encapsulation violations flying around in my codebase that I knew I'd have to fix later.

The [next post][bts] will cover my initial adventure into behavior trees.

[grai]: {{< ref "gemini-rising-ai-intro" >}}
[gr]: https://drhayes.io/games/gemini-rising
[love2d]: https://love2d.org/
[coroutines]: https://en.wikipedia.org/wiki/Coroutine
[setfenv]: https://www.lua.org/pil/14.3.html
[convoke]: https://github.com/airstruck/knife/blob/master/readme/convoke.md
[bts]: {{<ref "gemini-rising-ai-behavior-trees" >}}
