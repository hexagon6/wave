import svelte from 'rollup-plugin-svelte'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'

export default {
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  format: 'iife',
  sourceMap: true,
  plugins: [
    eslint({
      include: [
        './src/**/*.js'
      ]
    }),
    svelte({
      // By default, all .html and .svelte files are compiled
      extensions: ['.html'],

      // You can restrict which files are compiled
      // using `include` and `exclude`
      include: 'src/components/**.html'
    }),
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
      skip: [ ],  // Default: []

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
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**',  // Default: undefined
      exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined

      // search for files other than .js files (must already
      // be transpiled by a previous plugin!)
      extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false,  // Default: false

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false  // Default: true
    }),
    babel({
      include: ['./src/**/*.js']
    })
  ]
}
