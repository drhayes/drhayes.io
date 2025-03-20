#! /usr/bin/env node

const { program } = require('commander');
const slugify = require('@sindresorhus/slugify');
const { join: joinPath, dirname } = require('path');
const dateFns = require('date-fns');
const { writeFileSync, mkdirSync } = require('fs');

program
  .name('create-post')
  .description('tiny utility to create posts in my personal site')
  .version('1.0.0');

program
  .command('link')
  .description('creates a link post')
  .argument('<link>', 'the link to save')
  .argument('<title>', 'the title of the post')
  .action((link, title) => {
    const slug = `${slugify(title)}.md`;
    const today = new Date();
    const pathFragment = `links/${today.getFullYear()}/${dateFns.format(
      today,
      'MM'
    )}/${slug}`;
    const path = joinPath(__dirname, '../src', pathFragment);
    const formattedDate = dateFns.format(today, 'yyyy-MM-dd');
    const template = linkTemplate({ link, title, formattedDate });
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, template);
  });

function linkTemplate({ link, title, formattedDate }) {
  return `---
title: "${title}"
date: ${formattedDate}
tags:
url: ${link}
---

Check it out: ${link}
`;
}

program.parse();
