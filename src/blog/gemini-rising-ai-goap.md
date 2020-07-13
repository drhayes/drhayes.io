---
title: Gemini Rising AI -  Goal-Oriented Action Planning
date: 2019-10-25T10:32:01-05:00
tags:
  - gemini-rising
  - ai
  - game-ai
  - gemini-rising-ai
  - goap
  - pathfinding
description: My exploration of goal-oriented action planning and why I eventually decided not to use it.
---

This post is the (long overdue) third post in a series I'm writing about [scripting the AI in my game, Gemini Rising][grai]. This one is about goal-oriented action planning, or <abbr title="goal-oriented action planning">GOAP</abbr>.

I'm often frustrated to find that the blog posts I read don't dig into enough details about the *why* of things, instead focusing on very basic *what*s. With these posts, I'm trying to change that. Let's dive in.

UPDATED 2020-07-13: Added 'game-ai' tag.

## Intro

Before deciding on behavior trees for the AI of [Gemini Rising][gr], I flirted with using <abbr title="goal-oriented action planning">GOAP</abbr>. Simply put, <abbr title="goal-oriented action planning">GOAP</abbr> involves giving your actors goals and a collection of actions. The goal is represented as a desired world-state. The actions have metadata that shows how taking that action mutates the world-state. The actors then path-find through the space of sequences of actions to see if any sequence will help them reach their goals.

<abbr title="goal-oriented action planning">GOAP</abbr> has been used in many video games, most notably perhaps in F.E.A.R. It's very interesting, surprisingly simple... and complete overkill for my project. I ended up removing it from Gemini Rising. However, the decisions that I made along the way of exploring GOAP helped me create an improved implementation of behavior trees, so I consider it worth the effort. Mostly.

As is my wont in these articles, I'm not going to go in-depth in defining what <abbr title="goal-oriented action planning">GOAP</abbr> is. For that, I'd refer you to the [<abbr title="goal-oriented action planning">GOAP</abbr> site itself][goap], as well as a [paper written by Jeff Orkin, the guy who originated the technique][orkin1]. Another good reference is [this gamedev tutsplus article about <abbr title="goal-oriented action planning">GOAP</abbr>][gametuts] with some nice examples.

## Goals

I like to think of my game's enemies as maintaining to-do lists that look something like this:

1. Say ouch if I'm hurt.
2. Kill the player.
3. Investigate noises.
4. Patrol around looking for player.

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

The only thing I've removed is how I further defined the `WorldState` instances. Those `WorldState` instances are the goals. The list of instances I'm returning from this function define the hierarchical order of goals this entity will pursue.

Each `WorldState` is a collection of key-value pairs. The GOAP code can compare two `WorldState` instances using the `matches` method that I wrote:

```lua
function WorldState:matches(otherState)
  for k,value in pairs(self.matchSpec) do
    local otherValue = otherState.matchSpec[k]
    if otherValue == nil then
      otherValue = false
    end
    if type(value) == 'boolean' and type(otherValue) ~= 'boolean' then
      otherValue = not not otherValue
    end

    if value ~= otherValue then
      return false
    end
  end
  return true
end
```

This code worked, but felt very hacky to me. The most common value in the `WorldState` instances is a boolean. If a given `WorldState` has no value for a given key, it's a kind of "don't care" value; a `nil` will match the `WorldState` it's getting compared to if the other's value is `true` or `false`. I had unit tests guaranteeing that part worked, so I forgave myself the unclear code (how magnanimous of me) and moved on.

## Actions

Actions encompass two concepts:

  1. A precondition that must be true to take this action.
  2. A resultant world state that is true once this action is complete,
  called the effect.

To move from the precondition to the resultant state, the entity must take this action... if it can. Sometimes the state of the world prevents an entity from taking a particular action. The planner verifies this by matching the precondition against the current world state using the `WorldState:matches` method from before.

Once the action is complete, we modify the "current" world state to include the effect of the action.

"Hold up!" I imagine you saying. "I've recently seen a way to match world states." You're correct, astute reader. `WorldState` instances act as the state of the world, the precondition of actions, and the resultant world state for every action (the effect). That's convenient and a little bit poetic: I know about the current `WorldState`, and my goals are defined as desired `WorldState`s as well. Anyway.

Each of the actions the entity can take make a path to a goal.

