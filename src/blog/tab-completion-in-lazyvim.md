---
title: Tab completion in Neovim with LazyVim and nvim-cmp
description: It took me way longer than it probably should have to make Neovim do what I wanted.
date: 2023-09-20
draft: true
tags:
  - editors
  - neovim
---

tl;dr: [Here is the section of my neovim config where I got nvim-cmp to complete on Tab instead of Enter](https://github.com/drhayes/neovim-config/blob/28c7586f2321bc80a16fb8186c10303e2415e8f9/lua/plugins/editor.lua#L52-L97).

[Neovim](https://neovim.io/) is my text editor of choice. I'm trying _as much as possible_ to get out of the "maintain my own vim config" game, but a little bit of customization is unavoidable given my own particularities and peccadilloes.

To whit: I don't want to have to press <kbd>Enter</kbd> everytime I want to accept a completion from [hrsh7th/nvim-cmp][], I want to press <kbd>Tab</kbd>. Pressing <kbd>Enter</kbd> causes me all kinds of problems: I like leaving verbose comments in my code and having nvim-cmp or [Copilot](https://github.com/features/copilot) dumping a bunch of stuff in when I just meant to end my current line is no bueno.

## The Players

A couple of things are at work in my config, making things complicated. I mean, they're also making my general text editing experience wonderful, but in this case -- badness.

### LazyVim

[My neovim config](https://github.com/drhayes/neovim-config/) is based on [LazyVim](https://www.lazyvim.org/), which is a great starting config for neovim. LazyVim, in turn, makes tremendous use of [folke/lazy.nvim](https://github.com/folke/lazy.nvim). LazyVim is the total config package, lazy.nvim is a plugin manager. I know, a little confusing.

LazyVim is opinionated and comes with tons of plugins all painstakingly set up to work together. And, naturally, since I can't leave well enough alone, I added a bunch of things and turned off a bunch of other things. Which means that I've upset the balance of painstakingly crafted config beauty and left a bunch of muddy footprints all over the place.

### nvim-cmp

As near as I can tell, [hrsh7th/nvim-cmp][] is basically what everyone uses for completions in neovim. It's really great. I get a little frustrated trying to [browse its documentation](https://github.com/hrsh7th/nvim-cmp/wiki) but I've found its code to be readable enough while angry and frustrated to solve my problems. That's a great metric, I think.

## Tab instead of Enter?

Right, right.

In lots of places all over the internet I'd seen examples that looked like this:

```lua
-- ... nvim-cmp config stuff before this...
['<Tab>'] = cmp.mapping(function(fallback)
  if cmp.visible() then
    -- You could replace select_next_item() with confirm({ select = true }) to get VS Code autocompletion behavior
    cmp.select_next_item()
  -- You could replace the expand_or_jumpable() calls with expand_or_locally_jumpable()
  -- this way you will only jump inside the snippet region
  elseif luasnip.expand_or_jumpable() then
    luasnip.expand_or_jump()
  elseif has_words_before() then
    cmp.complete()
  else
    fallback()
  end
end, { 'i', 's' }),
-- ...nvim-cmp config stuff ater this...
```

I was pretty sure that this said "in insert and select modes, when cmp is doing stuff and I press `Tab`, run this lua code". This configuration snippet is a lot like what nvim-cmp calls [its "vim-vsnip" example mapping](https://github.com/hrsh7th/nvim-cmp/wiki/Example-mappings#vim-vsnip).

I thought that meant I could stick that mapping into my LazyVim config and call it a day. But when I did that, **pressing Tab did not run select the current completion**. No variation of this code was working. I tried debugging it with some `print` statements and never saw those strings appear in my `:messages`. Drat.

I figured it was something in LazyVim that I was missing, but I was having trouble figuring out what that was.

`print(vim.inspect())` to the rescue!

## `opts` and LazyVim configs

My LazyVim override for nvim-cmp looks something like this:

```lua
  {
    'hrsh7th/nvim-cmp',
    lazy = false,
    dependencies = { 'hrsh7th/cmp-emoji' },
    opts = function(_, opts)
      -- ... stuff goes here ...
    end,
  },
```

I'm shoving stuff in that function I'm assigning to `opts`, including my non-working `Tab` mapping. According to the `folke/lazy.nvim` docs:

> opts should be a table (will be merged with parent specs), return a table (replaces parent specs) or should change a table. The table will be passed to the Plugin.config() function. Setting this value will imply Plugin.config()

Cool, cool. I knew the block was working; `print` statements in the function proved it was running even if none of my options seemed to be. I know LazyVim was putting a bunch of default mappings in there as well, because that's what makes it useful -- a bunch of plugins configured to work well together.

When I ran a `print(vim.inspect(opts.mapping))` in that `function` I saw the default mappings provided by LazyVim for `CR` and `S-CR`; that's <kbd>Enter<kbd> and <kbd>Shift + Enter</kbd> to you and me. Well, heck! What happens if I reset those after I set my `Tab` mapping?

```lua
opts.mapping['<CR>'] = nil
opts.mapping['<S-CR>'] = nil
```

Et voilà! Now my `Tab` completions were working and pressing `Enter` no longer accepted the completion choices!

If I set those two properties as nil inside that `vim.tbl_extend('force', opts.mapping, {...` business that they won't override -- `vim.tbl_extend` won't override an exiting table value if the rightmost value is `nil`, even under `force` I guess. TIL!

## The End!

I honestly don't know why `Enter` was getting privileged above `Tab` in my case. I poked around in the nvim-cmp and LazyVim codebases a bit but nothing immediately jumped out at me. I might've been the victim of arbitrary key sorting in lua or something.

That's not a satisfying answer, and doesn't imply [that the problem will never come up again](/quotes/problem-is-resolved-to-the-degree/).

But it's working now and I'm happy. And I wanted to write down my thought process so it might help someone else sometime. Including me, in the future, when I've forgotten all this.

[hrsh7th/nvim-cmp]: https://github.com/hrsh7th/nvim-cmp
