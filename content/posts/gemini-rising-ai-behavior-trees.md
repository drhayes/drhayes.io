---
title: Gemini Rising AI - Behavior Trees
date: 2019-03-22T11:12:57-05:00
tags:
  - Gemini Rising
  - AI
  - Gemini Rising AI
  - behavior trees
draft: true
---

This post is the second in a [series I'm writing about scripting the AI in my game, Gemini Rising][grai]. This one is about behavior trees.

<!--more-->

There aren't enough resources out there that dive deeply. It's easy to find "hello world" examples, but it's harder to find meaty essays that discuss pros and cons, tradeoffs taken, long-term consequences unforeseen. These posts are my attempt to fix that.

# Intro

After [deciding that scripting the AI in straight Lua wasn't for me][lua-scripting], I cast around looking for another solution for my game's AI routines. I eventually settled on behavior trees.

As of April, 2019, this is the AI solution for Gemini Rising going forward.

## But What about state machines?

The short answer is: the combinatorial explosion of states for any reasonably "smart" behavior violated my **be easy for me** rule of hobbyist game development.

The bog-standard answer to "what should I write my game AI with", state machines represent a very natural way of thinking about how your game enemies "think". If your enemy is in the `STAND_GUARD` state then they are standing in one place, looking for the player; if your enemy is in the `PATROL` state then they are walking around.

I find that for anything beyond extremely simple behaviors state machines break down. If there is anything cross-cutting about your enemies' behavior then the number of states you have to manage is going to explode. Is the enemy `SHOOTING_WHILE_STANDING_GUARD` or are they `SHOOTING_WHILE_ON_PATROL`?

It matters because your "shooting" state must now what state to return to based on world events. If the enemy can no longer see the player, it must "remember" if it was standing guard or patrolling. The way to do that is to have two "shooting" states, one for standing guard and another for patrolling. That's not ideal.

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

# Behavior Trees

As is my wont, I'm not going to introduce what behavior trees are. Other authors have done much better jobs of that. [This is my favorite behavior trees intro][btree-intro].

I couldn't find a good behavior tree implementation in Lua so I wrote my own. Initially, I wanted my BT implementation to be functional and very, very simple. Since each node in a behavior tree can participate in the part-whole hierarchy of the tree, I figured that every node, at its heart, would look like this:

```lua
return function(entity, dt)
  -- Behavior tree stuff goes here.
end
```

The expected return values from this function should be one of `success`, `failure`, or `running`.

It doesn't get much simpler than that.

# In Which I Make Things More Complicated

Coders gonna code, as they say, and I regret the waffling I did while pursuing this solution and the code I committed, removed, re-wrote, tested, removed, then revamped along the way.

## To Restart Or Not To Restart?

The first hurdle I ran into was a surprisingly basic one. Given that `sequence` and `selector` iterate their children, what do they do if a child returned `running` the last time the tree was ticked?

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

Throughout much of my AI exploration, I had pushed almost all complex behavior of my sprites into the AI routines. When something had to `wanderOnPlatform` then, [by FSM][fsm], it would calculate everything it needed in its `wanderOnPlatform` routine (whether OOP or a closure).

This strained the AI system and made everything more complex. Each node swelled in size as it began to manage its own slice of complicated state.

The first decision I made that eased the burden was adding a [blackboard][]. I didn't just want a way to share state among the nodes; I wanted something that would make the entities look more like they were really thinking. So I implemented my blackboard as a memory system. [Something like this memory markers system][memory-markers] though I found this article after writing my own.

Every memory in the system would be stored via a particular `key`. The memory object itself would have two properties: a `value` for whatever the node wanted to remember and a `time` that the memory was stored. Different entities could remember things for different lengths of time, representing different threat profiles. Guards would remember things for much longer than sentries, for example.

Suddenly nodes could operate on the memory instead. `hasTarget` could look for the `target` memory. `hasSeenPlayer` could look for the `player` memory. `targetTheHurt` would find the `hurt` memory and look for its normal.

It was only after I played around with goal-oriented action planning, though,


[grai]: {{< ref "gemini-rising-ai-intro.md" >}}
[lua-scripting]: {{< ref "gemini-rising-ai-lua-scripting.md" >}}
[lsm]: https://github.com/kyleconroy/lua-state-machine
[statecharts]: https://statecharts.github.io
[gppstate]: https://gameprogrammingpatterns.com/state.html
[panda]: http://www.pandabehaviour.com/?page_id=23
[fsm]: https://www.venganza.org/
[btree-intro]: http://www.gamasutra.com/blogs/ChrisSimpson/20140717/221339/Behavior_trees_for_AI_How_they_work.php
[blackboard]: https://en.wikipedia.org/wiki/Blackboard_(design_pattern)
[memory-markers]: https://www.gamedev.net/articles/programming/artificial-intelligence/memory-markers-r4142/