## Pathfinding? Really?

One of the more interesting things about GOAP is its use of [A*][astar] that is not directly related to spatial pathfinding. If you think of the space of actions the entity can take as paving stones on the way to a goal this seems like a natural idea. When I first encountered it I was gobsmacked -- what an elegant solution.

Each action is given a cost. This cost is paid by the entity for performing this action. The entity will likely find multiple sequences of actions that result in it completing its highest-priority goal. The planner picks the sequence with the lowest cost as the "best" course of action.

Simple costs might include "distance to target", "amount of damage I'll suffer", or "amount of ammo I'll use". Anything that will help the entity pick the "best" goal.

My initial implementation had startling and effective results without using cost, however. But I thought this was a neat feature of this solution.

## Systems

All this theory is great, but what happened when I started trying to implement it in practice?

When it came time to make actions for my entities I realized that my entities couldn't see anything, couldn't hear anything, didn't track when they were last hurt, didn't know where the player was five seconds ago... nothing! Their "brains" were basically non-existent.

In behavior tree land, most of these "smarts" were wrapped up in the nodes of the behavior tree. Each node basically took care of how it managed its own state from traversal to traversal. This hadn't been a problem in behavior tree land (so I thought... foreshadowing!) but was definitely a problem now.

Since I was no longer using custom behavior tree nodes, how could my entities respond to a noise if they couldn't hear it or remember its position?

### Entity Memory

I needed to give my poor little entities some way to remember what they'd encountered in the game. So I gave them memory.

Here's the `set` method on the `AISystem`:

```lua
function AISystem:set(entity, key, value, posX, posY, normalX, normalY)
  local brain = entity:get(Brain)
  local memory = brain:get(key)
  if memory then
    memory.time = self.time
    memory.value = value
    memory.posX = posX
    memory.posY = posY
    memory.normalX = normalX
    memory.normalY = normalY
    memory.forgotten = false
  else
    memory = {
      time = self.time,
      value = value, -- can also be a flag, true/false
      posX = posX,
      posY = posY,
      normalX = normalX,
      normalY = normalY,
      forgotten = false,
      -- [0, 1] based on memory span of brain holding memory.
      age = 0
    }
  end
  brain:set(key, memory)
  return memory
end
```

There's some ECS ceremony in there but, essentially, my entities store their memories in their brain components. Each memory is a key, a value, a position, and possibly a normal to make my life easier down the road. Position is optional but almost always used. Normal is optional and only ever used when remembering being damaged. But I'm jumping ahead of myself.

If we've seen this memory before, don't make a new object -- just update the existing object with new values. If it's new, make a new object and store the values. Done. Simple.

Here's how we `get` memories back out:

```lua
function AISystem:get(entity, key, withinSpan)
  local brain = entity:get(Brain)
  local memory = brain:get(key) -- Did we ever know this?
  if not memory then
    return nil
  end
  -- Set its age, how long this memory is going to last within memory span.
  local timeDelta = self.time - memory.time
  memory.age = lume.clamp(timeDelta / brain.memorySpan, 0, 1)
  -- Check if this is forgotten now.
  if memory.forgotten or timeDelta > brain.memorySpan then
    memory.forgotten = true
    return nil
  end
  -- Is this within the time span they want?
  if withinSpan and timeDelta > withinSpan then
    return nil
  end
  if memory.transient then
    memory.forgotten = true
  end
  return memory
end
```

It's commented, so I won't repeat any of that info here. I *will* say that whether a memory is "transient" ended up not mattering. Normalizing the age helped with debugging and made it possible to have "urgent" goals, like "This just happened so increase my alarm state!". `withinSpan` mostly complicated things without much benefit. But the basic code is good: if I've got this memory, return it.

I've moved on from GOAP (spoiler alert!), but this code is still in my game. Having a memory makes so many other AI decisions possible and much, much easier. I'm kind of sorry it took me so long to get here.

Where was I hit? Where did I last see the player? Where was that noise? All these questions can be asked of the memory. But what writes to those memories?

### Entity Senses

Once memory was in place, I naturally moved on to senses. If an entity could see a player, then the `SensesSystem` would execute this line:

```lua
  aiSystem:set(entity, 'player', 1, util.entityMiddle(thing))
```

