---
title: The JavaScript Toolchain Sucks
date: 2022-10-15
description: The bewildering array of server-side JS config is terrible.
tags:
  - programming
  - javascript
  - usability
draft: true
---

Programming in server-side, [NodeJS](https://nodejs.org/en/) JavaScript is so frustrating for me at the moment. I love JS the language, but the tooling around it is fairly awful.

There's this whole galaxy of configuration files that float along with every project: `package.json` and `package-lock.json` for modules, `.prettierrc` and `.prettierignore` for formatting, `.nvmrc` for which node version you're using, a `.husky` directory with some git hooks, `.eslintrc` and `.eslintignore` for linting the code, maybe a `tsconfig.json` for doing [TypeScript](https://www.typescriptlang.org/) stuff, `.npmrc` for using custom node package registries...

And each one comes with a bristling array of options such that the config surface of any utility is easily mismatched against any prior or future project I've worked on. For instance, I don't know that any TypeScript config I've ever used has been easily moved from one project to another.

And, yes, I know there are probably good reasons for this. And, yes, I understand that such hairs are actually the sign of a thriving ecosystem that serves a broad array of users.

But I can't help wondering if there's a usability failure here. Extensive configurability surfaces (like preferences dialogs with a gajillion tabs) are sometimes a sign of ceded design responsibilities. They're also sometimes a sign of bad engineering workarounds and cans kicked down the road.

Not to pick on TypeScript here too much (they're all guilty), have you seen `tsconfig.json`'s property [`disableSizeLimit`](https://www.typescriptlang.org/tsconfig#disableSizeLimit)? It's categorized under "Editor Support". Why is the compiler config worried about bloating the memory of editors? *Which* editor is it worried about here? I'm pretty sure this was added because of something going on with Visual Studio Code. And Code is a useful editor, and I'm glad we're keeping it working. But, again, the compiler *might* have an option turned on to help that editor... sometimes?
