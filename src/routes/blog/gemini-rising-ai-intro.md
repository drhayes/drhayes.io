---
title: Gemini Rising AI - Introduction
description: The introduction to my series of posts about AI in my game Gemini Rising.
date: 2019-03-21T16:10:51-05:00
tags:
  - gemini-rising
  - ai
  - game-ai
  - gemini-rising-ai
---

When I went looking for articles about game AI that went beyond the most basic level I had a hard time finding any. Most articles were more interested in defining one basic concept and providing an easy, "Hello World" example than diving deep into solving real problems in a real game.

I'd like to change that for future programmers like me looking for guidance.

I'm going to write a series of posts about my experiences crafting the AI for my game, [Gemini Rising][gr]. Since I was learning as I go I'm sure there are going to be mistakes; I'd love to hear about them!

UPDATED 2020-07-13: Added 'game-ai' tag.

## Overview

Here are the solutions I tried, in roughly chronological order:

   * Lua scripting with coroutines
   * Behavior trees
   * Goal-oriented action planning
   * Behavior trees (but better this time)

## Goals

My goals shifted over time, but here is the list in priority order:

   * **Fun experience for the player**. Above all else, the game had to be fun for the player.
   * **Learn something about game AI**. In all my wandering, I wanted to learn more about making good AI for games.
   * **Be easy for me**. I'm jealous of my time as a hobbyist gamedev, so anything that required too much brainpower to adapt, use, modify, or fix was right out. I didn't need visual designers, but if I couldn't fix AI problems relatively easily then this wasn't the method for me.
   * **Be predictable**. This one was added later; I'll talk about it more when it becomes important.

## The Posts

Here are the posts that are ready.

   1. [Lua Scripting][luascripting]
   2. [Behavior Trees][bt]
   3. [Goal-Oriented Action Planning][goap]


[gr]: /games/gemini-rising
[luascripting]: /blog/gemini-rising-ai-lua-scripting/
[bt]: /blog/gemini-rising-ai-behavior-trees/
[goap]: /blog/gemini-rising-ai-goap/
