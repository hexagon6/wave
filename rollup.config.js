import svelte from 'rollup-plugin-svelte'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import buble from 'rollup-plugin-buble'
import eslint from 'rollup-plugin-eslint'
import uglify from 'rollup-plugin-uglify'

const production = !!process.env.production

export default {
  entry: 'src/main.js',
  dest: 'public/bundle.js',
  format: 'iife',
  moduleName: 'app',
  sourceMap: true,
  plugins: [
    eslint({
      include: [
        './src/**/*.js'
      ]
    }),
    /*
    svelte({
      // By default, all .html and .svelte files are compiled
      extensions: ['.html'],

      // You can restrict which files are compiled
      // using `include` and `exclude`
      include: 'src/components/**.html'
    }),
    */
    svelte({
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write('public/bundle.css')
      },

      // this results in smaller CSS files
      cascade: false,
      store: true,
    }),
    resolve(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**', // Default: undefined
      exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ], // Default: undefined

      // search for files other than .js files (must already
      // be transpiled by a previous plugin!)
      extensions: [ '.js', '.coffee' ], // Default: [ '.js' ]

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false, // Default: false

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false // Default: true
    }),
    // If we're building for production (npm run build
    // instead of npm run dev), transpile and minify
    production && buble({ exclude: 'node_modules/**' }),
    production && uglify()
  ]
}
