---
title: Gemini Rising Ai State Machines
date: 2019-03-22T11:12:00-05:00
tags:
  - gemini-rising
  - ai
  - gemini-rising-ai
draft: true
---

# State Machines

Probably the most popular answer to the question, "What should I use for my game's AI?" It's hard to go wrong with a simple state machine over a bunch of hard-coded `if` statements, for sure.

I didn't stay with this scheme for long.

The state machine library I used first is this one: https://github.com/kyleconroy/lua-state-machine. It's great; I'm still using it for the complicated animations in my game.

For AI, I needed a [hierarchical state machine][hsm]. In an HSM, any given state could be another state machine which, itself, could have more state machines. That let me do things like have a "highest-level" *Patrolling* state which could transition to *Alerted* if the enemy was hit by a bullet. That *Patrolling* state is a state machine that includes wandering left, then right, then pausing sometimes.

The first issue I encountered was that no one makes a good HSM library in Lua. I set about writing my own. It was buggy but it *did* introduce me to the world of Lua unit-testing. At the time, I didn't know enough Lua to get this right and I abandoned it.

My main issue with this approach is the states themselves. Lots of things "patrol" in my game. How to parameterize the states to account for different speeds, different distances? At what level could I re-use these state machines? How were the entities in my game being driven by them? The building blocks in state machines felt too coarse.

If only I'd ever googled the term [statecharts][]. The AI model in my game would have gone in a completely different direction.

So I moved on again, this time to behavior trees.

[hsm]: https://barrgroup.com/Embedded-Systems/How-To/Introduction-Hierarchical-State-Machines
[statecharts]: https://statecharts.github.io/
