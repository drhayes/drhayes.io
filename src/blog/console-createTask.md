---
title: What is console.createTask?
description: I just found this method on the console object.
date: 2023-09-04
draft: true
tags:
  - javascript
---

I was digging around in a node REPL while I was doing some mentoring and came across a method on the `console` object I'd never heard of: `console.createTask`.

I couldn't find any documentation on MDN, but [here's the documentation page on Chrome Developers for `console.createTask`](https://developer.chrome.com/docs/devtools/console/api/#createtask). And [here's a closed issue on the nodejs project showing that it has been added to node](https://github.com/nodejs/node/issues/44792).

Looks like it can be used to [create better stack traces from async calls](https://developer.chrome.com/blog/devtools-modern-web-debugging/#linked-stack-traces). It's part of a feature called "Async Stack Tagging". I'm still digging in; I love finding some new-to-me feature and digging in, feels like archaeology of the new.

This part is a little telling:

> Most of the time you don’t need to worry about the Async Stack Tagging API because the framework you are using handles the scheduling and async execution. In that case, it is up to the framework to implement the API.

...but what if I'm not using a framework, Chrome Developers? 😸
