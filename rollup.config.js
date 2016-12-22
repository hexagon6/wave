import svelte from 'rollup-plugin-svelte'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

//import eslint from 'rollup-plugin-eslint'

const plugins = [
  svelte(),
  nodeResolve({
      // use "module" field for ES6 module if possible
      module: true, // Default: true

      // use "jsnext:main" if possible
      // – see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true,  // Default: false

      // use "main" field or index.js, even if it's not an ES6 module
      // (needs to be converted from CommonJS to ES6
      // – see https://github.com/rollup/rollup-plugin-commonjs
      main: true,  // Default: true

      // if there's something your bundle requires that you DON'T
      // want to include, add it to 'skip'. Local and relative imports
      // can be skipped by giving the full filepath. E.g., 
      // `path.resolve('src/relative-dependency.js')`
      skip: [ 'some-big-dependency' ],  // Default: []

      // some package.json files have a `browser` field which
      // specifies alternative files to load for people bundling
      // for the browser. If that's you, use this option, otherwise
      // pkg.browser will be ignored
      browser: true,  // Default: false

      // not all files you want to resolve are .js files
      extensions: [ '.js', '.json' ],  // Default: ['.js']

      // whether to prefer built-in modules (e.g. `fs`, `path`) or
      // local ones with the same names
      preferBuiltins: false  // Default: true

  }),
  babel({
      exclude: 'node_modules/**'
  })
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
	plugins: plugins,
	sourceMap: true
}
