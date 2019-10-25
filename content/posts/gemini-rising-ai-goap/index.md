---
title: Gemini Rising AI -  Goal-Oriented Action Planning
date: 2019-10-25T10:32:01-05:00
draft: true
tags:
  - gemini-rising
  - ai
  - gemini-rising ai
  - goap
  - pathfinding
description: My exploration of goal-oriented action planning and why I eventually decided not to use it.
photoCredit: Isaac Smith on Unsplash
---

This post is the (long overdue) third post in a series I'm writing about [scripting the AI in my game, Gemini Rising][grai]. This one is about goal-oriented action planning, or <abbr title="goal-oriented action planning">GOAP</abbr>.

<!--more-->

I'm often frustrated to find that the blog posts I read don't dig into enough details about the *why* of things, instead focusing on very basic *what*s. With these posts, I'm trying to change that. Let's dive in.

## Intro

Before deciding on behavior trees for the AI of [Gemini Rising][gr], I flirted with using GOAP. Simply put, GOAP involves giving your actors goals and a collection of actions. The goal is represented as a desired world-state. The actions have metadata that shows how taking that action mutates the world-state. The actors then path-find through the space of sequences of actions to see if any sequence will help them reach their goals.

[GOAP] has been used in many video games, including F.E.A.R. It's very interesting, surprisingly simple, and complete overkill for my project. However, the decisions that I made along the way of exploring GOAP


## Goals

I like to think of my game's enemies as maintaining TODO lists that look something like this:

> 1. Say ouch, if I'm hurt.
> 2. Kill player.
> 3. Investigate noises.
> 4. Patrol around, looking for player.

With GOAP, that's precisely what they did. Here's an abbreviated snippet of code from my game's guards:

```lua
 guardPatrol = function()
    local patrol = WorldState('patrol')
    local investigateNoise = WorldState('investigateNoise')
    local killPlayer = WorldState('killPlayer')
    local waitForPlayer = WorldState('waitForPlayer')
    local respondToHurt = WorldState('respondToHurt')

    return {
      respondToHurt,
      killPlayer,
      waitForPlayer,
      investigateNoise,
      patrol,
    }
  end,
```

The only thing I've removed is how I defined the `WorldState` instances. Those `WorldState` instances are, themselves, goals. The list of instances I'm returning from this function define the hierarchical order of goals this entity will pursue.


[grai]: {{< ref "gemini-rising-ai-intro/index.md" >}}
[gr]: {{< ref "gemini-rising.md" >}}
[goap]: http://alumni.media.mit.edu/~jorkin/goap.html