**I JUST SAW THE PLAYER** this line says. **HERE'S WHERE I THINK THE PLAYER IS** it screeches.

It's hard to state how powerful this one line of code ends up in every single AI routine that I write now. Once I give an entity senses, it will note where the player is. Anything else that needs to know where the player is will ask the entity's memory, not the game world. This provides a nice-looking, "realistic" behavior of sentries that act like bloodhounds, chasing down the player even when the player jumps down through floors and guards that stand where the player just was waiting for them to come back.

Being hurt adds a memory, too, if the entity has a brain. That's in the `HealthSystem`.

I can heap praise on this solution because it's not mine. I found [this great article about the sense system in Thief][thiefsenses] and put in a stripped-down version into my game. It worked wonders.

Hearing works the same way, but is more concerned with noise:

```lua
  aiSystem:set(entity, 'noise', noise.level - distance, noise.x, noise.y)
```

Same principle applies. **WHAT WAS THAT NOISE** this line yells.

And the enemies jump to reply.

### Entity Movement

My previous behavior tree solution spent a lot of time concerning itself with physics. Any node that moved the entity had to know how fast the entity was moving, what its max speed was, and how close it was to its destination.

Here's the constructor of the `WalkForward` behavior tree node from before I switched to GOAP:

```lua
function WalkForward:initialize(speed)
  -- code goes here
end
```

The speed value indicates at what speed this entity should move. There are several such values per enemy. Those values vary by enemy, even if the "walk forward" behavior does not change across multiple behavior trees -- so I have to pass them in. I have to pass them in every time I use these nodes, in fact, even if I'm using the nodes for the same entity.

Because of the way the nodes were written, to be a little generic, that meant a lot of duplicated code and lots of obfuscation of what each behavior tree node was actually doing. The behavior tree "brains" were very noisy to read.

Thinking back, I could have implemented a registry of such values per entity that these nodes could pull from... but I think the solution I created for this works even better.

I wanted something different for my GOAP actions. I wanted each one to be blissfully ignorant of how the entity's moved. Besides, I was fairly certain that mixing in the physics calculations with was a code smell and a failure of [the army officer's test][armyofficerstest]. Shame on me.

Enter nav meshes. Rather than constantly sending out rays to figure out where the basically static ground was every frame, what if my entities positioned themselves along the edges and vertices of a navmesh to determine where they were going? That would mean that I could generate any navmeshes that I needed for a level at level generation time (Gemini Rising is procedurally generated, but you probably knew that) and not have to worry about how entities move after that -- they just have a destination node and off they go!

I ended up with two navmeshes, one for the things that walk on platforms and another for things that fly through the air. This solved lots of ancillary problems as well:

* How do things that walk on platforms know if they can jump to a nearby platform? The platforming navmesh can have vertices between edges that are navigable by jump.
* How do I make things that fly avoid platform edges? Simply don't place flight navmesh nodes too close to platforms. They literally won't be able to path near the platform edge.
* Eventually, I plan on making enemies that can teleport via stationary bases from one area of the map to another. In a completely physics-based pathfinding scenario it'd be hard to configure teleporting through a base as a valid route. In a navmesh world, the stationary base becomes a vertex that gets pathed through. Easy.

So, I did that. But having a destination isn't quite enough -- how do you get there? I mean, once the pathfinder has figured out what points you need to hit in the navmesh to get to your destination... what actually happens?

#### Steering

Why, the `SteeringSystem` takes over of course! It looks like this:

```lua
local System = require 'lib.concord.system'
local Steering = require 'components.steering'
local steeringBehaviors = require 'systems.steeringBehaviors'

local SteeringSystem = System({ Steering })

function SteeringSystem:update(dt)
  for i = 1, self.pool.size do
    local entity = self.pool:get(i)
    local steering = entity:get(Steering)
    local steer = steeringBehaviors[steering.behavior]
    if steer then
      steer(entity, dt)
    end
  end
end

return SteeringSystem()
```

Ignore the ECS ceremony for now, focus on the part where if I find a steering behavior in my `steeringBehaviors` map I invoke it with the entity and the `dt` since last frame.

Here's my implementation of `seek`:

