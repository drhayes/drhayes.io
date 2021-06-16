import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';

const defaultLayoutPath = './src/layouts/default.svelte';
const blogLayoutPath = './src/layouts/blog.svelte';

const config = {
  extensions: ['.svelte.md', '.md', '.svx'],
  smartypants: {
    quotes: true,
    ellipses: true,
    backticks: false,
    dashes: 'oldschool',
  },
  remarkPlugins: [
    [remarkGithub, {
      // Use your own repository
      repository: 'https://github.com/drhayes/drhayes.io',
    }],
    remarkAbbr,
  ],
  rehypePlugins: [],
  layout: {
    _: defaultLayoutPath,
    blog: blogLayoutPath,
  },
};

export default config;
