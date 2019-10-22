---
title: Gemini Rising AI - Behavior Trees
date: 2019-03-22T11:12:57-05:00
tags:
  - Gemini Rising
  - AI
  - Gemini Rising AI
  - behavior trees
description: An exploration of behavior trees within Gemini Rising.
photoCredit: israel palacio on Unsplash
---

This post is the second in a [series I'm writing about scripting the AI in my game, Gemini Rising][grai]. This one is about behavior trees.

<!--more-->

There aren't enough resources out there that dive deeply into interesting programming topics. It's easy to find "hello world" examples, but it's harder to find meaty essays that discuss pros and cons, tradeoffs taken, long-term consequences unforeseen. These posts are my attempt to fix that.

## Intro

After [deciding that scripting the AI in straight Lua wasn't for me][lua-scripting], I cast around looking for another solution for my game's AI routines. I eventually settled on behavior trees.

As of April, 2019, this is the AI solution for Gemini Rising going forward.

### But What About State Machines?

The short answer is: the combinatorial explosion of states for any reasonably "smart" behavior violated my **be easy for me** rule of hobbyist game development.

The bog-standard answer to "what should I write my game AI with", state machines represent a very natural way of describing how your game enemies "think". If your enemy is in the `STAND_GUARD` state then they are standing in one place, looking for the player; if your enemy is in the `PATROL` state then they are walking around.

I find that state machines become unwieldy when trying to model complex behaviors. If there is anything cross-cutting about your enemies' behavior then the number of states you have to manage is going to explode. Is the enemy `SHOOTING_WHILE_STANDING_GUARD` or are they `SHOOTING_WHILE_ON_PATROL`?

It matters because your "shooting" state must know what state to return to based on world events. If the enemy can no longer see the player, it must "remember" if it was standing guard or patrolling. The way to do that is to have two "shooting" states, one for standing guard and another for patrolling. That's not ideal.

The solution for this problem is "hierarchical state machines". The cross-cutting behaviors become higher-level states (`PATROL`, `STAND_GUARD`) while the lower-level behaviors are states within those higher-level states (`SHOOTING`, `RUNNING_AWAY`). While it does address the combinatorial state explosion problem, it introduces two more problems:

1. How do I re-use states across hierarchies, or among different enemies?
2. There are no lua libraries I can find that do HSMs.

Lots of my enemies shoot things. Lots of my enemies path find. How do they handle state changes given that when to change state, and to what, is enemy dependent? Now I've got an explosion of transition logic, which kicks the can around but doesn't address it exactly.

To top it all off, I have to write it myself? Ugh.

This all violates one of my goals for the AI of my game: **Be easy for me**. Too much state wrangling and not enough at-a-glance interpretability squanders my precious hobbyist game dev time. It's hard to overstate the importance of this goal: I have extremely limited time resources, so opportunity costs are hard and real. If I have to write and maintain a bunch of extra code below the AI routines for my enemies then I'm doing a lot of extra work. That extra works costs me as I have to delay improving my game to fix its bugs.

That said, I did find some valuable resources along the way:

* [kylecontrol/lua-state-machine][lsm] I had used the JavaScript version of this library before and I liked it a lot. This translation into lua was just great. I'm still using this for my animations.
* [Statecharts][] Having a visual editor for a state machine would be neat, and they are hierarchical. Alas, I discovered this one once I was already sold on behavior trees. Maybe next time!
* [Game Programming Patterns: State][gppstate] This book is a fantastic reference that every hobbyist game programmer should buy.

## Behavior Trees

As is my wont, I'm not going to introduce what behavior trees are. Other authors have done much better jobs of that. [This is my favorite behavior trees intro][btree-intro].

I couldn't find a good behavior tree implementation in Lua so I wrote my own. Initially, I wanted my BT implementation to be functional and very, very simple. Since each node in a behavior tree can participate in the part-whole hierarchy of the tree, I figured that every node, at its heart, would look like this:

```lua
return function(entity, dt)
  -- Behavior tree stuff goes here.
end
```

The expected return values from this function should be one of `success`, `failure`, or `running`.

It doesn't get much simpler than that.

## In Which I Make Things More Complicated

Coders gonna code, as they say, and I regret the waffling I did while pursuing this solution and the code I committed, removed, re-wrote, tested, removed, then revamped along the way. But at least my game ended up better for it... hopefully.

### To Restart Or Not To Restart?

The first hurdle I ran into was a surprisingly basic one. Given that `sequence` and `selector` iterate their children, what do they do if a child returned `running` the last time the tree was ticked?

Does the tree return immediately to that node on the next tick? Or does it evaluate every node that came "before" that `running` node?

The literature I've found is surprisingly unclear on the subject. Some sources insist on re-evaluating the entire tree every tick, some sources say to maintain a list of the nodes that are `running` as of last tick and return to re-evaluate those. Most that I was able to find didn't mention this at all, taking it as some obvious baseline assumption that I didn't have.

### Restarting

If the tree nodes that have children restart on every tick, then it's easy for the tree to respond instantly to outside stimulus. I can place the behaviors that have higher priority *before* lower priority children in `sequence` and `selector` nodes and be assured that they will be evaluated as often as possible.

Imagine a tree like this:

```lua
return sequence({
  checkForHurt(),
  attackPlayer(),
  trackTarget(),
  investigateNoise(),
  patrol(),
})
```

Each one of those functions returns a behavior tree node; in this implementation, a function.

When guards attack the player, they fire three shots in a row and wait a little bit before firing again. This timing node became *super* complex because of this re-entrant behavior that I'd coded into the iterating nodes. Did that wait increment all the time, even if the node didn't get ticked this update? Did it remember the last timestamp instead?

Guards would ignore noises as they tracked their targets and were too easy to fool. If I swapped the order of those nodes, now they would ignore their targets if anything made noise nearby. Neither one was correct, but fixing it involved a lot of conditional nodes polluting the lower branches of the tree.

### Not Restarting

To fix this, I thought I should move to a (gasp) OOP solution for my nodes. By [the FSM][fsm], I was building a tree so I should have some `Node` instances in there. These `Node` instances would maintain some state about what child was last `running` and would tick it directly.

There was a case I hadn't considered in all of this: `parallel` nodes. A `parallel` node could have two children side-by-side, and one could be `failed` while the other was `running`. This would cause the `parallel` node to return `failed` and would interrupt the `running` node. Thus, there was still restarting in there.

If I didn't restart the node but tracked the node that was running, then *surely* I needed `enter` and `exit` semantics on all my nodes, to make sure that the node restarted if it didn't get "picked" on the next tick.

Suddenly, instead of a clean, functional solution I was surrounded by bloated objects. Most of them had empty `enter` and `exit` routines, but I still had to dutifully `enter` and `exit` nodes in my `sequence`, `selector`, and `parallel` nodes. Yuck.

### Resolution

This plagued me throughout my initial exploration of this space as I flipped back and forth between the two. At one point, I decided that `sequence` should always return to its previously `running` child and `selector` should always evaluate from the beginning. That was supremely dumb; now the two most basic nodes of any behavior tree had different behaviors that made them harder to reason about. Ugh.

Every flip of this behavior made me re-write the AIs for the two enemies I was using to test the AI. This cost me a lot and stalled the project for much longer than it should have.

The advice that kicked me over the edge came from [Panda BT][panda], a good-looking behavior tree plugin for Unity. In its documentation was this advice:

> Editing a behaviour tree is similar to writing a computer program: you don’t specify the transitions from an instruction to another, since the transition is implied by the syntax of the programming language. This **programming analogy** is the based idea that inspired the development of Panda Behaviour.

(emphasis mine)

A **programming analogy**. That kicked me out of my wishy-washy design headspace. I decided to imitate virtually every programming language I've ever used and iterate the statements in the order they were "written" until they were complete.

I threw away my OOP solution that I was never happy with and ended up with much simpler code. Here is a `sequence` node:

```lua
return function(children)
  local index = 1
  return function(entity, dt)
    while index <= #children do
      local current = children[index]
      local result = current(entity, dt)
      if result == 'failure' then
        index = 1
        return 'failure'
      end
      if result == 'running' then
        return 'running'
      end
      index = index + 1
    end
    index = 1
    return 'success'
  end
end
```

And here is a `selector` node:

```lua
return function(children)
  local index = 1
  return function(entity, dt)
    while index <= #children do
      local current = children[index]
      local result = current(entity, dt)
      if result == 'success' then
        index = 1
        return 'success'
      end
      if result == 'running' then
        return 'running'
      end
      index = index + 1
    end
    index = 1
    return 'failure'
  end
end
```

Much better. The tests became simpler too since there was virtually no internal state to manage.

## Doing Too Much

Throughout much of my AI exploration, I had pushed almost all complex behavior of my sprites into the AI routines. When something had to `wanderOnPlatform` then, [by FSM][fsm], it would calculate everything it needed in its `wanderOnPlatform` routine (whether OOP or a closure). Originally, that meant casting rays from the entity to the platform below looking for edges.

This strained the AI system and made everything more complex. Each node swelled in size as it began to manage its own slice of complicated state.

This made it hard to find the reuse limits of the behavior nodes. I had to increasingly parameterize the AI nodes which moved split the definition of an entity between its definition and its AI tree. If I had two trees (such as `guardPatrol` and `guardStatic`) then I'd have to either duplicate or externalize those parameters to keep them consistent. This felt very fragile to maintain.

### Memory

The first decision I made that eased the burden was adding a [blackboard][]. I didn't just want a way to share state among the nodes; I wanted something that would make the entities look more like they were really thinking. So I implemented my blackboard as a memory system. [Something like this memory markers system][memory-markers].

Every memory in the system would be stored via a particular `key`. The memory object itself would have two properties: a `value` for whatever the node wanted to remember and a `time` that the memory was stored. Different entities could remember things for different lengths of time, representing different threat profiles. Guards would remember things for much longer than sentries, for example.

The memory data also breaks out the `x` and `y` position of the memory, since so much of the memory data is based on position.

Suddenly nodes could operate on the memory instead. `hasTarget` could look for the `target` memory. `hasSeenPlayer` could look for the `player` memory. `targetTheHurt` would find the `hurt` memory and look for its normal.

### Better Systems

It was only after I played around with goal-oriented action planning, though, that I realized I should formalize the "language" of my AIs with components and systems that represented that "language". For example, if multiple entities were trying to target the player, then there should be a `TargettingSystem` that tracked where the player was, if entities could see it, how long ago that was, etc.

Thinking about my game in terms of the "verbs" of the game helped define the systems and their responsibilities. I wanted entities that could "see" the player, could "track" where they went.

Another great example is the `NavMeshSystem`. Rather than relying on physics to determine where an entity could walk on a platform or fly through the level, I can pre-compute these areas and store them as navigation meshes. That way, when something goes to `wanderOnPlatform` it can look up where it is in the `platform` navmesh and find the edges very rapidly and simply.

The `SensesSystem` takes care of sight and hearing for those entities that have `sight` and `hearing` components. The `AwarenessSystem` tracks entities that can have `low`, `medium`, or `high` awareness based on that sensory data and how it changes the parameters of their behavior. The `SteeringSystem` is responsible for moving the entity based on if it is `chase`-ing the player, `arrive`-ing at a target point, or simply `stop`-ped.

And on and on. These systems pulled the weight off the AI's shoulders, so to speak, and the AI routines became very easy to write and reason about. Combined with the "don't restart" decision, scripting the AI became much more straightforward.

## OOP vs. Functional

It seems so natural: I need to make a tree of nodes that mostly look the same. Some are going to differ in their implementation. Sounds like polymorphism to me!

Except that nearly triples the amount of code I have to write for not much benefit. It also encouraged a mindset that made the nodes more complicated than they really should be.

Here is the final implementation for `isAware`, a node that compares the entity's awareness level, written as a function:

```lua
return function(level)
  return function(entity)
    if entity.awareness and entity.awareness.level == level then
      return 'success'
    else
      return 'failure'
    end
  end
end
```

It returns a function that has our node signature: `function(entity, dt) end`, while maintaining the state of the level we care about in the closure.

Here is that implementation as OOP, using `classic` as our library of choice:

```lua
local Node = require 'core.behaviortree.node'

local IsAware = Node:extend()

function IsAware:new(level)
  self.level = level
end

function IsAware:update(entity)
  local aware = entity.awareness
  if aware.level == self.level then
    return 'success'
  else
    return 'failure'
  end
end

return IsAware
```

The OOP version is fully twice as long. There's a lot of OOP ceremony in there around overriding methods and showing the inheritance hierarchy. The visual noise detracts from the heart of what this thing actually does.

And in case you think this example is contrived, this is among the simplest AI nodes I have that could be re-used across a bunch of different entities.

# Final Example

Here is the `sentryPatrol` behavior tree as of April, 2019:

```lua
local function surprise()
  return sequence({
    setMemory('isSurprised', false),
    checkSurprise(),
    setMemory('isSurprised', true),
    playSoundOnce('sentrySurprised'),
    stop,
    wait(.5),
    setMemory('isSurprised', false)
  })
end

local function pesterPlayer()
  return sequence({
    canSeePlayer,
    withinRange,
    clearMemory('noise'),
    bombPlayer(0, -6, 'floating', love.math.random(.5, .8)),
  })
end

local function trackTarget()
  return sequence({
    hasTarget,
    flyTrackTarget,
  })
end

local function investigateNoise()
  return sequence({
    hasMemory('noise'),
    targetMemory('noise'),
  })
end

local function patrol()
  return sequence({
    isAware('low'),
    flyPatrol(),
    gotoNode(),
    waitRandom(1.5, 3)
  })
end

return function()
  return parallel({
    surprise(),
    selector({
      hasMemoryWithValue('isSurprised', nil, true),
      pesterPlayer(),
      trackTarget(),
      investigateNoise(),
      patrol(),
    })
  })
end
```

This is the entire module named `sentryPatrol.lua` from Gemini Rising's codebase. It's not complete, but it's very close to what I imagine the final behavior of sentries should be in the game.

The function that is `return`-ed at the bottom is the tree itself. The other top-level local functions represent potentially re-usable nuggets of behavior that I might put in their own modules.

First, the sentry is always ready to be surprised. "Surprise" is defined as an entity's awareness level going up, from `low` to `medium` or `high`, or from `medium` to `high`. If it is surprised, then it pauses all other behavior until it is done showing its surprised behavior to the player. This allows the player a little reaction time if they hear or see a sentry that is now aware of them.

The `selector` node defined at the root of the tree shows what behaviors this sentry will prioritize:

1. If need be, it will do nothing as it acts surprised.
2. It will bomb the player as long as the player can be seen and is within range.
3. If it has a target, it will track that target.
4. If it knows about any recent noise, it'll set that as a target.
5. If nothing else is going on then it will fly its horizontal patrol route.

The `SensesSystem` automatically targets the player if they are seen. This is part of that "lean on the language of the systems" thing I was writing about earlier. In this case, I don't have to write an AI routine to remember to target the player because *I always want my enemies targetting the player*. That's just the default. I'm not writing a general-purpose `SensesSystem`, I'm writing Gemini Rising's `SensesSystem` and that's the definition of how enemies work in this game.

This script also matches my requirements. It has **at-a-glance readability**, it is **predictable** as a function of player behavior, and it's actually pretty **fun** trying to dodge a pack of these things as they try to bomb you when you're playing.

## Further Reading

Here are the behavior tree links that helped me the most:

* [Behavior trees for AI: How they work by Chris Simpson](http://www.gamasutra.com/blogs/ChrisSimpson/20140717/221339/Behavior_trees_for_AI_How_they_work.php)
* [Panda BT's documentation](http://www.pandabehaviour.com/?page_id=23)
* [Difference between Decision Trees & Behavior Trees for Game AI](https://gamedev.stackexchange.com/questions/51693/difference-between-decision-trees-behavior-trees-for-game-ai)
* [Behavior Trees :: Actions That Take Longer Than One Tick](https://gamedev.stackexchange.com/questions/51738/behavior-trees-actions-that-take-longer-than-one-tick)
* [Introduction to Behavior Trees - #AltDevBlog](http://jahej.com/alt/2011_02_24_introduction-to-behavior-trees.html)
* [Advanced Behavior Tree Structures](http://leamonde.net/posts/11232015.html)

Note that the "Actions That Take Longer Than One Tick" confused the hell out of me, because the accepted answer seems to offer contradictory advice: you should both go straight back to the running node *and* you should still evaluate higher priority nodes first. This was the original source of the "`selector` restarts but `sequence` does not" fiasco. That really sucked.

Now I believe that the author was assuming that the root node was something like a `parallel` node. A `parallel` would still evaluate the "higher-priority" nodes.

## Conclusion

Behavior trees rule. Behavior trees are my goto AI scripting solution for Gemini Rising. I imagine I'm going to use them for more than just entity AI in this game as well, but that's a blog post for another time.

But in line with my general experience reading about stuff on the web, I wish I'd seen more recommendations about how to implement and use them effectively. Hopefully I've helped there somewhat.

[grai]: {{< ref "gemini-rising-ai-intro/index.md" >}}
[lua-scripting]: {{< ref "gemini-rising-ai-lua-scripting/index.md" >}}
[lsm]: https://github.com/kyleconroy/lua-state-machine
[statecharts]: https://statecharts.github.io
[gppstate]: https://gameprogrammingpatterns.com/state.html
[panda]: http://www.pandabehaviour.com/?page_id=23
[fsm]: https://www.venganza.org/
[btree-intro]: http://www.gamasutra.com/blogs/ChrisSimpson/20140717/221339/Behavior_trees_for_AI_How_they_work.php
[blackboard]: https://en.wikipedia.org/wiki/Blackboard_(design_pattern)
[memory-markers]: https://www.gamedev.net/articles/programming/artificial-intelligence/memory-markers-r4142/