```lua
function behaviors.seek(entity, dt)
  local steering, pos, body = entity:get(Steering), entity:get(Position), entity:get(Body)
  local destX, destY = steering.destX, steering.destY
  local angle = lume.angle(pos.x, pos.y, destX, destY)
  local dist = lume.distance(pos.x, pos.y, destX, destY)

  local targetSpeed = steering.speed
  steering.arrived = false
  if dist < steering.targetRadius then
    targetSpeed = 0
    steering.arrived = true
  elseif dist < steering.slowRadius then
    targetSpeed = steering.speed * dist / steering.slowRadius
  end

  body.vx = math.cos(angle) * targetSpeed pos.facing = angle
end
```

Check out that `slowRadius` stuff. That's pretty legendary. It makes enemies look very natural as the slow to a stop as they arrive at their destinations.

As always when I praise something, it's because I got the idea from something else. My goto reference for the basics of AI game programming has always been [AI for Games by Ian Millington][aiforgames]. I adore this book and have read it cover-to-cover multiple times. I have the second edition but I can only imagine the third edition is just as good.

There are more steering behaviors like `stop`, `arrive`, `chase`, etc... but the GOAP-level action knows none of those things. All it knows is `gotoNode`. Entities decide how they get places -- the AI tells them where to go. That separation cleans everything up and pays off big when (spoiler alert!) I swapped out AI systems again after GOAP.

## Examples

Now that the systems were in place to support my actions, I made a small palette of actions for my two test entities: a guard that paces along platforms looking for players and a flying sentry that goes on high alert when it sees a player and starts a chase that ends only when it "forgets" about the player.

Here's a small sample:

* `bombPlayer`
* `flyCircuit`
* `gotoHome`
* `playSound`
* `shootPlayer`
* `wanderOnPlatform`

`wanderOnPlatform` is a nice barometer of how good my AI solution is treating me. Here's a snippet of the important bits:

```lua
function WanderOnPlatform:new()
  WanderOnPlatform.super.new(self)
  self.cost = 5
  self.effect:set('hasDestination', true)
  if love.math.random() > 0.5 then
    self.wanderDir = 'left'
  else
    self.wanderDir = 'right'
  end
end

function WanderOnPlatform:run(entity)
  local pos, brain = entity:get(Position), entity:get(Brain)

  local navTile = navMeshSystem:queryByPixelPos('platform', pos.x, pos.y)
  if not navTile then
    return 'failure'
  end

  local ctx = brain.context

  local dest = nil
  if self.wanderDir == 'left' then
    dest = navTile:leftMost()
  elseif self.wanderDir == 'right' then
    dest = navTile:rightMost()
  end

  if self.wanderDir == 'left' then
    self.wanderDir = 'right'
  else
    self.wanderDir = 'left'
  end

  brain.context.destination = dest aiSystem:set(entity, 'hasDestination', true)

  return 'success'
end
```

There's the navmesh. There's the `effect`, which is the change to the world state for the entity after this action has been successfully run; that helps the planner figure out if it should use this action or not. Once it runs its job is complete; the steering system takes over as the entity wanders back and forth on the platform.

Without the physics code intertwined here, and without having to worry about "jumping" out because the entity was just shot, this code is *very* simple. I was pretty happy.

## Debugging

While setting goals and writing actions I needed some way of seeing what the entities thought was going on. I implemented a `debugDraw` method on my `AISystem` to help me out:

```lua
function AISystem:drawDebug()
  for i = 1, self.pool.size do
    local entity = self.pool:get(i)
    local brain = entity:get(Brain)

    if brain.context.destination then
      local dx, dy = brain.context.destination:center()
      love.graphics.setColor(1, 0, 0, .5)
      love.graphics.rectangle('fill', dx - 2, dy - 2, 5, 5)
    end

    local pos = entity:get(Position)
    local actionManager = self.actionManagers[entity]
    actionManager:drawDebug(pos.x, pos.y)
  end
end
```

It draws a rectangle to indicate an entity's destination (if it has one) and calls `actionManager:drawDebug`. All that does is this:

```lua
function ActionManager:drawDebug(x, y)
  local name = 'nil'
  local currentAction = self.actions and self.actions[self.current]
  if currentAction then
    name = tostring(currentAction.class)
  end
  love.graphics.setColor(1, 1, 1, 1)
  love.graphics.print(name, x, y)
end
```

These probably shouldn't have been separate methods, to be honest. But by printing what the action the entity is executing I can zero in on their confusing behavior.

