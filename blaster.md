---
title: Blaster
---

# Blaster

<img src="{{ base.url }}/assets/blaster-screenshot.png">

[Play the game here][playblaster].

Blaster is the name of the twin-stick shooter I wrote as a break from building the _Big Game_ (which needs a better name!). Since that game is going to take me a very long time to build I figured I should take a break and build something simple and fun that wouldn't take me very long to complete, relatively speaking.

I also wanted to take the opportunity to write out a tutorial of sorts around how I put the game together, what my design decisions were, and what tools I used and found useful.

Blaster uses [Phaser][] and a host of web-based technologies.

Here is the [repository for the project][repo].

## Articles

<ol>
{% for page in site.blaster %}
  <li><a href="{{ page.url }}">{{ page.title }}</a></li>
{% endfor %}
</ol>

[playblaster]: http://blaster.drhayes.io
[phaser]: https://phaser.io/
[repo]: https://github.com/drhayes/blaster
