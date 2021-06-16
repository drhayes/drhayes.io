import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import mdsvexConfig from './mdsvex.config.js';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex(mdsvexConfig),
    preprocess(),
  ],

  kit: {
    adapter: vercel(),
    files: {
      assets: 'static',
    },
  }
};

export default config;