One more debug method rounded out my arsenal:

```lua
function AISystem:keypressed(key, scancode, isRepeat)
  if key == 'f2' then
    print('ai state:')
    for i = 1, self.pool.size do
      local entity = self.pool:get(i)
      local brain = entity:get(Brain)
      local ws = self:convertBrainToWorldState(entity)
      print(brain.goalListName, ws:debug())
    end
  end
end
```

If I pressed <kbd>F2</kbd> then I would get a dump of the state of every entity's world state and goal. This helped enormously when my entities inevitably ran wild, didn't shoot the perfectly available and obvious player, ran into things, and generally didn't behave as menacing enemies in a video game.

## Complications

It didn't all work immediately. I found bugs and complications in my implementation that I didn't see anyone else write about. I don't know if that's because they're obvious, they're bugs I wrote because I don't understand what I'm doing, or what. *¿porque no los dos?*

### Timeouts

Some actions that I wrote required timeouts. I wanted certain enemies to give up if they couldn't reach the player within a certain time so they would try something else, but I wanted this to happen while they still remembered the player.

Each entity's brain has an `ActionManager` that has a way of running sequences of actions. It maintains this timeout.

### Planner Graphs

The planner builds a graph of actions. Paths through this graph become plans that satisfy goals. When I first wrote the planner, it would get stuck in infinite loops because I wasn't removing each action from the pool of available actions as I added them to the graph. This might have been a weakness in my preconditions and effects, however.

### Dynamism

One of the strengths of this approach is the flexibility of the "list of actions" and "list of goals" approach. These lists become knobs that you can twist to modify the entity's behavior at run-time. I made no use of this and preferred to make my actions compensate instead.

Imagine an entity that doesn't know to attack anything until an alarm in the level goes red, or an action called "flee" that isn't available until the entity's health is below 25%. Sure, you can specify this as a precondition on the action (which I mostly did), but maybe modifying the list of actions or goals would have further simplified my actions. I don't know.

## Results

The enemies in my game became a lot smarter. Like, *way* smarter. **Too smart**.

Whoops.

[I was so preoccupied with whether or not I could that I didn't stop to think if I should.][malcolm-video]

The behavior was most noticeable in the guards. You know, the ones whose number one to-do item is "kill the player". It was pretty easy to enable emergent behaviors like, "if there are already two guards shooting the player walk forward to be the closest," or "if there are four guards shooting at the player go find an alarm panel to sound the alarm". That's not the problem.

The problem is that it actually stopped being fun.

I think there's room in this world for games with really smart enemies, guards that corner the player and make them hide until they are eventually found and killed if they take no other action. Sentries that coordinate their attacks with suppressing fire while they leap-frog and advance upon the player's position. Enemies that have no discernable pattern, that swarm the player with overwhleming odds, and deny victory to all but the swiftest, most combat-oriented of players.

But that's not the game I want to make.

And, dammit, I'd spent a lot of time researching, designing, and implementing something that I was now about to rip out completely because *it didn't serve my game*. That's probably the worst part of all this, my wasted time and effort. Hopefully the lesson will stick this time.

### Silver Lining

The silver lining of this is that the AI subsystems became *a lot* smarter in the process. When I returned to my behavior trees I was pleasantly surprised at how much easier they were this time around. But that's a topic for another blog post.

[grai]: /blog/gemini-rising-ai-intro/
[gr]: /games/gemini-rising
[goap]: http://alumni.media.mit.edu/~jorkin/goap.html
[orkin1]: http://alumni.media.mit.edu/~jorkin/GOAP_draft_AIWisdom2_2003.pdf
[gametuts]: https://gamedevelopment.tutsplus.com/tutorials/goal-oriented-action-planning-for-a-smarter-ai--cms-20793
[thiefsenses]: https://www.gamasutra.com/view/feature/131297/building_an_ai_sensory_system_.php
[armyofficerstest]: /parables/army-officers-test/
[aiforgames]: https://smile.amazon.com/AI-Games-Third-Ian-Millington/dp/1138483974/ref=sr_1_1?keywords=artificial+intelligence+for+games&qid=1572234715&sr=8-1
[malcolm-video]: https://www.youtube.com/watch?v=4PLvdmifDSk
[astar]: https://en.wikipedia.org/wiki/A*_search_algorithm
