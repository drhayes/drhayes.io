---
title: Gemini Rising
tags:
  - gemini-rising
  - projects
toc: true
screenshot: /img/gr-screenshot-2018-09-12.png
description: A Metroidvania about crafting and sneaking.
layout: page.njk
---

![Neato screenshot of game]({{ screenshot }} "Screenshot as of 2018-09-12")

Gemini Rising is a Metroidvania with crafting elements and procedural generation that I'm working on. It is out now for pre-alpha testing!

My goal is to make the entire game by myself: programming, graphics, sound, and music.

[Check out the "gemini-rising" tag for blog posts about it](/tags/gemini-rising).

You can grab the game on itch.io:

<iframe frameborder="0" src="https://itch.io/embed/393809" width="552" height="167"><a href="https://drhayes.itch.io/gemini-rising">Gemini Rising by drhayes</a></iframe>

## Video Dev Log

Here's a list of videos I've made of the game's progress so far. My game was codenamed "Basement" before I came up with its current title.

<iframe style="position:static;width:100%;height:600px" src="https://www.youtube.com/embed/videoseries?list=PLQuDSztE3xlPBszv48dtN3TFsKUP9s_mO" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Articles

<ol>
{% for article in collections.gamearticles | articlesfor('gemini-rising') %}
  <li>
    <a href="{{ article.url }}">{{ article.data.title }}</a>
  </li>
{% endfor %}
</ol>
