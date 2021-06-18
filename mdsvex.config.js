import remarkAbbr from 'remark-abbr';
import remarkGithubFlavoredMarkdown from 'remark-gfm';

const defaultLayoutPath = './src/layouts/default.svelte';
const blogLayoutPath = './src/layouts/blog.svelte';
const gamesLayoutPath = './src/layouts/game.svelte';

const config = {
  extensions: ['.svelte.md', '.md', '.svx'],
  smartypants: {
    quotes: true,
    ellipses: true,
    backticks: false,
    dashes: 'oldschool',
  },
  remarkPlugins: [
    remarkGithubFlavoredMarkdown,
    remarkAbbr,
  ],
  rehypePlugins: [],
  layout: {
    _: defaultLayoutPath,
    blog: blogLayoutPath,
    tags: defaultLayoutPath,
    games: gamesLayoutPath,
  },
};

export default config;
