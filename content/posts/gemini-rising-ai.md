---
title: Gemini Rising AI
date: 2019-03-21T16:10:51-05:00
tags:
  - gemini-rising
  - ai
draft: true
---

When I went looking for articles about game AI that went beyond the most basic level I had a hard time finding any. Most articles were more interested in defining one basic concept and providing an easy, canonical example than in diving deep into solving real problems in a real game.

I'd like to change that for future programmers like me looking for guidance.

This article is going to go into detail about my experiences crafting the AI for my game, [Gemini Rising][gr]. Since I was learning as I go I'm sure there are mistakes below; please contact me about them, I'd love to learn more!

# Overview

Here are the solutions I tried, in order:

   * Lua scripting with coroutines
   * State machines
   * Decision trees
   * Goal-oriented action planning
   * Decision trees (but better this time)

That's roughly in chronological order.

# Goals

My goals shifted over time, but here is the list in priority order:

   * **Fun experience for the player**. Above all else, the game had to be fun for the player.
   * **Learn something about game AI**. In all my wandering, I wanted to learn more about making good AI for games.
   * **Be predictable**. This one was added later; I'll talk about it more below.

# Lua scripting with coroutines

The first approach to AI that I tried! I figured that I would go with what I know, programming, and since I was already using Lua to write the game there was no reason to prefer another scripting language on top of it. After a brief and fruitless flirtation with `setfenv`, I tried using [coroutines][]. I'd had some experience using [coroutines][] from Python, but scripting a game AI was always the go-to example and I wanted to take a crack at it.

My main `Brain` script looked like this:

```lua
local Brain = {}
local currentTime = 0
local timeWaits = {}
local animWaits = {}
local yields = {}

local function yield()
  local co = coroutine.running()
  yields[co] = true
  return coroutine.yield(co)
end

local function waitSeconds(secs)
  local co = coroutine.running()
  timeWaits[co] = currentTime + secs
  coroutine.yield(co)
end

local function waitForAnimation(anim)
  local co = coroutine.running()
  animWaits[anim] = co
  coroutine.yield(co)
end

local function waitForSignal(signalName)
  local co = coroutine.running()
  local function waiter(a, b, c, d, e, f)
    Signal.remove(signalName, waiter)
    coroutine.resume(co, a, b, c, d, e, f)
  end
  Signal.register(signalName, waiter)
  coroutine.yield(co)
end

function Brain.clear()
  timeWaits = {}
  animWaits = {}
  yields = {}
end

function Brain.create(f, target)
  local env = {
    target = target,
    waitSeconds = waitSeconds,
    waitForAnimation = waitForAnimation,
    waitForSignal = waitForSignal,
    yield = yield,
    random = love.math.random,
    media = media,
    -- Useful globals...
    game = game,
    Camera = Camera,
    print = print,
    inspect = inspect,
    math = math,
    lume = lume,
    flux = flux,
    Signal = Signal,
    TEsound = TEsound
  }
  local co = coroutine.create(f)
  local okay, msg = coroutine.resume(co, env)
  if not okay then
    print('Error in Brain.create', msg)
  end
end

function Brain.update(dt)
  currentTime = currentTime + dt

  local cos = {}
  for co, wakeupTime in pairs(timeWaits) do
    if wakeupTime < currentTime then
      table.insert(cos, co)
    end
  end

  for _, co in ipairs(cos) do
    timeWaits[co] = nil
    local okay, msg = coroutine.resume(co)
    if not okay then
      print('Error in Brain.update', msg)
    end
  end

  for co,_ in pairs(yields) do
    yields[co] = nil
    local okay, msg = coroutine.resume(co)
    if not okay then
      print('Error in Brain.update', msg)
    end
  end
end

function Brain.animationComplete(anim)
  anim:pauseAtEnd()
  local co = animWaits[anim]
  if co then
    animWaits[anim] = nil
    local okay, msg = coroutine.resume(co)
    if not okay then
      print('Error in Brain.animationComplete', msg)
    end
  end
end

return Brain
```
I thought to myself, *How great this'll be! I can write the game AI as normal Lua programs without having to much aroun with all those weird data structures.*

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

I wanted my game agents to be responsive to outside stimuli, which meant that after every `wait*` call I'd have to check if the sprite was dead. Or, if it died during the `wait*` calls I'd have to... what, exactly? I never figured it out with this method.

I didn't realize it at the time, but my `Brain`s were doing too much. If you look at the libraries that are getting exported into the environments that my `Brain`s use, I was planning on making the AI portion of my entities run the animations, the sound, and the physics. That's a lot of responsibility! This mistake would come back to haunt me.

Once I realized the problems with this method I moved on to state machines.

# State Machines

Probably the most popular answer to the question, "What should I use for my game's AI?" It's hard to go wrong with a simple state machine over a bunch of hard-coded `if` statements, for sure.

I didn't stay with this scheme for long.

The state machine library I used first is this one: https://github.com/kyleconroy/lua-state-machine. It's great; I'm still using it for the complicated animations in my game.

For AI, I needed a [hierarchical state machine][hsm]. In an HSM, any given state could be another state machine which, itself, could have more state machines. That let me do things like have a "highest-level" *Patrolling* state which could transition to *Alerted* if the enemy was hit by a bullet. That *Patrolling* state is a state machine that includes wandering left, then right, then pausing sometimes.

The first issue I encountered was that no one makes a good HSM library in Lua. I set about writing my own. It was buggy but it *did* introduce me to the world of Lua unit-testing. At the time, I didn't know enough Lua to get this right and I abandoned it.

My main issue with this approach is the states themselves. Lots of things "patrol" in my game. How to parameterize the states to account for different speeds, different distances? At what level could I re-use these state machines? How were the entities in my game being driven by them? The building blocks in state machines felt too coarse.

If only I'd ever googled the term [statecharts][]. The AI model in my game would have gone in a completely different direction.

So I moved on again, this time to behavior trees.

# Behavior Trees

[This is my favorite behavior trees intro][btree-intro].

[gr]: https://drhayes.io/games/gemini-rising
[coroutines]: https://www.lua.org/pil/9.1.html
[hsm]: https://barrgroup.com/Embedded-Systems/How-To/Introduction-Hierarchical-State-Machines
[statecharts]: https://statecharts.github.io/
[btree-intro]: http://www.gamasutra.com/blogs/ChrisSimpson/20140717/221339/Behavior_trees_for_AI_How_they_work.php
