---
title: Neovim, Mason, and LSPs oh my!
date: 2023-03-22
description: A tale of crashing LSPs and exploding logs.
tags:
  - editors
  - neovim
---

There's this one project at work that I was having trouble editing in Neovim... and by trouble, I mean I was getting repeated and near-constant notifications that my language servers were crashing once they attached to the buffer I was editing.

The project is an older TypeScript codebase running in Node 12. It's a bit of a pain anyway (grrr, `create-react-app`!) and the constant crashes weren't making things better.

Meanwhile, my `~/.local/state/nvim/lsp.log` file was positively **exploding** in size, quickly exceeding a couple of gigs. It was basically getting filled with errors that looked kinda like this:

```
[START][2023-03-22 14:19:57] LSP logging initiated
[ERROR][2023-03-22 14:19:57] .../vim/lsp/rpc.lua:734	"rpc"	"vscode-eslint-language-server"	"stderr"	"/home/drhayes/.local/share/nvim/mason/packages/eslint-lsp/node_modules/vscode-langservers-extracted/node_modules/vscode-jsonrpc/lib/common/linkedMap.js:40\n        return this._head?.value;\n                          ^\n\nSyntaxError: Unexpected token '.'\n    at wrapSafe (internal/modules/cjs/loader.js:915:16)\n    at Module._compile (internal/modules/cjs/loader.js:963:27)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)\n    at Module.load (internal/modules/cjs/loader.js:863:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:708:14)\n    at Module.require (internal/modules/cjs/loader.js:887:19)\n    at require (internal/modules/cjs/helpers.js:74:18)\n    at Object.<anonymous> (/home/drhayes/.local/share/nvim/mason/packages/eslint-lsp/node_modules/vscode-langservers-extracted/node_modules/vscode-jsonrpc/lib/common/api.js:37:21)\n    at Module._compile (internal/modules/cjs/loader.js:999:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)\n"
```

The contents had little or nothing to do with my project, but it really only happened with this project. We work in an unfortunately wide number of node versions, but this project was the one that caused my editor to suffer the most? What gives?

No big deal, I'm using [asdf](https://asdf-vm.com/) to manage multiple runtimes. Very handy.

I should say that my current neovim config is based on [LazyVim](https://www.lazyvim.org/). The version of my config I was running at the time [was this version](https://github.com/drhayes/neovim-config/commit/540c4c501ae499b4a15cbd317f72a80af61aa175). Most of my plugins lazy-load in, and [Mason](https://github.com/williamboman/mason.nvim) keeps me up-to-date.

Transpiled Copilot code kept showing up in those error logs, tons of it, broken across multiple lines. And, usually, it wasn't until the `typescript-language-server` lazy-loaded in that it started happening. Good ol' `tsserver` and I have had our disagreements in the past, so it easily became my first suspect.

Remember when I said this project was using Node 12? My first attempt to fix this problem was to [lock my node version for the `typescript-language-server` LSP to Node 19.8.1](https://github.com/drhayes/neovim-config/blob/2de98ef72b4b7da88dbf8fc98132481c32ed2ae8/lua/plugins/editor.lua#L64), but alas. Still crashing.

Trying to stop Mason from loading the TypeScript LSP in this case was hilarious. Once I got that straightened out, though, I started seeing similar behavior from the CSS LSP I was using. Huh?

None of the projects involved had issues mentioning this problem.

With the benefit of hindsight, I can lay out all the actors in this little stage-play:

- [Neovim](https://neovim.io/), my editor.
- `asdf` managing my many node versions.
- `Mason` managing my LSPs.
- `typescript-language-server` (among others).
- [zbirenbaum's excellent lua-only Copilot plugin](https://github.com/zbirenbaum/copilot.lua).

Now, I'm sure `:checkhealth` was screaming at me but the _multiple_ times I ran it I could find nothing. But I bet, somewhere in there, Mason was trying to tell me that its minimum node version is 14. Not 12. And it's not alone, tons of these tools require newer versions of node.

Aha!

I was finally able to narrow it down by slowly removing things from my config and finding useful error messages in that `lsp.log` (especially when it wasn't gigabytes in size and I didn't know what to look for yet).

Here's the fix, now at the beginning of my `init.lua` in my neovim config:

```lua
-- First things first, set the node path globally.
if vim.fn.has("unix") and vim.env.NEOVIM_NODE_VERSION then
  local node_dir = vim.env.HOME .. "/.asdf/installs/nodejs/" .. vim.env.NEOVIM_NODE_VERSION .. "/bin/"
  if vim.fn.isdirectory(node_dir) then
    vim.env.PATH = node_dir .. ":" .. vim.env.PATH
  end
end
```

[Here's that code in the context of my larger neovim config.](https://github.com/drhayes/neovim-config/blob/40b0c04b65af8f63d45e32a8cf837dc44e396e93/init.lua#L1-L7)

I'm running fish, so I did a quick `set -Ux NEOVIM_NODE_VERSION 19.18.1` and _voila_! Everything worked.

Hopefully I've stuffed this with enough keywords that some other poor soul finds this.
