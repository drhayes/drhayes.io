import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import mdsvexConfig from './mdsvex.config.js';
import netlify from '@sveltejs/adapter-netlify';
import path from 'path';

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
    adapter: netlify(),
    files: {
      assets: 'static',
    },
    prerender: {
      crawl: true,
      enabled: true,
      force: true,
      pages: ['*'],
    },
    vite: {
      resolve: {
        alias: {
          $stores: path.resolve('./src/stores'),
        },
      },
    },
  }
};

export default config;
