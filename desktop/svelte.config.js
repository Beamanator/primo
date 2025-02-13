import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import nested from 'postcss-nested'
import preset from 'postcss-preset-env'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: {
        plugins: [tailwindcss(), autoprefixer(), nested(), preset()],
      },
    }),
  ],
	kit: {
		adapter: adapter({
      fallback: 'index.html'
    }),
    browser: {
      router: true
    },
    vite: {
      server: {
        fs: {
          // throws an error without this when importing Fira font
          allow: ['..', 'node_modules/@fontsource/fira-code']
        },
        force: true,
        open: false, // do not open the browser as we use electron
        port: process.env.PORT || 3333,
      },
      build: {
        sourcemap: true,
      },
      define: {
          '__DESKTOP_VERSION__': JSON.stringify(process.env.npm_package_version),
      }
    }
	}
};

export default config;
