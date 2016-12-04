import svelte from 'rollup-plugin-svelte';
import eslint from 'rollup-plugin-eslint';

const plugins = [
  svelte(),
  /* eslint({
    exclude: [
      'src/styles/**'
    ]
  })
  */
];

export default {
	entry: 'src/main.js',
	dest: 'dist/bundle.js',
	format: 'iife',
	plugins,
	sourceMap: true
};