import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';

const defaultLayoutPath = './src/layouts/default.svelte';

const config = {
  extensions: [".svelte.md", ".md", ".svx"],
  smartypants: {
    // dashes: "oldschool",
  },
  remarkPlugins: [
    [remarkGithub, {
      // Use your own repository
      repository: "https://github.com/drhayes/drhayes.io",
    }],
    remarkAbbr,
  ],
  rehypePlugins: [],
  layout: {
    _: defaultLayoutPath,
  },
};

export default config;
